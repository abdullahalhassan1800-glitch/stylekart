import { expect, test } from "@playwright/test";
import { getProduct } from "../src/data/products";

const p1 = getProduct("p1")!;
const p2 = getProduct("p2")!;

test("home page renders hero, banners and categories", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("header").getByAltText("StyleKart")).toHaveAttribute(
    "src",
    "/images/logo.png",
  );
  await expect(page.locator('link[rel="icon"]').first()).toHaveAttribute(
    "href",
    /favicon\.ico/,
  );
  await expect(
    page.getByAltText("Get 60% Off Myntra Sale"),
  ).toHaveAttribute("src", "/images/banners/myntra-sale-60-off.png");
  await expect(
    page.getByAltText("Flipkart Credit Card Discount Banner"),
  ).toHaveAttribute("src", "/images/banners/flipkart-credit-card-offer.png");
  await expect(
    page
      .getByAltText("Activewear Sale: Run in Style")
      .first(),
  ).toHaveAttribute("src", "/images/banners/activewear-sale.jpg");
  await expect(
    page.getByAltText("Elegant Caprese Handbag Sale").first(),
  ).toHaveAttribute("src", "/images/banners/caprese-handbag-sale.jpg");
  await expect(
    page.getByAltText("Gen Z Fashion Under ₹999").first(),
  ).toHaveAttribute("src", "/images/banners/genz-fashion-under-999.jpg");
  await expect(
    page.getByAltText("U.S. Polo Assn. Coastal Style Sale").first(),
  ).toHaveAttribute("src", "/images/banners/us-polo-coastal-style.jpg");
  const categorySection = page.getByRole("region", {
    name: "Shop By Category",
  });
  await expect(categorySection).toBeVisible();
  await expect(categorySection.getByRole("link")).toHaveCount(12);
  await expect(
    categorySection.locator('img[src^="/images/categories/"]'),
  ).toHaveCount(12);

  const ethnicCard = categorySection.getByRole("link", {
    name: /Ethnic Wear/,
  });
  await expect(ethnicCard).toHaveAttribute("href", "/shop/women?cat=Sarees");
  await expect(ethnicCard.getByText("Ethnic Wear")).toBeVisible();
  await expect(ethnicCard.getByText("50-80% OFF")).toBeVisible();
  await expect(ethnicCard.getByText("Shop Now")).toBeVisible();

  await categorySection.getByRole("link").last().scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      categorySection
        .locator("img")
        .evaluateAll(
          (images) =>
            images.filter(
              (image) => (image as HTMLImageElement).naturalWidth > 0,
            ).length,
        ),
    )
    .toBe(12);

  await expect(page.locator('a[href^="/shop/"]').first()).toBeVisible();
});

test("category card opens its filtered listing", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("region", { name: "Shop By Category" })
    .getByRole("link", { name: /Watches/ })
    .click();
  await expect(page).toHaveURL(/\/shop\/all\?cat=Watches$/);
});

test("home offer sidebar expands, shows coupon and closes", async ({ page }) => {
  await page.goto("/");

  const tab = page.getByRole("button", { name: "UPTO 300 OFF offer" });
  await expect(tab).toBeVisible();
  await expect(tab).toHaveAttribute("aria-expanded", "false");

  await tab.click();
  await expect(tab).toHaveAttribute("aria-expanded", "true");

  const panel = page.getByRole("dialog", { name: "MYNTRA300 offer" });
  await expect(panel).toBeVisible();
  await expect(panel.getByText("MYNTRA300")).toBeVisible();
  await expect(panel.getByText("Applicable on your first order")).toBeVisible();
  await expect(panel.getByRole("link", { name: /Sign Up Now/ })).toHaveAttribute(
    "href",
    "/login",
  );

  await page.keyboard.press("Escape");
  await expect(panel).toHaveCount(0);
  await expect(tab).toHaveAttribute("aria-expanded", "false");
});

test("offer sidebar is home only and fits mobile", async ({ page }) => {
  await page.goto("/shop/all");
  await expect(
    page.getByRole("button", { name: "UPTO 300 OFF offer" }),
  ).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "UPTO 300 OFF offer" }).click();
  const panel = page.getByRole("dialog", { name: "MYNTRA300 offer" });
  await expect(panel).toBeVisible();

  const box = await panel.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(391);
});

test("header search and category filter return matching products", async ({
  page,
}) => {
  await page.goto("/");
  const search = page
    .getByPlaceholder("Search for products, brands and more")
    .first();
  await search.fill("nike");
  await search.press("Enter");

  await expect(page).toHaveURL(/\/shop\/all\?q=nike$/);
  await expect(page.getByText("Nike").first()).toBeVisible();
  await expect(page.locator('a[href^="/product/"]').first()).toBeVisible();

  await page.goto("/shop/women?cat=Kurtas");
  await expect(page.getByText("Anouk").first()).toBeVisible();
  await expect(page.locator("main").getByText("Puma")).toHaveCount(0);
});

