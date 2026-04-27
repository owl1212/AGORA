"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const images = [
  "/images/login/slide1.jpg",
  "/images/login/slide2.jpg",
  "/images/login/slide3.jpg",
  "/images/login/slide4.jpg",
];

export default function LoginPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen w-full flex bg-[#373435]">
      {/* Left side - Dark & Abstract */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#1A1C1A] items-end p-12">
        {/* Slideshow background */}
        <div className="absolute inset-0 z-0 bg-[#1A1C1A]">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={images[currentImageIndex]}
                alt="Login background slide"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1A] via-[#1A1C1A]/20 to-transparent z-10"></div>
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
          <div className="py-2">
            <span className="text-lg font-bold text-white tracking-wide">AGORA MICROFINANCE ZAMBIA</span>
          </div>
          <span className="text-xs text-white/40">© Agora Microfinance Zambia 2026</span>
        </div>
      </div>

      {/* Right side - White Container */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-24">
        <div className="w-full max-w-md mx-auto">
          {/* Top text */}
          <div className="mt-16 mb-10 flex flex-col items-center text-center">
            <Image 
              src="/amz-logo.png" 
              alt="AMZ Logo" 
              width={220} 
              height={70} 
              className="object-contain mb-4"
              priority
            />
            <p className="text-[#606760] text-sm">Financial Inclusion & Compliance Platform</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-[40px] leading-[1.1] font-bold text-[#373435] tracking-tight mb-12 text-center">
              Welcome, login to <br /> your account.
            </h1>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#373435] ml-2 block">
                  Username or Email Address:
                </label>
                <input 
                  type="text" 
                  className="w-full h-12 rounded-full bg-[#F1F3F1] border-0 px-6 text-[#373435] placeholder:text-[#9CA39C] focus:ring-2 focus:ring-[#046939] outline-none transition-all"
                  placeholder="name@domain.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#373435] ml-2 block">
                  Password:
                </label>
                <input 
                  type="password" 
                  className="w-full h-12 rounded-full bg-[#F1F3F1] border-0 px-6 text-[#373435] placeholder:text-[#9CA39C] focus:ring-2 focus:ring-[#046939] outline-none transition-all"
                  placeholder="Your Password"
                  required
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button 
                  type="submit" 
                  className="rounded-full bg-[#373435] hover:bg-[#373435]/90 text-white h-12 px-8 font-medium text-base transition-transform hover:scale-105"
                >
                  Sign In Here
                </Button>

                <Link href="#" className="text-sm font-medium text-[#373435] hover:underline underline-offset-4">
                  Lost your password?
                </Link>
              </div>
            </form>
          </motion.div>

          <div className="mt-32">
            <p className="text-xs text-[#9CA39C]">www.amz.com.zm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
