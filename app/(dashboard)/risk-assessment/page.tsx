"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, ShieldAlert, TrendingDown, Map as MapIcon, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Simplified abstract SVG paths for Zambia's 10 provinces to act as a placeholder map
const zambiaProvinces = [
  { id: "north-western", name: "North-Western", d: "M20,40 L60,30 L80,70 L40,90 Z", cx: 45, cy: 55 },
  { id: "copperbelt", name: "Copperbelt", d: "M60,30 L90,40 L100,70 L80,70 Z", cx: 80, cy: 50 },
  { id: "luapula", name: "Luapula", d: "M90,10 L120,20 L110,60 L90,40 Z", cx: 100, cy: 30 },
  { id: "northern", name: "Northern", d: "M120,0 L180,20 L160,60 L110,60 L120,20 Z", cx: 140, cy: 30 },
  { id: "muchinga", name: "Muchinga", d: "M160,60 L180,20 L210,40 L180,100 L130,80 Z", cx: 175, cy: 60 },
  { id: "eastern", name: "Eastern", d: "M180,100 L210,40 L250,90 L200,140 Z", cx: 215, cy: 90 },
  { id: "central", name: "Central", d: "M80,70 L130,80 L180,100 L160,130 L100,120 Z", cx: 130, cy: 100 },
  { id: "lusaka", name: "Lusaka", d: "M140,125 L160,130 L180,160 L130,150 Z", cx: 155, cy: 140 },
  { id: "western", name: "Western", d: "M10,90 L40,90 L80,140 L50,180 L0,150 Z", cx: 40, cy: 130 },
  { id: "southern", name: "Southern", d: "M80,140 L100,120 L130,150 L180,160 L120,200 L60,180 Z", cx: 110, cy: 160 },
];

const mockData = zambiaProvinces.map(p => ({
  ...p,
  activeLoans: Math.floor(Math.random() * 5000) + 1000,
  overdueLoans: Math.floor(Math.random() * 500) + 50,
  missingKYC: Math.floor(Math.random() * 300) + 20,
  branches: [
    { name: `${p.name} Main Branch`, officer: `Officer ${Math.floor(Math.random() * 100)}` },
    { name: `${p.name} Rural Hub`, officer: `Officer ${Math.floor(Math.random() * 100)}` }
  ]
}));

export default function RiskAssessmentPage() {
  const [riskType, setRiskType] = useState<'financial' | 'compliance'>('financial');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  
  const getRiskScore = (provinceId: string) => {
    const data = mockData.find(d => d.id === provinceId);
    if (!data) return 0;
    if (riskType === 'financial') {
      return data.overdueLoans / data.activeLoans; // PAR
    } else {
      return data.missingKYC / data.activeLoans; // Compliance risk ratio
    }
  };

  const getColor = (score: number) => {
    // Score range is roughly 0 to 0.15 for these random numbers. Let's map it to a heatmap color.
    // Low risk: Green, Medium: Yellow/Orange, High: Red
    const normalized = Math.min(score / 0.15, 1);
    const hue = (1 - normalized) * 120; // 120 is green, 0 is red
    return `hsl(${hue}, 70%, 50%)`;
  };

  const activeData = selectedProvince ? mockData.find(d => d.id === selectedProvince) : null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Geographic Risk Assessment</h1>
          <p className="text-muted-foreground mt-1">Visualize portfolio health and compliance metrics across Zambia.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Zambia Heatmap</CardTitle>
              <CardDescription>Select a province to view regional data</CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-muted p-1 rounded-md">
              <Button 
                variant={riskType === 'financial' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setRiskType('financial')}
                className="text-xs"
              >
                Financial Risk (PAR)
              </Button>
              <Button 
                variant={riskType === 'compliance' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setRiskType('compliance')}
                className="text-xs"
              >
                Compliance Risk
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center py-8">
            <div className="relative w-full max-w-[600px] aspect-[1.2]">
              <svg viewBox="0 0 260 220" className="w-full h-full drop-shadow-xl">
                {mockData.map((prov) => {
                  const score = getRiskScore(prov.id);
                  const isSelected = selectedProvince === prov.id;
                  return (
                    <g key={prov.id} onClick={() => setSelectedProvince(prov.id)} className="cursor-pointer group">
                      <path 
                        d={prov.d} 
                        fill={getColor(score)} 
                        stroke={isSelected ? "white" : "#2a2a2a"}
                        strokeWidth={isSelected ? 2.5 : 1}
                        className="transition-all duration-300 hover:opacity-80"
                      />
                      <text 
                        x={prov.cx} 
                        y={prov.cy} 
                        fontSize="6" 
                        fill="white" 
                        textAnchor="middle" 
                        fontWeight={isSelected ? "bold" : "normal"}
                        className="pointer-events-none drop-shadow-md"
                      >
                        {prov.name}
                      </text>
                      <text 
                        x={prov.cx} 
                        y={prov.cy + 8} 
                        fontSize="5" 
                        fill="rgba(255,255,255,0.8)" 
                        textAnchor="middle" 
                        className="pointer-events-none"
                      >
                        {(score * 100).toFixed(1)}%
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur p-3 rounded-lg border border-border text-xs">
                <p className="font-semibold mb-2">Risk Intensity</p>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500" />
                  <span className="text-muted-foreground">High</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-primary" />
                {activeData ? activeData.name : 'Select a Region'}
              </CardTitle>
              <CardDescription>
                {activeData ? 'Regional performance metrics' : 'Click a province on the map'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {activeData ? (
                  <motion.div 
                    key={activeData.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Active Loans</p>
                        <p className="text-xl font-bold">{activeData.activeLoans.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Risk Score</p>
                        <p className={`text-xl font-bold ${getRiskScore(activeData.id) > 0.1 ? 'text-destructive' : 'text-emerald-500'}`}>
                          {(getRiskScore(activeData.id) * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Overdue Loans</p>
                        <p className="text-xl font-bold">{activeData.overdueLoans.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Missing KYC</p>
                        <p className="text-xl font-bold text-amber-500">{activeData.missingKYC.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Users className="w-4 h-4" /> Active Branches & Officers
                      </h4>
                      {activeData.branches.map((b, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                          <div>
                            <p className="font-medium text-sm">{b.name}</p>
                            <p className="text-xs text-muted-foreground">{b.officer}</p>
                          </div>
                          <Badge variant="outline">View</Badge>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-48 flex flex-col items-center justify-center text-muted-foreground text-center px-4">
                    <MapIcon className="w-12 h-12 mb-4 opacity-20" />
                    <p className="text-sm">Select a province on the heatmap to view branch-level risk exposure and officer performance.</p>
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
