"use client";

import { Home, AlertOctagon, FileSearch, Users, Shield, FileText, Activity, TrendingUp, Settings2, HandCoins } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ShieldAlert } from "lucide-react";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Alerts Queue", url: "/alerts", icon: AlertOctagon },
  { title: "Case Management", url: "/cases", icon: FileSearch },
  { title: "Customer 360", url: "/customers", icon: Users },
  { title: "Non-Deposit Taking", url: "/non-deposit", icon: HandCoins },
  { title: "Risk Assessment", url: "/risk-assessment", icon: TrendingUp },
  { title: "Watchlist Screening", url: "/screening", icon: Shield },
  { title: "STR Reports", url: "/reports", icon: FileText },
  { title: "Transactions", url: "/transactions", icon: Activity },
  { title: "Administration", url: "/admin", icon: Settings2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" className="border-r border-border bg-sidebar h-screen">
      <SidebarHeader className="border-b border-border flex items-center justify-center h-16 bg-white">
        <div className="flex items-center justify-center w-full h-full">
          <Image 
            src="/amz-logo.png" 
            alt="AMZ Logo" 
            width={80} 
            height={26} 
            className="object-contain"
            priority
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-white/50 mt-4 mb-2">
            Compliance Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="data-[active=true]:bg-white/15 data-[active=true]:text-white data-[active=true]:font-bold transition-all hover:bg-white/10"
                  >
                    <Link href={item.url} className="flex items-center gap-3 space-y-0.5 py-2">
                      <item.icon className="w-4 h-4 ml-2" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
