"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Menu, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import User from "@/components/layout/header/user";
import Sidebar from "./_components/sidebar";
import { useAuthStore } from "@/stores/auth-store";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Effect for handling initial state
  useEffect(() => {
    // Get sidebar state from localStorage
    const savedSidebarState = localStorage.getItem("sidebarOpen");
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  // Save sidebar state to localStorage when it changes
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    localStorage.setItem("sidebarOpen", JSON.stringify(newState));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-sky-100/50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="mt-4 text-2xl font-bold text-blue-700">
            Y tế học đường
          </p>
          <p className="text-sky-500 mt-2">Đang tải dữ liệu, vui lòng chờ...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-all duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "lg:ml-0"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background  pl-2 pr-4 md:pr-6">
          <div className="flex items-center gap-4">
            <div
              onClick={toggleSidebar}
              className=" size-10 flex justify-center items-center hover:bg-slate-100 rounded-md"
            >
              {isSidebarOpen ? <ChevronLeft size={25} /> : <Menu size={25} />}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <User />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
