"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface OTPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVerify: (otp: string) => Promise<void>;
  onResend: () => Promise<void>;
}

export function OTPDialog({
  open,
  onOpenChange,
  onVerify,
  onResend,
}: OTPDialogProps) {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    try {
      await onResend();
      toast({
        title: "Đã gửi lại mã OTP",
        description: "Vui lòng kiểm tra email của bạn",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Không thể gửi lại mã OTP",
        description: "Vui lòng thử lại sau ít phút",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Xác thực OTP</DialogTitle>
          <DialogDescription>
            Vui lòng nhập mã OTP 6 chữ số đã được gửi đến email của bạn.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <InputOTP
            maxLength={6}
            value={otp}
            onChange={async (value) => {
              setOtp(value);
              setError(null); // Auto verify when all 6 digits are entered
              if (value.length === 6) {
                setIsVerifying(true);
                try {
                  console.log("Attempting to verify OTP:", value);
                  await onVerify(value);
                  console.log("OTP verification successful");
                } catch (err) {
                  console.error("OTP verification error:", err);
                  setError("Mã OTP không chính xác. Vui lòng thử lại.");
                  setIsVerifying(false);
                }
              }
            }}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, idx) => (
                  <InputOTPSlot key={idx} {...slot} />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handleResend}
            variant="outline"
            disabled={isVerifying}
            className="w-full sm:w-auto"
          >
            Gửi lại mã
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
