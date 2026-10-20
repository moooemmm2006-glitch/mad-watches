/* =========================================================================
   MAD WATCHES — STORE DATA (the single source of truth)
   -------------------------------------------------------------------------
   Everything on the website is built from this file:
     1. STORE    → settings: contact, shipping, payment, announcement bar…
     2. BRANDS   → the brands (brand page, filters, brand strip)
     3. PRODUCTS → every watch (cards, shop filters, product pages, cart)

   Arabic: add "_ar" to a field name for its Arabic version
   (name → name_ar). If it's missing, the English text is shown.

   ► Step-by-step guide (English + Arabic): docs/ADD-PRODUCTS.md
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. STORE SETTINGS
   ------------------------------------------------------------------------- */
const STORE = {
  name: "Mad Watches",

  /* --- WhatsApp + social platforms ---
     Every WhatsApp button, social icon and card on the site reads these.
     - whatsapp: digits only, with country code (20), no "+". The number is
       never shown as text on the site: visitors just tap "Chat with us".
     - Leave a social link "" to hide it everywhere (icons, cards, footer). */
  whatsapp: "201096452755",
  instagram: "https://www.instagram.com/madwatches1/",
  tiktok: "https://www.tiktok.com/@mad.watches",
  facebook: "https://www.facebook.com/profile.php?id=61592099123668",

  /* --- Other contact details --- */
  email: "moooemmm2006@gmail.com",
  location: "Cairo, Egypt",                              // ← your city / area
  location_ar: "القاهرة، مصر",

  /* --- Working hours (contact page, footer, Google data) ---
     "24/7" shows "Open 24/7" / "متاحين 24 ساعة، كل أيام الأسبوع" (texts in js/i18n.js).
     For other hours write them yourself, e.g.
       hours: { text: "Daily, 10 AM – 10 PM", text_ar: "يومياً من 10 صباحاً حتى 10 مساءً" }
     openingHours is the same thing for Google: "Mo-Su 00:00-23:59" = always open. */
  hours: "24/7",
  openingHours: "Mo-Su 00:00-23:59",

  /* --- Customer reviews ---
     Real reviews live in the highlights on Instagram (the button links to
     the "instagram" link above).
     reviewVideo: paste ONE Instagram reel/post link to show it on the home
     page and on every product page, e.g. "https://www.instagram.com/reel/ABC123/".
     Leave it "" and nothing is shown. */
  reviewVideo: "",

  /* --- Money --- */
  currency: "EGP",
  shippingFee: 80,                 // shipping price for every order
  giftWrapFee: 50,                 // price of gift wrapping (0 = free)

  /* --- First order discount (cart page) ---
     firstOrderDiscount: EGP taken off the subtotal (0 = no discount at all).
     It is applied automatically when this device has never ordered before,
     or when the customer types firstOrderCode (capitals don't matter).
     If you change the amount, also change the announcement text below. */
  firstOrderDiscount: 100,
  firstOrderCode: "FIRST100",

  /* --- Announcement bar at the top of every page (leave [] for none) --- */
  announcement: [
    { text: "EGP 100 off your first order", text_ar: "خصم 100 جنيه على أول أوردر ليك" },
    { text: "Cash on delivery", text_ar: "الدفع عند الاستلام" },
    { text: "14-day exchange", text_ar: "استبدال خلال 14 يوماً" }
  ],

  /* --- Offers page countdown: when the current offers end (YYYY-MM-DDTHH:MM:SS) --- */
  offerEndsAt: "2026-10-31T23:59:59",

  /* --- Payment methods shown at checkout ---
     enabled: true shows the option. The first enabled one is selected by default. */
  paymentMethods: [
    { id: "cod",       enabled: true,  name: "Cash on delivery", name_ar: "الدفع عند الاستلام",
      note: "Pay in cash when your watch arrives.", note_ar: "ادفع نقداً عند وصول ساعتك." },
    { id: "instapay",  enabled: false, name: "InstaPay", name_ar: "إنستاباي",
      note: "We'll send you the InstaPay details on WhatsApp.", note_ar: "سنرسل لك بيانات إنستاباي على واتساب." },
    { id: "vodafone",  enabled: false, name: "Vodafone Cash", name_ar: "فودافون كاش",
      note: "We'll send you the wallet number on WhatsApp.", note_ar: "سنرسل لك رقم المحفظة على واتساب." }
  ],

  /* --- Reassuring lines under the checkout button --- */
  reassurance: [
    { text: "No payment now", text_ar: "لا دفع الآن" },
    { text: "Confirm with us on WhatsApp", text_ar: "أكّد طلبك معنا على واتساب" },
    { text: "Inspect your watch before paying", text_ar: "عاين ساعتك قبل الدفع" }
  ],

  /* --- Orders → Google Sheet (see docs/ORDERS-SETUP.md). "" = WhatsApp only --- */
  ordersEndpoint: "",

  /* --- Your website address once it's online (no "/" at the end) --- */
  siteUrl: "https://example.com"
};


