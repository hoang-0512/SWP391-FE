import { fetchData } from "../api";
import { LoginRequestCredentials, TokenResponse } from "@/lib/type/auth";
import { handleTokenLoginSuccess, setAuthToken } from "./token";

const requestParentLoginOTP = (
  credentials: LoginRequestCredentials
): Promise<{ message: string }> => {
  return fetchData<{ message: string }>("/auth/login-parent", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

const loginParentOTP = async (email: string, otp: string): Promise<boolean> => {
  try {
    // API mới chỉ trả về token
    const data = await fetchData<TokenResponse>(`/auth/login-parent/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!data || !data.token) {
      throw new Error("OTP verification failed");
    }

    // Lưu token
    handleTokenLoginSuccess(data.token);
    console.log("Token saved successfully after OTP verification");

    return true;
  } catch (error) {
    console.error("OTP verification error:", error);
    return false;
  }
};

export { requestParentLoginOTP, loginParentOTP };
