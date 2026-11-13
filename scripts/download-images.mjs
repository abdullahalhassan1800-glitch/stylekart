import { copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("public/images");
const POOLS = path.join(ROOT, "_pools");
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };

const CANDIDATES = {
  tshirts: [
    "1521572163474-6864f9cf17ab",
    "1576566588028-4147f3842f27",
    "1583743814966-8936f5b7be1a",
    "1503341504253-dff4815485f1",
    "1562157873-818bc0726f68",
    "1523381210434-271e8be1f52b",
  ],
  shirts: [
    "1596755094514-f87e34085b2c",
    "1602810318383-e386cc2a3ccf",
    "1598033129183-c4f50c736f10",
    "1620012253295-c15cc3e65df4",
    "1603252109303-2751441dd157",
  ],
  jackets: [
    "1551028719-00167b16eac5",
    "1591047139829-d91aecb6caea",
    "1544022613-e87ca75a784a",
    "1520975954732-35dd22299614",
  ],
  jeans: [
    "1542272604-787c3835535d",
    "1541099649105-f69ad21f3246",
    "1604176354204-9268737828e4",
    "1565084888279-aca607ecce0c",
    "1475178626620-a4d074967452",
    "1555689502-c4b22d76c56f",
  ],
  trousers: [
    "1473966968600-fa801b869a1a",
    "1594633312681-425c7b97ccd1",
    "1624378439575-d8705ad7ae80",
    "1584865288642-42078afe6942",
  ],
  kurtas: [
    "1597983073493-88cd35cf93b0",
    "1614252369475-531eba835eb1",
    "1610030469668-8b2c0e6c3f0e",
    "1595777457583-95e059d581b8",
  ],
  sarees: [
    "1610030469983-98e550d6193c",
    "1583391733956-6c78276477e2",
    "1617627143750-d86bc21e42bb",
    "1609743522653-52354461eb27",
  ],
  tops: [
    "1564257631407-4deb1f99d992",
    "1554568218-0f1715e72254",
    "1503342217505-b0a15ec3261c",
    "1523381210434-271e8be1f52b",
  ],
  dresses: [
    "1595777457583-95e059d581b8",
    "1496747611176-843222e1e57c",
    "1572804013309-59a88b7e92f1",
    "1515372039744-b8f02a3ae446",
    "1539008835657-9e8e9680c956",
  ],
  heels: [
    "1543163521-1bf539c55dd2",
    "1515347619252-60a4bf4fff4f",
    "1596703263926-eb0762ee17e4",
  ],
  flats: [
    "1560343090-f0409e92791a",
    "1519415943484-9fa1873496d4",
    "1562183241-b937e95585b6",
  ],
  shoes: [
    "1542291026-7eec264c27ff",
    "1608231387042-66d1773070a5",
    "1595950653106-6c9ebd614d3a",
    "1600269452121-4f2416e55c28",
    "1491553895911-0055eca6402d",
    "1560769629-975ec94e6a86",
  ],
  sandals: [
    "1603487742131-4160ec999306",
    "1562183241-b937e95585b6",
    "1603808033192-082d6919d3e1",
  ],
  handbags: [
    "1584917865442-de89df76afd3",
    "1548036328-c9fa89d128fa",
    "1566150905458-1bf1fc113f0d",
    "1590874103328-eac38a683ce7",
  ],
  watches: [
    "1523275335684-37898b6baf30",
    "1524805444758-089113d48a6d",
    "1547996160-81dfa63595aa",
    "1539874754764-5a96559165b0",
  ],
  shorts: [
    "1591195853828-11db59a44f6b",
    "1598032895397-b9472444bf93",
    "1506629082955-511b1aa562c8",
  ],
  kids: [
    "1503919545889-aef636e10ad4",
    "1519238263530-99bdd11df2ea",
    "1519457431-44ccd64a579b",
    "1522771930-78848d9293e8",
    "1560506840-ec148e82a604",
  ],
  toys: [
    "1558060370-d644479cb6f7",
    "1596461404969-9ae70f2830c1",
    "1587654780291-39c9404d746b",
    "1566576912321-d58ddd7a6088",
    "1607453998774-d533f65dac99",
  ],
  bedsheets: [
    "1505693416388-ac5ce068fe85",
    "1522771739844-6a9f6d5f14af",
    "1540518614846-7eded433c457",
    "1616594039964-ae9021a400a0",
    "1631049307264-da0ec9d70304",
  ],
  cushions: [
    "1579656381226-5fc0f0100c3b",
    "1584100936595-c0654b55a2e2",
    "1586023492125-27b2c045efd7",
    "1616486338812-3dadae4b4ace",
  ],
  curtains: [
    "1513694203232-719a280e022f",
    "1560448204-e02f11c3d0e2",
    "1524758631624-e2822e304c36",
    "1615873968403-89e068629265",
    "1618221195710-dd6b41faaea6",
  ],
  mugs: [
    "1514228742587-6b1558fcca3d",
    "1577937927133-66ef06acdf18",
    "1517701550927-30cf4ba1dba5",
    "1495474472287-4d71bcdd2085",
  ],
  lamps: [
    "1507473885765-e6ed057f782c",
    "1543198126-a8ad8e47fb22",
    "1513506003901-1e6a229e2d15",
    "1565814329452-e1efa11c5b89",
  ],
  towels: [
    "1584100936595-c0654b55a2e2",
    "1584622650111-993a426fbf0a",
    "1600369672770-985fd30004eb",
    "1620916566398-39f1143ab7be",
  ],
  decor: [
    "1513519245088-0e12902e5a38",
    "1493663284031-b7e3aefcae8e",
    "1616486338812-3dadae4b4ace",
    "1615873968403-89e068629265",
  ],
  makeup: [
    "1596462502278-27bfdc403348",
    "1522335789203-aabd1fc54bc9",
    "1631730359585-38a4935cbec4",
    "1512207736890-6ffed8a84e8d",
    "1487412947147-5cebf100ffc2",
  ],
  lipsticks: [
    "1586495777744-4413f21062fa",
    "1512496015851-a90fb38ba796",
    "1631214540553-ff044a3ff1d2",
  ],
  skincare: [
    "1556228720-195a672e8a03",
    "1571781926291-c477ebfd024b",
    "1570194065650-d99fb4bedf0a",
    "1598440947619-2c35fc9aa908",
    "1608248597279-f99d160bfcbc",
  ],
  perfumes: [
    "1541643600914-78b084683601",
    "1523293182086-7651a899d37f",
    "1594035910387-fea47794261f",
    "1587017539504-67cfbddac569",
  ],
};

