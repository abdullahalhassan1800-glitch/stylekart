"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import { LocalStore } from "@/lib/local-store";
import type { Product } from "@/lib/types";

export interface CartItem {
  productId: string;
  size: string;
  qty: number;
}

export interface CartLine extends CartItem {
  product: Product;
  key: string;
}

interface CartContextValue {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  hydrated: boolean;
  addItem: (productId: string, size: string, qty?: number) => void;
  updateQty: (productId: string, size: string, qty: number) => void;
  removeItem: (productId: string, size: string) => void;
  clearCart: () => void;
}

const EMPTY: CartItem[] = [];
const STORAGE_KEY = "stylekart-cart";

const CartContext = createContext<CartContextValue | null>(null);

function isValidEntry(entry: unknown): entry is CartItem {
  if (typeof entry !== "object" || entry === null) return false;
  const entryRecord = entry as Record<string, unknown>;
  return (
    typeof entryRecord.productId === "string" &&
    typeof entryRecord.size === "string" &&
    typeof entryRecord.qty === "number" &&
    entryRecord.qty > 0 &&
    getProduct(entryRecord.productId) !== undefined
  );
}

function validateCart(parsed: unknown): CartItem[] | null {
  if (!Array.isArray(parsed)) return null;
  return parsed.filter(isValidEntry);
}

const cartStore = new LocalStore<CartItem[]>(STORAGE_KEY, EMPTY, validateCart);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    cartStore.subscribe,
    () => true,
    () => false,
  );

  const addItem = (productId: string, size: string, qty = 1) => {
    const index = items.findIndex(
      (item) => item.productId === productId && item.size === size,
    );
    if (index === -1) {
      cartStore.set([...items, { productId, size, qty }]);
      return;
    }
    const next = [...items];
    next[index] = { ...next[index], qty: next[index].qty + qty };
    cartStore.set(next);
  };

  const updateQty = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      cartStore.set(
        items.filter((item) => !(item.productId === productId && item.size === size)),
      );
      return;
    }
    cartStore.set(
      items.map((item) =>
        item.productId === productId && item.size === size ? { ...item, qty } : item,
      ),
    );
  };

  const removeItem = (productId: string, size: string) => {
    cartStore.set(
      items.filter((item) => !(item.productId === productId && item.size === size)),
    );
  };

  const clearCart = () => cartStore.set(EMPTY);

  const lines = useMemo<CartLine[]>(() => {
    const result: CartLine[] = [];
    for (const item of items) {
      const product = getProduct(item.productId);
      if (product) {
        result.push({ ...item, product, key: `${item.productId}:${item.size}` });
      }
    }
    return result;
  }, [items]);

  const count = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items],
  );

  return (
    <CartContext.Provider
      value={{ items, lines, count, hydrated, addItem, updateQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
