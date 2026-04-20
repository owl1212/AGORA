"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, ArrowRightLeft, Search, SlidersHorizontal, AlertTriangle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TransactionsPage() {
  const transactions = [
    { id: "TXN-99812", account: "1090123441", type: "Wire Transfer", amount: "ZMW 450,000", dest: "Dubai, UAE", status: "Flagged", time: "10:45 AM" },
    { id: "TXN-99811", account: "1090123441", type: "Cash Deposit", amount: "ZMW 95,000", dest: "Lusaka Main", status: "Flagged", time: "09:30 AM" },
    { id: "TXN-99810", account: "5500912231", type: "Mobile Money", amount: "ZMW 12,500", dest: "0977XXXXXX", status: "Cleared", time: "09:15 AM" },
    { id: "TXN-99809", account: "3311902234", type: "Standing Order", amount: "ZMW 45,000", dest: "ZRA Payments", status: "Cleared", time: "08:00 AM" },
    { id: "TXN-99808", account: "1090123441", type: "Cash Deposit", amount: "ZMW 98,000", dest: "Ndola Branch", status: "Flagged", time: "07:45 AM" },
  ];

  const [isLive, setIsLive] = useState(true);

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            Transaction Monitoring 
            {isLive ? (
              <Badge className="bg-[#1D9E75]/20 text-[#1D9E75] border-[#1D9E75] animate-pulse">LIVE FEED</Badge>
            ) : (
              <Badge variant="outline" className="text-muted-foreground">PAUSED</Badge>
            )}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Real-time tracking of transactions against AML scenarios and thresholds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={isLive ? "outline" : "default"} 
            className="font-semibold"
            onClick={() => setIsLive(!isLive)}
          >
            <Activity className="w-4 h-4 mr-2" />
            {isLive ? "Pause Feed" : "Resume Feed"}
          </Button>
          <Button variant="outline" className="font-semibold">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Active Scenarios (24)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="border-b border-border bg-card">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <div className="relative w-64 hidden sm:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="TXN ID or Account..." 
                  className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-foreground font-semibold border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">TXN ID</th>
                    <th className="px-4 py-3 font-medium">Account / Details</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn, idx) => (
                    <motion.tr 
                      key={txn.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-b border-border hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs">{txn.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium">{txn.type}</div>
                        <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                          {txn.account} <ArrowRightLeft className="w-3 h-3 mx-1"/> {txn.dest}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-medium">{txn.amount}</td>
                      <td className="px-4 py-3">
                        {txn.status === "Flagged" ? (
                          <Badge className="bg-[#E24B4A]/10 text-[#E24B4A] border-0 flex w-fit items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Flagged
                          </Badge>
                        ) : (
                          <Badge className="bg-[#1D9E75]/10 text-[#1D9E75] border-0 flex w-fit items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Cleared
                          </Badge>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground text-xs">{txn.time}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Hits (Last 24h)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Structuring (Cash)</span>
                  <span className="font-bold text-[#E24B4A]">14</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#E24B4A] w-[70%]"></div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>High-Risk Jurisdiction</span>
                  <span className="font-bold text-[#BA7517]">8</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#BA7517] w-[40%]"></div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Rapid Movement of Funds</span>
                  <span className="font-bold text-[#BA7517]">5</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-[#BA7517] w-[25%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted border-border">
            <CardContent className="p-4 text-sm text-muted-foreground flex items-center justify-center h-[120px] text-center">
              Transactions are evaluated against FIC-mandated scenarios and internal risk thresholds.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