test("product page shows reviews, size select and add to bag", async ({
  page,
}) => {
  await page.goto("/product/p1");

  await expect(page.getByRole("heading", { name: p1.brand })).toBeVisible();
  await expect(page.getByText("Ratings & Reviews")).toBeVisible();
  await expect(page.getByText("Customer Reviews")).toBeVisible();

  const helpful = page.getByRole("button", { name: /Helpful \(/ }).first();
  const before = (await helpful.textContent()) ?? "";
  await helpful.click();
  await expect(helpful).not.toHaveText(before);

  await page
    .getByRole("button", { name: p1.sizes[0], exact: true })
    .click();
  await page.getByRole("button", { name: "ADD TO BAG" }).click();

  await expect(page.getByText("Item added to your bag")).toBeVisible();
  await expect(
    page.locator("header").locator('a[href="/cart"]').getByText("1", { exact: true }),
  ).toBeVisible();
});

test("cart applies MYNTRA300 coupon on eligible orders", async ({ page }) => {
  const qty = Math.ceil(1499 / p1.price);

  await page.goto("/");
  await page.evaluate(
    ({ productId, size, quantity }) => {
      localStorage.setItem(
        "stylekart-cart",
        JSON.stringify([{ productId, size, qty: quantity }]),
      );
    },
    { productId: p1.id, size: p1.sizes[0], quantity: qty },
  );
  await page.goto("/cart");

  await page
    .getByPlaceholder("Coupon code (try SAVE200 or MYNTRA300)")
    .fill("myntra300");
  await page.getByRole("button", { name: "APPLY", exact: true }).click();

  await expect(page.getByRole("button", { name: "APPLIED" })).toBeVisible();
  await expect(page.getByText("Coupon (MYNTRA300)")).toBeVisible();
  await expect(page.getByText("-₹300")).toBeVisible();
});

test("cart coupon, checkout and order history flow", async ({ page }) => {
  const qty = Math.ceil(999 / p1.price);

  await page.goto("/");
  await page.evaluate(
    ({ productId, size, quantity }) => {
      localStorage.setItem(
        "stylekart-cart",
        JSON.stringify([{ productId, size, qty: quantity }]),
      );
    },
    { productId: p1.id, size: p1.sizes[0], quantity: qty },
  );
  await page.goto("/cart");

  await expect(
    page.getByRole("heading", { name: /My Bag \(1 item\)/ }),
  ).toBeVisible();
  await page
    .getByPlaceholder("Coupon code (try SAVE200 or MYNTRA300)")
    .fill("save200");
  await page.getByRole("button", { name: "APPLY", exact: true }).click();
  await expect(page.getByRole("button", { name: "APPLIED" })).toBeVisible();
  await expect(page.getByText("Coupon (SAVE200)")).toBeVisible();

  await page.getByRole("button", { name: "Place Order" }).click();
  await expect(page).toHaveURL(/\/checkout$/);

  await page.getByPlaceholder("Full Name").fill("Playwright User");
  await page.getByPlaceholder("Mobile Number").fill("9876543210");
  await page.getByPlaceholder("Pincode").fill("400001");
  await page.getByPlaceholder("City").fill("Mumbai");
  await page.getByPlaceholder("State").fill("Maharashtra");
  await page
    .getByPlaceholder("Address (House No, Street, Area)")
    .fill("221B Baker Street");
  await expect(page.getByLabel("Cash on Delivery")).toBeDisabled();
  await expect(page.getByText("Not available at your pincode")).toBeVisible();
  await page.getByLabel("UPI (GPay, PhonePe, Paytm)").check();
  await page
    .getByPlaceholder("Enter UPI ID (e.g., yourname@okbank)")
    .fill("playwright@okhdfc");
  await page.getByRole("button", { name: /^verify$/i }).click();
  await expect(page.getByText(/UPI ID verified/)).toBeVisible();
  await page.getByRole("button", { name: /Place Order/ }).click();

  await expect(
    page.getByRole("heading", { name: "Order Placed Successfully" }),
  ).toBeVisible();
  await expect(page.getByText(/Order ID: SK\d+/)).toBeVisible();

  await page.getByRole("link", { name: "View Order History" }).click();
  await expect(page).toHaveURL(/\/orders$/);
  await expect(
    page.getByRole("heading", { name: /My Orders \(1\)/ }),
  ).toBeVisible();
  await expect(page.getByText(/ORDER #SK\d+/)).toBeVisible();
  await expect(page.getByText("Processing")).toBeVisible();
  await expect(page.getByText(p1.brand).first()).toBeVisible();
});

test("wishlist add and move to bag flow", async ({ page }) => {
  await page.goto(`/product/${p2.id}`);
  await page.getByRole("button", { name: "WISHLIST", exact: true }).click();
  await expect(page.getByText("Added to wishlist")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "WISHLISTED" }),
  ).toBeVisible();

  await page.goto("/wishlist");
  await expect(
    page.getByRole("heading", { name: /My Wishlist \(1\)/ }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: p2.sizes[0], exact: true })
    .click();
  await page.getByRole("button", { name: "Move to Bag" }).click();

  await expect(page.getByText("Moved to bag")).toBeVisible();
  await expect(page.getByText("Your wishlist is empty")).toBeVisible();
});

test("login with OTP persists the user", async ({ page }) => {
  await page.goto("/login");
  await page.getByPlaceholder("Enter your name").fill("Playwright User");
  await page.getByPlaceholder("10-digit mobile number").fill("9876543210");
  await page.getByRole("button", { name: "Continue", exact: true }).click();

  await expect(page.getByRole("heading", { name: "Verify OTP" })).toBeVisible();
  await page.getByPlaceholder("4-digit OTP").fill("1234");
  await page.getByRole("button", { name: "Verify", exact: true }).click();

  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: "Profile" }).hover();
  await expect(page.getByText("Hello, Playwright User")).toBeVisible();
});

