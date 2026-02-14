# SHRAM-AI: Complete System Design Document

## AI Advocate for 49 crore Informal Workers

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | February 2026 | SHRAM-AI Team | Complete system design document |

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Detailed Component Design](#4-detailed-component-design)
   - 4.1 [User Interaction Layer](#41-user-interaction-layer)
   - 4.2 [Agentic Orchestration Layer](#42-agentic-orchestration-layer)
   - 4.3 [AWS AI/ML Services Layer](#43-aws-ai-ml-services-layer)
   - 4.4 [Data & Memory Layer](#44-data--memory-layer)
   - 4.5 [Blockchain & Trust Layer](#45-blockchain--trust-layer)
   - 4.6 [India DPI Integration Layer](#46-india-dpi-integration-layer)
   - 4.7 [Analytics & Monitoring Layer](#47-analytics--monitoring-layer)
   - 4.8 [DevOps & Infrastructure Layer](#48-devops--infrastructure-layer)
5. [Data Flow Scenarios](#5-data-flow-scenarios)
6. [API Specifications](#6-api-specifications)
7. [Security Architecture](#7-security-architecture)
8. [Scalability & Performance](#8-scalability--performance)
9. [Glossary](#9-glossary)

---

## 1. System Overview

SHRAM-AI is a cloud-native, serverless platform built on Amazon Web Services (AWS). It transforms informal work experience into verifiable digital credentials, provides wage transparency, and connects workers to employers — all through simple, accessible channels (voice, WhatsApp, missed calls).

The architecture follows event-driven microservices principles with a multi-agent AI orchestration layer. It is designed for high scalability, low cost per user, and rapid deployment across India's diverse rural landscape.

### 1.1 Problem We Solve

India has 49 crore informal workers — carpenters, masons, electricians, ASHA workers, and more. They possess decades of skill but zero formal proof. A master with 12 years experience earns ₹450/day while a fresh certificate holder earns ₹700/day. Same work. Double the paper. Double the pay.

This isn't a skill gap. It's a proof gap — and a ₹20 lakh crore annual economic inefficiency. 31 crore workers are already registered on e-Shram, waiting for validation.

### 1.2 Our Solution

SHRAM-AI gives every worker an AI advocate that:
- Validates their skill through a voice conversation in their mother tongue
- Issues a blockchain-backed, tamper-proof credential in DigiLocker
- Shows them their true market value and exactly how much they're losing
- Finds and applies for jobs while they sleep
- Recommends the one skill upgrade that adds most to their daily wage
- Protects them from exploitation through contracts and blacklists

All on WhatsApp. No app. No literacy barrier. Built for Bharat.

---

## 2. Design Philosophy

| Principle | Application |
|-----------|-------------|
| **Serverless First** | Minimize operational overhead, auto-scale to zero |
| **Agentic AI** | Proactive agents that act on behalf of workers |
| **Privacy by Design** | Worker controls data; blockchain stores only hashes |
| **Rural-First** | Works on 2G, feature phones, low literacy |
| **API-Led Connectivity** | All functionality exposed via APIs |
| **Government Ready** | Built on India's DPI from day one |
| **Offline Capable** | Workers can interact without real-time connectivity |
| **Cost Optimized** | < ₹20 per worker per year at scale |

---

## 3. High-Level Architecture
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                     │
│                           SHRAM-AI COMPLETE ARCHITECTURE                            │
│                                                                                     │
│                     Agentic AI · AWS Native · India DPI Ready                       │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                          USER INTERACTION LAYER                         │        │
│  │                                                                         │        │
│  │       ┌──────────────┐   ┌──────────────┐   ┌──────────────┐            │        │
│  │       │   WHATSAPP   │   │ MISSED CALL  │   │  WEB PORTAL  │            │        │
│  │       │   Cloud API  │   │ Amazon Connect│  │ AWS Amplify  │            │        │
│  │       └──────┬───────┘   └──────┬───────┘   └──────┬───────┘            │        │
│  │              │                  │                  │                    │        │
│  │              └───────────────────┼───────────────────┘                  │        │
│  │                                  │                                      │        │
│  │                                  ▼                                      │        │
│  │                        ┌─────────────────────┐                          │        │
│  │                        │  Amazon API Gateway │                          │        │
│  │                        └──────────┬──────────┘                          │        │
│  │                                   │                                     │        │
│  └───────────────────────────────┼─────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                       AGENTIC ORCHESTRATION LAYER                       │        │
│  │                        Amazon Bedrock AgentCore                         │        │
│  │                    AWS Step Functions + EventBridge                     │        │
│  │                                                                         │        │
│  │       ┌─────────────────────────────────────────────────────────────┐   │        │
│  │       │                     ORCHESTRATOR AGENT                      │   │        │
│  │       │         (Maintains worker state, decomposes goals)          │   │        │
│  │       └─────────────────────────────────────────────────────────────┘   │        │
│  │                                   │                                     │        │
│  │               ┌────────────────────┴──────────────┴────────────────────┐│        │
│  │               │                   │               │                    ││        │
│  │               ▼                   ▼               ▼                    ││        │
│  │       ┌────────────┐      ┌────────────┐      ┌────────────┐           ││        │
│  │       │   SKILL    │      │    WAGE    │      │    JOB     │           ││        │
│  │       │   AGENT    │      │  GUARDIAN  │      │   MATCH    │           ││        │
│  │       │            │      │   AGENT    │      │   AGENT    │           ││        │
│  │       └────────────┘      └────────────┘      └────────────┘           ││        │
│  │               │                   │               │                    ││        │
│  │               ▼                   ▼               ▼                    ││        │
│  │       ┌────────────┐      ┌────────────┐      ┌────────────┐           ││        │
│  │       │UP SKILLING │      │   RIGHTS   │      │   MEMORY   │           ││        │
│  │       │   COACH    │      │   AGENT    │      │     DB     │           ││        │
│  │       │   AGENT    │      │            │      │ (DynamoDB) │           ││        │
│  │       └────────────┘      └────────────┘      └────────────┘           ││        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                         AWS AI/ML SERVICES LAYER                        │        │
│  │                                                                         │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │        │
│  │  │   LEX    │  │ BEDROCK  │  │ FORECAST │  │PERSONALIZE│  │  KENDRA  │   │        │
│  │  │ (Voice)  │  │ (Claude) │  │  (Wage)  │  │   (Jobs)  │  │ (Search) │   │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │        │
│  │                                                                         │        │
│  │                ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │        │
│  │                │REKOGNITION│ │  POLLY   │  │TRANSCRIBE│  │COMPREHEND│   │        │
│  │                │  (Video)  │ │ (Voice)  │  │  (STT)   │  │(Sentiment)│   │        │
│  │                └──────────┘  └──────────┘  └──────────┘  └──────────┘   │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                         BLOCKCHAIN & TRUST LAYER                        │        │
│  │                                                                         │        │
│  │               ┌─────────────────────────────────────────────┐           │        │
│  │               │          Amazon Managed Blockchain          │           │        │
│  │               │           (Hyperledger Fabric 2.2)          │           │        │
│  │               │                                             │           │        │
│  │               │  ┌───────────────────────────────────────┐  │           │        │
│  │               │  │           SOULBOUND TOKENS            │  │           │        │
│  │               │  │     (Non-transferable credentials)    │  │           │        │
│  │               │  │        • issueCredential()            │  │           │        │
│  │               │  │        • verifyCredential()           │  │           │        │
│  │               │  │        • revokeCredential()           │  │           │        │
│  │               │  └───────────────────────────────────────┘  │           │        │
│  │               └─────────────────────────────────────────────┘           │        │
│  │                                                                         │        │
│  │       ┌──────────────┐   ┌──────────────┐                               │        │
│  │       │    Amazon    │   │    Amazon    │                               │        │
│  │       │   Cognito    │   │     KMS      │                               │        │
│  │       │  (Identity)  │   │ (Encryption) │                               │        │
│  │       └──────────────┘   └──────────────┘                               │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                            DATA STORAGE LAYER                           │        │
│  │                                                                         │        │
│  │       ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐    │        │
│  │       │     DynamoDB     │ │        S3        │ │    Amazon RDS    │    │        │
│  │       │  (Worker State)  │ │  (Voice/Video)   │ │   (PostgreSQL)   │    │        │
│  │       │ • WorkerProfile  │ │ • Recordings     │ │ • Employers      │    │        │
│  │       │ • SkillHistory   │ │ • Demos          │ │ • Transactions   │    │        │
│  │       │ • WageHistory    │ │ • Landmark photos│ │ • Analytics      │    │        │
│  │       │ • JobApplications│ │ • Audit logs     │ │ • Reporting      │    │        │
│  │       └──────────────────┘ └──────────────────┘ └──────────────────┘    │        │
│  │                                                                         │        │
│  │               ┌──────────────────┐ ┌──────────────────┐                 │        │
│  │               │   ElastiCache    │ │    OpenSearch    │                 │        │
│  │               │     (Redis)      │ │   (Analytics)    │                 │        │
│  │               │ • Session cache  │ │ • Search index   │                 │        │
│  │               │ • Rate limiting  │ │ • Aggregations   │                 │        │
│  │               └──────────────────┘ └──────────────────┘                 │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                       INDIA DPI INTEGRATION LAYER                       │        │
│  │                                                                         │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │        │
│  │  │DIGILOCKER│  │ BHASHINI │  │  DIKSHA  │  │ e-SHRAM  │  │   ONDC   │   │        │
│  │  │   API    │  │   API    │  │   API    │  │   API    │  │  Beckn   │   │        │
│  │  │ (Creds)  │  │ (Voice)  │  │(Courses) │  │  (Data)  │  │(Discover)│   │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                      ANALYTICS & MONITORING LAYER                       │        │
│  │                                                                         │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │        │
│  │  │CloudWatch│  │  X-RAY   │  │CloudTrail│  │QuickSight│                 │        │
│  │  │(Metrics) │  │ (Trace)  │  │ (Audit)  │  │   (BI)   │                 │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘                 │        │
│  │                                                                         │        │
│  │                ┌──────────┐  ┌──────────┐                               │        │
│  │                │  Athena  │  │   Glue   │                               │        │
│  │                │ (Query)  │  │  (ETL)   │                               │        │
│  │                └──────────┘  └──────────┘                               │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                  │                                                  │
│                                  ▼                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │                      DEVOPS & INFRASTRUCTURE LAYER                      │        │
│  │                                                                         │        │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │        │
│  │  │ AWS CDK  │  │CodePipeline││ CloudForm│  │  Lambda  │                 │        │
│  │  │  (IaC)   │  │ (CI/CD)  │  │  ation   │  │ (Compute)│                 │        │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘                 │        │
│  │                                                                         │        │
│  │                ┌──────────┐  ┌──────────┐  ┌──────────┐                 │        │
│  │                │ Systems  │  │  Config  │  │  WAF +   │                 │        │
│  │                │ Manager  │  │          │  │  Shield  │                 │        │
│  │                └──────────┘  └──────────┘  └──────────┘                 │        │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                                                                     │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐        │
│  │                                                                         │        │
│  │    🎤 WORKER · 🤝 EMPLOYER · 🏛️ GOVERNMENT — All Connected via SHRAM-AI│        │
│  │                                                                         │        │
│  │        ⚡ 50+ AWS Services · 6 India DPI APIs · Fully Serverless        │        │
│  │            📱 All on WhatsApp · No App Needed · 22 Languages            │        │
│  │                                                                         │
│  │                                                                         │        │
│  └─────────────────────────────────────────────────────────────────────────┘        │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘

---

## 4. Detailed Component Design

### 4.1 User Interaction Layer

#### WhatsApp Integration
- **Technology:** WhatsApp Cloud API + AWS Lambda
- **Purpose:** Primary interface for workers (49Cr+ users)
- **Capabilities:**
  - Two-way messaging with quick reply buttons
  - Voice note sending and receiving
  - Image sharing (landmark photos)
  - Document sharing (skill cards, contracts)
  - Template messages for proactive outreach

**Flow:**
1. Worker sends "Hi" to SHRAM-AI WhatsApp number
2. Webhook triggers Lambda function
3. Lambda identifies intent and routes to appropriate agent
4. Response sent back via WhatsApp API
5. Conversation history stored in DynamoDB

#### Missed Call Service
- **Technology:** Amazon Connect / Twilio
- **Purpose:** Zero-data initiation for workers with feature phones
- **Flow:**
  1. Worker gives missed call to toll-free number
  2. System triggers callback within 2 seconds
  3. Voice interview conducted via phone call
  4. Call recording processed through Lex + Bedrock
  5. Worker receives results via SMS/WhatsApp

#### Web Dashboard
- **Technology:** AWS Amplify + React
- **Purpose:** Employer and admin interface
- **Features:**
  - Job posting with landmark photo upload
  - Worker search with filters (skill, location, rating)
  - Verified credential viewing
  - Hiring workflow management
  - Analytics and reporting for government

#### API Gateway Configuration
- **Type:** HTTP API
- **Authentication:** JWT (Cognito) + Lambda authorizers
- **Rate Limiting:** 1000 requests per second per tenant
- **Endpoints:** REST + GraphQL
- **Documentation:** OpenAPI 3.0

---

### 4.2 Agentic Orchestration Layer

#### Orchestrator Agent
- **Technology:** Amazon Bedrock AgentCore + AWS Step Functions
- **Purpose:** Maintains worker state and coordinates specialist agents

### 4.3 AWS AI/ML Services Layer

| Service | Purpose | Configuration | Model Details |
| :--- | :--- | :--- | :--- |
| **Amazon Lex** | Voice conversation bot | Custom bot with Bhojpuri/Hindi support; Fallback to human | Intent classification, slot filling |
| **Amazon Bedrock** | Skill validation, negotiation | Claude 3 Sonnet (reasoning), Llama 2 (negotiation) | 200K context window, fine-tuned for Indian languages |
| **Amazon Forecast** | Wage prediction | DeepAR+ with custom dataset; AutoPredictor | 5-year historical data, monthly retraining |
| **Amazon Personalize** | Job matching, course recs | HRNN-Coldstart; Event tracking | 10M+ interaction events expected |
| **Amazon Kendra** | Employer search | Natural language query; Custom synonyms for trades | Enterprise edition, 100K+ documents |
| **Amazon Rekognition** | Video validation | Custom labels for tool recognition | 50+ custom labels (hammer, saw, multimeter, etc.) |
| **Amazon Polly** | Voice notifications | Neural TTS in 8 languages | Aditi, Kajal, etc. for Indian accents |
| **Amazon Transcribe** | Speech-to-text fallback | Custom vocabulary for technical terms | Medical/Bhojpuri custom vocabulary |
| **Amazon Comprehend** | Feedback sentiment | Custom entity recognition | Sentiment analysis, entity extraction |
| **Amazon Textract** | Legacy document digitization | OCR + forms | Extract from existing paper records |

### 4.4 Data & Memory Layer

### Amazon S3 Buckets

| Bucket | Purpose | Lifecycle Policy | Encryption |
| :--- | :--- | :--- | :--- |
| **shramai-voice-recordings** | Raw voice interview logs | 90 days → Glacier | AES-256 |
| **shramai-video-demos** | Worker demonstration videos | 30 days | AES-256 |
| **shramai-landmark-photos** | Job location images | 7 days | AES-256 |
| **shramai-credentials** | Credential JSON backups | 7 years | AES-256 + KMS |
| **shramai-audit-logs** | Compliance logs | 7 years | AES-256 + KMS |
| **shramai-ml-training** | Training data for models | Indefinite | AES-256 |

### Amazon RDS (PostgreSQL)

* **Tables:** Employers, Transactions, Analytics Warehouse, Reporting
* **Read replicas:** 2 for analytics queries
* **Backup:** Automated daily snapshots, 35-day retention
* **Encryption:** KMS encrypted

### 4.5 Blockchain & Trust Layer

**Amazon Managed Blockchain (Hyperledger Fabric)**

**Network Configuration:**
* **Edition:** Hyperledger Fabric 2.2
* **Nodes:** 3 Peer nodes across Availability Zones
* **Orderer:** 1 Raft orderer
* **CA:** Amazon Managed Blockchain CA
* **VPC:** Isolated with VPC endpoints
* **Throughput:** 1000+ transactions per second

### 4.6 India DPI Integration Layer

#### DigiLocker Integration
#### DIKSHA Integration
#### e-Shram Integration
#### Bhashini Integration
#### ONDC Beckn Protocol

### 4.7 Analytics & Monitoring Layer

#### Amazon CloudWatch

| Dashboard | Metrics | Alarms |
| :--- | :--- | :--- |
| **Worker Operations** | Validations/min, Applications/min | >5% error rate |
| **Agent Performance** | Response time, Success rate | >3s latency |
| **Blockchain** | Transaction rate, Success rate | >2% failure |
| **Cost Tracking** | Cost per worker, API calls | >₹20/worker |

### 4.8 DevOps & Infrastructure Layer

#### Infrastructure as Code (AWS CDK) CI/CD Pipeline

| Stage | Technology | Actions |
| :--- | :--- | :--- |
| **Source** | AWS CodeCommit / GitHub | Code push triggers pipeline |
| **Build** | AWS CodeBuild | `npm install`, `pip install`, run tests |
| **Test** | AWS CodeBuild | Unit tests, integration tests |
| **Deploy** | AWS CodeDeploy | Lambda, Step Functions, API Gateway |
| **Promote** | Manual approval | Production deployment |

### 5. Data Flow Scenarios

#### Scenario 1: Worker Skill Validation

**Standard Data Flow:**
Worker ──(WhatsApp)──> Lex ──> Bhashini ASR ──> Bedrock ──> Skill Agent
  │                                                          │
  │                                                          ▼
  └─────────────────────────────────────────────────> DynamoDB (WorkerState)
                                                             │
                                                             ▼
                                                       Blockchain (Soulbound Token)
                                                             │
                                                             ▼
                                                       DigiLocker API
                                                             │
                                                             ▼
                                                  WhatsApp: "Credential issued!"

#### Scenario 2: Job Matching & Negotiation

**Standard Data Flow:**
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║              JOB MATCHING & NEGOTIATION — IN BRIEF                        ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║                                                                           ║
║    ┌─────────────┐                                                        ║
║    │  EMPLOYER   │                                                        ║
║    │  Posts Job  │                                                        ║
║    │  at ₹600    │                                                        ║
║    └──────┬──────┘                                                        ║
║           │                                                               ║
║           ▼                                                               ║
║    ┌─────────────────────────────────────────────────────────────────┐   ║
║    │                    SHRAM-AI SYSTEM                               │   ║
║    │                                                                   │   ║
║    │   1. Job Ingested → Stored in DynamoDB                          │   ║
║    │   2. Personalize finds best matching workers                    │   ║
║    │   3. Auto-applies for workers with permission                   │   ║
║    │   4. Employer reviews & offers ₹620                             │   ║
║    │   5. AI negotiates → counters at ₹640                           │   ║
║    │   6. Employer accepts                                            │   ║
║    │   7. Worker wakes up to confirmed job                           │   ║
║    │                                                                   │   ║
║    └─────────────────────────────────────────────────────────────────┘   ║
║           │                                                               ║
║           ▼                                                               ║
║    ┌─────────────┐                                                        ║
║    │   WORKER    │                                                        ║
║    │  Gets Job   │                                                        ║
║    │  at ₹640    │                                                        ║
║    └─────────────┘                                                        ║
║                                                                           ║
║    ───────────────────────────────────────────────────────────────────   ║
║                                                                           ║
║    ✦ RESULT: Worker earns ₹40/day more without any effort               ║
║    ✦ TECH: Personalize · Bedrock · EventBridge · Lambda                  ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

#### Scenario 3: Wage Exploitation Detection

**Standard Data Flow:**
Worker Reports Wage ──> DynamoDB ──> Wage Guardian Agent
                                         │
                                         ▼
                              Compare with Forecast prediction
                                         │
                                         ▼
                              If gap > 20% and pattern
                                         │
                                         ▼
                              Create Alert in DynamoDB
                                         │
                                         ▼
                              EventBridge triggers
                                         │
                                         ▼
                         ┌────────────────┴────────────────┐
                         │                                 │
                         ▼                                 ▼
              WhatsApp to Worker                 Update Employer Risk
          "You're being underpaid"                 Score in DynamoDB

#### Scenario 4: Proactive Upskilling
EventBridge (Weekly) ──> Orchestrator Agent
                              │
                              ▼
                    Check worker skill gaps
                              │
                              ▼
                    Identify high-ROI skill
                              │
                              ▼
                    Query DIKSHA for courses
                              │
                              ▼
                    Send WhatsApp with ROI
                              │
                              ▼
                    Auto-enroll if accepted
                              │
                              ▼
                    Daily micro-lessons via WhatsApp

### 6. API Specifications

#### 6.1 Worker APIs

| Endpoint | Method | Purpose | Auth |
| :--- | :--- | :--- | :--- |
| `/worker/register` | POST | Register new worker | None (OTP) |
| `/worker/profile` | GET | Get worker profile | JWT |
| `/worker/skills` | POST | Add/update skill | JWT |
| `/worker/wage` | POST | Report wage | JWT |
| `/worker/jobs` | GET | Get matched jobs | JWT |
| `/worker/apply` | POST | Apply for job | JWT |
| `/worker/consent` | POST | Update consent | JWT |

#### 6.2 Employer APIs

| Endpoint | Method | Purpose | Auth |
| :--- | :--- | :--- | :--- |
| `/employer/register` | POST | Register employer | Business verification |
| `/employer/job` | POST | Post job | JWT |
| `/employer/search` | GET | Search workers | JWT |
| `/employer/hire` | POST | Hire worker | JWT |
| `/employer/rate` | POST | Rate worker | JWT |

#### 6.3 Verification APIs

| Endpoint | Method | Purpose | Auth |
| :--- | :--- | :--- | :--- |
| `/verify/credential` | POST | Verify blockchain credential | API Key |
| `/verify/worker` | GET | Get worker verification status | API Key |

---

### 7. Security Architecture

#### 7.1 Data Protection

| Layer | Protection |
| :--- | :--- |
| **In Transit** | TLS 1.3 for all external communication |
| **At Rest** | AES-256 encryption for all data stores |
| **Application** | Input validation, SQL injection prevention |
| **API** | Rate limiting, JWT validation, API keys |

#### 7.2 Identity & Access Control
* **Worker:** OTP-based authentication via WhatsApp
* **Employer:** Cognito user pools with MFA
* **Admin:** Cognito + hardware MFA
* **Service-to-Service:** IAM roles with least privilege

#### 7.3 Blockchain Security
* **Private Network:** Only authorized peers can transact
* **Certificate Authority:** Managed Blockchain CA
* **Data Privacy:** Only hashes stored on chain, not personal data

#### 7.4 Compliance
* **Data Protection:** Digital Personal Data Protection Act 2023
* **Audit Trail:** All access logged in CloudTrail
* **Consent Management:** Granular consent stored in DynamoDB

---

### 8. Scalability & Performance

#### 8.1 Scaling Targets

| Metric | Target |
| :--- | :--- |
| **Workers** | 10M within 2 years |
| **Concurrent voice sessions** | 100,000 |
| **Transactions per second** | 5,000 |
| **Storage** | 500 TB |

#### 8.2 Auto-Scaling Configuration

| Service | Scaling Policy |
| :--- | :--- |
| **Lambda** | Concurrent executions per account limit increase |
| **DynamoDB** | On-demand capacity |
| **API Gateway** | Throttling at 10,000 requests per second |
| **Step Functions** | State transition limit: 100,000 per second |

#### 8.3 Performance Benchmarks

| Operation | Target Latency |
| :--- | :--- |
| **Voice interview start** | < 3 seconds |
| **Credential issuance** | < 5 seconds |
| **Job search** | < 2 seconds |
| **WhatsApp response** | < 1 second |

### 9. Glossary

| Term | Definition |
| :--- | :--- |
| **Soulbound Token** | Non-transferable blockchain credential representing verified skill |
| **Wage Intelligence** | AI-powered prediction of fair market wage for specific skill+location |
| **Landmark-Based Alert** | Job notification with photo of meeting point instead of map pin |
| **Agentic AI** | AI that proactively acts on behalf of worker, not just responds |
| **DPI** | Digital Public Infrastructure (DigiLocker, Bhashini, etc.) |
| **ROI-Based Upskilling** | Recommendations showing exact wage increase for each skill |
| **Orchestrator Agent** | Master agent that coordinates all specialist agents |
| **Worker State Machine** | Persistent memory of worker's journey stored in DynamoDB |
| **Skill Hash** | Cryptographic hash of skill credential stored on blockchain |
| **Consent Management** | System for worker to control data sharing preferences |
