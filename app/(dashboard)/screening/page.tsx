"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, Info, Matcher, CheckCircle2, AlertTriangle, ShieldOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScreeningPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearched(false);
    
    // Simulate API delay
    setTimeout(() => {
      setResults([
        { id: 1, name: "Vladimir Putin", alias: "Vladimir Vladimirovich Putin", type: "PEP / Sanctioned", list: "OFAC, UN, EU", matchScore: 98, dob: "07 Oct 1952" },
        { id: 2, name: "Vladimir Popov", alias: "V. Popov", type: "Sanctioned Entity Assoc.", list: "OFAC", matchScore: 65, dob: "Unknown" },
      ]);
      setIsSearching(false);
      setSearched(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-[1000px] mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Watchlist Screening</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manual ad-hoc screening against global sanctions, PEPs, and adverse media.
          </p>
        </div>
      </div>

      <Card className="border-2 border-primary/20">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-semibold text-foreground">Entity or Individual Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="e.g. Vladimir Putin..." 
                  className="w-full h-11 rounded-md border border-input bg-background pl-10 pr-3 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
                  defaultValue="Vladimir Putin"
                  required
                />
              </div>
            </div>
            
            <div className="w-full md:w-48 flex flex-col justify-end">
              <Button type="submit" className="h-11 font-semibold w-full" disabled={isSearching}>
                {isSearching ? "Screening..." : "Run Screening"}
              </Button>
            </div>
          </form>
          
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success"/> OFAC</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success"/> UN Security Council</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success"/> HM Treasury</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success"/> EU Consolidated</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-success"/> FATF</span>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground animate-pulse">Querying global watchlists through AMZ intelligence network...</p>
          </motion.div>
        )}

        {searched && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Screening Results <Badge variant="secondary" className="bg-destructive/10 text-destructive">{results.length} Matches</Badge>
            </h3>

            {results.map((res) => (
              <Card key={res.id} className="overflow-hidden border border-destructive/30">
                <div className="bg-destructive/10 px-6 py-2 border-b border-destructive/20 flex justify-between items-center">
                  <span className="text-sm font-bold text-destructive uppercase tracking-wider flex items-center gap-2">
                    <ShieldOff className="w-4 h-4"/> EXACT MATCH DETECTED
                  </span>
                  <span className="text-xs font-semibold px-2 py-1 bg-destructive text-white rounded">
                    Score: {res.matchScore}%
                  </span>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Primary Name</p>
                      <p className="font-bold text-base">{res.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Known Aliases</p>
                      <p className="font-medium">{res.alias}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Category</p>
                      <p className="font-medium"><Badge className="bg-[#BA7517] hover:bg-[#BA7517] border-0">{res.type}</Badge></p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Data Sources</p>
                      <p className="font-medium text-foreground">{res.list}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
                    <Button variant="outline" size="sm">False Positive</Button>
                    <Button variant="destructive" size="sm">Escalate to Case</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
