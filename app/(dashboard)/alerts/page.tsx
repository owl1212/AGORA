"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_RECENT_ALERTS } from "@/lib/mock-data";
import { Filter, SlidersHorizontal, ArrowUpRight, Search, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AlertsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts Queue</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Triage and manage compliance alerts. Maintain zero SLA breaches.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="font-semibold">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Config Rules
          </Button>
          <Button className="font-semibold px-6 hover:scale-[1.02] transition-transform">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats/Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["All", "New", "In Progress", "High Risk"].map((filter) => (
          <Card 
            key={filter} 
            className={`cursor-pointer transition-colors ${activeFilter === filter ? 'border-primary ring-1 ring-primary' : 'hover:border-primary/50'}`}
            onClick={() => setActiveFilter(filter)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <span className="font-medium text-sm">{filter}</span>
              <Badge variant="secondary" className="bg-muted text-foreground">{Math.floor(Math.random() * 50) + 10}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Table */}
      <Card>
        <CardHeader className="border-b border-border p-4 px-6 flex flex-row items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter by ID, Customer or Type..." 
              className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground mr-2">Showing 1-10 of 142 alerts</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-foreground font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Alert ID</th>
                  <th className="px-6 py-4 font-medium">Customer Profile</th>
                  <th className="px-6 py-4 font-medium">Risk Factor</th>
                  <th className="px-6 py-4 font-medium">Age</th>
                  <th className="px-6 py-4 font-medium">Assigned To</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...MOCK_RECENT_ALERTS, ...MOCK_RECENT_ALERTS].map((alert, index) => (
                  <motion.tr 
                    key={`${alert.id}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-semibold">{alert.id}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 uppercase tracker-wider">{alert.type}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{alert.customerName}</div>
                      <div className="text-xs text-muted-foreground font-mono mt-0.5">{alert.customerId}</div>
                    </td>
                    <td className="px-6 py-4">
                      {alert.severity === "High" ? (
                        <Badge className="bg-[#E24B4A]/10 text-[#E24B4A] hover:bg-[#E24B4A]/20 border-0">High Priority</Badge>
                      ) : alert.severity === "Medium" ? (
                        <Badge className="bg-[#BA7517]/10 text-[#BA7517] hover:bg-[#BA7517]/20 border-0">Medium</Badge>
                      ) : (
                        <Badge className="bg-[#1D9E75]/10 text-[#1D9E75] hover:bg-[#1D9E75]/20 border-0">Low</Badge>
                      )}
                      <p className="text-xs text-muted-foreground mt-1.5 truncate max-w-[200px]" title={alert.description}>
                        {alert.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-xs text-muted-foreground font-medium">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {index === 0 ? "2 hours" : index === 1 ? "12 hours" : "1.5 days"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {index % 3 === 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-bold">CM</div>
                          <span className="text-xs text-muted-foreground">Me</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" className="font-medium">
                        Triage <ArrowUpRight className="ml-1 w-3 h-3" />
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
  );
}
