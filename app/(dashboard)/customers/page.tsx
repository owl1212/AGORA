"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Search, 
  User, 
  ShieldAlert, 
  CreditCard, 
  Building2, 
  MapPin, 
  Users, 
  Activity, 
  BadgeCheck,
  PieChart,
  Network
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

export default function CustomersPage() {
  const customerInfo = {
    id: "CUST-8831",
    name: "Chungu Mwinde",
    nrc: "142345/10/1",
    type: "Individual",
    riskScore: "High",
    status: "Active",
    onboardedAt: "2026-04-27",
    industry: "Real Estate",
    address: "Plot 42, Leopards Hill Rd, Lusaka",
    accounts: 3,
    creditScore: 680,
    isGroupMember: true,
    groupName: "Tiyanjane Village Banking"
  };

  const groupHealthData = [
    { metric: 'Repayment Rate', value: 95, fullMark: 100 },
    { metric: 'Attendance', value: 85, fullMark: 100 },
    { metric: 'Savings', value: 70, fullMark: 100 },
    { metric: 'Peer Rating', value: 88, fullMark: 100 },
  ];

  const groupMembers = [
    { name: "Memory Phiri", role: "Chairperson", status: "On Track", statusColor: "text-emerald-500 bg-emerald-500/10" },
    { name: "Sarah Banda", role: "Treasurer", status: "Warning", statusColor: "text-amber-500 bg-amber-500/10" },
    { name: "Grace Mulenga", role: "Member", status: "On Track", statusColor: "text-emerald-500 bg-emerald-500/10" },
    { name: "Joy Tembo", role: "Member", status: "Arrears (3d)", statusColor: "text-destructive bg-destructive/10" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer 360</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Comprehensive profile, credit scoring, and group health evaluation.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by NRC or Name..." 
            className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            defaultValue="Chungu Mwinde"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4 border-4 border-background shadow-md">
                <User className="w-10 h-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">{customerInfo.name}</CardTitle>
              <CardDescription className="flex items-center justify-center gap-2 mt-1">
                NRC: {customerInfo.nrc} 
                <Badge variant="outline" className="text-[10px]">{customerInfo.type}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Compliance Risk Status</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-[#E24B4A] hover:bg-[#E24B4A]/90 text-white border-0 cursor-help">
                        High Risk
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold text-sm mb-1">Risk Factors (Score: 85/100)</p>
                      <ul className="text-xs space-y-1 list-disc pl-3 text-muted-foreground">
                        <li>PEP Match identified</li>
                        <li>High velocity cross-border txns</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Account Status</span>
                <Badge variant="outline" className="bg-[#639922]/10 text-[#639922] border-0">Active</Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Customer ID</span>
                <span className="font-mono text-sm">{customerInfo.id}</span>
              </div>
              
              <div className="pt-4 grid grid-cols-1 gap-3">
                <Button className="w-full" variant="outline">Edit KYC</Button>
                <Button className="w-full bg-[#E24B4A] hover:bg-[#E24B4A]/90 text-white border-0">Suspend Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Group Collateral Sidebar Card */}
          {customerInfo.isGroupMember && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" /> Group Collateral
                </CardTitle>
                <CardDescription>
                  Co-guarantors in <strong>{customerInfo.groupName}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {groupMembers.map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-background border border-border">
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{member.role}</p>
                    </div>
                    <Badge variant="secondary" className={`${member.statusColor} border-0 text-xs`}>
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Middle & Right Column: Details & Risk */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Qualification Banner */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 shrink-0">
                  <BadgeCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-emerald-700 dark:text-emerald-400">Qualifies for ZMW 50,000</h3>
                  {customerInfo.isGroupMember && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <strong>Risk-bearing members:</strong> Memory Phiri, Grace Mulenga
                    </p>
                  )}
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-auto">
                Process Disbursement
              </Button>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Credit Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-500" /> Personal Credit Score
                </CardTitle>
                <CardDescription>Individual financial health metric</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-8 border-muted">
                  {/* Fake circular progress */}
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle 
                      cx="50%" 
                      cy="50%" 
                      r="46%" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="8" 
                      className="text-emerald-500" 
                      strokeDasharray="290" 
                      strokeDashoffset={290 - (290 * 680) / 850} 
                    />
                  </svg>
                  <div className="text-center">
                    <span className="text-4xl font-bold block text-foreground">{customerInfo.creditScore}</span>
                    <span className="text-xs text-muted-foreground">out of 850</span>
                  </div>
                </div>
                <div className="mt-6 w-full space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment History</span>
                    <span className="font-medium text-emerald-500">Good</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Debt Utilization</span>
                    <span className="font-medium text-amber-500">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Approval Probability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-500" /> Approval Probability
                </CardTitle>
                <CardDescription>AI-driven loan approval likelihood</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-5xl font-black text-blue-500 tracking-tighter">82<span className="text-2xl text-blue-500/70">%</span></div>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-0">High Probability</Badge>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">CRB Score (Zambia CRB)</span>
                      <span className="font-bold text-emerald-500">+25%</span>
                    </div>
                    <Progress value={85} className="h-2 [&>div]:bg-emerald-500" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Verified Income vs. Installment</span>
                      <span className="font-bold text-amber-500">+15%</span>
                    </div>
                    <Progress value={60} className="h-2 [&>div]:bg-amber-500" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Residential Stability (GPS)</span>
                      <span className="font-bold text-emerald-500">+20%</span>
                    </div>
                    <Progress value={90} className="h-2 [&>div]:bg-emerald-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Group Health Radar */}
            {customerInfo.isGroupMember && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" /> Group Health Index
                  </CardTitle>
                  <CardDescription>Collective metrics for Village Banking</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={groupHealthData}>
                      <PolarGrid stroke="var(--border)" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Group Health"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.4}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Group Social Collateral Matrix */}
            {customerInfo.isGroupMember && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-indigo-500" /> Group Social Collateral
                  </CardTitle>
                  <CardDescription>Village Banking peer assessment matrix</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted/50 border border-border shadow-sm">
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Group Maturity</p>
                      <p className="text-3xl font-black">4</p>
                      <p className="text-xs text-muted-foreground mt-1">Successful cycles completed</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-sm relative overflow-hidden">
                      <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 relative z-10">Peer Trust Factor</p>
                      <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300 relative z-10">4.8<span className="text-sm font-semibold opacity-60">/5</span></p>
                      <p className="text-xs text-emerald-600/80 mt-1 relative z-10">Aggregated member rating</p>
                      <Network className="absolute -bottom-4 -right-4 w-24 h-24 text-emerald-500/10 rotate-12" />
                    </div>
                  </div>
                  
                  <div className="p-5 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-bold text-destructive">Joint Liability: At Risk</h4>
                      <p className="text-sm text-destructive/80 mt-1.5 leading-relaxed">
                        One member <strong>(Joy Tembo)</strong> has an active default. Group score automatically reduced by <strong>80%</strong> per policy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity & Linkages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <ShieldAlert className="w-4 h-4 text-[#E24B4A]" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-[#E24B4A]/30 bg-[#E24B4A]/5 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-[#E24B4A]">High Alert Triggered</h4>
                      <span className="text-[10px] text-muted-foreground">Today, 10:45 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Structuring: Multiple cash deposits just below ZMW 100,000 threshold across 3 branches.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <span className="w-2 h-2 rounded-full bg-primary block"></span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm">KYC Updated</h4>
                      <span className="text-[10px] text-muted-foreground">27 Apr 2026, 2:00 PM</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Proof of address updated by Branch Officer.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
