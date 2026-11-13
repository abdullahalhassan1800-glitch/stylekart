import { expect, test } from "@playwright/test";
import { getProduct } from "../src/data/products";

const p1 = getProduct("p1")!;
const BASE = "/stylekart";

test("home page loads with logo, banners and category strip", async ({
  page,
}) => {
  await page.goto(`${BASE}/`);

  await expect(page.locator("header").getByAltText("StyleKart")).toBeVisible();
  await expect(page.getByAltText("Get 60% Off Myntra Sale")).toBeVisible();
  await expect(
    page.getByAltText("Activewear Sale: Run in Style").first(),
  ).toBeVisible();

  const categorySection = page.getByRole("region", { name: "Shop By Category" });
  await expect(categorySection).toBeVisible();
  await expect(categorySection.getByRole("link")).toHaveCount(12);
  const ethnicCard = categorySection.locator('a[href*="cat=Sarees"]');
  await expect(ethnicCard).toHaveCount(1);
  const ethnicHref = await ethnicCard.getAttribute("href");
  expect(ethnicHref).toContain(`${BASE}/shop/women`);
  expect(ethnicHref).toContain("cat=Sarees");
});

test("category card navigation lands on filtered listing", async ({ page }) => {
  await page.goto(`${BASE}/`);
  await page
    .getByRole("region", { name: "Shop By Category" })
    .getByRole("link", { name: /Watches/ })
    .click();
  await expect(page).toHaveURL(/\/stylekart\/shop\/all\/?\?cat=Watches$/);
  await expect(page.locator('a[href^="/stylekart/product/"]').first()).toBeVisible();
});

test("header search works on deployed site", async ({ page }) => {
  await page.goto(`${BASE}/`);
  const search = page
    .getByPlaceholder("Search for products, brands and more")
    .first();
  await search.fill("nike");
  await search.press("Enter");

  await expect(page).toHaveURL(/\/stylekart\/shop\/all\/?\?q=nike$/);
  await expect(page.getByText("Nike").first()).toBeVisible();
  await expect(page.locator('a[href^="/stylekart/product/"]').first()).toBeVisible();
});

test("shop category filter reads query params client-side", async ({ page }) => {
  await page.goto(`${BASE}/shop/women?cat=Kurtas`);
  await expect(page.getByText("Anouk").first()).toBeVisible();
  await expect(page.locator("main").getByText("Puma")).toHaveCount(0);
});

test("product page renders details and add to bag updates cart", async ({
  page,
}) => {
  await page.goto(`${BASE}/product/p1`);

  await expect(page.getByRole("heading", { name: p1.brand })).toBeVisible();
  await expect(page.getByText("Ratings & Reviews")).toBeVisible();

  await page.getByRole("button", { name: p1.sizes[0], exact: true }).click();
  await page.getByRole("button", { name: "ADD TO BAG" }).click();
  await expect(page.getByText("Item added to your bag")).toBeVisible();
  await expect(
    page
      .locator("header")
      .locator(`a[href^="${BASE}/cart"]`)
      .getByText("1", { exact: true }),
  ).toBeVisible();
});

test("cart applies SAVE200 coupon on deployed site", async ({ page }) => {
  const qty = Math.ceil(999 / p1.price);

  await page.goto(`${BASE}/`);
  await page.evaluate(
    ({ productId, size, quantity }) => {
      localStorage.setItem(
        "stylekart-cart",
        JSON.stringify([{ productId, size, qty: quantity }]),
      );
    },
    { productId: p1.id, size: p1.sizes[0], quantity: qty },
  );
  await page.goto(`${BASE}/cart`);

  await page
    .getByPlaceholder("Coupon code (try SAVE200 or MYNTRA300)")
    .fill("save200");
  await page.getByRole("button", { name: "APPLY", exact: true }).click();
  await expect(page.getByRole("button", { name: "APPLIED" })).toBeVisible();
  await expect(page.getByText("Coupon (SAVE200)")).toBeVisible();
});

test("unknown product shows the not-found page", async ({ page }) => {
  await page.goto(`${BASE}/product/does-not-exist`);
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("all image requests return 200 on home and product pages", async ({
  page,
}) => {
  const imageResponses: { url: string; status: number }[] = [];
  page.on("response", (response) => {
    if (response.url().includes("/images/")) {
      imageResponses.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto(`${BASE}/`);
  await page.goto(`${BASE}/product/p1`);

  await expect.poll(() => imageResponses.length).toBeGreaterThan(10);
  expect(imageResponses.filter(({ status }) => status >= 400)).toEqual([]);
  expect(imageResponses.some(({ status }) => status === 200)).toBeTruthy();
});
