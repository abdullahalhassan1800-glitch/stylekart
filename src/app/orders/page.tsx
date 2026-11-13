"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { useToast } from "@/context/toast-context";
import EmptyState from "@/components/ui/empty-state";
import { ordersStore } from "@/lib/orders-store";
import { formatDate, formatPrice } from "@/lib/format";
import { IconBag } from "@/components/ui/icons";

export default function OrdersPage() {
  const orders = useSyncExternalStore(
    ordersStore.subscribe,
    ordersStore.getSnapshot,
    ordersStore.getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(
    ordersStore.subscribe,
    () => true,
    () => false,
  );
  const { showToast } = useToast();

  if (!hydrated) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="When you place an order, it will show up here with all the details."
        actionLabel="START SHOPPING"
        actionHref="/shop/all"
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 flex items-center gap-2 text-lg font-extrabold uppercase tracking-wide text-gray-900">
        <IconBag className="h-5 w-5 text-brand" /> My Orders ({orders.length})
      </h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="overflow-hidden rounded-lg border border-gray-200"
          >
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3">
              <div>
                <p className="text-sm font-bold text-gray-900">ORDER #{order.id}</p>
                <p className="text-xs text-gray-500">
                  Placed on {formatDate(order.placedAt)}
                </p>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-green-700">
                Processing
              </span>
            </header>

            <div className="divide-y divide-gray-100">
              {order.lines.map((line) => (
                <div
                  key={`${line.productId}-${line.size}`}
                  className="flex gap-3 px-4 py-3"
                >
                  <Link
                    href={`/product/${line.productId}`}
                    className="shrink-0 overflow-hidden bg-gray-100"
                  >
                    <img
                      src={line.image}
                      alt={`${line.brand} ${line.name}`}
                      loading="lazy"
                      className="h-24 w-[72px] object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/product/${line.productId}`}
                      className="text-sm font-bold text-gray-900 hover:text-brand"
                    >
                      {line.brand}
                    </Link>
                    <p className="truncate text-xs text-gray-500">{line.name}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Size: {line.size} · Qty: {line.qty}
                    </p>
                    <p className="mt-1.5 text-sm font-bold text-gray-900">
                      {formatPrice(line.price * line.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 px-4 py-3 text-sm">
              <p className="text-gray-600">
                Total: <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                <span className="text-gray-400"> · </span>
                {order.payment}
              </p>
              <button
                type="button"
                onClick={() => showToast("Tracking will be available once your order ships")}
                className="text-xs font-bold uppercase tracking-wide text-brand"
              >
                Track Order
              </button>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
