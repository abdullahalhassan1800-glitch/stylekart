import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve("public/images/categories");
const HEADERS = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };

const IMAGES = [
  { slug: "ethnic-wear", id: "20957555" },
  { slug: "casual-wear", id: "19272491" },
  { slug: "mens-activewear", id: "30575115" },
  { slug: "womens-activewear", id: "221241" },
  { slug: "western-wear", id: "1537497" },
  { slug: "sportswear", id: "38137157" },
  { slug: "loungewear", id: "8497487" },
  { slug: "mens-innerwear", id: "31303123" },
  { slug: "lingerie", id: "8483369" },
  { slug: "watches", id: "380782" },
  { slug: "grooming", id: "7253884" },
  { slug: "beauty-appliances", id: "3993328" },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { slug, id } of IMAGES) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=720&h=960&fit=crop`;
  const response = await fetch(url, { headers: HEADERS });

  if (!response.ok) {
    throw new Error(`${slug}: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(`${slug}: unexpected content type ${contentType}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.byteLength < 10_000) {
    throw new Error(`${slug}: image too small (${bytes.byteLength} bytes)`);
  }

  await writeFile(path.join(OUT_DIR, `${slug}.jpg`), bytes);
  console.log(`${slug}.jpg -> ${bytes.byteLength} bytes`);
}
