import type { Group } from "@/lib/types";

export interface MenuLink {
  label: string;
  href?: string;
}

export interface MenuGroup {
  heading: string;
  headingHref?: string;
  items: MenuLink[];
  separator?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  group?: Group;
  accent: string;
  columns: MenuGroup[][];
}

export const NAV_MENU: NavItem[] = [
  {
    id: "men",
    label: "Men",
    href: "/shop/men",
    group: "men",
    accent: "#FF3F6C",
    columns: [
      [
        {
          heading: "Topwear",
          items: [
            { label: "T-Shirts", href: "/shop/men?cat=T-Shirts" },
            { label: "Casual Shirts", href: "/shop/men?cat=Casual%20Shirts" },
            { label: "Formal Shirts", href: "/shop/men?cat=Formal%20Shirts" },
            { label: "Sweatshirts" },
            { label: "Sweaters" },
            { label: "Jackets", href: "/shop/men?cat=Jackets" },
            { label: "Blazers & Coats" },
            { label: "Suits" },
            { label: "Rain Jackets" },
          ],
        },
        {
          heading: "Indian & Festive Wear",
          items: [
            { label: "Kurtas & Kurta Sets", href: "/shop/men?cat=Kurtas" },
            { label: "Sherwanis" },
            { label: "Nehru Jackets" },
            { label: "Dhotis" },
          ],
        },
      ],
      [
        {
          heading: "Bottomwear",
          items: [
            { label: "Jeans", href: "/shop/men?cat=Jeans" },
            { label: "Casual Trousers", href: "/shop/men?cat=Casual%20Trousers" },
            { label: "Formal Trousers" },
            { label: "Shorts" },
            { label: "Track Pants & Joggers", href: "/shop/men?cat=Track%20Pants" },
          ],
        },
        {
          heading: "Innerwear & Sleepwear",
          items: [
            { label: "Briefs & Trunks" },
            { label: "Boxers" },
            { label: "Vests" },
            { label: "Sleepwear & Loungewear" },
            { label: "Thermals" },
          ],
        },
        { heading: "Plus Size", items: [] },
      ],
      [
        {
          heading: "Footwear",
          items: [
            { label: "Casual Shoes", href: "/shop/men?cat=Casual%20Shoes" },
            { label: "Sports Shoes", href: "/shop/men?cat=Sports%20Shoes" },
            { label: "Formal Shoes" },
            { label: "Sneakers" },
            { label: "Sandals & Floaters", href: "/shop/men?cat=Sandals" },
            { label: "Flip Flops" },
            { label: "Socks" },
          ],
        },
        { heading: "Personal Care & Grooming", items: [] },
        { heading: "Sunglasses & Frames", items: [] },
        { heading: "Watches", headingHref: "/shop/men?cat=Watches", items: [] },
      ],
      [
        {
          heading: "Sports & Active Wear",
          items: [
            { label: "Sports Shoes", href: "/shop/men?cat=Sports%20Shoes" },
            { label: "Sports Sandals" },
            { label: "Active T-Shirts" },
            { label: "Track Pants & Shorts", href: "/shop/men?cat=Track%20Pants" },
            { label: "Tracksuits" },
            { label: "Jackets & Sweatshirts" },
            { label: "Sports Accessories" },
            { label: "Swimwear" },
          ],
        },
        {
          heading: "Gadgets",
          items: [
            { label: "Smart Wearables" },
            { label: "Fitness Gadgets" },
            { label: "Headphones" },
            { label: "Speakers" },
          ],
        },
      ],
      [
        {
          heading: "Fashion Accessories",
          items: [
            { label: "Wallets" },
            { label: "Belts" },
            { label: "Perfumes & Body Mists" },
            { label: "Trimmers" },
            { label: "Deodorants" },
            { label: "Ties, Cufflinks & Pocket Squares" },
            { label: "Accessory Gift Sets" },
            { label: "Caps & Hats" },
            { label: "Mufflers, Scarves & Gloves" },
            { label: "Phone Cases" },
            { label: "Rings & Wristwear" },
            { label: "Helmets" },
          ],
        },
        { heading: "Bags & Backpacks", items: [] },
        { heading: "Luggages & Trolleys", items: [] },
      ],
    ],
  },
  {
    id: "women",
    label: "Women",
    href: "/shop/women",
    group: "women",
    accent: "#FF3F9B",
    columns: [
      [
        {
          heading: "Indian & Fusion Wear",
          items: [
            { label: "Kurtas & Suits", href: "/shop/women?cat=Kurtas" },
            { label: "Kurtis, Tunics & Tops" },
            { label: "Sarees", href: "/shop/women?cat=Sarees" },
            { label: "Ethnic Wear" },
            { label: "Leggings, Salwars & Churidars" },
            { label: "Skirts & Palazzos" },
            { label: "Dress Materials" },
            { label: "Lehenga Cholis" },
            { label: "Dupattas & Shawls" },
            { label: "Jackets" },
          ],
          separator: true,
        },
        { heading: "Belts, Scarves & More", items: [] },
        { heading: "Watches & Wearables", items: [] },
      ],
      [
        {
          heading: "Western Wear",
          items: [
            { label: "Dresses", href: "/shop/women?cat=Dresses" },
            { label: "Tops", href: "/shop/women?cat=Tops" },
            { label: "Tshirts" },
            { label: "Jeans", href: "/shop/women?cat=Jeans" },
            { label: "Trousers & Capris" },
            { label: "Shorts & Skirts" },
            { label: "Co-ords" },
            { label: "Playsuits" },
            { label: "Jumpsuits", href: "/shop/women?cat=Jumpsuits" },
            { label: "Shrugs" },
            { label: "Sweaters & Sweatshirts" },
            { label: "Jackets & Coats" },
            { label: "Blazers & Waistcoats" },
          ],
          separator: true,
        },
        { heading: "Plus Size", items: [] },
      ],
      [
        { heading: "Maternity", items: [] },
        { heading: "Sunglasses & Frames", items: [] },
        {
          heading: "Footwear",
          items: [
            { label: "Flats", href: "/shop/women?cat=Flats" },
            { label: "Casual Shoes" },
            { label: "Heels", href: "/shop/women?cat=Heels" },
            { label: "Boots" },
            { label: "Sports Shoes & Floaters", href: "/shop/women?cat=Sports%20Shoes" },
          ],
          separator: true,
        },
        {
          heading: "Sports & Active Wear",
          items: [
            { label: "Clothing" },
            { label: "Footwear" },
            { label: "Sports Accessories" },
            { label: "Sports Equipment" },
          ],
        },
      ],
      [
        {
          heading: "Lingerie & Sleepwear",
          items: [
            { label: "Bra" },
            { label: "Briefs" },
            { label: "Shapewear" },
            { label: "Sleepwear & Loungewear" },
            { label: "Swimwear" },
            { label: "Camisoles & Thermals" },
          ],
          separator: true,
        },
        {
          heading: "Beauty & Personal Care",
          items: [
            { label: "Makeup" },
            { label: "Skincare" },
            { label: "Premium Beauty" },
            { label: "Lipsticks", href: "/shop/beauty?cat=Lipsticks" },
            { label: "Fragrances", href: "/shop/beauty?cat=Perfumes" },
          ],
        },
      ],
      [
        {
          heading: "Gadgets",
          items: [
            { label: "Smart Wearables" },
            { label: "Fitness Gadgets" },
            { label: "Headphones" },
            { label: "Speakers" },
          ],
          separator: true,
        },
        {
          heading: "Jewellery",
          items: [
            { label: "Fashion Jewellery" },
            { label: "Fine Jewellery" },
            { label: "Earrings" },
          ],
          separator: true,
        },
        { heading: "Backpacks", items: [] },
        { heading: "Handbags, Bags & Wallets", headingHref: "/shop/women?cat=Handbags", items: [] },
        { heading: "Luggages & Trolleys", items: [] },
      ],
    ],
  },
  {
    id: "kids",
    label: "Kids",
    href: "/shop/kids",
    group: "kids",
    accent: "#FF6B00",
    columns: [
      [
        {
          heading: "Boys Clothing",
          items: [
            { label: "T-Shirts", href: "/shop/kids?cat=Boys%27%20T-Shirts" },
            { label: "Shirts" },
            { label: "Shorts", href: "/shop/kids?cat=Boys%27%20Shorts" },
            { label: "Jeans" },
            { label: "Trousers" },
            { label: "Clothing Sets" },
            { label: "Ethnic Wear" },
            { label: "Track Pants & Pyjamas" },
            { label: "Jacket, Sweater & Sweatshirts" },
            { label: "Party Wear" },
            { label: "Innerwear & Thermals" },
            { label: "Nightwear & Loungewear" },
            { label: "Value Packs" },
          ],
        },
      ],
      [
        {
          heading: "Girls Clothing",
          items: [
            { label: "Dresses", href: "/shop/kids?cat=Girls%27%20Dresses" },
            { label: "Tops", href: "/shop/kids?cat=Girls%27%20Tops" },
            { label: "Tshirts" },
            { label: "Clothing Sets" },
            { label: "Lehenga choli" },
            { label: "Kurta Sets" },
            { label: "Party wear" },
            { label: "Dungarees & Jumpsuits" },
            { label: "Skirts & shorts" },
            { label: "Tights & Leggings" },
            { label: "Jeans, Trousers & Capris" },
            { label: "Jacket, Sweater & Sweatshirts" },
            { label: "Innerwear & Thermals" },
            { label: "Nightwear & Loungewear" },
            { label: "Value Packs" },
          ],
        },
      ],
      [
        {
          heading: "Footwear",
          items: [
            { label: "Casual Shoes" },
            { label: "Flipflops" },
            { label: "Sports Shoes", href: "/shop/kids?cat=Kids%27%20Shoes" },
            { label: "Flats" },
            { label: "Sandals" },
            { label: "Heels" },
            { label: "School Shoes" },
            { label: "Socks" },
          ],
          separator: true,
        },
        {
          heading: "Toys & Games",
          items: [
            { label: "Learning & Development" },
            { label: "Activity Toys" },
            { label: "Soft Toys", href: "/shop/kids?cat=Toys" },
            { label: "Action Figure / Play set" },
          ],
        },
      ],
      [
        {
          heading: "Infants",
          items: [
            { label: "Bodysuits" },
            { label: "Rompers & Sleepsuits" },
            { label: "Clothing Sets" },
            { label: "Tshirts & Tops" },
            { label: "Dresses" },
            { label: "Bottom wear" },
            { label: "Winter Wear" },
            { label: "Innerwear & Sleepwear" },
            { label: "Infant Care" },
          ],
          separator: true,
        },
        { heading: "Home & Bath", items: [] },
        { heading: "Personal Care", items: [] },
      ],
      [
        {
          heading: "Kids Accessories",
          items: [
            { label: "Bags & Backpacks" },
            { label: "Watches" },
            { label: "Jewellery & Hair accessory" },
            { label: "Sunglasses" },
            { label: "Masks & Protective Gears" },
            { label: "Caps & Hats" },
          ],
          separator: true,
        },
        {
          heading: "Brands",
          items: [
            { label: "H&M" },
            { label: "Max Kids" },
            { label: "Pantaloons" },
            { label: "United Colors Of Benetton Kids" },
            { label: "YK" },
            { label: "U.S. Polo Assn. Kids" },
            { label: "Mothercare" },
            { label: "HRX" },
          ],
        },
      ],
    ],
  },
  {
    id: "home",
    label: "Home",
    href: "/shop/home",
    group: "home",
    accent: "#FFA800",
    columns: [
      [
        {
          heading: "Bed Linen & Furnishing",
          items: [
            { label: "Bed Runners" },
            { label: "Mattress Protectors" },
            { label: "Bedsheets", href: "/shop/home?cat=Bedsheets" },
            { label: "Bedding Sets" },
            { label: "Blankets, Quilts & Dohars" },
            { label: "Pillows & Pillow Covers" },
            { label: "Bed Covers" },
            { label: "Diwan Sets" },
            { label: "Chair Pads & Covers" },
            { label: "Sofa Covers" },
          ],
          separator: true,
        },
        {
          heading: "Flooring",
          items: [
            { label: "Floor Runners" },
            { label: "Carpets" },
            { label: "Floor Mats & Dhurries" },
            { label: "Door Mats" },
          ],
        },
      ],
      [
        {
          heading: "Bath",
          items: [
            { label: "Bath Towels", href: "/shop/home?cat=Towels" },
            { label: "Hand & Face Towels" },
            { label: "Beach Towels" },
            { label: "Towels Set" },
            { label: "Bath Rugs" },
            { label: "Bath Robes" },
            { label: "Bathroom Accessories" },
            { label: "Shower Curtains" },
          ],
          separator: true,
        },
        {
          heading: "Lamps & Lighting",
          items: [
            { label: "Floor Lamps" },
            { label: "Ceiling Lamps" },
            { label: "Table Lamps", href: "/shop/home?cat=Table%20Lamps" },
            { label: "Wall Lamps" },
            { label: "Outdoor Lamps" },
            { label: "String Lights" },
          ],
        },
      ],
      [
        {
          heading: "Home Décor",
          items: [
            { label: "Plants & Planters" },
            { label: "Aromas & Candles" },
            { label: "Clocks" },
            { label: "Mirrors" },
            { label: "Wall Décor" },
            { label: "Festive Décor" },
            { label: "Pooja Essentials" },
            { label: "Wall Shelves" },
            { label: "Fountains" },
            { label: "Showpieces & Vases", href: "/shop/home?cat=Showpieces" },
            { label: "Ottoman" },
          ],
          separator: true,
        },
        {
          heading: "Cushions & Cushion Covers",
          headingHref: "/shop/home?cat=Cushions%20%26%20Covers",
          items: [],
        },
        { heading: "Curtains", headingHref: "/shop/home?cat=Curtains", items: [] },
      ],
      [
        { heading: "Furniture", items: [] },
        { heading: "Home Gift Sets", items: [] },
        {
          heading: "Kitchen & Table",
          items: [
            { label: "Table Runners" },
            { label: "Dinnerware & Serveware" },
            { label: "Cups and Mugs", href: "/shop/home?cat=Cups%20%26%20Mugs" },
            { label: "Bakeware & Cookware" },
            { label: "Kitchen Storage & Tools" },
            { label: "Bar & Drinkware" },
            { label: "Table Covers & Furnishings" },
          ],
        },
      ],
      [
        {
          heading: "Storage",
          items: [
            { label: "Bins" },
            { label: "Hangers" },
            { label: "Organisers" },
            { label: "Hooks & Holders" },
            { label: "Laundry Bags" },
          ],
        },
      ],
    ],
  },
  {
    id: "beauty",
    label: "Beauty",
    href: "/shop/beauty",
    group: "beauty",
    accent: "#00B8B0",
    columns: [
      [
        {
          heading: "Makeup",
          items: [
            { label: "Lipstick", href: "/shop/beauty?cat=Lipsticks" },
            { label: "Lip Gloss" },
            { label: "Lip Liner" },
            { label: "Mascara" },
            { label: "Eyeliner" },
            { label: "Kajal", href: "/shop/beauty?cat=Kajal" },
            { label: "Eyeshadow" },
            { label: "Foundation", href: "/shop/beauty?cat=Foundation" },
            { label: "Primer" },
            { label: "Concealer" },
            { label: "Compact" },
            { label: "Nail Polish" },
          ],
        },
      ],
      [
        {
          heading: "Skincare, Bath & Body",
          items: [
            { label: "Face Moisturiser", href: "/shop/beauty?cat=Moisturisers" },
            { label: "Cleanser" },
            { label: "Masks & Peel" },
            { label: "Sunscreen", href: "/shop/beauty?cat=Sunscreen" },
            { label: "Serum" },
            { label: "Face Wash", href: "/shop/beauty?cat=Face%20Wash" },
            { label: "Eye Cream" },
            { label: "Lip Balm" },
            { label: "Body Lotion" },
            { label: "Body Wash", href: "/shop/beauty?cat=Body%20Wash" },
            { label: "Body Scrub" },
            { label: "Hand Cream" },
          ],
          separator: true,
        },
        { heading: "Baby Care", items: [] },
        { heading: "Masks", items: [] },
      ],
      [
        {
          heading: "Haircare",
          items: [
            { label: "Shampoo" },
            { label: "Conditioner" },
            { label: "Hair Cream" },
            { label: "Hair Oil" },
            { label: "Hair Gel" },
            { label: "Hair Color" },
            { label: "Hair Serum", href: "/shop/beauty?cat=Hair%20Serum" },
            { label: "Hair Accessory" },
          ],
          separator: true,
        },
        {
          heading: "Fragrances",
          items: [
            { label: "Perfume", href: "/shop/beauty?cat=Perfumes" },
            { label: "Deodorant" },
            { label: "Body Mist" },
          ],
        },
      ],
      [
        {
          heading: "Appliances",
          items: [
            { label: "Hair Straightener" },
            { label: "Hair Dryer" },
            { label: "Epilator" },
          ],
          separator: true,
        },
        {
          heading: "Men's Grooming",
          items: [
            { label: "Trimmers" },
            { label: "Beard Oil" },
            { label: "Hair Wax" },
          ],
          separator: true,
        },
        {
          heading: "Beauty Gift & Makeup Set",
          items: [
            { label: "Beauty Gift" },
            { label: "Makeup Kit" },
          ],
          separator: true,
        },
        { heading: "Premium Beauty", items: [] },
        { heading: "Wellness & Hygiene", items: [] },
      ],
      [
        {
          heading: "Top Brands",
          items: [
            { label: "Lakme" },
            { label: "Maybelline" },
            { label: "LOreal" },
            { label: "Philips" },
            { label: "Bath & Body Works" },
            { label: "THE BODY SHOP" },
            { label: "Biotique" },
            { label: "Mamaearth" },
            { label: "MCaffeine" },
            { label: "Nivea" },
            { label: "Lotus Herbals" },
            { label: "LOreal Professionnel" },
            { label: "KAMA AYURVEDA" },
            { label: "M.A.C" },
            { label: "Forest Essentials" },
          ],
        },
      ],
    ],
  },
  {
    id: "genz",
    label: "Genz",
    href: "/shop/all",
    accent: "#00B8B0",
    columns: [
      [
        {
          heading: "Women's Western Wear",
          items: [
            { label: "Dresses Under ₹599", href: "/shop/women?cat=Dresses" },
            { label: "Tops Under ₹399", href: "/shop/women?cat=Tops" },
            { label: "Jeans Under ₹599", href: "/shop/women?cat=Jeans" },
            { label: "Trousers Under ₹699" },
            { label: "T-shirts Under ₹299", href: "/shop/men?cat=T-Shirts" },
            { label: "Shirts Under ₹499" },
            { label: "Skirts Under ₹499" },
            { label: "Shorts Under ₹599" },
            { label: "Co-ords Under ₹799" },
            { label: "Jumpsuits Under ₹899", href: "/shop/women?cat=Jumpsuits" },
            { label: "Track pants Under ₹699" },
            { label: "Jackets Under ₹899", href: "/shop/men?cat=Jackets" },
            { label: "Sweatshirts Under ₹699" },
            { label: "Sweaters Under ₹899" },
          ],
        },
      ],
      [
        {
          heading: "Women's Ethnic Wear",
          items: [
            { label: "Kurtas Under ₹399", href: "/shop/women?cat=Kurtas" },
            { label: "Kurtis Under ₹499" },
            { label: "Kurta sets Under ₹499" },
            { label: "Ethnic Dresses Under ₹999" },
            { label: "Palazzos Under ₹799" },
          ],
          separator: true,
        },
        {
          heading: "Lingerie & Loungewear",
          items: [
            { label: "Bras Under ₹399" },
            { label: "Night suits Under ₹799" },
            { label: "Nightdresses Under ₹999" },
            { label: "Lounge pants Under ₹999" },
            { label: "Briefs Under ₹599" },
          ],
        },
      ],
      [
        {
          heading: "Men's Casual Wear",
          items: [
            { label: "T-shirts Under ₹299", href: "/shop/men?cat=T-Shirts" },
            { label: "Shirts Under ₹499" },
            { label: "Jeans Under ₹599", href: "/shop/men?cat=Jeans" },
            { label: "Trousers Under ₹699" },
            { label: "Shorts Under ₹599" },
            { label: "Track pants Under ₹699", href: "/shop/men?cat=Track%20Pants" },
            { label: "Jackets Under ₹899", href: "/shop/men?cat=Jackets" },
            { label: "Sweatshirts Under ₹699" },
            { label: "Sweaters Under ₹999" },
            { label: "Co-ords Under ₹999" },
          ],
          separator: true,
        },
        {
          heading: "Men's Occasion Wear",
          items: [
            { label: "Kurtas Under ₹799" },
            { label: "Kurta Sets Under ₹999" },
          ],
        },
      ],
      [
        {
          heading: "Women's Footwear",
          items: [
            { label: "Heels Under ₹599", href: "/shop/women?cat=Heels" },
            { label: "Flats Under ₹499", href: "/shop/women?cat=Flats" },
            { label: "Casual shoes Under ₹699" },
            { label: "Sports shoes Under ₹999", href: "/shop/women?cat=Sports%20Shoes" },
            { label: "Flip flops Under ₹799" },
            { label: "Boots Under ₹999" },
            { label: "Ballerinas Under ₹799" },
          ],
          separator: true,
        },
        {
          heading: "Men's Footwear",
          items: [
            { label: "Casual shoes Under ₹799" },
            { label: "Sports shoes Under ₹999", href: "/shop/men?cat=Sports%20Shoes" },
            { label: "Formal shoes Under ₹999" },
            { label: "Sandals Under ₹799", href: "/shop/men?cat=Sandals" },
            { label: "Flip flops Under ₹499" },
            { label: "Boots Under ₹999" },
          ],
        },
      ],
      [
        {
          heading: "Beauty & Grooming",
          items: [
            { label: "Skincare Under ₹299" },
            { label: "Haircare Under ₹399" },
            { label: "Bath & Body Under ₹399" },
            { label: "MakeUp Under ₹299" },
            { label: "Fragrances Under ₹399" },
            { label: "Appliances Under ₹999" },
          ],
          separator: true,
        },
        {
          heading: "Accessories",
          items: [
            { label: "Jewellery Under ₹299" },
            { label: "Handbags Under ₹499", href: "/shop/women?cat=Handbags" },
            { label: "Clutches Under ₹999" },
            { label: "Backpacks Under ₹699" },
            { label: "Wallets Under ₹499" },
            { label: "Sunglasses Under ₹699" },
            { label: "Belts Under ₹799" },
            { label: "Caps Under ₹899" },
          ],
        },
      ],
    ],
  },
  {
    id: "studio",
    label: "Studio",
    href: "/studio",
    accent: "#FF3F6C",
    columns: [],
  },
];

