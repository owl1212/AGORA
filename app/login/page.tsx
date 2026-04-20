"use client";

import { Button } from "@/components/ui/button";
import { ShieldAlert, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#110E17]">
      {/* Left side - Dark & Abstract */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#0A080C] items-end p-12">
        {/* Abstract background simulation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <svg viewBox="0 0 800 1000" preserveAspectRatio="none" className="w-full h-full text-white/5" fill="currentColor">
              <path d="M0,0 L800,0 L800,1000 L0,1000 Z" fill="none" />
              <path d="M-100,500 Q300,100 800,900" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-50" />
              <path d="M-100,600 Q300,200 800,1000" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-30" />
              <path d="M-100,700 Q300,300 800,1100" stroke="currentColor" strokeWidth="8" fill="none" className="opacity-10" />
              <path d="M-100,300 Q400,-100 900,700" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-40" />
              <path d="M-100,400 Q400,0 900,800" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-20" />
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A080C] 80% to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A080C] 0% via-transparent to-black/30"></div>
        </div>

        {/* Top left badge */}
        <div className="absolute top-10 left-10 z-10">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Compliance Portal</p>
              <p className="text-white/50 text-[10px]">Authorised personnel only</p>
            </div>
          </div>
        </div>

        {/* Bottom left branding */}
        <div className="z-10 w-full flex justify-between items-end">
          <div className="flex items-center gap-3">
            <div className="bg-[#D5FB3D] text-[#110E17] p-2 rounded-xl">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <span className="font-bold text-3xl tracking-tight text-white">ZICE</span>
          </div>
          <span className="text-xs text-white/40">© ZICE Integration 2024</span>
        </div>
      </div>

      {/* Right side - White Container */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Top text */}
          <div className="mb-16">
            <p className="text-[#110E17] font-semibold text-sm">Zambia Integrated Compliance Ecosystem™</p>
            <p className="text-[#7E84A3] text-sm">RegTech Adjudication Platform</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[40px] leading-[1.1] font-bold text-[#110E17] tracking-tight mb-12">
              Welcome, login to <br /> your account.
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#110E17] ml-2 block">
                  Username or Email Address:
                </label>
                <input 
                  type="text" 
                  className="w-full h-12 rounded-full bg-[#F2F6FA] border-0 px-6 text-[#110E17] placeholder:text-[#B6BAD0] focus:ring-2 focus:ring-[#D5FB3D] outline-none transition-all"
                  placeholder="name@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#110E17] ml-2 block">
                  Password:
                </label>
                <input 
                  type="password" 
                  className="w-full h-12 rounded-full bg-[#F2F6FA] border-0 px-6 text-[#110E17] placeholder:text-[#B6BAD0] focus:ring-2 focus:ring-[#D5FB3D] outline-none transition-all"
                  placeholder="Your Password"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#110E17] hover:bg-[#110E17]/90 text-white h-12 px-8 font-medium text-base transition-transform hover:scale-105"
                >
                  Sign In Here
                </Button>

                <Link href="#" className="text-sm font-medium text-[#110E17] hover:underline underline-offset-4">
                  Lost your password?
                </Link>
              </div>
            </form>
          </motion.div>

          <div className="mt-32">
            <p className="text-xs text-[#B6BAD0]">www.ziceplatform.zm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
