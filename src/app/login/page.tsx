"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import { IconChevronRight } from "@/components/ui/icons";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<1 | 2>(1);

  const onContinue = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) {
      showToast("Please enter your name");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      showToast("Please enter a valid 10-digit mobile number");
      return;
    }
    setStep(2);
  };

  const onVerify = (event: FormEvent) => {
    event.preventDefault();
    if (otp !== "1234") {
      showToast("Invalid OTP. Hint: use 1234");
      return;
    }
    login({ name: name.trim(), phone });
    showToast(`Welcome, ${name.trim()}!`);
    router.push("/");
  };

  const inputClass =
    "w-full rounded border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <div className="flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        {step === 1 ? (
          <form onSubmit={onContinue}>
            <h1 className="text-2xl font-extrabold text-brand">
              Login<span className="text-gray-900">/Signup</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Fashion that fits you — welcome to StyleKart.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-600">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-gray-600">
                  Mobile Number
                </label>
                <input
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  className={inputClass}
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              By continuing, I agree to the{" "}
              <span className="font-bold text-brand">Terms of Use</span> &{" "}
              <span className="font-bold text-brand">Privacy Policy</span>
            </p>
            <button
              type="submit"
              className="mt-6 w-full rounded bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
            >
              Continue
            </button>
            <p className="mt-4 text-center text-xs text-gray-500">
              Have a problem?{" "}
              <Link href="/shop/all" className="font-bold text-brand">
                Continue shopping
              </Link>
            </p>
          </form>
        ) : (
          <form onSubmit={onVerify}>
            <h1 className="text-2xl font-extrabold text-brand">Verify OTP</h1>
            <p className="mt-2 text-sm text-gray-500">
              OTP sent to +91 {phone}{" "}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-bold text-brand"
              >
                CHANGE
              </button>
            </p>
            <p className="mt-4 rounded-lg bg-pink-50 px-3 py-2 text-xs font-medium text-brand">
              Hint: use OTP 1234
            </p>
            <div className="mt-4">
              <label className="mb-1 block text-xs font-bold uppercase text-gray-600">
                Enter OTP
              </label>
              <input
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="4-digit OTP"
                inputMode="numeric"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
            >
              Verify <IconChevronRight className="inline h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