export const GROUP_LABELS: Record<Group | "all", string> = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  home: "Home & Living",
  beauty: "Beauty",
  all: "All Products",
};

export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  gradient: string;
  image: string;
}

export const BANNERS: Banner[] = [
  {
    id: "b1",
    eyebrow: "EXCLUSIVE LAUNCH OFFERS",
    title: "MEGA FASHION DAYS",
    subtitle: "Flat 50-80% off on 5000+ styles",
    cta: "SHOP NOW",
    href: "/shop/all",
    gradient: "from-fuchsia-600 via-purple-600 to-indigo-700",
    image: "/images/banners/b1.jpg",
  },
  {
    id: "b2",
    eyebrow: "END OF SEASON SALE",
    title: "BIG STYLE CLEARANCE",
    subtitle: "Extra 25% off on orders above ₹1999",
    cta: "EXPLORE",
    href: "/shop/women",
    gradient: "from-rose-500 via-pink-500 to-orange-400",
    image: "/images/banners/b2.jpg",
  },
  {
    id: "b3",
    eyebrow: "BEAUTY BONANZA",
    title: "GLOW UP SEASON",
    subtitle: "Up to 40% off on makeup & skincare",
    cta: "SHOP BEAUTY",
    href: "/shop/beauty",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    image: "/images/banners/b3.jpg",
  },
  {
    id: "b4",
    eyebrow: "HOME FURNISHING FEST",
    title: "HOME MAKEOVER SALE",
    subtitle: "Min 30% off on bedsheets & decor",
    cta: "UPGRADE YOUR HOME",
    href: "/shop/home",
    gradient: "from-teal-500 via-emerald-500 to-cyan-600",
    image: "/images/banners/b4.jpg",
  },
];

