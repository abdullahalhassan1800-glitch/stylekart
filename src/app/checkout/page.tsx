"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/context/toast-context";
import { useAuth } from "@/context/auth-context";
import EmptyState from "@/components/ui/empty-state";
import { addOrder } from "@/lib/orders-store";
import { formatPrice } from "@/lib/format";
import type { Order, OrderLine } from "@/lib/types";
import { IconCheck, IconClock, IconTag, IconTruck } from "@/components/ui/icons";

type PaymentMethod = {
  id: string;
  label: string;
  disabled?: boolean;
  note?: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "upi", label: "UPI (GPay, PhonePe, Paytm)" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "netbanking", label: "Net Banking" },
  {
    id: "cod",
    label: "Cash on Delivery",
    disabled: true,
  },
];

const UPI_HANDLES: Record<string, string> = {
  okhdfc: "HDFC Bank",
  okicici: "ICICI Bank",
  okaxis: "Axis Bank",
  oksbi: "State Bank of India",
  ybl: "PhonePe",
  ibl: "PhonePe",
  paytm: "Paytm UPI",
  apl: "Google Pay",
  axl: "Axis Bank",
  upi: "BHIM UPI",
  fbl: "Flipkart UPI",
  icici: "ICICI Bank",
  hdfc: "HDFC Bank",
  axis: "Axis Bank",
  sbi: "State Bank of India",
  kotak: "Kotak Mahindra Bank",
  airtel: "Airtel Payments Bank",
  jio: "Jio Payments Bank",
};

