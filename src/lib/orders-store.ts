import { LocalStore } from "@/lib/local-store";
import type { Order, OrderLine } from "@/lib/types";

const STORAGE_KEY = "stylekart-orders";
const EMPTY: Order[] = [];

function isValidLine(value: unknown): value is OrderLine {
  if (typeof value !== "object" || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === "string" &&
    typeof line.name === "string" &&
    typeof line.brand === "string" &&
    typeof line.image === "string" &&
    typeof line.size === "string" &&
    typeof line.price === "number" &&
    typeof line.qty === "number" &&
    line.qty > 0
  );
}

function isValidOrder(value: unknown): value is Order {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return (
    typeof order.id === "string" &&
    typeof order.placedAt === "string" &&
    typeof order.total === "number" &&
    typeof order.payment === "string" &&
    Array.isArray(order.lines) &&
    order.lines.every(isValidLine)
  );
}

function validateOrders(parsed: unknown): Order[] | null {
  if (!Array.isArray(parsed)) return null;
  return parsed.filter(isValidOrder);
}

export const ordersStore = new LocalStore<Order[]>(STORAGE_KEY, EMPTY, validateOrders);

export function addOrder(order: Order): void {
  ordersStore.update((orders) => [order, ...orders]);
}
