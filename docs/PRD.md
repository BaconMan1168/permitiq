# 🧾 Product Requirements Document (PRD v2 – Unified)

## Product Name (Working Title)
**PermitIQ — The Fastest Path to Legally Opening a Business**

---

## 1️⃣ Product Vision
To become the operating system for business compliance, starting with business permit discovery and workflow automation.  
We simplify regulatory complexity into a structured, guided, trackable process tailored to each specific business.  

**Long-term vision:**  
From “permit wizard” → full compliance infrastructure for SMBs.

---

## 2️⃣ Problem Statement
Small and medium-sized businesses struggle with:  

- Fragmented government websites  
- Unclear permit requirements  
- Incorrect application sequence  
- Hidden costs  
- Rejected submissions due to ordering mistakes  
- No central tracking system  

Consultants solve this but are expensive.  
There is no intelligent, personalized, workflow-based system for permit navigation.

---

## 3️⃣ Target Users

**Primary Persona**  
- Aspiring entrepreneur (Age 22–45)  
- Opening F&B, tuition center, retail, salon, clinic  
- First-time business owner  
- Overwhelmed by regulatory process  

**Secondary Persona**  
- Accounting firms  
- Corporate secretarial companies  
- Co-working operators

---

## 4️⃣ MVP Scope (Phase 1 – Singapore Focused)
**Start with:**  
- Singapore only  
- 5 verticals:
  - Restaurant / Café
  - Retail shop
  - Tuition center
  - Beauty salon
  - Home-based food business  

**Core deliverables:**  
- Business setup wizard  
- Permit stack generator  
- Sequence engine  
- Dashboard tracking  
- Basic renewal reminders  
- Admin panel

---

## 5️⃣ Core Product Features

### 5.1 Business Setup Wizard
**Input Flow**  
1. Select Business Type  
2. Select Location (Country → City → Zone if needed)  
3. Conditional Questions (examples):
   - Will you sell alcohol?  
   - Will food be prepared onsite?  
   - Number of employees?  
   - Physical storefront?  
   - Handling imports?  

**Output**  
- Required permits  
- Optional permits  
- Sequence order  
- Estimated total cost  
- Estimated timeline  
- Required inspections  

---

### 5.2 Permit Stack Generator
For each permit:  
- Name  
- Issuing Authority  
- Description  
- Why required  
- Cost  
- Processing time  
- Required documents  
- Dependency requirements  
- Application URL  
- Renewal frequency  
- Legal reference (where applicable)  
- Last verified date  

---

### 5.3 Smart Sequence Engine
**Must support:**  
- Dependency graph  
- Order constraints  
- Blocking conditions  

**Example:**  
- Company registration → required before food license  
- Fire inspection → required before opening  

**System must generate:**  
- Ordered checklist  
- Timeline projection  
- Critical path estimation  

**Engine logic:**  
1. Fetch all applicable permits  
2. Build dependency graph  
3. Topologically sort  
4. Return ordered workflow (deterministic and auditable)

---

### 5.4 Dashboard
**User can:**  
- Mark permits as:
  - Not started  
  - In progress  
  - Submitted  
  - Approved  
- Upload supporting documents  
- Store submission dates  
- View cost summary  
- Track renewal deadlines  
- Receive reminders and regulatory change alerts  
- Manage multiple businesses

---

### 5.5 Renewal Tracking (MVP+)
- Store permit expiration dates  
- Send email reminders  
- Dashboard notifications  
- Renewal workflow guidance

---

## 6️⃣ Regulatory Data Strategy
This is core infrastructure.

### 6.1 Sources of Regulatory Information
**Primary sources:**  
- Official government websites  
- Licensing portals  
- Public regulations  
- Fee schedules  
- Agency handbooks  
- Legal references  

**Secondary sources:**  
- Corporate secretarial firms  
- Accounting firm documentation  
- Industry associations  

> We do not rely on unverified user-generated sources.

---

### 6.2 Information Collected Per Permit
- Official name  
- Issuing authority  
- Jurisdiction  
- Required business types  
- Conditional triggers  
- Required documents  
- Processing time  
- Fee structure  
- Application URL  
- Dependency requirements  
- Renewal frequency  
- Legal reference  
- Last verified date

---

### 6.3 Data Storage Model
Structured tables:  
- Authorities  
- Jurisdictions  
- Permits  
- PermitConditions  
- Dependencies  
- FeeSchedules  
- RenewalRules  
- RegulatoryUpdateLogs  

> Conditions stored as structured JSON logic.

---

### 6.4 Update & Monitoring Strategy
**MVP**  
- Quarterly manual regulatory review  
- Admin dashboard for updates  
- Display “Last verified on” for each permit  

**Medium-Term**  
- Automated webpage diff monitoring  
- RSS feed monitoring  
- Update alerts for cost/text changes  

**Long-Term**  
- Agency partnerships  
- API integrations where available

---

### 6.5 Outdated Information Risk Mitigation
- Display last verification timestamp  
- Legal disclaimer  
- Version history  
- User discrepancy reporting  
- Immediate update pipeline  
- Alert affected users upon critical change  

> Regulatory accuracy is a core operational risk and must be actively managed.

---

## 7️⃣ Functional Requirements
**FR1 — Authentication**  
- Email/password login  
- OAuth (Google)  
- JWT-based session management  
- Supabase Auth recommended for MVP  

