import { Heart, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, adminNavLinks } from "../_constants/sidebar";
import { cn } from "@/lib/utils";

import { useAuthStore } from "@/stores/auth-store";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user, role } = useAuthStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 transform border-r bg-background transition-all duration-200 ease-in-out bg-blue-50 overflow-y-auto scrollbar-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 border-b border-blue-200 pb-4 group"
        >
          <div className="relative p-2 rounded-xl bg-gradient-to-br from-red-400 to-red-600 shadow-lg group-hover:shadow-xl transition-all duration-300">
            <Heart className="h-7 w-7 text-white transition-all duration-300 group-hover:scale-110" />
          </div>
          <div>
            <div className="font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent text-lg">
              Y Tế Học Đường
            </div>
            <div className="text-xs text-blue-500 font-medium opacity-80">
              Hệ thống quản lý y tế
            </div>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-700 text-xs mt-1"
            >
              <Shield className="mr-1 h-3 w-3" />
              {role === "admin" ? "Quản trị viên" : "Nhân viên y tế"}
            </Badge>
          </div>
        </Link>

        <nav className="grid gap-1 text-sm font-medium overflow-y-auto">
          <div className="text-xs font-medium text-blue-500 uppercase tracking-wider mb-2 mt-2">
            Quản lý hệ thống
          </div>
          {adminNavLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-lg px-4 py-3 text-blue-700 transition-all hover:text-blue-900 hover:bg-blue-100 group border border-transparent hover:border-blue-200 ${
                  isActive ? "bg-blue-100" : ""
                }`}
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-blue-600 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}

          {/* Standard navigation links */}
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 rounded-lg px-4 py-3 text-blue-700 transition-all hover:text-blue-900 hover:bg-blue-100 group border border-transparent hover:border-blue-200 ${
                  isActive ? "bg-blue-100" : ""
                }`}
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-blue-600 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
