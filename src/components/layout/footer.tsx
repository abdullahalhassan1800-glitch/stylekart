"use client";

import Link from "next/link";
import { useToast } from "@/context/toast-context";
import { IconReturn, IconShield } from "@/components/ui/icons";

type FooterLink = { label: string; href?: string };

const SHOP_LINKS: FooterLink[] = [
  { label: "Men", href: "/shop/men" },
  { label: "Women", href: "/shop/women" },
  { label: "Kids", href: "/shop/kids" },
  { label: "Home", href: "/shop/home" },
  { label: "Beauty", href: "/shop/beauty" },
  { label: "Genz", href: "/shop/all" },
  { label: "Gift Cards" },
  { label: "Myntra Insider" },
];

const USEFUL_LINKS: FooterLink[] = [
  { label: "Blog" },
  { label: "Careers" },
  { label: "Site Map" },
  { label: "Corporate Information" },
  { label: "Whitehat" },
  { label: "Cleartrip" },
  { label: "Myntra Global" },
];

const POLICY_LINKS: FooterLink[] = [
  { label: "Contact Us" },
  { label: "FAQ" },
  { label: "T&C" },
  { label: "Terms Of Use" },
  { label: "Track Orders", href: "/orders" },
  { label: "Shipping" },
  { label: "Cancellation" },
  { label: "Returns" },
  { label: "Privacy policy" },
  { label: "Grievance Redressal" },
  { label: "FSSAI Food Safety Connect app" },
];

const POPULAR_SEARCH_TERMS = [
  "Makeup",
  "Dresses For Girls",
  "T-Shirts",
  "Sandals",
  "Headphones",
  "Babydolls",
  "Blazers For Men",
  "Handbags",
  "Ladies Watches",
  "Bags",
  "Sport Shoes",
  "Reebok Shoes",
  "Puma Shoes",
  "Boxers",
  "Wallets",
  "Tops",
  "Earrings",
  "Fastrack Watches",
  "Kurtis",
  "Nike",
  "Smart Watches",
  "Titan Watches",
  "Designer Blouse",
  "Gowns",
  "Rings",
  "Cricket Shoes",
  "Forever 21",
  "Eye Makeup",
  "Photo Frames",
  "Punjabi Suits",
  "Bikini",
  "Myntra Fashion Show",
  "Lipstick",
  "Saree",
  "Watches",
  "Dresses",
  "Lehenga",
  "Nike Shoes",
  "Goggles",
  "Bras",
  "Suit",
  "Chinos",
  "Shoes",
  "Adidas Shoes",
  "Woodland Shoes",
  "Jewellery",
  "Designers Sarees",
];

const POPULAR_SEARCHES = POPULAR_SEARCH_TERMS.map((label) => ({
  label,
  href:
    label === "Myntra Fashion Show"
      ? "/studio"
      : `/shop/all?q=${encodeURIComponent(label)}`,
}));

const SOCIALS = [
  {
    label: "Facebook",
    path: "M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.4-3H13v-1.2c0-.5.2-.8.5-.8Z",
  },
  {
    label: "X",
    path: "M17.6 4h2.9l-6.3 7.2L21.6 20h-5.8l-4.5-5.9L5.9 20H3l6.8-7.8L2.7 4h6l4.1 5.4L17.6 4Zm-1 14.2h1.6L7.9 5.7H6.2l10.4 12.5Z",
  },
  {
    label: "YouTube",
    path: "M21.6 8.2a2.8 2.8 0 0 0-2-2C17.9 5.7 12 5.7 12 5.7s-5.9 0-7.6.5a2.8 2.8 0 0 0-2 2C1.9 9.9 1.9 12 1.9 12s0 2.1.5 3.8a2.8 2.8 0 0 0 2 2c1.7.5 7.6.5 7.6.5s5.9 0 7.6-.5a2.8 2.8 0 0 0 2-2c.5-1.7.5-3.8.5-3.8s0-2.1-.5-3.8ZM10.2 15.3V8.7l5.2 3.3-5.2 3.3Z",
  },
  {
    label: "Instagram",
    path: "M12 7.6A4.4 4.4 0 1 0 16.4 12 4.4 4.4 0 0 0 12 7.6Zm0 7.2A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8ZM17.8 7.3a1 1 0 1 1-1-1 1 1 0 0 1 1 1ZM8.1 3.5h7.8A4.6 4.6 0 0 1 20.5 8v8a4.6 4.6 0 0 1-4.6 4.6H8.1A4.6 4.6 0 0 1 3.5 16V8A4.6 4.6 0 0 1 8.1 3.5Zm0 1.7A2.9 2.9 0 0 0 5.2 8v8a2.9 2.9 0 0 0 2.9 2.9h7.8a2.9 2.9 0 0 0 2.9-2.9V8a2.9 2.9 0 0 0-2.9-2.9H8.1Z",
  },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.3px] text-ink">
      {children}
    </p>
  );
}