const CATEGORY_SLUGS = {
  "T-Shirts": "tshirts",
  "Casual Shirts": "shirts",
  "Formal Shirts": "shirts",
  Jackets: "jackets",
  Jeans: "jeans",
  "Casual Trousers": "trousers",
  "Track Pants": "trousers",
  "Sports Shoes": "shoes",
  "Casual Shoes": "shoes",
  Sandals: "sandals",
  Kurtas: "kurtas",
  Watches: "watches",
  Sarees: "sarees",
  Tops: "tops",
  Dresses: "dresses",
  Jumpsuits: "dresses",
  Heels: "heels",
  Flats: "flats",
  Handbags: "handbags",
  "Boys' T-Shirts": "tshirts",
  "Boys' Shorts": "shorts",
  "Girls' Dresses": "dresses",
  "Girls' Tops": "tops",
  "Kids' Shoes": "kids",
  Toys: "toys",
  Bedsheets: "bedsheets",
  "Cushions & Covers": "cushions",
  Curtains: "curtains",
  "Cups & Mugs": "mugs",
  "Table Lamps": "lamps",
  Towels: "towels",
  Showpieces: "decor",
  Lipsticks: "lipsticks",
  Foundation: "makeup",
  Kajal: "makeup",
  Sunscreen: "skincare",
  "Face Wash": "skincare",
  Moisturisers: "skincare",
  Perfumes: "perfumes",
  "Hair Serum": "skincare",
  "Body Wash": "skincare",
};

const BANNERS = [
  { name: "b1", id: "1441986300917-64674bd600d8" },
  { name: "b2", id: "1483985988355-763728e1935b" },
  { name: "b3", id: "1596462502278-27bfdc403348" },
  { name: "b4", id: "1513694203232-719a280e022f" },
];

