"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct } from "@/data/products";
import { LocalStore } from "@/lib/local-store";

interface WishlistContextValue {
  ids: string[];
  count: number;
  hydrated: boolean;
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  add: (productId: string) => void;
  remove: (productId: string) => void;
}

const EMPTY: string[] = [];
const STORAGE_KEY = "stylekart-wishlist";

const WishlistContext = createContext<WishlistContextValue | null>(null);

function validateIds(parsed: unknown): string[] | null {
  if (!Array.isArray(parsed)) return null;
  return parsed.filter(
    (id): id is string => typeof id === "string" && getProduct(id) !== undefined,
  );
}

const wishlistStore = new LocalStore<string[]>(STORAGE_KEY, EMPTY, validateIds);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const ids = useSyncExternalStore(
    wishlistStore.subscribe,
    wishlistStore.getSnapshot,
    wishlistStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    wishlistStore.subscribe,
    () => true,
    () => false,
  );

  const has = (productId: string) => ids.includes(productId);

  const add = (productId: string) => {
    if (!ids.includes(productId)) {
      wishlistStore.set([...ids, productId]);
    }
  };

  const remove = (productId: string) => {
    wishlistStore.set(ids.filter((id) => id !== productId));
  };

  const toggle = (productId: string) => {
    wishlistStore.set(
      ids.includes(productId)
        ? ids.filter((id) => id !== productId)
        : [...ids, productId],
    );
  };

  return (
    <WishlistContext.Provider
      value={{ ids, count: ids.length, hydrated, has, toggle, add, remove }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
