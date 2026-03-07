import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// DynamoDB client — same region as Lambda
const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" });

// Bedrock client — MUST be us-east-1 or us-west-2 (Claude available here)
const bedrock = new BedrockRuntimeClient({ region: "us-east-1" });

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
};

export const handler = async (event) => {

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS, body: "" };
  }

  const path  = event.path || "";
  const method = event.httpMethod;
  const params = event.queryStringParameters || {};

  try {

    // ─────────────────────────────────────────────
    // POST /chat  —  Bedrock Claude proxy
    // ─────────────────────────────────────────────
    if (method === "POST" && path.endsWith("/chat")) {
      const body = JSON.parse(event.body);

      const command = new InvokeModelCommand({
        // Use whichever model you enabled in Bedrock Model Access
        modelId: "anthropic.claude-sonnet-4-5",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: body.max_tokens || 700,
          system: body.system || "",
          messages: body.messages || []
        })
      });

      const response = await bedrock.send(command);
      const result   = JSON.parse(Buffer.from(response.body).toString());

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ content: result.content })
      };
    }

    // ─────────────────────────────────────────────
    // POST /workers  —  Save item to any table
    // ─────────────────────────────────────────────
    if (method === "POST" && path.endsWith("/workers")) {
      const body = JSON.parse(event.body);
      const { table, item } = body;
      item.updatedAt = new Date().toISOString();

      await dynamo.send(new PutItemCommand({
        TableName: table,
        Item: marshall(item, { removeUndefinedValues: true })
      }));

      const pk = item.workerId || item.jobId || item.applicationId;
      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({ success: true, id: pk })
      };
    }

    // ─────────────────────────────────────────────
    // GET /workers/:id  —  Fetch single worker
    // ─────────────────────────────────────────────
    if (method === "GET" && path.match(/\/workers\/[^/]+$/)) {
      const workerId = path.split("/").pop();
      const table    = params.table || "shramai-workers";

      const result = await dynamo.send(new GetItemCommand({
        TableName: table,
        Key: marshall({ workerId })
      }));

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify(result.Item ? unmarshall(result.Item) : null)
      };
    }

    // ─────────────────────────────────────────────
    // GET /scan  —  Scan full table
    // ─────────────────────────────────────────────
    if (method === "GET" && path.endsWith("/scan")) {
      const table = params.table || "shramai-workers";
      const limit = params.limit  ? parseInt(params.limit) : 500;

      const result = await dynamo.send(new ScanCommand({
        TableName: table,
        Limit: limit
      }));

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({
          items: result.Items.map(i => unmarshall(i)),
          count: result.Count
        })
      };
    }

    // ─────────────────────────────────────────────
    // GET /query  —  Filter by a field value
    // ─────────────────────────────────────────────
    if (method === "GET" && path.endsWith("/query")) {
      const { table, field, value } = params;
      if (!table || !field || !value) {
        return {
          statusCode: 400,
          headers: CORS,
          body: JSON.stringify({ error: "table, field, value are required" })
        };
      }

      const result = await dynamo.send(new ScanCommand({
        TableName: table,
        FilterExpression: "#f = :v",
        ExpressionAttributeNames:  { "#f": field },
        ExpressionAttributeValues: marshall({ ":v": value })
      }));

      return {
        statusCode: 200,
        headers: CORS,
        body: JSON.stringify({
          items: result.Items.map(i => unmarshall(i)),
          count: result.Count
        })
      };
    }

    // 404 fallback
    return {
      statusCode: 404,
      headers: CORS,
      body: JSON.stringify({ error: "Route not found", path, method })
    };

  } catch (err) {
    console.error("Lambda error:", err);
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ error: err.message, stack: err.stack })
    };
  }
};
