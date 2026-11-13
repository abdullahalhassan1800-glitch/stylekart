"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-context";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/context/toast-context";
import { WishlistProvider } from "@/context/wishlist-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
