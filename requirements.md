# SHRAM-AI: Requirements Specification

## 1. Introduction

### 1.1 Purpose
SHRAM-AI is an AI-powered career companion for India's 49 crore informal workers. It converts years of on-job experience into verifiable digital credentials, helps workers understand their true market value, connects them to better-paying work, and provides personalised upskilling recommendations - all through a simple voice conversation on WhatsApp.

### 1.2 Problem We Solve
India has 49 crore informal workers — carpenters, masons, electricians, ASHA workers, and more. They possess decades of skill but zero formal proof. A master with 12 years experience earns ₹450/day while a fresh certificate holder earns ₹700/day. Same work. Double the paper. Double the pay.

This isn't a skill gap. It's a proof gap — and a ₹20 lakh crore annual economic inefficiency. 31 crore workers are already registered on e-Shram, waiting for validation.

### 1.3 Our Solution
SHRAM-AI gives every worker an AI advocate that:
- Validates their skill through a voice conversation in their mother tongue
- Issues a blockchain-backed, tamper-proof credential in DigiLocker
- Shows them their true market value and exactly how much they're losing
- Finds and applies for jobs while they sleep
- Recommends the one skill upgrade that adds most to their daily wage
- Protects them from exploitation through contracts and blacklists

All on WhatsApp. No app. No literacy barrier. Built for Bharat.

---

## 2. User Personas

### 2.1 Primary User: Ramesh (The Worker)
- **Age:** 42
- **Occupation:** Carpenter, 12 years experience
- **Location:** Rural Bihar
- **Literacy:** Can sign name, reads basic numbers
- **Phone:** Basic smartphone, uses WhatsApp daily
- **Current wage:** ₹450/day
- **Pain points:** No proof of skill, exploited by contractors, doesn't know fair wage, walks gate-to-gate looking for work
- **Aspirations:** Earn enough to send daughter to college, get respect, never be underpaid again

### 2.2 Secondary User: Priya (The Employer)
- **Role:** Small contractor, hires for construction projects
- **Location:** Small town in UP
- **Pain points:** Cannot find verified workers, unsure who to trust, past experiences with unskilled workers claiming expertise
- **Needs:** Reliable, verified workers; simple hiring process; fair pricing

### 2.3 Tertiary User: Anita (Government Official)
- **Role:** District Labour Office, oversees e-Shram implementation
- **Pain points:** Self-declared data is unreliable, cannot verify worker skills, no way to measure impact of skilling programs
- **Needs:** Verified workforce data, analytics on employment and wages, measurable outcomes

---

## 3. Functional Requirements

### 3.1 Worker-Facing Features

#### Category 1: Skill Validation (7 Features)

**FR-1.1: Voice Interview**
- Worker initiates via WhatsApp (sends "Hi" or gives missed call)
- System conducts spoken interview in worker's native language (Bhojpuri, Tamil, Bengali, etc.)
- AI asks adaptive follow-up questions based on responses
- Captures technical knowledge, safety practices, problem-solving ability
- Supports 22 languages via Bhashini integration
- No literacy required — pure conversation

**FR-1.2: Competency Scoring**
- AI evaluates depth of knowledge (Beginner/Intermediate/Master)
- Compares responses against industry skill taxonomies
- Identifies specific strengths (e.g., "motor rewinding expert")
- Confidence score attached to each validation

**FR-1.3: Video Demonstration (Optional)**
- Worker can upload 30-second video performing a task
- Amazon Rekognition analyzes tool handling, technique
- Boosts confidence score if visual matches verbal

**FR-1.4: Peer Endorsement**
- Verified workers can endorse colleagues
- Endorsements weighted by endorser's own verification level
- Builds trust network within communities

**FR-1.5: Blockchain Credential Issuance**
- Every validated skill becomes a Soulbound Token (non-transferable)
- Stored on Amazon Managed Blockchain
- Cannot be sold, transferred, or forged
- Publicly verifiable via QR code

**FR-1.6: DigiLocker Auto-Push**
- Credential automatically appears in worker's DigiLocker
- Government-recognized, official storage
- Worker can access anytime, even without SHRAM-AI

**FR-1.7: Skill Portfolio Dashboard**
- Worker sees all verified skills in one place
- Visual representation of skill levels (badges, stars)
- Shareable "Skill Card" for WhatsApp

---

#### Category 2: Wage Intelligence (6 Features)

**FR-2.1: Market Wage Prediction**
- AI predicts fair daily wage for (skill + district + experience)
- Trained on NCS, Labour Bureau, and crowdsourced data
- Updated monthly with market trends

**FR-2.2: Personal Wage Dashboard**
- Worker sees:
  - "Your verified skill is worth: ₹650/day"
  - "You currently earn: ₹450/day"
  - "You are losing: ₹200/day"

