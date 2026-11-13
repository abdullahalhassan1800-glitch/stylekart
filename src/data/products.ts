import type { Gender, Group, Product } from "@/lib/types";

type Def = [group: Group, categoryName: string, name: string, brand: string, price: number];

const DEFS: Def[] = [
  // ---------------- Men ----------------
  ["men", "T-Shirts", "Men Striped Round Neck Cotton T-Shirt", "Roadster", 399],
  ["men", "T-Shirts", "Men Printed Round Neck T-Shirt", "HRX by Hrithik Roshan", 449],
  ["men", "T-Shirts", "Men Solid Round Neck T-Shirt", "Puma", 599],
  ["men", "T-Shirts", "Men Badge of Sport T-Shirt", "Adidas", 799],
  ["men", "T-Shirts", "Men Brand Logo Cotton T-Shirt", "U.S. Polo Assn.", 899],
  ["men", "T-Shirts", "Men Slim Fit Crew Neck T-Shirt", "Jockey", 429],
  ["men", "Casual Shirts", "Men Checked Slim Fit Casual Shirt", "Levi's", 1199],
  ["men", "Casual Shirts", "Men Solid Regular Fit Casual Shirt", "U.S. Polo Assn.", 1349],
  ["men", "Casual Shirts", "Men Denim Wash Long Sleeve Shirt", "Roadster", 1099],
  ["men", "Formal Shirts", "Men Textured Slim Fit Formal Shirt", "Peter England", 1049],
  ["men", "Formal Shirts", "Men Solid Slim Fit Formal Shirt", "Van Heusen", 1299],
  ["men", "Jackets", "Men Solid Bomber Jacket", "Roadster", 1799],
  ["men", "Jackets", "Men Colorblock Hooded Jacket", "HRX by Hrithik Roshan", 2499],
  ["men", "Jeans", "Men 511 Slim Fit Jeans", "Levi's", 2399],
  ["men", "Jeans", "Men Slim Fit Straight Jeans", "Pepe Jeans London", 1999],
  ["men", "Jeans", "Men Straight Fit Jeans", "Spykar", 1499],
  ["men", "Jeans", "Men Regular Fit Jeans", "Wrangler", 1899],
  ["men", "Casual Trousers", "Men Cotton Chinos", "U.S. Polo Assn.", 1499],
  ["men", "Casual Trousers", "Men Slim Fit Chinos", "Allen Solly", 1549],
  ["men", "Track Pants", "Men Stretchable Track Pants", "HRX by Hrithik Roshan", 799],
  ["men", "Track Pants", "Men Solid Evost Track Pants", "Puma", 999],
  ["men", "Sports Shoes", "Men Revolution 6 Running Shoes", "Nike", 3499],
  ["men", "Sports Shoes", "Men Duramo Speed Running Shoes", "Adidas", 2999],
  ["men", "Sports Shoes", "Men Softride Enzo Sneakers", "Puma", 3299],
  ["men", "Sports Shoes", "Men Flex Running Shoes", "HRX by Hrithik Roshan", 1499],
  ["men", "Casual Shoes", "Men Limelight Leather Sneakers", "Skechers", 4499],
  ["men", "Casual Shoes", "Men Leather Loafers", "Red Tape", 1899],
  ["men", "Sandals", "Men Axis Slides", "Puma", 999],
  ["men", "Sandals", "Men Comfort Sandals", "Bata", 899],
  ["men", "Kurtas", "Men Solid Silk Blend Kurta", "Manyavar", 1799],
  ["men", "Kurtas", "Men Slim Fit Kurta", "Peter England", 1299],
  ["men", "Watches", "Men Analogue Digital Watch", "Fastrack", 1695],
  // ---------------- Women ----------------
  ["women", "Kurtas", "Women Printed Rayon Straight Kurta", "Anouk", 699],
  ["women", "Kurtas", "Women Solid Kurta with Palazzo", "Libas", 1049],
  ["women", "Kurtas", "Women Floral Printed Kurta", "Biba", 1199],
  ["women", "Kurtas", "Women Ethnic Motifs Kurta", "Global Desi", 1349],
  ["women", "Sarees", "Women Chiffon Printed Saree", "Biba", 1499],
  ["women", "Sarees", "Women Cotton Silk Saree", "Kalanjiam", 1199],
  ["women", "Tops", "Women Ribbed Round Neck Top", "ONLY", 599],
  ["women", "Tops", "Women Crop Top", "Vero Moda", 649],
  ["women", "Tops", "Women Slim Fit Top", "H&M", 799],
  ["women", "Dresses", "Women Long Maxi Dress", "Vero Moda", 1349],
  ["women", "Dresses", "Women Bodycon Fit Dress", "ONLY", 1499],
  ["women", "Dresses", "Women Wrap Front Dress", "H&M", 1899],
  ["women", "Dresses", "Women A-Line Mini Dress", "DressBerry", 949],
  ["women", "Jeans", "Women 311 Shaping Skinny Jeans", "Levi's", 2299],
  ["women", "Jeans", "Women High Rise Skinny Jeans", "ONLY", 1799],
  ["women", "Jeans", "Women Straight Fit Jeans", "Flying Machine", 1249],
  ["women", "Jumpsuits", "Women Printed Jumpsuit", "Vero Moda", 1699],
  ["women", "Jumpsuits", "Women Solid Jumpsuit", "Mast & Harbour", 1099],
  ["women", "Heels", "Women Block Heels", "Carlton London", 1299],
  ["women", "Heels", "Women Stiletto Pumps", "Truffle", 1499],
  ["women", "Flats", "Women Ballet Flats", "Metro", 999],
  ["women", "Flats", "Women Slip-On Flats", "Bata", 799],
  ["women", "Sports Shoes", "Women Renew Running Shoes", "Nike", 3495],
  ["women", "Sports Shoes", "Women D'Lites Sneakers", "Skechers", 4299],
  ["women", "Handbags", "Women Faux Leather Tote Handbag", "Lavie", 1799],
  ["women", "Handbags", "Women Sling Bag", "Baggit", 1399],
  ["women", "Handbags", "Women Satchel Bag", "Caprese", 2499],
  // ---------------- Kids ----------------
  ["kids", "Boys' T-Shirts", "Boys Printed Cotton T-Shirt", "YK", 349],
  ["kids", "Boys' T-Shirts", "Boys Slim Fit Cotton T-Shirt", "H&M", 449],
  ["kids", "Boys' T-Shirts", "Boys Striped T-Shirt", "Pantaloons Junior", 299],
  ["kids", "Boys' Shorts", "Boys Cargo Shorts", "YK", 399],
  ["kids", "Boys' Shorts", "Boys Jersey Shorts", "H&M", 499],
  ["kids", "Girls' Dresses", "Girls Floral Print Dress", "YK", 799],
  ["kids", "Girls' Dresses", "Girls Cotton Dress", "H&M", 899],
  ["kids", "Girls' Dresses", "Girls Flared Party Dress", "Pantaloons Junior", 999],
  ["kids", "Girls' Tops", "Girls Printed Top", "Pantaloons Junior", 349],
  ["kids", "Girls' Tops", "Girls Ruffle Sleeve Top", "H&M", 449],
  ["kids", "Kids' Shoes", "Unisex Kids Street Sport Sneakers", "Puma", 1499],
  ["kids", "Kids' Shoes", "Unisex Kids Classic Clogs", "Crocs", 2495],
  ["kids", "Toys", "Teddy Bear Soft Toy", "Funskool", 399],
  ["kids", "Toys", "Car Multi-Pack Set", "Hot Wheels", 699],
  // ---------------- Home ----------------
  ["home", "Bedsheets", "Double Bedsheet with 2 Pillow Covers", "Bombay Dyeing", 1399],
  ["home", "Bedsheets", "Cotton King Size Bedsheet", "Spaces", 1199],
  ["home", "Cushions & Covers", "Printed Cushion Covers (Set of 2)", "Home Centre", 599],
  ["home", "Cushions & Covers", "Cushion Set of 2", "Spaces", 749],
  ["home", "Curtains", "Blackout Window Curtain", "Home Centre", 899],
  ["home", "Curtains", "Cotton Door Curtain", "Bombay Dyeing", 649],
  ["home", "Cups & Mugs", "Ceramic Coffee Mug", "Claycraft", 349],
  ["home", "Cups & Mugs", "Ceramic Mug Set of 4", "Home Centre", 899],
  ["home", "Table Lamps", "Metal Table Lamp", "Home Centre", 1499],
  ["home", "Table Lamps", "Fabric Table Lamp", "Loomcraft", 999],
  ["home", "Towels", "Cotton Bath Towel", "Spaces", 449],
  ["home", "Showpieces", "Resin Table Showpiece", "Home Centre", 799],
  // ---------------- Beauty ----------------
  ["beauty", "Lipsticks", "9 to 5 Matte Lipstick", "Lakme", 399],
  ["beauty", "Lipsticks", "Sensational Creamy Lipstick", "Maybelline New York", 449],
  ["beauty", "Foundation", "Fit Me Matte + Smooth Foundation", "Maybelline New York", 549],
  ["beauty", "Kajal", "Eyeconic Kajal", "Lakme", 195],
  ["beauty", "Sunscreen", "Light Fluid Sunscreen SPF 60", "Minimalist", 549],
  ["beauty", "Face Wash", "Purifying Neem Face Wash", "Himalaya", 149],
  ["beauty", "Face Wash", "Gentle Foaming Face Wash", "Cetaphil", 499],
  ["beauty", "Moisturisers", "Soft Light Moisturising Cream", "Nivea", 249],
  ["beauty", "Perfumes", "Rose Woman Eau De Parfum", "Bella Vita Luxury", 649],
  ["beauty", "Perfumes", "Men Luxury Perfume", "Denver", 499],
  ["beauty", "Hair Serum", "Extraordinary Oil Hair Serum", "L'Oreal Paris", 399],
  ["beauty", "Body Wash", "Exfoliating Coffee Body Wash", "mCaffeine", 399],
];

