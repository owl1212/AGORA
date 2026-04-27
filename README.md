# Agora Microfinance Zambia (AMZ) 
### Financial Inclusion & Compliance Platform

Welcome to the AMZ Compliance & Financial Inclusion Platform repository. This robust web application is custom-built to streamline anti-money laundering (AML) protocols, risk management, and holistic customer profiling within the Zambian financial ecosystem (ZICE framework).

---

## 🌟 Overview

The AMZ Platform serves as a central hub for compliance officers, risk analysts, and administrators. It unites real-time transaction monitoring, AI-driven risk scoring, and structured regulatory reporting under a single, highly intuitive interface.

By leveraging modern web technologies, the platform transforms raw data into actionable intelligence—ensuring that Agora Microfinance Zambia operates safely, securely, and in full compliance with local and international regulatory standards.

---

## 🧩 Core Modules

### 1. **Authentication & Access**
- A secure, responsive login portal tailored for authorized personnel.
- Features a dynamic, immersive slideshow background and a clean interface.

### 2. **Executive Dashboard**
- High-level overview of institutional health, active alerts, and geographical risk overlays.
- Real-time pulse on portfolio performance and compliance bottlenecks.

### 3. **Alerts Queue**
- Intelligent triage of anomalous behaviors (e.g., structuring, rapid cross-border velocity).
- Workflow tools to escalate, dismiss, or assign alerts to specific compliance officers.

### 4. **Case Management**
- Deep-dive investigation environment for suspicious activities.
- Links directly to transaction logs, customer profiles, and evidence repositories.

### 5. **Customer 360 & Village Banking**
- **Individual Profiles**: KYC status, risk scoring, and holistic activity timelines.
- **Group Collateral Metrics**: Specialized tools for Village Banking models, evaluating "Group Health", Peer Trust Factors, and Joint Liability risks.

### 6. **Risk Assessment**
- Interactive heatmaps and risk distribution analytics.
- Real-time stress testing based on geopolitical, industrial, and individual risk weights.

### 7. **Watchlist Screening**
- Continuous matching against global and local lists (OFAC, UN, EU).
- Fuzzy matching to identify PEPs (Politically Exposed Persons) and sanctioned entities.

### 8. **STR Reports (Regulatory Submissions)**
- End-to-end management of Suspicious Transaction Reports.
- Formats and prepares encrypted packages for immediate dispatch to the Financial Intelligence Centre (FIC), BOZ, and ZRA.

### 9. **Transaction Forensics**
- Granular ledger views with advanced filtering.
- Visual link-analysis to uncover complex money laundering typologies.

### 10. **Administration & Audit**
- Role-based access control (RBAC) for managing personnel permissions.
- Immutable system audit trails tracking all configuration changes, data exports, and profile rescores.

---

## 🛠️ Technology Stack

This application is built with a modern, scalable, and highly performant stack:

- **Core Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (built on Radix Primitives)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Iconography**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine. 

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd "Mr Sam/Code"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

- `app/`: Next.js App Router containing all page routes (`login`, `(dashboard)/*`).
- `components/`: Reusable UI components (including `shadcn/ui` components in `components/ui`).
- `public/`: Static assets (images, logos, fonts).
- `lib/`: Utility functions and standardized helpers.
- `types/`: Global TypeScript definitions.

---

## 🛡️ License & Confidentiality

**Proprietary & Confidential.**  
This software is the intellectual property of Agora Microfinance Zambia. Unauthorized copying, distribution, or use of this source code is strictly prohibited.
