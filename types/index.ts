export interface Customer {
  id: string;
  nrc: string; // National Registration Card (Primary ID in Zambia)
  fullName: string;
  type: "Individual" | "Corporate";
  riskScore: "Low" | "Medium" | "High";
  status: "Active" | "Suspended" | "Pending";
  onboardedAt: string;
}

export interface RiskAssessment {
  score: number;
  level: "Low" | "Medium" | "High";
  factors: {
    identityRisk: number;
    transactionRisk: number;
    geographicRisk: number;
    pepSanctionRisk: number;
  };
  rulesTriggered: string[];
  lastUpdated: string;
}

export interface Alert {
  id: string;
  customerId: string;
  customerName: string;
  type: "Transaction" | "Screening" | "Behavioral";
  severity: "Low" | "Medium" | "High";
  status: "New" | "In Progress" | "Resolved" | "Escalated";
  description: string;
  amountZMW?: number;
  createdAt: string;
}

export interface Case {
  id: string;
  title: string;
  assignedTo: string | null;
  status: "Open" | "Review" | "Closed" | "Reported";
  priority: "Normal" | "High" | "Urgent";
  alerts: string[]; // Alert IDs
  customerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface STRReport {
  id: string;
  caseId: string;
  status: "Draft" | "Submitted" | "Accepted" | "Rejected" | "Pending FIC"; // Financial Intelligence Centre
  submittedAt?: string;
  referenceNo?: string;
}

export interface DashboardMetrics {
  activeAlerts: number;
  highRiskCustomers: number;
  pendingCases: number;
  strSubmitted30d: number;
  alertsTrend: {
    date: string;
    low: number;
    medium: number;
    high: number;
  }[];
  strPipeline: {
    status: string;
    count: number;
  }[];
}