**FR-2.3: Wage Theft Detection**
- AI flags if worker reports consistently below market rate
- Compares with employer's history and ratings
- Sends alert: "This employer pays below market. Be cautious."

**FR-2.4: Employer Rating System**
- Workers rate employers after each job
- Patterns of late payment, underpayment flagged
- Other workers warned before applying

**FR-2.5: Wage Negotiation Assistant**
- When employer offers lower, AI suggests counter-offers
- "Market rate is ₹650. Shall I ask for ₹630 as compromise?"
- Tracks negotiation success rate

**FR-2.6: Income Projection**
- Shows potential earnings with upskilling
- "If you learn solar installation: +₹250/day → ₹900/day by December"

---

#### Category 3: Job Access (7 Features)

**FR-3.1: Landmark-Based Job Alerts**
- No maps. Just landmarks: "Near the big banyan tree in Sonpur"
- PHOTO of meeting point included
- Voice note with directions in local language
- "Press 1 if you know this place"

**FR-3.2: Autonomous Job Application**
- Worker sets preferences once (max distance, min wage, work type)
- AI monitors new jobs 24/7
- Auto-applies to high-fit opportunities
- "I applied for a 5-day carpentry job at ₹700/day while you slept."

**FR-3.3: Employer Search (for Employers)**
- Natural language search: "Find me plumbers within 10km"
- Filters by skill level, experience, endorsements
- See worker's verified credentials before contacting

**FR-3.4: Smart Job Matching**
- AI ranks jobs by fit score (skill + location + preferences)
- Learns from worker's past applications
- Becomes more accurate over time

**FR-3.5: Group Booking**
- Employers can request multiple workers for large projects
- AI suggests teams of verified workers who have worked together
- Coordinated travel and accommodation support

**FR-3.6: Work History Tracker**
- Automatic log of all jobs done through platform
- Serves as "work experience proof" for future employers
- Can be shared as PDF or WhatsApp card

**FR-3.7: Emergency Work Alerts**
- Urgent needs (flood relief, harvest season) broadcast to nearby workers
- Higher wages for emergency work
- One-click availability update

---

#### Category 4: Career Growth (6 Features)

**FR-4.1: ROI-Based Upskilling**
- AI identifies skill gaps from validation sessions
- Recommends highest-ROI skill: "Learn solar installation → +₹250/day"
- "Learn geyser repair → +₹150/day | 3-day course available"

**FR-4.2: Micro-Learning via WhatsApp**
- Daily 2-minute voice lessons in local language
- Interactive quizzes after each lesson
- Progress tracked and rewarded

**FR-4.3: DIKSHA Course Integration**
- Auto-enrollment in relevant government courses
- Progress synced with SHRAM-AI
- Certificates from both platforms

**FR-4.4: Micro-Credential Issuance**
- Each completed module earns a micro-badge
- Stackable toward higher credentials
- Also stored on blockchain + DigiLocker

**FR-4.5: Career Path Visualization**
- Shows possible career trajectories
- "Carpenter → Master Carpenter → Site Supervisor → Contractor"
- Income projection at each stage

**FR-4.6: Peer Learning Groups**
- Connects workers learning same skill
- Group voice calls for doubt-clearing
- Experienced workers can mentor

---

#### Category 5: Worker Rights (5 Features)

**FR-5.1: Digital Contract Creation**
- AI generates simple work contract in local language
- Includes wage, duration, scope, payment date
- Both parties acknowledge via WhatsApp

**FR-5.2: Payment Tracking & Escrow**
- Employers can deposit wages in escrow before work starts
- Auto-release upon job completion confirmation
- Payment reminders and tracking

**FR-5.3: Dispute Resolution Assistant**
- AI mediates between worker and employer
- Suggests fair resolutions based on contract and history
- Escalates to human mediator if needed

**FR-5.4: Government Scheme Alerts**
- Notifies workers about relevant schemes (PM-KUSUM, etc.)
- Helps with application process
- "You qualify for solar pump subsidy. Apply now?"

**FR-5.5: Emergency Assistance**
- One-tap SOS to nearby trusted workers
- Connects to legal aid if needed
- Workplace injury reporting

---

### 3.2 Platform-Wide Requirements

**FR-PLATFORM-1: WhatsApp Integration**
- All features accessible via WhatsApp
- Two-way conversation support
- Rich media (images, voice notes, documents)
- Quick reply buttons for simple interactions

**FR-PLATFORM-2: Missed Call Support**
- Workers can initiate by giving missed call
- System calls back to conduct voice interview
- Zero data cost for workers

**FR-PLATFORM-3: Multi-Language Support**
- All interactions in worker's chosen language
- 22 languages supported via Bhashini
- Voice and text both available

**FR-PLATFORM-4: Consent Management**
- Worker controls what data is shared
- Explicit consent required for employer access
- Consent revocable at any time