/* -------------------------------------------------------------------------
   2. BRANDS
   id: lowercase, no spaces. The shop page for a brand: products.html?brand=<id>
   ------------------------------------------------------------------------- */
const BRANDS = [
  {
    id: "casio",
    name: "Casio", name_ar: "كاسيو",
    origin: "Japan · Since 1946", origin_ar: "اليابان · منذ 1946",
    story: "Since 1946, Casio has made precise, tough and honest watches for everyday life. From the retro digital to the legendary G-Shock, it's reliability everyone can afford.",
    story_ar: "منذ عام 1946 تصنع كاسيو ساعات دقيقة وقوية وصادقة للحياة اليومية. من الساعة الرقمية الكلاسيكية إلى جي شوك الأسطورية، اعتمادية في متناول الجميع."
  },
  {
    id: "seiko",
    name: "Seiko", name_ar: "سيكو",
    origin: "Japan · Since 1881", origin_ar: "اليابان · منذ 1881",
    story: "Seiko has crafted watches in Japan since 1881. It builds its own movements in-house and is loved for remarkable value and finishing.",
    story_ar: "تصنع سيكو الساعات في اليابان منذ عام 1881. تصنع حركاتها بنفسها وتشتهر بقيمة استثنائية وتشطيب رائع."
  },
  {
    id: "citizen",
    name: "Citizen", name_ar: "سيتيزن",
    origin: "Japan · Since 1918", origin_ar: "اليابان · منذ 1918",
    story: "Citizen pioneered Eco-Drive: watches powered by any light that never need a battery change. Japanese engineering with a sustainable heart.",
    story_ar: "ابتكرت سيتيزن تقنية إيكو درايف: ساعات تعمل بأي مصدر ضوء ولا تحتاج أبداً لتغيير البطارية. هندسة يابانية بقلب مستدام."
  },
  {
    id: "orient",
    name: "Orient", name_ar: "أورينت",
    origin: "Japan · Since 1950", origin_ar: "اليابان · منذ 1950",
    story: "Orient makes some of the best-value mechanical watches in the world, with in-house automatic movements at honest prices.",
    story_ar: "تصنع أورينت بعضاً من أفضل الساعات الميكانيكية قيمةً في العالم، بحركات أوتوماتيكية من صنعها وبأسعار صادقة."
  },
  {
    id: "fossil",
    name: "Fossil", name_ar: "فوسيل",
    origin: "USA · Since 1984", origin_ar: "الولايات المتحدة · منذ 1984",
    story: "Born in Texas in 1984, Fossil mixes vintage inspiration with modern style: warm, characterful watches made to be worn every day.",
    story_ar: "وُلدت فوسيل في تكساس عام 1984، وتمزج الإلهام الكلاسيكي بالأسلوب العصري: ساعات دافئة ومميزة مصممة للارتداء اليومي."
  },
  {
    id: "tissot",
    name: "Tissot", name_ar: "تيسو",
    origin: "Switzerland · Since 1853", origin_ar: "سويسرا · منذ 1853",
    story: "Tissot has made watches in Le Locle, Switzerland, since 1853, offering true Swiss quality and innovation at an accessible price.",
    story_ar: "تصنع تيسو الساعات في مدينة لو لوكل السويسرية منذ عام 1853، وتقدم جودة وابتكاراً سويسرياً حقيقياً بسعر في المتناول."
  },
  {
    id: "hamilton",
    name: "Hamilton", name_ar: "هاميلتون",
    origin: "USA & Switzerland · Since 1892", origin_ar: "أمريكا وسويسرا · منذ 1892",
    story: "American spirit, Swiss precision. Hamilton's field and aviation watches have a rich military heritage and a strong presence on film.",
    story_ar: "روح أمريكية ودقة سويسرية. لساعات هاميلتون الميدانية وساعات الطيران تاريخ عسكري عريق وحضور قوي في السينما."
  },
  {
    id: "longines",
    name: "Longines", name_ar: "لونجين",
    origin: "Switzerland · Since 1832", origin_ar: "سويسرا · منذ 1832",
    story: "Elegance is an attitude. Since 1832, Longines has combined classic Swiss elegance with sporting heritage.",
    story_ar: "الأناقة أسلوب حياة. منذ عام 1832 تجمع لونجين بين الأناقة السويسرية الكلاسيكية والإرث الرياضي."
  },
  {
    id: "tag-heuer",
    name: "TAG Heuer", name_ar: "تاغ هوير",
    origin: "Switzerland · Since 1860", origin_ar: "سويسرا · منذ 1860",
    story: "Avant-garde since 1860, TAG Heuer is the watch of motor racing, with iconic chronographs like the Carrera and Monaco.",
    story_ar: "طليعية منذ عام 1860، تاغ هوير هي ساعة سباقات السيارات، مع كرونوغرافات أيقونية مثل كاريرا وموناكو."
  },
  {
    id: "omega",
    name: "Omega", name_ar: "أوميغا",
    origin: "Switzerland · Since 1848", origin_ar: "سويسرا · منذ 1848",
    story: "Founded in 1848, Omega has timed the Olympic Games and went to the moon. Swiss precision with a sense of adventure.",
    story_ar: "تأسست أوميغا عام 1848، ووقّتت الألعاب الأولمبية ووصلت إلى القمر. دقة سويسرية مع روح المغامرة."
  },
  {
    id: "rolex",
    name: "Rolex", name_ar: "رولكس",
    origin: "Switzerland · Since 1905", origin_ar: "سويسرا · منذ 1905",
    story: "Since 1905, Rolex has defined what a luxury watch should be: robust, precise and timeless. Its designs barely change, because they don't need to.",
    story_ar: "منذ عام 1905 ترسم رولكس معنى الساعة الفاخرة: متينة ودقيقة وخالدة. تصاميمها لا تتغير تقريباً، لأنها لا تحتاج إلى ذلك."
  },
  {
    id: "swatch",
    name: "Swatch", name_ar: "سواتش",
    origin: "Switzerland · Since 1983", origin_ar: "سويسرا · منذ 1983",
    story: "Swatch made Swiss watches fun, colorful and affordable, from the classic plastic Gent to the famous MoonSwatch.",
    story_ar: "جعلت سواتش الساعات السويسرية ممتعة وملونة وفي المتناول، من الساعة البلاستيكية الكلاسيكية إلى مون سواتش الشهيرة."
  },
  {
    id: "daniel-wellington",
    name: "Daniel Wellington", name_ar: "دانيال ولينغتون",
    origin: "Sweden · Since 2011", origin_ar: "السويد · منذ 2011",
    story: "Scandinavian minimalism on your wrist: slim cases, clean dials and interchangeable straps. The definition of understated.",
    story_ar: "البساطة الإسكندنافية على معصمك: علب نحيفة وموانئ نظيفة وأساور قابلة للتبديل. تعريف الأناقة الهادئة."
  },
  {
    id: "guess",
    name: "Guess", name_ar: "جيس",
    origin: "USA · Since 1981", origin_ar: "الولايات المتحدة · منذ 1981",
    story: "Bold, glamorous and fashion-forward. Guess watches bring sparkle and attitude to every outfit.",
    story_ar: "جريئة وساحرة وعصرية. ساعات جيس تضيف لمعة وشخصية لكل إطلالة."
  },
  {
    id: "zara",
    name: "Zara", name_ar: "زارا",
    origin: "Spain · Fashion", origin_ar: "إسبانيا · أزياء",
    story: "Zara brings runway thinking to everyday accessories: light, modern watches that match the way you dress today.",
    story_ar: "تنقل زارا روح عروض الأزياء إلى الإكسسوارات اليومية: ساعات خفيفة وعصرية تناسب أسلوبك اليوم."
  },
  {
    id: "michael-kors",
    name: "Michael Kors", name_ar: "مايكل كورس",
    origin: "USA · Since 1981", origin_ar: "الولايات المتحدة · منذ 1981",
    story: "Jet-set glamour: polished gold tones, oversized cases and pavé details, designed to be noticed.",
    story_ar: "فخامة الحياة الراقية: ألوان ذهبية لامعة وعلب كبيرة وتفاصيل مرصعة، مصممة لتلفت الأنظار."
  },
  {
    id: "emporio-armani",
    name: "Emporio Armani", name_ar: "إمبوريو أرماني",
    origin: "Italy · Since 1981", origin_ar: "إيطاليا · منذ 1981",
    story: "Italian design with a modern edge: sleek lines, refined details and quiet luxury for every day.",
    story_ar: "تصميم إيطالي بلمسة عصرية: خطوط انسيابية وتفاصيل راقية وفخامة هادئة لكل يوم."
  },
  {
    id: "curren",
    name: "Curren", name_ar: "كورين",
    origin: "Everyday value", origin_ar: "قيمة يومية",
    story: "Curren offers bold, good-looking chronographs at very affordable prices. A smart choice for a first watch or a gift.",
    story_ar: "تقدم كورين ساعات كرونوغراف جريئة وجميلة بأسعار مناسبة جداً. اختيار ذكي كساعة أولى أو هدية."
  },
  {
    id: "naviforce",
    name: "Naviforce", name_ar: "نافيفورس",
    origin: "Everyday value", origin_ar: "قيمة يومية",
    story: "Naviforce makes rugged, feature-packed sports watches with dual time and chronographs, built for everyday adventures.",
    story_ar: "تصنع نافيفورس ساعات رياضية متينة مليئة بالخصائص مثل التوقيت المزدوج والكرونوغراف، مصممة لمغامرات كل يوم."
  }
];


