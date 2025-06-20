"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParentLoginForm } from "./_components/parent-login";
import { StaffLoginForm } from "./_components/staff-login";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { AdminLoginForm } from "./_components/admin-login";

export default function LoginPage() {
  const router = useRouter();
  const { profile, user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(profile, user, isAuthenticated);
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-red-500" />
        <span className="text-2xl font-bold text-blue-900">Y Tế Học Đường</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-900">
            Đăng nhập vào tài khoản
          </h1>
          <p className="text-blue-800/60 mt-2">
            Nhập thông tin đăng nhập của bạn để truy cập hệ thống
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border border-blue-100">
          <CardContent className="pt-6">
            <Tabs defaultValue="parent" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-blue-50 p-1">
                <TabsTrigger
                  value="parent"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-900 data-[state=active]:shadow-sm"
                >
                  Phụ huynh
                </TabsTrigger>
                <TabsTrigger
                  value="staff"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-900 data-[state=active]:shadow-sm"
                >
                  Nhân viên y tế
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-900 data-[state=active]:shadow-sm"
                >
                  Nhân viên quản lý
                </TabsTrigger>
              </TabsList>
              <TabsContent value="parent">
                <ParentLoginForm />
              </TabsContent>
              <TabsContent value="staff">
                <StaffLoginForm />
              </TabsContent>
              <TabsContent value="admin">
                <AdminLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Link
        href="/"
        className="mt-6 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2"
      >
        ← Quay về trang chủ
      </Link>
    </div>
  );
}