export interface HomeBanner {
  id: string;
  title: string;
  href: string;
  image: string;
}

export const HOME_BANNERS: HomeBanner[] = [
  {
    id: "activewear",
    title: "Activewear Sale: Run in Style",
    href: "/shop/all?cat=Sports%20Shoes",
    image: "/images/banners/activewear-sale.jpg",
  },
  {
    id: "caprese",
    title: "Elegant Caprese Handbag Sale",
    href: "/shop/all?q=Caprese",
    image: "/images/banners/caprese-handbag-sale.jpg",
  },
  {
    id: "genz",
    title: "Gen Z Fashion Under ₹999",
    href: "/shop/all",
    image: "/images/banners/genz-fashion-under-999.jpg",
  },
  {
    id: "us-polo",
    title: "U.S. Polo Assn. Coastal Style Sale",
    href: "/shop/all?q=U.S.%20Polo%20Assn.",
    image: "/images/banners/us-polo-coastal-style.jpg",
  },
];

export interface ShopCategory {
  label: string;
  discount: string;
  href: string;
  image: string;
}

export const SHOP_CATEGORIES: ShopCategory[] = [
  { label: "Ethnic Wear", discount: "50-80% OFF", href: "/shop/women?cat=Sarees", image: "/images/categories/ethnic-wear.jpg" },
  { label: "Casual Wear", discount: "40-80% OFF", href: "/shop/men?cat=T-Shirts", image: "/images/categories/casual-wear.jpg" },
  { label: "Men's Activewear", discount: "30-70% OFF", href: "/shop/men?cat=T-Shirts", image: "/images/categories/mens-activewear.jpg" },
  { label: "Women's Activewear", discount: "30-70% OFF", href: "/shop/women?cat=Sports%20Shoes", image: "/images/categories/womens-activewear.jpg" },
  { label: "Western Wear", discount: "40-80% OFF", href: "/shop/women?cat=Dresses", image: "/images/categories/western-wear.jpg" },
  { label: "Sportswear", discount: "30-80% OFF", href: "/shop/all?cat=Sports%20Shoes", image: "/images/categories/sportswear.jpg" },
  { label: "Loungewear", discount: "30-70% OFF", href: "/shop/men?cat=Track%20Pants", image: "/images/categories/loungewear.jpg" },
  { label: "Men's Innerwear", discount: "30-60% OFF", href: "/shop/men", image: "/images/categories/mens-innerwear.jpg" },
  { label: "Lingerie", discount: "40-70% OFF", href: "/shop/women", image: "/images/categories/lingerie.jpg" },
  { label: "Watches", discount: "20-60% OFF", href: "/shop/all?cat=Watches", image: "/images/categories/watches.jpg" },
  { label: "Grooming", discount: "20-50% OFF", href: "/shop/beauty?cat=Perfumes", image: "/images/categories/grooming.jpg" },
  { label: "Beauty Appliances", discount: "20-60% OFF", href: "/shop/beauty", image: "/images/categories/beauty-appliances.jpg" },
];

