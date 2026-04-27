"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Search, FolderOpen, ArrowUpRight, Clock, ShieldAlert, Play, Pause, FastForward, Rewind, MessageSquare, Mic, Globe2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [smsReply, setSmsReply] = useState("");

  const cases = [
    { id: "CASE-4092", title: "USSD Voice Gateway - Unrecognized Pattern", priority: "Urgent", status: "Open", customer: "Chungu Mwinde", agent: "C. Mulenga", age: "2d", language: "Nyanja", hasAudio: true },
    { id: "CASE-4091", title: "Cross-border High Volume Transactions", priority: "High", status: "Review", customer: "Bwalya K. Mutale", agent: "A. Tembo", age: "5d", language: "English", hasAudio: false },
    { id: "CASE-4090", title: "Multiple Account Takeover Attempts", priority: "Normal", status: "Open", customer: "Lumwana Enterprises Ltd", agent: "Unassigned", age: "1d", language: "English", hasAudio: false },
    { id: "CASE-4089", title: "Sanctions List Name Match (Partial)", priority: "Urgent", status: "Reported", customer: "M. Banda", agent: "C. Mulenga", age: "12d", language: "Bemba", hasAudio: true },
  ];

  const activeCase = cases.find((c) => c.id === selectedCase);

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-${selectedCase ? '1' : '2'} space-y-4 transition-all duration-300`}>
          <div className="relative w-full">
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
                <Card 
                  onClick={() => setSelectedCase(c.id)}
                  className={`hover:shadow-md transition-all group cursor-pointer border ${selectedCase === c.id ? 'border-primary shadow-sm bg-primary/5' : 'border-border'}`}
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${c.priority === 'Urgent' ? 'bg-destructive/10 text-destructive' : c.priority === 'High' ? 'bg-[#BA7517]/10 text-[#BA7517]' : 'bg-primary/10 text-primary'}`}>
                        {c.hasAudio ? <Mic className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                          <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
                        </div>
                        <h3 className="font-semibold text-base line-clamp-2">{c.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {c.customer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar info or Detail View */}
        <div className={`lg:col-span-${selectedCase ? '2' : '1'} space-y-6 transition-all duration-300`}>
          <AnimatePresence mode="wait">
            {!selectedCase ? (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">My Cases</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Urgent</span>
                        <span className="font-bold text-destructive">2</span>
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
              </motion.div>
            ) : (
              <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <Card className="border border-primary/20 h-full flex flex-col">
                  <CardHeader className="border-b border-border bg-muted/30 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm font-semibold">{activeCase?.id}</span>
                          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                            <Globe2 className="w-3 h-3 mr-1" /> {activeCase?.language}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{activeCase?.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Customer: {activeCase?.customer} • Opened {activeCase?.age} ago</p>
                      </div>
                      <select 
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium outline-none focus:ring-1 focus:ring-primary"
                        defaultValue={activeCase?.status}
                      >
                        <option value="Open">Open</option>
                        <option value="Pending">Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Review">Review</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 flex-1 overflow-auto">
                    {activeCase?.hasAudio && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <Mic className="w-4 h-4 text-primary" /> Voice-Gateway Recording
                        </h4>
                        <div className="bg-muted/50 rounded-xl p-4 border border-border flex items-center gap-4">
                          <Button 
                            variant="secondary" 
                            size="icon" 
                            className="rounded-full w-12 h-12 flex-shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                          </Button>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-xs text-muted-foreground font-medium">
                              <span>0:00</span>
                              <span>2:45</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary w-1/3 rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Rewind className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><FastForward className="w-4 h-4" /></Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold flex items-center gap-2">Transcript (AI Generated)</h4>
                          <div className="bg-background rounded-lg border border-border p-4 text-sm leading-relaxed max-h-40 overflow-y-auto">
                            <p className="mb-2 text-muted-foreground">[0:00 - 0:15] <span className="text-foreground">Customer:</span> Hello, ndikufuna kuthandizidwa pa nkhani ya loan yanga. Ndinatumiza ndalama kudzera pa mobile money koma sizikuoneka mu account.</p>
                            <p className="mb-2 text-muted-foreground">[0:16 - 0:45] <span className="text-foreground">System:</span> You mentioned an issue with your mobile money transfer for a loan payment. We are connecting you to an agent.</p>
                            <p className="text-muted-foreground">[0:46 - 2:45] <span className="text-foreground">Customer:</span> Ndinatumiza dzulo masana, transaction ID ndi... <i>[audio unclear]</i></p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Direct SMS Reply
                      </h4>
                      <p className="text-xs text-muted-foreground mb-2">Send a response directly to the client's registered phone number.</p>
                      <textarea 
                        className="w-full h-24 rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                        placeholder="Type your SMS response here..."
                        value={smsReply}
                        onChange={(e) => setSmsReply(e.target.value)}
                      />
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs text-muted-foreground">{160 - smsReply.length} characters remaining</span>
                        <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                          Send SMS
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