test("unknown product route shows the not-found page", async ({ page }) => {
  await page.goto("/product/does-not-exist");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});

test("mega menu, studio page and brand filter work", async ({ page }) => {
  await page.goto("/");
  const header = page.locator("header");
  await header.getByRole("link", { name: "Men", exact: true }).hover();
  await expect(header.getByText("Topwear")).toBeVisible();
  await header.getByRole("link", { name: "T-Shirts", exact: true }).click();
  await expect(page).toHaveURL(/\/shop\/men\?cat=T-Shirts$/);
  await expect(page.getByRole("heading", { name: "T-Shirts" })).toBeVisible();

  await page.goto("/");
  await header.getByRole("link", { name: /Studio/ }).hover();
  await expect(
    header.getByText("Your daily inspiration for everything fashion"),
  ).toBeVisible();
  await header.getByRole("link", { name: "Explore Studio" }).click();
  await expect(page).toHaveURL(/\/studio$/);

  await page.goto("/studio");
  await expect(
    page.getByRole("heading", { name: "Trends, edits & inspiration" }),
  ).toBeVisible();
  await page.getByRole("link", { name: /Everyday staples/ }).click();
  await expect(page).toHaveURL(/\/product\/p1$/);

  await page.goto("/shop/men");
  await page.getByPlaceholder("Search brand").fill("puma");
  await page.getByRole("checkbox", { name: "Puma" }).check();
  await expect(
    page.locator('a[href^="/product/"]').first().getByText("Puma"),
  ).toBeVisible();
});

test("footer renders Myntra content, legal details and popular searches", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.locator("footer");

  await expect(footer.getByText("Online Shopping", { exact: true })).toBeVisible();
  await expect(footer.getByText("Myntra Insider", { exact: true })).toBeVisible();
  await expect(
    footer.getByText("FSSAI Food Safety Connect app", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText("Experience Myntra App on Mobile", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText("ONLINE SHOPPING MADE EASY AT MYNTRA", { exact: true }),
  ).toBeVisible();
  await expect(
    footer.getByText("© 2026 www.myntra.com. All rights reserved.", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(footer.getByText("A Flipkart company", { exact: true })).toBeVisible();
  await expect(footer.getByText("CIN: U72300KA2007PTC041799", { exact: true })).toBeVisible();

  await expect(
    footer.getByRole("link", { name: "T-Shirts", exact: true }).first(),
  ).toHaveAttribute("href", "/shop/all?q=T-Shirts");
  await expect(
    footer.getByRole("link", { name: "Myntra Fashion Show", exact: true }),
  ).toHaveAttribute("href", "/studio");
});

test("all image requests are served locally without errors", async ({ page }) => {
  const imageResponses: { url: string; status: number }[] = [];
  page.on("response", (response) => {
    if (response.url().includes("/images/")) {
      imageResponses.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto("/");
  await page.goto("/product/p1");

  await expect.poll(() => imageResponses.length).toBeGreaterThan(10);
  expect(imageResponses.filter(({ status }) => status >= 400)).toEqual([]);
  expect(imageResponses.some(({ status }) => status === 200)).toBeTruthy();
});