/* -------------------------------------------------------------------------
   3. PRODUCTS
   Required: id, brand, name, price, images (or image), description
   Discount: add originalPrice (the old, higher price). The "-25%" badge,
   the crossed-out price and "You save" are calculated automatically.
   Allowed values (used by the shop filters):
     gender:    "men" | "women" | "unisex"
     style:     "luxury" | "dress" | "sport" | "casual" | "diver" | "smart"
     strap:     "steel" | "leather" | "rubber" | "fabric" | "gold"
     movement:  "automatic" | "quartz" | "smart"
     dialColor: "black" | "blue" | "white" | "silver" | "grey" | "green" |
                "gold" | "rose" | "brown" | "champagne" | "red"
     features:  "water" "movement" "sapphire"
                "chronograph" "solar" "lume" "date" "smart"
   The catalog starts empty: every page shows a "Coming soon" message until
   the first watch is added (see docs/ADD-PRODUCTS.md).
   ------------------------------------------------------------------------- */
const PRODUCTS = [

  /* Your watches go here: one { … } block each, separated by commas.
     The full example and every field are in docs/ADD-PRODUCTS.md. */

  {
    id: "casio-edifice-silver-first-copy",
    brand: "casio",
    name: "Edifice Classic Silver (First Copy)",
    name_ar: "إديفايس كلاسيك فضي (فيرست كوبي)",
    price: 600,
    gender: "men", style: "dress", strap: "leather", movement: "quartz",
    dialColor: "silver",
    inStock: true, stockCount: 7, isNew: false, isFeatured: false,
    createdAt: "2026-10-20",
    images: [
      "images/casio-edifice-silver-1.jpg",
      "images/casio-edifice-silver-2.jpg",
      "images/casio-edifice-silver-3.jpg",
      "images/casio-edifice-silver-4.jpg"
    ],
    description: "A classic men's watch in the Casio Edifice style: silver sunray dial with a date window, red seconds hand and a black leather strap. This is a first copy (not original). It comes with the Casio box and bag.",
    description_ar: "ساعة رجالي كلاسيكية بتصميم كاسيو إديفايس: ميناء فضي بتأثير الأشعة مع نافذة تاريخ وعقرب ثواني أحمر وسوار جلد أسود. فيرست كوبي (غير أصلية). تأتي مع بوكس وشنطة كاسيو.",
    specs:    { movement: "Quartz", strap: "Black leather strap", dialColor: "Silver" },
    specs_ar: { movement: "كوارتز", strap: "سوار جلد أسود", dialColor: "فضي" },
    features: ["date"]
  }

];
