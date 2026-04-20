"use client";

import { useState } from "react";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, ShieldAlert, TrendingDown, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialData = [
  { subject: 'KYC Score', A: 120, fullMark: 150 },
  { subject: 'Jurisdiction', A: 98, fullMark: 150 },
  { subject: 'Transaction Vol', A: 86, fullMark: 150 },
  { subject: 'PEP Match', A: 99, fullMark: 150 },
  { subject: 'Account Age', A: 85, fullMark: 150 },
  { subject: 'Activity Freq', A: 65, fullMark: 150 },
];

export default function RiskAssessmentPage() {
  const [data, setData] = useState(initialData);
  const [isRescoring, setIsRescoring] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSliderChange = (index: number, value: number[]) => {
    const newData = [...data];
    newData[index].A = value[0];
    setData(newData);
  };

  const handleRescore = () => {
    setIsRescoring(true);
    setTimeout(() => {
      setIsRescoring(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  const resetValues = () => {
    setData(initialData);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Assessment</h1>
          <p className="text-muted-foreground">Adjust system-wide risk parameters and simulate portfolio re-scoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={resetValues} className="gap-2">
            <RotateCcw className="w-4 h-4" /> Reset
          </Button>
          <Button 
            disabled={isRescoring} 
            onClick={handleRescore} 
            className="gap-2 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
          >
            {isRescoring ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <RotateCcw className="w-4 h-4" />
              </motion.div>
            ) : <Play className="w-4 h-4" />}
            Run Portfolio Re-scoring
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-xl flex items-center gap-3">
              <ShieldAlert className="w-5 h-5" />
              <span className="font-medium text-sm">Portfolio re-scoring completed successfully. 12,402 profiles updated.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Controls */}
        <Card className="lg:col-span-5 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Risk Parameters</CardTitle>
            <CardDescription>Calibrate the weight of each assessment vector</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {data.map((item, index) => (
              <div key={item.subject} className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium flex items-center gap-2">
                    {item.subject}
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </span>
                  <Badge variant="secondary" className="font-mono">
                    {item.A}%
                  </Badge>
                </div>
                <Slider
                  value={[item.A]}
                  max={150}
                  step={1}
                  onValueChange={(val) => handleSliderChange(index, val)}
                  className="py-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: Visualization */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="h-full bg-card/50 backdrop-blur-sm border-border overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Portfolio Risk Map</CardTitle>
                <CardDescription>Aggregate profile of current assessments</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">72.4</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                  <TrendingDown className="w-3 h-3 text-emerald-500" /> -4.2% vs last rescore
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="Risk Profile"
                    dataKey="A"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
