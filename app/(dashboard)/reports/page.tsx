"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Plus, Download, Filter, FileCheck, FileX, Clock } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: "STR-221", ref: "FIC-2023-XYZ1", status: "Submitted", date: "14 Oct 2023", author: "C. Mulenga", relatedCase: "CASE-4089" },
    { id: "STR-222", ref: "-", status: "Draft", date: "13 Oct 2023", author: "A. Tembo", relatedCase: "CASE-4091" },
    { id: "STR-220", ref: "FIC-2023-XYZ0", status: "Accepted", date: "10 Oct 2023", author: "C. Mulenga", relatedCase: "CASE-4055" },
    { id: "STR-219", ref: "FIC-2023-XYY9", status: "Rejected", date: "05 Oct 2023", author: "A. Tembo", relatedCase: "CASE-4012" },
    { id: "STR-223", ref: "-", status: "Pending FIC", date: "14 Oct 2023", author: "System", relatedCase: "CASE-4092" },
  ];

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto w-full">
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
            <div className="p-2 bg-success/10 text-success rounded">
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
            <div className="p-2 bg-warning/10 text-warning rounded">
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
    </div>
  );
}
