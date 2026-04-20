"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Bell, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function TopHeader() {
  const router = useRouter();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur top-0 sticky z-50 flex items-center justify-between px-6 shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Badge variant="outline" className="hidden sm:inline-flex text-[10px] bg-muted/50 uppercase tracking-wider text-muted-foreground border-border">
          RegTech Beta
        </Badge>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search NRC, Name, or Alert ID..." 
            className="w-full h-9 rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive border-2 border-card"></span>
        </Button>
        <div className="flex items-center gap-2 pl-4 border-l border-border">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold leading-none">C. Mulenga</span>
            <span className="text-xs text-muted-foreground">MLRO</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            CM
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => router.push("/login")}
            title="Log out"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
