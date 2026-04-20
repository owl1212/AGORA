"use client";

import { 
  Users, 
  Settings, 
  ShieldCheck, 
  History, 
  UserPlus, 
  Lock, 
  MoreVertical,
  ChevronRight,
  Database,
  Globe,
  Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const USERS = [
  { name: "C. Mulenga", role: "Admin / MLRO", email: "c.mulenga@zice.com", status: "Active", lastActive: "2 mins ago" },
  { name: "S. Banda", role: "Compliance Officer", email: "s.banda@zice.com", status: "Active", lastActive: "1 hour ago" },
  { name: "M. Zulu", role: "Senior Auditor", email: "m.zulu@zice.com", status: "Inactive", lastActive: "3 days ago" },
  { name: "K. Phiri", role: "Data Analyst", email: "k.phiri@zice.com", status: "Active", lastActive: "45 mins ago" },
];

const AUDIT_LOG = [
  { action: "Portfolio Rescore", user: "C. Mulenga", time: "2026-04-14 13:45:12", category: "System" },
  { action: "User Added: K. Phiri", user: "C. Mulenga", time: "2026-04-14 11:20:05", category: "Security" },
  { action: "Risk Weight Modified: KYC", user: "C. Mulenga", time: "2026-04-14 09:12:44", category: "Config" },
  { action: "STR Export: Q1 FRM", user: "S. Banda", time: "2026-04-13 16:30:11", category: "Export" },
];

export default function AdminPage() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <p className="text-muted-foreground">Manage platform security, user ecosystem, and global configurations.</p>
        </div>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <UserPlus className="w-4 h-4" /> Add New User
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-sm border border-border p-1">
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" /> Users & Roles
          </TabsTrigger>
          <TabsTrigger value="config" className="gap-2">
            <Settings className="w-4 h-4" /> Risk Weights
          </TabsTrigger>
          <TabsTrigger value="audit" className="gap-2">
            <History className="w-4 h-4" /> Audit Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Platform Users</CardTitle>
                <CardDescription>Active personnel with access to compliance modules</CardDescription>
              </div>
              <div className="relative w-64">
                <Input placeholder="Filter users..." className="h-9 pr-8" />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Principal</TableHead>
                    <TableHead>Module Role</TableHead>
                    <TableHead>Presence</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {USERS.map((user) => (
                    <TableRow key={user.email} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{user.name}</span>
                          <span className="text-xs text-muted-foreground">{user.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-muted-foreground'}`}></span>
                          <span className="text-sm">{user.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="config">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SettingsCard
              icon={<ShieldCheck className="w-5 h-5 text-primary" />}
              title="Risk Sensitivity"
              description="Global thresholds for STR triggering"
              status="High"
            />
            <SettingsCard
              icon={<Database className="w-5 h-5 text-primary" />}
              title="Data Retention"
              description="Case log persistence (currently 7 years)"
              status="7Y"
            />
            <SettingsCard
              icon={<Globe className="w-5 h-5 text-primary" />}
              title="API Gateway"
              description="External AML feed synchronization"
              status="Healthy"
            />
            <SettingsCard
              icon={<Lock className="w-5 h-5 text-primary" />}
              title="Auth Policy"
              description="Multi-factor authentication settings"
              status="Enforced"
            />
            <SettingsCard
              icon={<Bell className="w-5 h-5 text-primary" />}
              title="Notifications"
              description="Incident alert dispatch rules"
              status="Live"
            />
          </div>
        </TabsContent>

        <TabsContent value="audit">
          <Card className="bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle>System Audit Trail</CardTitle>
              <CardDescription>Immutable record of all administrative actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {AUDIT_LOG.map((log, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <History className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{log.action}</div>
                        <div className="text-xs text-muted-foreground">Executed by {log.user}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-[10px] uppercase mb-1">{log.category}</Badge>
                      <div className="text-[10px] text-muted-foreground font-mono">{log.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsCard({ icon, title, description, status }: any) {
  return (
    <Card className="hover:border-primary/50 transition-all cursor-pointer group bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
          <Badge variant="secondary">{status}</Badge>
        </div>
        <div className="mt-4">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="mt-4 flex items-center text-xs text-primary font-medium">
          Edit Policy <ChevronRight className="w-3 h-3 ml-1" />
        </div>
      </CardContent>
    </Card>
  );
}
