"use client";

import { 
  HandCoins, 
  Building2, 
  BadgeCheck, 
  FileWarning, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const ENTITIES = [
  { name: "First Micro Capital", sector: "Microfinance", risk: "Low", capital: "12.4M", compliance: 98, status: "Compliant" },
  { name: "Lusaka Leasing Ltd", sector: "Leasing", risk: "Medium", capital: "8.2M", compliance: 85, status: "Review Required" },
  { name: "Copperbelt Credit", sector: "Microfinance", risk: "High", capital: "4.1M", compliance: 62, status: "Non-Compliant" },
  { name: "Agri-Loan Solutions", sector: "Dev Finance", risk: "Low", capital: "15.0M", compliance: 94, status: "Compliant" },
  { name: "Quick Cash Micro", sector: "Microfinance", risk: "Medium", capital: "2.8M", compliance: 78, status: "Pending Audit" },
];

export default function NonDepositPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Non-Deposit Taking</h1>
          <p className="text-muted-foreground">Oversight and compliance management for NDFIs across Zambia.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Building2 className="w-4 h-4" /> Register New Entity
          </Button>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Registered NDFIs" 
          value="242" 
          change="+12" 
          trend="up" 
          icon={<Building2 className="w-5 h-5 text-blue-500" />} 
        />
        <KPICard 
          title="Industry Compliance" 
          value="84.2%" 
          change="-1.5%" 
          trend="down" 
          icon={<BadgeCheck className="w-5 h-5 text-emerald-500" />} 
        />
        <KPICard 
          title="Active Sanctions" 
          value="18" 
          change="+3" 
          trend="up" 
          icon={<FileWarning className="w-5 h-5 text-amber-500" />} 
        />
        <KPICard 
          title="Aggregate Capital" 
          value="K842.5M" 
          change="+K22M" 
          trend="up" 
          icon={<HandCoins className="w-5 h-5 text-primary" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Entity Table */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Entity Registry</CardTitle>
              <CardDescription>Monitored non-deposit financial institutions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
               <div className="relative w-48">
                 <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input placeholder="Search entity..." className="h-9 pl-8" />
               </div>
               <Button variant="outline" size="icon" className="h-9 w-9">
                 <Filter className="w-4 h-4" />
               </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead>Capital</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ENTITIES.map((entity) => (
                  <TableRow key={entity.name} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{entity.name}</TableCell>
                    <TableCell className="text-sm">{entity.sector}</TableCell>
                    <TableCell className="text-sm font-mono">{entity.capital}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          entity.risk === 'Low' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5' :
                          entity.risk === 'Medium' ? 'text-amber-500 border-amber-500/20 bg-amber-500/5' :
                          'text-destructive border-destructive/20 bg-destructive/5'
                        }
                      >
                        {entity.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Progress value={entity.compliance} className="h-1.5 w-16" />
                        <span className="text-xs font-medium">{entity.compliance}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Industry Distribution / Sector Breakdown */}
        <div className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>Sector Breakdown</CardTitle>
              <CardDescription>Entity distribution by operational license</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SectorProgress name="Microfinance" count={142} percentage={58} />
              <SectorProgress name="Leasing & Asset Fin" count={48} percentage={20} />
              <SectorProgress name="Dev Finance" count={22} percentage={9} />
              <SectorProgress name="Credit Only" count={30} percentage={13} />
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <BarChart3 className="w-5 h-5" />
                <span>Sector Integrity Index</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8.4<span className="text-sm font-normal text-muted-foreground ml-1">/ 10</span></div>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                The sector as a whole maintains a high integrity index, with 92% of NDFIs submitting quarterly returns on time.
              </p>
              <Button variant="link" className="text-primary p-0 h-auto text-xs font-semibold mt-4">
                View Full Industry Report <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, trend, icon }: any) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-muted/50">{icon}</div>
          <Badge 
            variant="secondary" 
            className={`text-[10px] ${trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-amber-500 bg-amber-500/10'}`}
          >
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {change}
          </Badge>
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function SectorProgress({ name, count, percentage }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground text-xs">{count} entities</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}
