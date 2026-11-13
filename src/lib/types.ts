export type Group = "men" | "women" | "kids" | "home" | "beauty";

export type Gender = "Men" | "Women" | "Unisex" | "Kids";

export interface Product {
  id: string;
  name: string;
  brand: string;
  group: Group;
  gender: Gender;
  categoryName: string;
  price: number;
  mrp: number;
  discount: number;
  color: string;
  rating: number;
  ratingCount: number;
  sizes: string[];
  images: string[];
  description: string[];
  isNewArrival: boolean;
}

export interface OrderLine {
  productId: string;
  name: string;
  brand: string;
  image: string;
  size: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  placedAt: string;
  lines: OrderLine[];
  total: number;
  payment: string;
}
