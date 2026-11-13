import { expect, test } from "@playwright/test";
import { getProduct } from "../src/data/products";

const p1 = getProduct("p1")!;

const routes = [
  "/",
  "/shop/all",
  "/shop/men",
  "/shop/women",
  "/shop/kids",
  "/product/p1",
  "/cart",
  "/orders",
  "/login",
  "/studio",
  "/wishlist",
];

test("no 'demo' word on any page", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("body"), route).not.toHaveText(/demo/i);
  }
});

test("checkout payment methods show COD unavailable without 'demo'", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(
    ({ productId, size, quantity }) => {
      localStorage.setItem(
        "stylekart-cart",
        JSON.stringify([{ productId, size, qty: quantity }]),
      );
    },
    { productId: p1.id, size: p1.sizes[0], quantity: 1 },
  );
  await page.goto("/checkout");

  await page.getByPlaceholder("Pincode").fill("400001");
  await expect(
    page.getByText("Not available at your pincode"),
  ).toBeVisible();
  await expect(page.getByLabel("Cash on Delivery")).toBeDisabled();
  await expect(page.locator("body")).not.toHaveText(/demo/i);
});
