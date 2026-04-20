"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, User, ShieldAlert, CreditCard, Building2, MapPin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function CustomersPage() {
  const customerInfo = {
    id: "CUST-8831",
    name: "Chungu Mwinde",
    nrc: "142345/10/1",
    type: "Individual",
    riskScore: "High",
    status: "Active",
    onboardedAt: "2023-04-12",
    industry: "Real Estate",
    address: "Plot 42, Leopards Hill Rd, Lusaka",
    accounts: 3
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer 360</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Comprehensive compliance profile and risk evaluation.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <Card className="lg:col-span-1">
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
            
            <div className="pt-4 grid grid-cols-2 gap-4">
              <Button className="w-full" variant="outline">Edit KYC</Button>
              <Button className="w-full bg-[#E24B4A] hover:bg-[#E24B4A]/90 text-white border-0">Suspend Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Details & Risk */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Overview</CardTitle>
              <CardDescription>Multi-dimensional risk assessment factors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground"/> Geographic Risk</span>
                    <span className="font-medium text-[#BA7517]">Medium (60/100)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#BA7517] w-[60%]"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2"><CreditCard className="w-4 h-4 text-muted-foreground"/> Transaction Risk</span>
                    <span className="font-medium text-[#E24B4A]">High (92/100)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#E24B4A] w-[92%]"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2"><Building2 className="w-4 h-4 text-muted-foreground"/> Industry/Occupation Risk</span>
                    <span className="font-medium text-[#1D9E75]">Low (25/100)</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-[#1D9E75] w-[25%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity & Linkages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
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
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="w-2 h-2 rounded-full bg-primary block"></span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-border bg-card shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm">KYC Updated</h4>
                      <span className="text-[10px] text-muted-foreground">12 Oct 2023, 2:00 PM</span>
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