export interface StyleEdit {
  label: string;
  subtitle: string;
  href: string;
  image: string;
}

export const STYLE_EDITS: StyleEdit[] = [
  {
    label: "Everyday Casuals",
    subtitle: "Tees, jeans & more",
    href: "/shop/men?cat=T-Shirts",
    image: "/images/circles/men.jpg",
  },
  {
    label: "Festive Ethnic",
    subtitle: "Kurtas & sarees",
    href: "/shop/women?cat=Kurtas",
    image: "/images/circles/women.jpg",
  },
  {
    label: "Beauty Edit",
    subtitle: "Makeup must-haves",
    href: "/shop/beauty",
    image: "/images/circles/beauty.jpg",
  },
  {
    label: "Home Refresh",
    subtitle: "Decor & bedding",
    href: "/shop/home",
    image: "/images/circles/home.jpg",
  },
];

export interface Deal {
  title: string;
  subtitle: string;
  href: string;
  gradient: string;
  image: string;
}

export const DEALS: Deal[] = [
  { title: "FLAT ₹500 OFF", subtitle: "On orders above ₹2999", href: "/shop/all", gradient: "from-pink-500 to-rose-400", image: "/images/products/p12-1.jpg" },
  { title: "BUY 2 GET 1", subtitle: "On select T-shirts", href: "/shop/men?cat=T-Shirts", gradient: "from-orange-500 to-amber-400", image: "/images/products/p1-1.jpg" },
  { title: "EXTRA 20% OFF", subtitle: "On beauty products", href: "/shop/beauty", gradient: "from-violet-500 to-fuchsia-400", image: "/images/products/p86-1.jpg" },
  { title: "UNDER ₹999", subtitle: "Trending kurtas", href: "/shop/women?cat=Kurtas", gradient: "from-sky-500 to-blue-400", image: "/images/products/p36-1.jpg" },
  { title: "MIN 40% OFF", subtitle: "Sports shoes", href: "/shop/men?cat=Sports%20Shoes", gradient: "from-lime-500 to-emerald-400", image: "/images/products/p13-1.jpg" },
  { title: "STARTING ₹299", subtitle: "Boys' T-shirts", href: "/shop/kids?cat=Boys%27%20T-Shirts", gradient: "from-indigo-500 to-purple-400", image: "/images/products/p60-1.jpg" },
  { title: "UP TO 60% OFF", subtitle: "Bedsheets & more", href: "/shop/home", gradient: "from-teal-500 to-cyan-400", image: "/images/products/p74-1.jpg" },
  { title: "NEW ARRIVALS", subtitle: "Fresh drops weekly", href: "/shop/all", gradient: "from-red-500 to-pink-400", image: "/images/products/p42-1.jpg" },
];

export interface BrandCard {
  brand: string;
  tagline: string;
  gradient: string;
}

export const BRAND_CARDS: BrandCard[] = [
  { brand: "Roadster", tagline: "Trendy casuals", gradient: "from-slate-700 to-slate-900" },
  { brand: "HRX", tagline: "Active gear", gradient: "from-red-600 to-rose-800" },
  { brand: "Puma", tagline: "Sports style", gradient: "from-zinc-700 to-black" },
  { brand: "Levi's", tagline: "Denim icons", gradient: "from-red-700 to-red-900" },
  { brand: "Anouk", tagline: "Ethnic charm", gradient: "from-amber-600 to-orange-800" },
  { brand: "Lakme", tagline: "Beauty essentials", gradient: "from-purple-600 to-purple-900" },
];
