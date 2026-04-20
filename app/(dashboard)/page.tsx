"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MOCK_DASHBOARD_METRICS, MOCK_RECENT_ALERTS } from "@/lib/mock-data";
import { 
  Building2, 
  AlertOctagon, 
  FileSearch, 
  Send, 
  ArrowUpRight,
  WifiOff,
  Loader2,
  MoreVertical
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { useState, useEffect } from "react";
import { Tooltip as ReactTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network request
  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      // TODO: Backend team - GET /api/v1/dashboard/metrics
      // EXPECTS: DashboardMetrics object
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col w-full">


      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 space-y-8 max-w-[1400px] w-full mx-auto">
        
        {/* Offline Banner Simulation */}
        {!navigator.onLine && (
          <div className="bg-warning/10 border border-warning text-warning px-4 py-3 rounded-lg flex items-center gap-3 text-sm font-medium">
            <WifiOff className="w-4 h-4" />
            You are currently offline. Viewing cached dashboard data.
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Executive Dashboard</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Overview of compliance metrics and active alerts for your institution.
            </p>
          </div>
          <Button className="font-semibold px-6 hover:scale-[1.02] transition-transform">
            <FileSearch className="w-4 h-4 mr-2" />
            Generate Board Report
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2"><div className="h-4 bg-muted rounded w-1/2"></div></CardHeader>
                <CardContent><div className="h-8 bg-muted rounded w-1/3"></div></CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard 
                title="Active Alerts" 
                value={MOCK_DASHBOARD_METRICS.activeAlerts.toString()}
                trend="+12% vs last week"
                trendUp={true}
                icon={<AlertOctagon className="w-5 h-5" />}
                color="destructive"
              />
              <MetricCard 
                title="High-Risk Customers" 
                value={MOCK_DASHBOARD_METRICS.highRiskCustomers.toString()}
                trend="Stable"
                icon={<Building2 className="w-5 h-5" />}
                color="warning"
              />
              <MetricCard 
                title="Pending Cases" 
                value={MOCK_DASHBOARD_METRICS.pendingCases.toString()}
                trend="-5% vs last week"
                trendUp={false}
                icon={<FileSearch className="w-5 h-5" />}
                color="info"
              />
              <MetricCard 
                title="STRs Submitted (30d)" 
                value={MOCK_DASHBOARD_METRICS.strSubmitted30d.toString()}
                trend="Requires action: 3 pending"
                icon={<Send className="w-5 h-5" />}
                color="success"
              />
            </div>

            {/* Charts & Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Alert Trends Chart */}
              <Card className="lg:col-span-2 flex flex-col">
                <CardHeader>
                  <CardTitle>Alert Volume Trend</CardTitle>
                  <CardDescription>7-day volume by risk severity</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_DASHBOARD_METRICS.alertsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "var(--card)", borderColor: "var(--border)", borderRadius: "8px", fontSize: "14px", color: "var(--foreground)" }} 
                        cursor={{ fill: "var(--muted)", opacity: 0.5 }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
                      <Bar dataKey="high" name="High Risk" stackId="a" fill="#E24B4A" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="medium" name="Medium Risk" stackId="a" fill="#BA7517" />
                      <Bar dataKey="low" name="Low Risk" stackId="a" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* STR Pipeline Pipeline */}
              <Card>
                <CardHeader>
                  <CardTitle>STR Pipeline</CardTitle>
                  <CardDescription>Current status of Suspicious Transaction Reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {MOCK_DASHBOARD_METRICS.strPipeline.map((stage) => {
                      const total = MOCK_DASHBOARD_METRICS.strPipeline.reduce((acc, curr) => acc + curr.count, 0);
                      const percent = Math.round((stage.count / total) * 100);
                      
                      return (
                        <div key={stage.status} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{stage.status}</span>
                            <span className="text-muted-foreground">{stage.count} ({percent}%)</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts Queue */}
              <Card className="lg:col-span-3">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Action Required: Priority Alerts</CardTitle>
                    <CardDescription>Highest risk active alerts requiring immediate review</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-foreground font-semibold border-b border-border">
                        <tr>
                          <th className="px-4 py-3 rounded-tl-lg font-medium">Alert ID</th>
                          <th className="px-4 py-3 font-medium">Customer</th>
                          <th className="px-4 py-3 font-medium">Risk Score</th>
                          <th className="px-4 py-3 font-medium">Type</th>
                          <th className="px-4 py-3 font-medium hidden md:table-cell">Details</th>
                          <th className="px-4 py-3 font-medium hidden sm:table-cell">Time</th>
                          <th className="px-4 py-3 rounded-tr-lg font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_RECENT_ALERTS.map((alert) => (
                          <motion.tr 
                            key={alert.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border-b border-border hover:bg-muted/50 transition-colors group"
                          >
                            <td className="px-4 py-4 font-mono text-xs">{alert.id}</td>
                            <td className="px-4 py-4">
                              <div className="font-medium text-foreground">{alert.customerName}</div>
                              <div className="text-xs text-muted-foreground font-mono mt-0.5">{alert.customerId}</div>
                            </td>
                            <td className="px-4 py-4">
                              <TooltipProvider>
                                <ReactTooltip>
                                  <TooltipTrigger>
                                    <div className="inline-flex cursor-help">
                                      <RiskBadge level={alert.severity} />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="font-semibold text-sm mb-1">Why {alert.severity}?</p>
                                    <ul className="text-xs space-y-1 list-disc pl-3 text-muted-foreground">
                                      <li>Multiple structural hits</li>
                                      <li>Velocity exceeds 90th percentile</li>
                                    </ul>
                                  </TooltipContent>
                                </ReactTooltip>
                              </TooltipProvider>
                            </td>
                            <td className="px-4 py-4">
                              <Badge variant="outline" className="font-normal text-foreground bg-background">
                                {alert.type}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 max-w-[300px] truncate hidden md:table-cell text-muted-foreground">
                              {alert.description}
                            </td>
                            <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">
                              {new Intl.DateTimeFormat('en-ZM', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }).format(new Date(alert.createdAt))}
                            </td>
                            <td className="px-4 py-4 text-right">
                              <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                Review <ArrowUpRight className="ml-1 w-3 h-3" />
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

            </div>
          </>
        )}
      </main>
    </div>
  );
}

// Subcomponents
function MetricCard({ title, value, trend, icon, color, trendUp }: any) {
  const colorMap: Record<string, string> = {
    destructive: "bg-destructive/10 text-destructive",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
    info: "bg-info/10 text-info",
    primary: "bg-primary/20 text-primary"
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-250 border-transparent shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`p-2 rounded-lg ${colorMap[color]}`}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-xs">
          {trendUp !== undefined && (
            <ArrowUpRight className={`w-3 h-3 mr-1 ${trendUp ? 'text-destructive' : 'text-success'} ${trendUp ? '' : 'rotate-180'}`} />
          )}
          <span className="text-muted-foreground">{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function RiskBadge({ level }: { level: string }) {
  if (level === "High") {
    return <Badge className="bg-[#E24B4A] hover:bg-[#E24B4A]/90 text-white border-0">High Risk</Badge>;
  }
  if (level === "Medium") {
    return <Badge className="bg-[#BA7517] hover:bg-[#BA7517]/90 text-white border-0">Medium Risk</Badge>;
  }
  return <Badge className="bg-[#1D9E75] hover:bg-[#1D9E75]/90 text-white border-0">Low Risk</Badge>;
}
