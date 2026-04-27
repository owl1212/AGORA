"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FileText, Plus, Download, Filter, FileCheck, FileX, Clock, 
  Landmark, ShieldAlert, FileDigit, Fingerprint, Umbrella,
  SearchCheck, CheckCircle2, AlertTriangle, FileOutput, Key
} from "lucide-react";

export default function ReportsPage() {
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [targetInst, setTargetInst] = useState("BOZ");
  const [scanStep, setScanStep] = useState(0); // 0: initial, 1: scanning, 2: complete

  const reports = [
    { id: "STR-221", ref: "FIC-2026-XYZ1", status: "Submitted", date: "27 Apr 2026", author: "C. Mulenga", relatedCase: "CASE-4089" },
    { id: "STR-222", ref: "-", status: "Draft", date: "27 Apr 2026", author: "A. Tembo", relatedCase: "CASE-4091" },
    { id: "STR-220", ref: "FIC-2026-XYZ0", status: "Accepted", date: "27 Apr 2026", author: "C. Mulenga", relatedCase: "CASE-4055" },
    { id: "STR-219", ref: "FIC-2026-XYY9", status: "Rejected", date: "27 Apr 2026", author: "A. Tembo", relatedCase: "CASE-4012" },
    { id: "STR-223", ref: "-", status: "Pending FIC", date: "27 Apr 2026", author: "System", relatedCase: "CASE-4092" },
  ];

  const handleOpenExport = () => {
    setExportModalOpen(true);
    setScanStep(0);
  };

  const runIntegrityScan = () => {
    setScanStep(1);
    setTimeout(() => {
      setScanStep(2);
    }, 1500);
  };

  const getFormat = (inst: string) => {
    if (inst === "BOZ" || inst === "ZRA") return "CSV / XML (2026 Standardized Returns)";
    return "Encrypted PDF (Digital Watermark & Audit Footer)";
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full p-6 pb-20">
      
      {/* 1. Multi-Agency Compliance Dashboard */}
      <div>
        <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-primary" /> Multi-Agency Compliance Dashboard
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* BOZ */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">BOZ Liquidity</p>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              </div>
              <div className="text-xl font-black">24.5%</div>
              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">Live ratio: Cash-on-hand vs. Active Disbursements</p>
            </CardContent>
          </Card>

          {/* FIC */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-destructive uppercase">FIC Intel Trigger</p>
                <div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
              </div>
              <div className="text-xl font-black text-destructive">2 Alerts</div>
              <p className="text-[10px] text-destructive/80 mt-1 leading-tight">&gt; ZMW 100k or anomalous rural deposit</p>
            </CardContent>
          </Card>

          {/* ZRA */}
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase">ZRA Tax Ledger</p>
                <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
              </div>
              <div className="text-xl font-black text-amber-600 dark:text-amber-500">14.2% WHT</div>
              <p className="text-[10px] text-amber-600/80 mt-1 leading-tight">Real-time WHT vs. Principal interest cut</p>
            </CardContent>
          </Card>

          {/* DPC */}
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-muted-foreground uppercase">DPC Privacy</p>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              </div>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-500">98.4%</div>
              <p className="text-[10px] text-muted-foreground mt-1 leading-tight">Consent Pulse: Verified GPS + Timestamp</p>
            </CardContent>
          </Card>

          {/* PIA */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <p className="text-xs font-bold text-destructive uppercase">PIA Aging</p>
                <div className="w-2 h-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div>
              </div>
              <div className="text-xl font-black text-destructive">1 Claim &gt; 20d</div>
              <p className="text-[10px] text-destructive/80 mt-1 leading-tight">Delay since voice-note capture</p>
            </CardContent>
          </Card>

        </div>
      </div>

      <hr className="border-border" />

      {/* 2. Existing STR Reports Header & Widgets */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">STR Reports</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage and submit Suspicious Transaction Reports to the FIC.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Export Log
            </Button>
            <Button className="font-semibold px-6 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-background border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded">
                <FileCheck className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Accepted (YTD)</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded">
                <Clock className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending FIC</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-destructive/10 text-destructive rounded">
                <FileX className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background border border-border">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="p-2 bg-muted-foreground/10 text-muted-foreground rounded">
                <FileText className="w-5 h-5"/>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 3. Regulatory Export Engine (Secondary Action Bar) */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-sm">
        <CardContent className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <FileOutput className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-primary">Regulatory Export Engine</h3>
              <p className="text-sm text-primary/80">Generate standardized institutional returns.</p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 w-full justify-end">
            <select 
              className="w-full sm:w-64 h-10 rounded-md border border-primary/30 bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
              value={targetInst}
              onChange={(e) => setTargetInst(e.target.value)}
            >
              <option value="BOZ">Bank of Zambia (BOZ)</option>
              <option value="ZRA">Zambia Revenue Authority (ZRA)</option>
              <option value="FIC">Financial Intelligence Centre (FIC)</option>
              <option value="DPC">Data Protection Commission (DPC)</option>
              <option value="PIA">Pensions & Insurance Authority (PIA)</option>
            </select>
            <Button onClick={handleOpenExport} className="w-full sm:w-auto font-bold bg-primary text-primary-foreground">
              Generate Format
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 4. Existing Recent Submissions Table */}
      <Card>
        <CardHeader className="border-b border-border p-4 px-6 flex flex-row items-center justify-between bg-muted/20">
          <CardTitle className="text-lg">Recent Submissions</CardTitle>
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Filter className="w-4 h-4 mr-2"/>
            Filter Views
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-foreground font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">STR ID</th>
                  <th className="px-6 py-4 font-medium">FIC Ref No.</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Related Case</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-mono font-medium">{report.id}</td>
                    <td className="px-6 py-4 text-muted-foreground font-mono">{report.ref}</td>
                    <td className="px-6 py-4">
                      {report.status === "Accepted" && <Badge className="bg-[#639922]/10 text-[#639922] border-[#639922]/20">Accepted</Badge>}
                      {report.status === "Rejected" && <Badge className="bg-[#E24B4A]/10 text-[#E24B4A] border-[#E24B4A]/20">Rejected</Badge>}
                      {report.status === "Draft" && <Badge variant="outline" className="text-muted-foreground border-border">Draft</Badge>}
                      {report.status === "Pending FIC" && <Badge className="bg-[#BA7517]/10 text-[#BA7517] border-[#BA7517]/20">Pending FIC</Badge>}
                      {report.status === "Submitted" && <Badge className="bg-primary/20 text-primary border-primary/30">Submitted</Badge>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-primary cursor-pointer hover:underline">{report.relatedCase}</span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background border border-border w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border bg-muted/30">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileOutput className="w-5 h-5 text-primary" /> {targetInst} Regulatory Export
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Format Protocol: <span className="font-semibold text-foreground">{getFormat(targetInst)}</span>
              </p>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              {scanStep === 0 && (
                <div className="text-center py-8">
                  <SearchCheck className="w-12 h-12 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-lg font-bold">Data Integrity Scan Required</h3>
                  <p className="text-sm text-muted-foreground mb-6">Before generating this compliance report, the system must scan for KYC completeness and ledger mismatches.</p>
                  <Button onClick={runIntegrityScan} className="bg-primary text-primary-foreground px-8">Run Pre-Flight Scan</Button>
                </div>
              )}

              {scanStep === 1 && (
                <div className="text-center py-12 space-y-4">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-semibold text-primary animate-pulse">Cross-referencing ledgers & KYC metadata...</p>
                </div>
              )}

              {scanStep === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-6 h-6 shrink-0" />
                    <div>
                      <p className="font-bold">Scan Complete: 0 Mismatches found.</p>
                      <p className="text-xs opacity-90">All 142 records pass {targetInst} integrity validation.</p>
                    </div>
                  </div>

                  {targetInst === "FIC" && (
                    <div className="flex items-center gap-3 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-600 dark:text-amber-500">
                      <AlertTriangle className="w-6 h-6 shrink-0" />
                      <div>
                        <p className="font-bold">Warning: 2 High-Value Alerts Pending</p>
                        <p className="text-xs opacity-90">Please ensure the recent anomalous rural deposits are reviewed before finalizing this batch.</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-bold flex items-center gap-2"><Key className="w-4 h-4"/> Audit Trail Activation</p>
                    <p className="text-xs text-muted-foreground">Generation of this file will log your User ID, Timestamp, and a SHA-256 File Hash directly to the Administration immutable log for proof of filing.</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-bold">Data Preview (First 5 Rows)</p>
                    <div className="border border-border rounded-md overflow-x-auto text-xs font-mono">
                      <table className="w-full text-left">
                        <thead className="bg-muted">
                          <tr>
                            <th className="p-2 border-b border-r border-border">TXN_ID</th>
                            <th className="p-2 border-b border-r border-border">CUSTOMER_NAME</th>
                            <th className="p-2 border-b border-r border-border">AMT_ZMW</th>
                            <th className="p-2 border-b border-border">RISK_SCORE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[1,2,3,4,5].map(i => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="p-2 border-r border-border">TXN-00{i}84</td>
                              <td className="p-2 border-r border-border">Mulenga Banda {i}</td>
                              <td className="p-2 border-r border-border">{(12500 * i).toLocaleString()}</td>
                              <td className="p-2 text-emerald-500">LOW</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-border bg-muted/20 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setExportModalOpen(false)}>Cancel</Button>
              <Button 
                disabled={scanStep !== 2} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                onClick={() => {
                  alert("File Downloaded. Hash logged to Administration Audit Trail.");
                  setExportModalOpen(false);
                }}
              >
                Confirm & Download
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
