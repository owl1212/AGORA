import { DashboardMetrics, Alert, Case } from "@/types";

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  activeAlerts: 142,
  highRiskCustomers: 38,
  pendingCases: 56,
  strSubmitted30d: 12,
  alertsTrend: [
    { date: "Mon", low: 12, medium: 24, high: 5 },
    { date: "Tue", low: 18, medium: 15, high: 8 },
    { date: "Wed", low: 14, medium: 28, high: 12 },
    { date: "Thu", low: 22, medium: 19, high: 4 },
    { date: "Fri", low: 10, medium: 25, high: 9 },
    { date: "Sat", low: 8, medium: 10, high: 2 },
    { date: "Sun", low: 5, medium: 8, high: 1 },
  ],
  strPipeline: [
    { status: "Draft", count: 5 },
    { status: "Review", count: 8 },
    { status: "Pending FIC", count: 3 },
    { status: "Submitted", count: 12 },
  ],
};

export const MOCK_RECENT_ALERTS: Alert[] = [
  {
    id: "ALT-1092",
    customerId: "CUST-8831",
    customerName: "Chungu Mwinde",
    type: "Transaction",
    severity: "High",
    status: "New",
    description: "Structuring: Multiple cash deposits just below ZMW 100,000 threshold",
    amountZMW: 95000,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ALT-1093",
    customerId: "CUST-5529",
    customerName: "Lumwana Enterprises Ltd",
    type: "Behavioral",
    severity: "Medium",
    status: "In Progress",
    description: "Sudden spike in cross-border wire transfers to UAE",
    amountZMW: 450000,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "ALT-1094",
    customerId: "CUST-1102",
    customerName: "Bwalya K. Mutale",
    type: "Screening",
    severity: "High",
    status: "New",
    description: "PEP Match: Newly appointed Deputy Permanent Secretary",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
];