export default function CheckoutPage() {
  const { lines, hydrated, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [payment, setPayment] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [upiState, setUpiState] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(90);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const sessionExpired = secondsLeft === 0;
  useEffect(() => {
    if (sessionExpired) {
      showToast("Payment session expired. Please refresh to continue.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionExpired]);

  const priceTotal = lines.reduce((sum, line) => sum + line.product.price * line.qty, 0);
  const delivery = priceTotal >= 999 ? 0 : 79;
  const upiValid = /^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim());

  if (!hydrated) {
    return null;
  }

  if (orderId) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <div className="grid size-16 place-items-center rounded-full bg-green-100 text-green-700">
          <IconCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold text-gray-900">
          Order Placed Successfully
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-bold text-gray-900">{orderId}</span>
        </p>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          Your order will be delivered to {city || "your address"} in 3-5 business
          days.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/orders"
            className="rounded bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
          >
            View Order History
          </Link>
          <Link
            href="/shop/all"
            className="rounded border border-brand px-8 py-3 text-sm font-bold uppercase tracking-wide text-brand transition hover:bg-pink-50"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your bag is empty"
        message="Add items to your bag before placing an order."
        actionLabel="SHOP NOW"
        actionHref="/shop/all"
      />
    );
  }

  const onPlaceOrder = (event: FormEvent) => {
    event.preventDefault();
    if (
      !name.trim() ||
      !/^\d{10}$/.test(phone) ||
      !/^\d{6}$/.test(pincode) ||
      !address.trim() ||
      !city.trim() ||
      !state.trim()
    ) {
      showToast("Please fill all the details correctly");
      return;
    }
    if (payment === "upi") {
      if (!upiValid) {
        showToast("Please enter a valid UPI ID");
        return;
      }
      if (upiState !== "verified") {
        showToast("Please verify your UPI ID");
        return;
      }
    }
    if (payment === "card") {
      const digits = cardNumber.replace(/\s/g, "");
      const expiryOk = /^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry);
      if (
        !/^\d{16}$/.test(digits) ||
        !cardName.trim() ||
        !expiryOk ||
        !/^\d{3}$/.test(cardCvv)
      ) {
        showToast("Please enter valid card details");
        return;
      }
    }
    if (payment === "netbanking" && !bank) {
      showToast("Please select your bank");
      return;
    }
    const id = `SK${Math.floor(100000 + Math.random() * 900000)}`;
    const orderLines: OrderLine[] = lines.map((line) => ({
      productId: line.product.id,
      name: line.product.name,
      brand: line.product.brand,
      image: line.product.images[0],
      size: line.size,
      price: line.product.price,
      qty: line.qty,
    }));
    const order: Order = {
      id,
      placedAt: new Date().toISOString(),
      lines: orderLines,
      total: priceTotal + delivery,
      payment: PAYMENT_METHODS.find((method) => method.id === payment)?.label ?? "UPI",
    };
    addOrder(order);
    setOrderId(id);
    clearCart();
    showToast("Order placed successfully");
  };

  const onVerifyUpi = () => {
    if (!upiValid) {
      showToast("Please enter a valid UPI ID");
      return;
    }
    setUpiState("verifying");
    window.setTimeout(() => {
      const handle = upiId.split("@")[1]?.toLowerCase() ?? "";
      setUpiState(handle in UPI_HANDLES ? "verified" : "failed");
    }, 900);
  };

  const inputClass =
    "w-full rounded border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand";

  return (
    <form
      onSubmit={onPlaceOrder}
      className="mx-auto max-w-2xl px-4 py-8"
    >
      <h1 className="mb-6 text-lg font-extrabold uppercase tracking-wide text-gray-900">
        Checkout
      </h1>

      <section
        className={`mb-6 flex items-center justify-between rounded-lg border px-4 py-3 ${
          sessionExpired ? "border-red-200 bg-red-50" : "border-brand bg-pink-50"
        }`}
      >
        <span
          className={`flex items-center gap-2 text-sm font-bold ${
            sessionExpired ? "text-red-700" : "text-brand"
          }`}
        >
          <IconClock className="h-4 w-4" />
          {sessionExpired ? "Payment session expired" : "Complete your payment in"}
        </span>
        <span
          className={`text-lg font-extrabold tabular-nums ${
            sessionExpired
              ? "text-red-700"
              : secondsLeft <= 10
                ? "text-red-600"
                : "text-ink"
          }`}
        >
          {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
          {String(secondsLeft % 60).padStart(2, "0")}
        </span>
      </section>

      <section className="mb-6 rounded-lg border border-gray-200 p-5">
        <p className="mb-4 text-sm font-extrabold uppercase text-gray-500">
          Contact Details
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="Mobile Number"
            inputMode="numeric"
            className={inputClass}
          />
        </div>
      </section>

      <section className="mb-6 rounded-lg border border-gray-200 p-5">
        <p className="mb-4 text-sm font-extrabold uppercase text-gray-500">Address</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            value={pincode}
            onChange={(event) => setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Pincode"
            inputMode="numeric"
            className={inputClass}
          />
          <input
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="City"
            className={inputClass}
          />
          <input
            value={state}
            onChange={(event) => setState(event.target.value)}
            placeholder="State"
            className={inputClass}
          />
          <div className="sm:col-span-2">
            <textarea
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Address (House No, Street, Area)"
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-lg border border-gray-200 p-5">
        <p className="mb-4 text-sm font-extrabold uppercase text-gray-500">
          Payment Methods
        </p>
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => {
            const isDisabled = method.disabled === true;
            const pincodeReady = /^\d{6}$/.test(pincode);
            const note =
              method.id === "cod"
                ? pincodeReady
                  ? "Not available at your pincode"
                  : undefined
                : method.note;
            return (
              <div key={method.id}>
                <label
                  className={`flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm transition ${
                    isDisabled
                      ? "bg-gray-50 text-gray-400"
                      : "cursor-pointer text-gray-800 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    disabled={isDisabled}
                    className="size-4 accent-brand"
                  />
                  <span className="flex-1">{method.label}</span>
                  {isDisabled && note ? (
                    <span
                      className={`text-xs font-semibold ${
                        method.id === "cod" && pincodeReady
                          ? "text-red-500"
                          : "text-gray-400"
                      }`}
                    >
                      {note}
                    </span>
                  ) : null}
                </label>
                {method.id === "upi" && payment === "upi" && (
                  <div className="mt-2">
                    <div className="flex gap-2">
                      <input
                        value={upiId}
                        onChange={(event) => {
                          setUpiId(event.target.value);
                          if (upiState !== "idle") {
                            setUpiState("idle");
                          }
                        }}
                        placeholder="Enter UPI ID (e.g., yourname@okbank)"
                        className={`${inputClass} flex-1 ${
                          upiState === "verified"
                            ? "border-green-500 focus:border-green-500"
                            : upiState === "failed" || (upiId.trim() !== "" && !upiValid)
                              ? "border-red-400 focus:border-red-400"
                              : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={onVerifyUpi}
                        disabled={upiState === "verifying" || upiId.trim() === ""}
                        className={`shrink-0 rounded border px-4 text-xs font-extrabold uppercase tracking-wide transition ${
                          upiState === "verified"
                            ? "cursor-default border-green-600 bg-green-50 text-green-700"
                            : "border-brand text-brand hover:bg-pink-50 disabled:opacity-50"
                        }`}
                      >
                        {upiState === "verified"
                          ? "Verified"
                          : upiState === "verifying"
                            ? "Verifying..."
                            : "Verify"}
                      </button>
                    </div>
                    {upiState === "verifying" ? (
                      <p className="mt-1 text-xs font-medium text-gray-500">
                        Checking your UPI ID...
                      </p>
                    ) : null}
                    {upiState === "verified" ? (
                      <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-green-700">
                        <IconCheck className="h-3.5 w-3.5" /> UPI ID verified ·{" "}
                        {UPI_HANDLES[upiId.split("@")[1]?.toLowerCase() ?? ""] ?? "UPI"}
                      </p>
                    ) : null}
                    {upiState === "failed" ? (
                      <p className="mt-1 text-xs font-semibold text-red-500">
                        UPI ID not found. Please check and try again.
                      </p>
                    ) : null}
                    {upiState === "idle" && upiId.trim() !== "" && !upiValid ? (
                      <p className="mt-1 text-xs font-semibold text-red-500">
                        Please enter a valid UPI ID
                      </p>
                    ) : null}
                  </div>
                )}
                {method.id === "card" && payment === "card" && (
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    <input
                      value={cardNumber}
                      onChange={(event) =>
                        setCardNumber(
                          event.target.value
                            .replace(/\D/g, "")
                            .slice(0, 16)
                            .replace(/(\d{4})(?=\d)/g, "$1 "),
                        )
                      }
                      placeholder="Card Number"
                      inputMode="numeric"
                      className={`${inputClass} sm:col-span-2`}
                    />
                    <input
                      value={cardName}
                      onChange={(event) => setCardName(event.target.value)}
                      placeholder="Name on Card"
                      className={`${inputClass} sm:col-span-2`}
                    />
                    <input
                      value={cardExpiry}
                      onChange={(event) => {
                        const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                        setCardExpiry(
                          digits.length > 2
                            ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                            : digits,
                        );
                      }}
                      placeholder="Expiry (MM/YY)"
                      inputMode="numeric"
                      className={inputClass}
                    />
                    <input
                      value={cardCvv}
                      onChange={(event) =>
                        setCardCvv(event.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      placeholder="CVV"
                      type="password"
                      inputMode="numeric"
                      className={inputClass}
                    />
                  </div>
                )}
                {method.id === "netbanking" && payment === "netbanking" && (
                  <select
                    value={bank}
                    onChange={(event) => setBank(event.target.value)}
                    className={`${inputClass} mt-2`}
                  >
                    <option value="">Select your bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>Bank of Baroda</option>
                    <option>Punjab National Bank</option>
                    <option>Canara Bank</option>
                    <option>Union Bank of India</option>
                    <option>IDFC First Bank</option>
                  </select>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="mb-6 space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span>{formatPrice(priceTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className={delivery === 0 ? "font-bold text-green-700" : ""}>
            {delivery === 0 ? "FREE" : formatPrice(delivery)}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
          <span>Total Payable</span>
          <span>{formatPrice(priceTotal + delivery)}</span>
        </div>
        <p className="flex items-center gap-2 pt-1 text-xs text-gray-500">
          <IconTruck className="h-4 w-4 text-brand" /> Free delivery on orders above ₹999
          <IconTag className="ml-2 h-4 w-4 text-brand" /> 14-day easy returns
        </p>
      </div>

      <button
        type="submit"
        disabled={sessionExpired}
        className={`w-full rounded py-3.5 text-sm font-bold uppercase tracking-wide text-white transition ${
          sessionExpired
            ? "cursor-not-allowed bg-gray-400"
            : "bg-brand hover:bg-brand-dark"
        }`}
      >
        {sessionExpired
          ? "Session Expired"
          : `Pay ${formatPrice(priceTotal + delivery)} & Place Order`}
      </button>
    </form>
  );
}