**FR-PLATFORM-5: Offline Capability**
- Alerts delivered when worker comes online
- Voice interviews can be conducted asynchronously
- No real-time dependency for basic functions

---

## 4. Non-Functional Requirements

### 4.1 Usability

**NFR-1: Literacy-Independent Design**
- All features must be usable by semi-literate and illiterate users
- Voice-first, minimal text, clear audio prompts
- Icons and buttons must be large and unambiguous

**NFR-2: Rural Network Conditions**
- Works on 2G networks
- Optimized for low bandwidth
- Graceful degradation when connectivity is poor

**NFR-3: Language Coverage**
- Minimum 8 languages at launch (Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Punjabi, Bhojpuri)
- Expandable to 22 within 6 months
- All system messages localized

### 4.2 Performance

**NFR-4: Response Time**
- Voice interview session initiation < 3 seconds
- WhatsApp message response < 2 seconds
- Blockchain transaction finality < 5 seconds

**NFR-5: Concurrency**
- Support 10,000 concurrent voice sessions in pilot phase
- Designed for horizontal scaling to 1 million+ users
- Auto-scaling based on demand

**NFR-6: Throughput**
- Process 1000 validations per hour minimum
- Handle 10,000 job applications per day
- Support 50,000 WhatsApp conversations daily

### 4.3 Reliability

**NFR-7: Uptime**
- 99.5% availability for core services
- 99% availability for analytics and reporting
- Planned maintenance windows communicated 7 days in advance

**NFR-8: Data Durability**
- No data loss tolerance for worker credentials
- 99.999999999% durability for stored data
- Daily backups with point-in-time recovery

**NFR-9: Disaster Recovery**
- Multi-AZ deployment within region
- Cross-region DR for critical data
- RPO: 15 minutes, RTO: 4 hours

### 4.4 Security

**NFR-10: Data Encryption**
- All data encrypted at rest (AES-256)
- All data encrypted in transit (TLS 1.3)
- Voice recordings encrypted with worker-specific keys

**NFR-11: Access Control**
- Role-based access control for all systems
- Principle of least privilege enforced
- Multi-factor authentication for admin access

**NFR-12: Privacy by Design**
- Personal data never stored on blockchain — only hashes
- Worker identity pseudonymized in analytics
- Data minimization enforced

**NFR-13: Compliance**
- Compliance with Digital Personal Data Protection Act 2023
- Adherence to MeitY guidelines for AI systems
- Regular security audits and penetration testing

### 4.5 Scalability

**NFR-14: Horizontal Scaling**
- All services designed to scale horizontally
- Stateless architecture where possible
- Auto-scaling groups for all compute

**NFR-15: Cost Per User**
- Target < ₹20 per worker per year at 10M scale
- Optimized for low-cost delivery to rural users
- Serverless-first approach to minimize fixed costs

### 4.6 Interoperability

**NFR-16: API-First Design**
- All functionality exposed via REST APIs
- OpenAPI specification for all endpoints
- Webhook support for real-time events

**NFR-17: Government Integration**
- DigiLocker API integration for credential storage
- Bhashini API for language services
- DIKSHA API for course content
- e-Shram API for worker data (with consent)
- ONDC Beckn protocol readiness

---

## 5. Constraints

### 5.1 Technical Constraints
- **C-1:** Must run on AWS cloud infrastructure
- **C-2:** Must use serverless architecture where feasible
- **C-3:** Must support feature phones via WhatsApp
- **C-4:** Must integrate with Bhashini for language support

### 5.2 Business Constraints
- **C-5:** Free for workers (CSR/government funded)
- **C-6:** Revenue from employers and government contracts
- **C-7:** Must demonstrate pilot within 3 months

### 5.3 Regulatory Constraints
- **C-8:** Must comply with Indian data protection laws
- **C-9:** Must maintain audit trails for government reporting
- **C-10:** Worker consent mandatory for all data sharing

---

## 6. Assumptions

- **A-1:** Workers have access to basic mobile phones with WhatsApp
- **A-2:** Bhashini APIs will be available and stable
- **A-3:** Government will provide access to NCS wage data
- **A-4:** Employers are willing to pay for verified talent
- **A-5:** Workers will share wage data for collective intelligence

---

## 7. Glossary

| Term | Definition |
|------|------------|
| Soulbound Token | Non-transferable blockchain credential representing verified skill |
| Wage Intelligence | AI-powered prediction of fair market wage for specific skill+location |
| Landmark-Based Alert | Job notification with photo of meeting point instead of map pin |
| Agentic AI | AI that proactively acts on behalf of worker, not just responds |
| DPI | Digital Public Infrastructure (DigiLocker, Bhashini, etc.) |
| ROI-Based Upskilling | Recommendations showing exact wage increase for each skill |

---
