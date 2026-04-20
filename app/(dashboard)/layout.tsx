"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopHeader } from "@/components/top-header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex-1 flex flex-col w-full h-full min-h-screen">
        <TopHeader />
        <div className="flex-1 overflow-auto bg-background p-6 md:p-8">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