function FooterLinkItem({
  link,
  onNoticeClick,
}: {
  link: FooterLink;
  onNoticeClick: () => void;
}) {
  if (link.href) {
    return (
      <Link
        href={link.href}
        className="text-[14px] leading-[19px] text-[#696e79] hover:text-ink"
      >
        {link.label}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onNoticeClick}
      className="text-left text-[14px] leading-[19px] text-[#696e79] hover:text-ink"
    >
      {link.label}
    </button>
  );
}

export default function Footer() {
  const { showToast } = useToast();
  const noticeToast = () => showToast("This page is coming soon");

  return (
    <footer className="mt-12 border-t border-[#eaeaec] bg-[#fafbfc] text-ink lg:mt-[40px]">
      <div className="mx-auto max-w-[1080px] px-4 py-10 lg:px-0">
        <div className="grid grid-cols-2 gap-8 pb-8 md:grid-cols-4 lg:grid-cols-[175px_162px_380px_250px] lg:gap-0">
          <div>
            <ColumnTitle>Online Shopping</ColumnTitle>
            <ul className="mb-6 space-y-[1px]">
              {SHOP_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} onNoticeClick={noticeToast} />
                </li>
              ))}
            </ul>

            <ColumnTitle>Useful Links</ColumnTitle>
            <ul className="space-y-[1px]">
              {USEFUL_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} onNoticeClick={noticeToast} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Customer Policies</ColumnTitle>
            <ul className="space-y-[1px]">
              {POLICY_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLinkItem link={link} onNoticeClick={noticeToast} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>Experience Myntra App on Mobile</ColumnTitle>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={noticeToast}
                className="flex w-fit items-center gap-2 rounded bg-black px-3 py-1.5 text-left text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
                  <path d="M3.6 2.3 13 12l-9.4 9.7a2 2 0 0 1-.6-1.4V3.7c0-.5.2-1 .6-1.4Zm10.8 11.1 2.7 2.8-9.9 5.6 7.2-8.4Zm0-2.8L7.2 2.2l9.9 5.6-2.7 2.8Zm1.2 1.4 3.6 2-3.3 1.9-1.6-1.7 1.3-2.2Zm0-2.8-1.3-2.2 1.6-1.7 3.3 1.9-3.6 2Z" />
                </svg>
                <span>
                  <span className="block text-[9px] uppercase tracking-wide text-white/70">
                    Get it on
                  </span>
                  <span className="block text-sm font-bold leading-tight">
                    Google Play
                  </span>
                </span>
              </button>
              <button
                type="button"
                onClick={noticeToast}
                className="flex w-fit items-center gap-2 rounded bg-black px-3 py-1.5 text-left text-white"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
                  <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3.1-.8s1.9.8 3.1.8c1.3 0 2.1-1.1 2.9-2.2.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.9-1.1-2.9-3.5ZM14.1 5.9c.7-.8 1.1-1.9 1-3.1-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.5 2.9-1.3Z" />
                </svg>
                <span>
                  <span className="block text-[9px] uppercase tracking-wide text-white/70">
                    Download on the
                  </span>
                  <span className="block text-sm font-bold leading-tight">
                    App Store
                  </span>
                </span>
              </button>
            </div>

            <p className="mb-2.5 mt-6 text-[12px] font-bold uppercase tracking-[0.3px]">
              Keep in Touch
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <button
                  key={social.label}
                  type="button"
                  aria-label={`Social link ${social.label}`}
                  onClick={noticeToast}
                  className="grid size-8 place-items-center rounded-full border border-[#d4d5d9] bg-white text-[#696e79] transition hover:border-ink hover:bg-ink hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <IconShield className="h-8 w-8 shrink-0 text-[#696e79]" />
              <div>
                <p className="text-[16px] font-bold uppercase">100% Original</p>
                <p className="text-[14px] leading-[19px] text-[#696e79]">
                  guarantee for all products at myntra.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <IconReturn className="h-8 w-8 shrink-0 text-[#696e79]" />
              <div>
                <p className="text-[16px] font-bold">Return within 14 days</p>
                <p className="text-[14px] leading-[19px] text-[#696e79]">
                  of receiving your order
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#eaeaec] pt-6">
          <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#696e79]">
            Popular Searches
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {POPULAR_SEARCHES.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] text-[#696e79] hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-[1px] border-t border-[#eaeaec] pt-6 text-[14px] leading-[19px] text-[#696e79]">
          <p>
            In case of any concern,{" "}
            <button
              type="button"
              onClick={noticeToast}
              className="font-bold text-[#526cd0] hover:underline"
            >
              Contact Us
            </button>
          </p>
          <p className="font-bold text-ink">
            © 2026 www.myntra.com. All rights reserved.
          </p>
          <p>A Flipkart company</p>
          <p className="mt-2 font-bold text-ink">Registered Office Address</p>
          <p>
            Buildings Alyssa, Begonia and Clover situated in Embassy Tech
            Village, Outer Ring Road, Devarabeesanahalli Village, Varthur Hobli,
            Bengaluru – 560103, India
          </p>
          <p className="mt-2">CIN: U72300KA2007PTC041799</p>
          <p>
            Telephone:{" "}
            <button
              type="button"
              onClick={noticeToast}
              className="font-bold text-[#526cd0] hover:underline"
            >
              080-40011450
            </button>
          </p>
        </div>

        <div className="mt-8 border-t border-[#eaeaec] pt-6 text-[12px] leading-[18px] text-[#696e79]">
          <section>
            <h2 className="text-[13px] font-bold uppercase text-ink">
              ONLINE SHOPPING MADE EASY AT MYNTRA
            </h2>
            <p className="mt-2">
              If you would like to experience the best of online shopping for
              men, women and kids in India, you are at the right place. Myntra
              is the ultimate destination for fashion and lifestyle, being host
              to a wide array of merchandise including clothing, footwear,
              accessories, jewellery, personal care products and more. It is
              time to redefine your style statement with our treasure-trove of
              trendy items. Our online store brings you the latest in designer
              products straight out of fashion houses. You can shop online at
              Myntra from the comfort of your home and get your favourites
              delivered right to your doorstep.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              BEST ONLINE SHOPPING SITE IN INDIA FOR FASHION
            </h2>
            <p className="mt-2">
              Be it clothing, footwear or accessories, Myntra offers you the
              ideal combination of fashion and functionality for men, women and
              kids. You will realise that the sky is the limit when it comes to
              the types of outfits that you can purchase for different
              occasions.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Smart men’s clothing</span> -
              At Myntra you will find myriad options in smart formal shirts and
              trousers, cool T-shirts and jeans, or kurta and pyjama
              combinations for men. Wear your attitude with printed T-shirts.
              Create the back-to-campus vibe with varsity T-shirts and
              distressed jeans. Be it gingham, buffalo, or window-pane style,
              checked shirts are unbeatably smart. Team them up with chinos,
              cuffed jeans or cropped trousers for a smart casual look. Opt for
              a stylish layered look with biker jackets. Head out in cloudy
              weather with courage in water-resistant jackets. Browse through
              our innerwear section to find supportive garments which would keep
              you confident in any outfit.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Trendy women’s clothing</span>{" "}
              - Online shopping for women at Myntra is a mood-elevating
              experience. Look hip and stay comfortable with chinos and printed
              shorts this summer. Look hot on your date dressed in a little
              black dress, or opt for red dresses for a sassy vibe. Striped
              dresses and T-shirts represent the classic spirit of nautical
              fashion. Choose your favourites from among Bardot, off-shoulder,
              shirt-style, blouson, embroidered and peplum tops, to name a few.
              Team them up with skinny-fit jeans, skirts or palazzos. Kurtis and
              jeans make the perfect fusion-wear combination for the cool
              urbanite. Our grand sarees and lehenga-choli selections are
              perfect to make an impression at big social events such as
              weddings. Our salwar-kameez sets, kurtas and Patiala suits make
              comfortable options for regular wear.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Fashionable footwear</span> -
              While clothes maketh the man, the type of footwear you wear
              reflects your personality. We bring you an exhaustive lineup of
              options in casual shoes for men, such as sneakers and loafers.
              Make a power statement at work dressed in brogues and oxfords.
              Practice for your marathon with running shoes for men and women.
              Choose shoes for individual games such as tennis, football,
              basketball, and the like. Or step into the casual style and
              comfort offered by sandals, sliders, and flip-flops. Explore our
              lineup of fashionable footwear for ladies, including pumps, heeled
              boots, wedge-heels, and pencil-heels. Or enjoy the best of comfort
              and style with embellished and metallic flats.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Stylish accessories</span> -
              Myntra is one of the best online shopping sites for classy
              accessories that perfectly complement your outfits. You can select
              smart analogue or digital watches and match them up with belts and
              ties. Pick up spacious bags, backpacks, and wallets to store your
              essentials in style. Whether you prefer minimal jewellery or grand
              and sparkling pieces, our online jewellery collection offers you
              many impressive options.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Fun and frolic</span> -
              Online shopping for kids at Myntra is a complete joy. Your little
              princess is going to love the wide variety of pretty dresses,
              ballerina shoes, headbands and clips. Delight your son by picking
              up sports shoes, superhero T-shirts, football jerseys and much
              more from our online store. Check out our lineup of toys with
              which you can create memories to cherish.
            </p>
            <p className="mt-2">
              <span className="font-bold text-ink">Beauty begins here</span> -
              You can also refresh, rejuvenate and reveal beautiful skin with
              personal care, beauty and grooming products from Myntra. Our
              soaps, shower gels, skin care creams, lotions and other ayurvedic
              products are specially formulated to reduce the effect of aging
              and offer the ideal cleansing experience. Keep your scalp clean
              and your hair uber-stylish with shampoos and hair care products.
              Choose makeup to enhance your natural beauty.
            </p>
            <p className="mt-2">
              Myntra is one of the best online shopping sites in India which
              could help transform your living spaces completely. Add colour and
              personality to your bedrooms with bed linen and curtains. Use
              smart tableware to impress your guest. Wall decor, clocks, photo
              frames and artificial plants are sure to breathe life into any
              corner of your home.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              AFFORDABLE FASHION AT YOUR FINGERTIPS
            </h2>
            <p className="mt-2">
              Myntra is one of the unique online shopping sites in India where
              fashion is accessible to all. Check out our new arrivals to view
              the latest designer clothing, footwear and accessories in the
              market. You can get your hands on the trendiest style every season
              in western wear. You can also avail the best of ethnic fashion
              during all Indian festive occasions. You are sure to be impressed
              with our seasonal discounts on footwear, trousers, shirts,
              backpacks and more. The end-of-season sale is the ultimate
              experience when fashion gets unbelievably affordable.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              MYNTRA INSIDER
            </h2>
            <p className="mt-2">
              Every online shopping experience is precious. Hence, a cashless
              reward-based customer loyalty program called Myntra Insider was
              introduced to enhance your online experience. The program is
              applicable to every registered customer and measures rewards in
              the form of Insider Points.
            </p>
            <p className="mt-2">
              There are four levels to achieve in the program, as the Insider
              Points accumulate. They are - Insider, Select, Elite or Icon.
              Apart from offering discounts on Myntra and partner platform
              coupons, each tier comes with its own special perks.
            </p>
            <p className="mt-3 font-bold text-ink">Insider</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                Opportunity to master any domain in fashion with tips from
                celebrity stylists at Myntra Masterclass sessions.
              </li>
              <li>Curated collections from celeb stylists.</li>
            </ul>
            <p className="mt-3 font-bold text-ink">Elite</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>
                VIP access to special sale events such as the End of Reason Sale
                (EORS) and product launches.
              </li>
              <li>Exclusive early access to Limited Edition products</li>
            </ul>
            <p className="mt-3 font-bold text-ink">Icon</p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              <li>Chance to get on guest lists for special events.</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold text-ink">
              Myntra Studio - The Personalised Fashion Feed You Wouldn’t Want To
              Miss Out On
            </h2>
            <p className="mt-2">
              The world wide web is evolving at a relentless pace, and with an
              accelerated growth each passing year, there is bound to be an
              overwhelming surge of online content. It was for this very reason
              that personalisation of search feeds was proposed as a solution to
              combat the overload of irrelevant information.
            </p>
            <p className="mt-2">
              Several social media platforms such as Facebook and Instagram
              along with various online shopping websites have chosen to help
              filter content, increasing user engagement, retention and customer
              loyalty.
            </p>
            <p className="mt-2">
              Myntra is one such online shopping website that joins the list of
              platforms that help curate a personalised fashion feed. Named the
              Myntra Studio, this personalised search feed brings you the latest
              men and women’s fashion trends, celebrity styles, branded content
              and daily updates from your favourite fashion labels.
            </p>
            <p className="mt-2">
              If you are wondering how impactful Myntra Studio can be, we are
              listing out five perks of having a rich, meaningful, and
              personalised fashion feed in your life.
            </p>

            <h4 className="mt-4 text-[12px] font-bold text-ink">
              Keep Up With What Your Favourite Fashion Icons Are Upto
            </h4>
            <p className="mt-2">
              The #OOTD, AKA outfit of the day hashtag trend has been a rage
              among fashion bloggers and stylists. The whole concept of building
              an outfit from scratch and showcasing it to a huge community of
              enthusiasts using the hashtag has helped individuals with
              understanding trends and making suitable for daily wear.
            </p>
            <p className="mt-2">
              Imagine if you could keep up with every piece of clothing and
              accessory worn by the fashion icons you look upto. From Sonam
              Kapoor to Hailey Baldwin Bieber, Myntra Studio has a ‘Stories’
              feature to help track celebrity fashion trends, exploring details
              such as their outfit of the day. This way, you would not ever miss
              out on the latest celebrity fashion trends, from all around the
              world.
            </p>

            <h4 className="mt-4 text-[12px] font-bold text-ink">
              Quick Fashion Tip And Tricks
            </h4>
            <p className="mt-2">
              Whether it is draping a saree into a dhoti style, wearing the
              right lingerie under certain dresses or discovering multiple uses
              out of heavy ethnic wear, Myntra Studio will help you acquire some
              unique and useful fashion hacks. Each hack is designed with the
              intention to help you get the best wear out of everything in your
              wardrobe.
            </p>

            <h4 className="mt-4 text-[12px] font-bold text-ink">
              Updates on What Is Trending and New Product Launches
            </h4>
            <p className="mt-2">
              Since fast fashion seems to be extremely hard to keep up with
              these days, a quick update on what is trending in accessories,
              clothing and footwear would certainly be of great help. Myntra
              Studio helps you stay connected to the most beloved and sought
              after brands such as Puma, Coverstory, The Label Life and so many
              more.
            </p>
            <p className="mt-2">
              Your feed keeps you updated with stories of what the brands are
              creating including clothing, footwear and jewellery, along with
              their new seasonal collections.
            </p>

            <h4 className="mt-4 text-[12px] font-bold text-ink">
              Explicit Step-By-Step Beauty Routines From Experts
            </h4>
            <p className="mt-2">
              Just like fashion, the beauty community keeps on growing, and with
              brands such as Huda Beauty, MAC and the latest Kay Beauty by
              Katrina Kaif, are constantly coming up with mind-blowing products.
              Whether it is creating a no-makeup look, different winged
              eyeliners, do-it-yourself facial masks and other personal care
              beauty routines, Myntra Studio is here for you.
            </p>

            <h4 className="mt-4 text-[12px] font-bold text-ink">
              Celebrity Confessions And A Look Into Their Lives
            </h4>
            <p className="mt-2">
              A bonus feature that Myntra Studio has in store for you is
              celebrity confessions and a peek into their lives. So, Myntra
              helps you stay connected to your most beloved celebrities in a
              matter of clicks.
            </p>
            <p className="mt-2">
              If you are very particular when it comes to the content you wish
              to view and engage with on social media, the ability to
              intricately filter content helps achieve that. Applying the same
              formula for hardcore fashion lovers and shoppers, Myntra Studio
              brings you a daily fashion fix incorporating everything that you
              love, all at one place. Sign up on Myntra today and start
              organising your fashion feed, just the way you want to.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              MYNTRA APP
            </h2>
            <p className="mt-2">
              Myntra, India’s no. 1 online fashion destination justifies its
              fashion relevance by bringing something new and chic to the table
              on the daily. Fashion trends seem to change at lightning speed,
              yet the Myntra shopping app has managed to keep up without any
              hiccups. In addition, Myntra has vowed to serve customers to the
              best of its ability by introducing its first-ever loyalty program,
              The Myntra Insider. Gain access to priority delivery, early sales,
              lucrative deals and other special perks on all your shopping with
              the Myntra app. Download the Myntra app on your Android or IOS
              device today and experience shopping like never before!
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              HISTORY OF MYNTRA
            </h2>
            <p className="mt-2">
              Becoming India’s no. 1 fashion destination is not an easy feat.
              Sincere efforts, digital enhancements and a team of dedicated
              personnel with an equally loyal customer base have made Myntra the
              online platform that it is today. The original B2B venture for
              personalized gifts was conceived in 2007 but transitioned into a
              full-fledged ecommerce giant within a span of just a few years. By
              2012, Myntra had introduced 350 Indian and international brands to
              its platform, and this has only grown in number each passing year.
              Today Myntra sits on top of the online fashion game with an
              astounding social media following, a loyalty program dedicated to
              its customers, and tempting, hard-to-say-no-to deals.
            </p>
            <p className="mt-2">
              The Myntra shopping app came into existence in the year 2015 to
              further encourage customers’ shopping sprees. Download the app on
              your Android or IOS device this very minute to experience fashion
              like never before
            </p>
          </section>

          <section className="mt-6">
            <h2 className="text-[13px] font-bold uppercase text-ink">
              SHOP ONLINE AT MYNTRA WITH COMPLETE CONVENIENCE
            </h2>
            <p className="mt-2">
              Another reason why Myntra is the best of all online stores is the
              complete convenience that it offers. You can view your favourite
              brands with price options for different products in one place. A
              user-friendly interface will guide you through your selection
              process. Comprehensive size charts, product information and
              high-resolution images help you make the best buying decisions.
              You also have the freedom to choose your payment options, be it
              card or cash-on-delivery. The 14-day returns policy gives you more
              power as a buyer. Additionally, the try-and-buy option for select
              products takes customer-friendliness to the next level.
            </p>
            <p className="mt-2">
              Enjoy the hassle-free experience as you shop comfortably from your
              home or your workplace. You can also shop for your friends, family
              and loved-ones and avail our gift services for special occasions.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