**FR2 — Business Profile Storage**  
- Multiple businesses per user  
- Business version editing  
- Save progress  
- Snapshot history  

**FR3 — Dynamic Rules Processing**  
- Evaluate structured JSON conditions  
- Build dependency graph  
- Topological sorting  
- Return ordered permit stack  

**FR4 — Admin Dashboard (Internal CMS)**  
- Add/edit permits  
- Modify costs  
- Update dependencies  
- Track regulatory update logs  
- Version control for rules  

**FR5 — Payment & Feature Gating**  
- Stripe integration  
- Subscription + one-time payment support  
- Webhook-based payment confirmation  
- Feature access control based on payment status  

---

## 8️⃣ Non-Functional Requirements
- Response time < 500ms  
- 99.5% uptime  
- Secure authentication  
- Encrypted data at rest  
- Scalable to 100k+ users  
- Modular country expansion  
- Full HTTPS enforcement  
- Audit logging for regulatory updates  

---

## 9️⃣ System Architecture
**Tech Stack**

**Frontend:**  
- React (Next.js preferred)  
- Tailwind CSS  
- Zustand or Redux  
- React Query  

**Backend:**  
- Express.js  
- REST API  
- Prisma ORM (must use v.7+)

**Database:**  
- PostgreSQL (Supabase managed)  

**Payments:**  
- Stripe  

**Storage:**  
- Supabase Storage (MVP)  
- S3 (future AWS migration)  

---

## 🔟 Hosting Options

**Option A — Vercel + Supabase (Recommended MVP)**  
- Frontend → Vercel  
- Backend → Vercel serverless or Railway  
- Database → Supabase Postgres  
- Auth → Supabase Auth  
- Storage → Supabase Storage  

**Pros:**  
- Fast setup  
- Minimal DevOps  
- Low cost  
- Auto scaling  

**Limitations:**  
- Cold starts  
- Limited background job control  
- Less infrastructure flexibility  

**Best for:**  
- MVP / Early traction (<50k users)

**Option B — AWS Infrastructure**  
- Backend → EC2 / ECS  
- Database → RDS Postgres  
- Storage → S3  
- CDN → CloudFront  

**Pros:**  
- Full control  
- Better for heavy background jobs  
- Enterprise scalability  

**Cons:**  
- DevOps overhead  
- Higher complexity  

**Recommendation:**  
- Start with Vercel + Supabase, migrate to AWS if scaling demands it.

---

## 1️⃣1️⃣ Data Model (High Level)

**Users**  
- id  
- email  
- password_hash  
- createdAt  

**Businesses**  
- id  
- userId  
- name  
- type  
- location  
- metadata (JSON)  

**Permits**  
- id  
- name  
- authorityId  
- jurisdictionId  
- cost  
- processingTime  
- renewalFrequency  
- description  
- lastVerifiedAt 

**PermitRules**  
- id  
- businessType  
- conditionJson 
- permitId  
- dependencyId (nullable)  

**BusinessPermits**  
- id  
- businessId  
- permitId  
- status  
- submissionDate  
- approvalDate  
- expirationDate  

**RegulatoryUpdateLogs**  
- id  
- permitId 
- changeSummary 
- updatedAt

---

## 1️⃣2️⃣ Pricing & Monetization Strategy

**Recommended Model: Freemium**  

**Free Tier:**  
- Permit checklist  
- Basic sequencing  
- Public info view  

**Paid Tier:**  
- Dashboard tracking  
- Cost calculator  
- Timeline forecasting  
- Document uploads  
- Renewal reminders  
- Change alerts  

**Suggested pricing:**  
- $29–$79 one-time per business  
- OR $15/month subscription  

**Alternative Models:**  
- One-Time Payment → Simplicity, but no recurring revenue  
- Subscription → Recurring revenue, harder sell for short-term founders  
- B2B Licensing → High contract value, longer sales cycle  

**Payment Infrastructure:**  
- Stripe integration  
- Webhooks in Express backend  
- Role-based access control  
- Invoice generation / Automated receipts  

---

## 1️⃣3️⃣ Metrics to Track
**Activation:**  
- % completing wizard  
- % creating dashboard  

**Engagement:**  
- Permit completion rate  
- Renewal reminder engagement  

**Revenue:**  
- Conversion rate  
- CAC  
- LTV  
- MRR  

**Retention:**  
- Monthly active users  
- Renewal return rate  

---

## 1️⃣4️⃣ Technical Expansion Roadmap
**Phase 2 — Automation Layer:**  
- Auto-fill forms  
- Background job processing  
- Government API integrations  

**Phase 3 — ML Enhancements:**  
- Regulation change detection  
- Approval time prediction  
- Risk scoring  
- NLP-based permit classification  
- AI assistant layer  

**Phase 4 — Compliance OS:**  
- Tax reminders  
- Payroll compliance  
- Industry monitoring  
- International scaling  

> ML is additive, not foundational.

---

## 1️⃣5️⃣ Roadmap
**Phase 1 (3–4 months):**  
- Singapore  
- 5 verticals  
- Dashboard  
- Stripe payments  
- Manual regulatory updates  

**Phase 2:**  
- Add Philippines  
- Add 10 verticals  
- Renewal tracking automation  

**Phase 3:**  
- API integrations  
- ML features  
- Enterprise B2B version  

---

