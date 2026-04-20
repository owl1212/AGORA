"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, FolderOpen, ArrowUpRight, CheckCircle2, Clock, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function CasesPage() {
  const cases = [
    { id: "CASE-4092", title: "Suspicious Structuring via Mobile Money", priority: "Urgent", status: "Open", customer: "Chungu Mwinde", agent: "C. Mulenga", age: "2d" },
    { id: "CASE-4091", title: "Cross-border High Volume Transactions", priority: "High", status: "Review", customer: "Bwalya K. Mutale", agent: "A. Tembo", age: "5d" },
    { id: "CASE-4090", title: "Multiple Account Takeover Attempts", priority: "Normal", status: "Open", customer: "Lumwana Enterprises Ltd", agent: "Unassigned", age: "1d" },
    { id: "CASE-4089", title: "Sanctions List Name Match (Partial)", priority: "Urgent", status: "Reported", customer: "M. Banda", agent: "C. Mulenga", age: "12d" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Investigate deep compliance violations and manage evidence.
          </p>
        </div>
        <Button className="font-semibold px-6">
          <FolderOpen className="w-4 h-4 mr-2" />
          Create Case Manually
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search Cases..." 
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-4">
            {cases.map((c, i) => (
              <motion.div 
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow group cursor-pointer border border-border">
                  <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${c.priority === 'Urgent' ? 'bg-[#E24B4A]/10 text-[#E24B4A]' : c.priority === 'High' ? 'bg-[#BA7517]/10 text-[#BA7517]' : 'bg-[#1D9E75]/10 text-[#1D9E75]'}`}>
                        <ShieldAlert className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                          <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
                        </div>
                        <h3 className="font-semibold text-lg">{c.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Customer: <span className="font-medium text-foreground">{c.customer}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 w-full sm:w-auto">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" /> Opened {c.age} ago
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{c.agent}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
                        Open Case <ArrowUpRight className="ml-1 w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Urgent</span>
                  <span className="font-bold text-[#E24B4A]">2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">High</span>
                  <span className="font-bold text-[#BA7517]">1</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Review Pending</span>
                  <span className="font-bold text-foreground">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer transition-colors border-0">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Generate STR</h3>
                <p className="text-sm opacity-90 mt-1">From completed cases</p>
              </div>
              <ArrowUpRight className="w-6 h-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