const CIRCLES = [
  { name: "men", id: "1516257984-b1b4d707412e" },
  { name: "women", id: "1483985988355-763728e1935b" },
  { name: "kids", id: "1503919545889-aef636e10ad4" },
  { name: "home", id: "1616486338812-3dadae4b4ace" },
  { name: "beauty", id: "1596462502278-27bfdc403348" },
  { name: "handbags", id: "1584917865442-de89df76afd3" },
  { name: "sneakers", id: "1542291026-7eec264c27ff" },
  { name: "watches", id: "1523275335684-37898b6baf30" },
];

function photoUrl(id, width, height) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}

async function download(imageUrl, outFile) {
  const response = await fetch(imageUrl, { headers: UA });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get("content-type") || "";
  if (!type.startsWith("image/")) throw new Error(`content-type ${type}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 5000) throw new Error(`too small (${buffer.length} bytes)`);
  await writeFile(outFile, buffer);
  return buffer.length;
}

async function runPool(items, limit, worker) {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item !== undefined) {
        await worker(item);
      }
    }
  });
  await Promise.all(workers);
}

async function main() {
  await rm(ROOT, { recursive: true, force: true });
  await mkdir(path.join(ROOT, "products"), { recursive: true });
  await mkdir(path.join(ROOT, "banners"), { recursive: true });
  await mkdir(path.join(ROOT, "circles"), { recursive: true });
  await mkdir(POOLS, { recursive: true });

  const failures = [];
  const poolFiles = {};

  for (const [slug, ids] of Object.entries(CANDIDATES)) {
    const dir = path.join(POOLS, slug);
    await mkdir(dir, { recursive: true });
    poolFiles[slug] = [];
    for (const id of ids) {
      const file = path.join(dir, `${id}.jpg`);
      try {
        await download(photoUrl(id, 720, 960), file);
        poolFiles[slug].push(file);
      } catch (error) {
        failures.push(`${slug}/${id}: ${error.message}`);
      }
    }
  }

  const jobs = [
    ...BANNERS.map((banner) => ({
      label: `banner ${banner.name}`,
      url: photoUrl(banner.id, 1600, 620),
      out: path.join(ROOT, "banners", `${banner.name}.jpg`),
    })),
    ...CIRCLES.map((circle) => ({
      label: `circle ${circle.name}`,
      url: photoUrl(circle.id, 400, 400),
      out: path.join(ROOT, "circles", `${circle.name}.jpg`),
    })),
  ];

  await runPool(jobs, 6, async (job) => {
    try {
      await download(job.url, job.out);
    } catch (error) {
      failures.push(`${job.label}: ${error.message}`);
    }
  });

  const source = await readFile(path.resolve("src/data/products.ts"), "utf8");
  const regex =
    /\[\s*"(men|women|kids|home|beauty)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*(\d+)\s*\]/g;
  const defs = [];
  for (const match of source.matchAll(regex)) {
    defs.push({ category: match[2] });
  }
  if (defs.length === 0) throw new Error("Could not parse product definitions");

  const counts = {};
  for (const [index, def] of defs.entries()) {
    const slug = CATEGORY_SLUGS[def.category];
    const files = poolFiles[slug] ?? [];
    if (!slug || files.length === 0) {
      failures.push(`product p${index + 1} (${def.category}): no usable images`);
      continue;
    }
    for (let n = 0; n < 4; n += 1) {
      const from = files[(index + n) % files.length];
      const to = path.join(ROOT, "products", `p${index + 1}-${n + 1}.jpg`);
      await copyFile(from, to);
    }
    counts[slug] = (counts[slug] ?? 0) + 1;
  }

  await rm(POOLS, { recursive: true, force: true });

  console.log(`Products: ${defs.length}`);
  console.log(
    Object.entries(counts)
      .map(([slug, count]) => `${slug}:${poolFiles[slug].length}imgs/${count}products`)
      .join("  "),
  );
  if (failures.length > 0) {
    console.log(`\nSkipped (${failures.length}):`);
    for (const failure of failures) console.log(`  - ${failure}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