const COLORS = [
  "Black",
  "White",
  "Navy Blue",
  "Blue",
  "Olive Green",
  "Maroon",
  "Beige",
  "Pink",
  "Grey",
  "Purple",
  "Mustard Yellow",
  "Cream",
];

const GENDER_BY_GROUP: Record<Group, Gender> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  home: "Unisex",
  beauty: "Unisex",
};

function hash(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function sizesFor(group: Group, categoryName: string): string[] {
  const c = categoryName.toLowerCase();
  if (/watch|toy|serum|wash|cream|perfume|lipstick|foundation|kajal|sunscreen|bedsheet|cushion|curtain|mug|lamp|towel|showpiece/.test(c)) {
    return ["Free Size"];
  }
  const isFootwear = /shoe|sneaker|sandal|heel|flat|clog|loafer|slide|pump/.test(c);
  if (isFootwear) {
    if (group === "kids") return ["11", "12", "1", "2", "3"];
    return ["6", "7", "8", "9", "10", "11"];
  }
  if (group === "kids") return ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"];
  if (group === "home" || group === "beauty") return ["Free Size"];
  return ["XS", "S", "M", "L", "XL", "XXL"];
}

function descriptionFor(group: Group, categoryName: string, brand: string, color: string): string[] {
  const lines = [`${brand} ${categoryName}`];
  if (group === "men" || group === "women" || group === "kids") {
    lines.push("Made from premium quality fabric", "Comfortable and stylish fit for everyday wear", "Care: Machine wash cold");
  } else if (group === "home") {
    lines.push("Crafted from high-grade material", "Easy to clean and maintain", "Care: Wipe with a dry cloth");
  } else {
    lines.push("Crafted with skin-friendly ingredients", "Suitable for everyday use", "Comes in travel-friendly packaging");
  }
  lines.push(`Colour: ${color}`, "Country of Origin: India");
  return lines;
}

export const products: Product[] = DEFS.map((def, index) => {
  const [group, categoryName, name, brand, price] = def;
  const id = `p${index + 1}`;
  const h = hash(id + name);
  const ratio = 1.4 + ((h >> 3) % 12) / 10;
  const mrp = Math.max(Math.round((price * ratio) / 10) * 10, price + 10);
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const color = COLORS[h % COLORS.length];
  return {
    id,
    name,
    brand,
    group,
    gender: GENDER_BY_GROUP[group],
    categoryName,
    price,
    mrp,
    discount,
    color,
    rating: Math.round((3.6 + (h % 13) / 10) * 10) / 10,
    ratingCount: 80 + (h % 8800),
    sizes: sizesFor(group, categoryName),
    images: [1, 2, 3, 4].map((n) => `/images/products/${id}-${n}.jpg`),
    description: descriptionFor(group, categoryName, brand, color),
    isNewArrival: h % 7 === 0,
  };
});

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function similarProducts(product: Product, count = 10): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.categoryName === product.categoryName,
  );
  const sameGroup = products.filter(
    (p) => p.id !== product.id && p.group === product.group && p.categoryName !== product.categoryName,
  );
  return [...sameCategory, ...sameGroup].slice(0, count);
}

export function trendingProducts(count = 10): Product[] {
  return [...products]
    .sort((a, b) => b.rating * b.ratingCount - a.rating * a.ratingCount)
    .slice(0, count);
}
