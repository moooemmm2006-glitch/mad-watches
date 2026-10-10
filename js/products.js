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
  facebook: "",                                          // ← paste your Facebook page link here later

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
   The photos are free samples from Unsplash and the prices are examples:
   replace them with your real ones (see docs/ADD-PRODUCTS.md).
   ------------------------------------------------------------------------- */
const PRODUCTS = [

  /* ---------- CASIO ---------- */
  {
    id: "casio-gshock-dw5600",
    brand: "casio",
    name: "G-Shock DW-5600 Square", name_ar: "جي شوك DW-5600 المربعة",
    model: "DW-5600E-1V",
    price: 3999, originalPrice: 4999,
    gender: "men", style: "sport", strap: "rubber", movement: "smart",
    caseSize: 48.9, dialColor: "black", waterResistance: 200,
    inStock: true, stockCount: 14, isNew: false, isFeatured: true,
    createdAt: "2026-03-01",
    images: [
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1605583972719-30bd2ca0705a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "The original square G-Shock: shock resistant and water resistant to 200 m, with stopwatch, alarm and backlight. Built to take anything.",
    description_ar: "جي شوك المربعة الأصلية: مقاومة للصدمات وللماء حتى 200 متر، مع ساعة إيقاف ومنبه وإضاءة. صُنعت لتتحمل كل شيء.",
    specs:    { movement: "Digital quartz", caseSize: "48.9 mm", caseMaterial: "Resin", strap: "Rubber strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "200 m", weight: "≈ 45 g" },
    specs_ar: { movement: "كوارتز رقمي", caseSize: "48.9 مم", caseMaterial: "ريزن", strap: "سوار مطاط", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "200 متر", weight: "حوالي 45 جم" },
    features: ["water", "movement"]
  },
  {
    id: "casio-vintage-a168",
    brand: "casio",
    name: "Vintage A168 Gold", name_ar: "فينتدج A168 ذهبية",
    model: "A168WG-9W",
    price: 2450, originalPrice: 2950,
    gender: "unisex", style: "casual", strap: "gold", movement: "smart",
    caseSize: 38.6, dialColor: "gold", waterResistance: 30,
    inStock: true, stockCount: 22, isNew: false, isFeatured: false,
    createdAt: "2026-04-08",
    images: [
      "https://images.unsplash.com/photo-1577993944451-f8618a835822?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577993944451-f8618a835822?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1577993944451-f8618a835822?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "The retro digital icon in a gold tone, with light, alarm and stopwatch. Light, slim and timeless.",
    description_ar: "الأيقونة الرقمية الكلاسيكية بلون ذهبي، مع إضاءة ومنبه وساعة إيقاف. خفيفة ونحيفة وخالدة.",
    specs:    { movement: "Digital quartz", caseSize: "38.6 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Gold", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 45 g" },
    specs_ar: { movement: "كوارتز رقمي", caseSize: "38.6 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "ذهبي", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 45 جم" },
    features: ["water", "movement"]
  },
  {
    id: "casio-edifice-chrono",
    brand: "casio",
    name: "Edifice Chronograph", name_ar: "إديفيس كرونوغراف",
    model: "EFR-526D-1AV",
    price: 7900, originalPrice: 9800,
    gender: "men", style: "sport", strap: "steel", movement: "quartz",
    caseSize: 43.8, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 9, isNew: false, isFeatured: false,
    createdAt: "2026-05-15",
    images: [
      "https://images.unsplash.com/photo-1612771409641-b0478cab8b69?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612771409641-b0478cab8b69?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1612771409641-b0478cab8b69?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A motorsport-inspired chronograph with a 1/10-second stopwatch, a date window and a solid steel bracelet.",
    description_ar: "كرونوغراف مستوحى من سباقات السيارات مع ساعة إيقاف لعُشر الثانية ونافذة للتاريخ وسوار ستيل متين.",
    specs:    { movement: "Quartz", caseSize: "43.8 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "100 m", weight: "≈ 149 g" },
    specs_ar: { movement: "كوارتز", caseSize: "43.8 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "100 متر", weight: "حوالي 149 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "casio-duro-diver",
    brand: "casio",
    name: "Duro Diver", name_ar: "ديورو دايفر",
    model: "MDV-106-1AV",
    price: 4250,
    gender: "men", style: "diver", strap: "rubber", movement: "quartz",
    caseSize: 44.2, dialColor: "black", waterResistance: 200,
    inStock: true, stockCount: 12, isNew: false, isFeatured: false,
    createdAt: "2026-06-22",
    images: [
      "https://images.unsplash.com/photo-1643294444451-b1fb283595ad?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1643294444451-b1fb283595ad?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1643294444451-b1fb283595ad?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A true diver's look at an honest price: rotating bezel, luminous hands and 200 m water resistance.",
    description_ar: "مظهر ساعة غوص حقيقية بسعر صادق: إطار دوّار وعقارب مضيئة ومقاومة للماء حتى 200 متر.",
    specs:    { movement: "Quartz", caseSize: "44.2 mm", caseMaterial: "Stainless steel", strap: "Rubber strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "200 m", weight: "≈ 75 g" },
    specs_ar: { movement: "كوارتز", caseSize: "44.2 مم", caseMaterial: "ستانلس ستيل", strap: "سوار مطاط", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "200 متر", weight: "حوالي 75 جم" },
    features: ["water", "movement", "lume"]
  },

  /* ---------- SEIKO ---------- */
  {
    id: "seiko-5-sports",
    brand: "seiko",
    name: "Seiko 5 Sports", name_ar: "سيكو 5 سبورتس",
    model: "SRPD55K1",
    price: 13900, originalPrice: 16500,
    gender: "men", style: "sport", strap: "steel", movement: "automatic",
    caseSize: 42.5, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 7, isNew: false, isFeatured: false,
    createdAt: "2026-07-02",
    images: [
      "https://images.unsplash.com/photo-1603850179998-3a57f293b2c5?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603850179998-3a57f293b2c5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1603850179998-3a57f293b2c5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A self-winding everyday sports watch with a day-date display and an exhibition case back.",
    description_ar: "ساعة رياضية يومية أوتوماتيكية بعرض لليوم والتاريخ وغطاء خلفي شفاف.",
    specs:    { movement: "Automatic", caseSize: "42.5 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Hardlex crystal", waterResistance: "100 m", weight: "≈ 145 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج هاردلكس", waterResistance: "100 متر", weight: "حوالي 145 جم" },
    features: ["water", "movement", "date"]
  },
  {
    id: "seiko-presage-cocktail",
    brand: "seiko",
    name: "Presage Cocktail Time", name_ar: "بريساج كوكتيل تايم",
    model: "SRPB43J1",
    price: 24500,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 40.5, dialColor: "blue", waterResistance: 50,
    inStock: true, stockCount: 3, isNew: false, isFeatured: true,
    createdAt: "2026-08-09",
    images: [
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A deep blue textured dial inspired by Japanese cocktails, framed by a polished case. Elegance with character.",
    description_ar: "ميناء أزرق عميق بملمس مستوحى من الكوكتيلات اليابانية داخل علبة لامعة. أناقة بشخصية.",
    specs:    { movement: "Automatic", caseSize: "40.5 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 69 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "40.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 69 جم" },
    features: ["water", "movement", "sapphire", "date"]
  },
  {
    id: "seiko-prospex-turtle",
    brand: "seiko",
    name: "Prospex Turtle Diver", name_ar: "بروسبكس تيرتل دايفر",
    model: "SRPE93K1",
    price: 21900, originalPrice: 25900,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 45, dialColor: "blue", waterResistance: 200,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-03-16",
    images: [
      "https://images.unsplash.com/photo-1607850478432-a80d4ff5aa41?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607850478432-a80d4ff5aa41?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1607850478432-a80d4ff5aa41?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A legendary cushion-case diver with a unidirectional bezel and bold LumiBrite markers.",
    description_ar: "ساعة غوص أسطورية بعلبة وسادية وإطار دوّار باتجاه واحد ومؤشرات مضيئة واضحة.",
    specs:    { movement: "Automatic", caseSize: "45 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "200 m", weight: "≈ 153 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "45 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "200 متر", weight: "حوالي 153 جم" },
    features: ["water", "movement", "sapphire", "lume"]
  },
  {
    id: "seiko-chronograph-100m",
    brand: "seiko",
    name: "Chronograph 100M", name_ar: "كرونوغراف 100 متر",
    model: "SSB321P1",
    price: 14500, originalPrice: 18900,
    gender: "men", style: "sport", strap: "steel", movement: "quartz",
    caseSize: 41.5, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 8, isNew: false, isFeatured: false,
    createdAt: "2026-04-23",
    images: [
      "https://images.unsplash.com/photo-1568154106189-717dc85b0a3b?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568154106189-717dc85b0a3b?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1568154106189-717dc85b0a3b?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A clean three-register chronograph with a tachymeter scale and 100 m water resistance.",
    description_ar: "كرونوغراف أنيق بثلاثة عدادات ومقياس للسرعة ومقاومة للماء حتى 100 متر.",
    specs:    { movement: "Quartz", caseSize: "41.5 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Hardlex crystal", waterResistance: "100 m", weight: "≈ 141 g" },
    specs_ar: { movement: "كوارتز", caseSize: "41.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج هاردلكس", waterResistance: "100 متر", weight: "حوالي 141 جم" },
    features: ["water", "movement", "chronograph"]
  },

  /* ---------- CITIZEN ---------- */
  {
    id: "citizen-promaster-diver",
    brand: "citizen",
    name: "Promaster Diver Eco-Drive", name_ar: "بروماستر دايفر إيكو درايف",
    model: "BN0150-28E",
    price: 15900, originalPrice: 18500,
    gender: "men", style: "diver", strap: "rubber", movement: "quartz",
    caseSize: 44, dialColor: "black", waterResistance: 200,
    inStock: true, stockCount: 10, isNew: false, isFeatured: true,
    createdAt: "2026-05-03",
    images: [
      "https://images.unsplash.com/photo-1452878569550-39e3d2e630ea?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1452878569550-39e3d2e630ea?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1452878569550-39e3d2e630ea?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A solar-powered ISO diver that never needs a battery change. Any light keeps it running.",
    description_ar: "ساعة غوص بمعيار ISO تعمل بالطاقة الضوئية ولا تحتاج لتغيير البطارية أبداً. أي ضوء يكفي لتشغيلها.",
    specs:    { movement: "Eco-Drive solar quartz", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Rubber strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "200 m", weight: "≈ 75 g" },
    specs_ar: { movement: "إيكو درايف (كوارتز بالطاقة الضوئية)", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار مطاط", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "200 متر", weight: "حوالي 75 جم" },
    features: ["water", "movement", "solar", "lume"]
  },
  {
    id: "citizen-crystal-chrono",
    brand: "citizen",
    name: "Eco-Drive Crystal Chronograph", name_ar: "إيكو درايف كريستال كرونوغراف",
    model: "FB1440-57E",
    price: 12900, originalPrice: 16900,
    gender: "women", style: "dress", strap: "steel", movement: "quartz",
    caseSize: 39, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 6, isNew: false, isFeatured: false,
    createdAt: "2026-06-10",
    images: [
      "https://images.unsplash.com/photo-1729751150730-56897fcc4411?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1729751150730-56897fcc4411?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1729751150730-56897fcc4411?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A sparkling crystal bezel around a black chronograph dial, powered by light.",
    description_ar: "إطار مرصع بالكريستال حول ميناء كرونوغراف أسود، يعمل بالطاقة الضوئية.",
    specs:    { movement: "Eco-Drive solar quartz", caseSize: "39 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "100 m", weight: "≈ 133 g" },
    specs_ar: { movement: "إيكو درايف (كوارتز بالطاقة الضوئية)", caseSize: "39 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "100 متر", weight: "حوالي 133 جم" },
    features: ["water", "movement", "chronograph", "solar"]
  },
  {
    id: "citizen-tsuyosa",
    brand: "citizen",
    name: "Tsuyosa Automatic", name_ar: "تسويوسا أوتوماتيك",
    model: "NJ0151-88M",
    price: 16500,
    gender: "unisex", style: "casual", strap: "steel", movement: "automatic",
    caseSize: 40, dialColor: "blue", waterResistance: 50,
    inStock: true, stockCount: 9, isNew: true, isFeatured: false,
    createdAt: "2026-09-16",
    images: [
      "https://images.unsplash.com/photo-1721719698251-402fbc325d22?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1721719698251-402fbc325d22?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1721719698251-402fbc325d22?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An integrated-bracelet automatic with a vivid turquoise dial and a magnified date. Fresh and confident.",
    description_ar: "ساعة أوتوماتيك بسوار مدمج وميناء فيروزي لافت وعدسة مكبّرة للتاريخ. منعشة وواثقة.",
    specs:    { movement: "Automatic", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 136 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 136 جم" },
    features: ["water", "movement", "sapphire", "date"]
  },

  /* ---------- ORIENT ---------- */
  {
    id: "orient-open-heart",
    brand: "orient",
    name: "Open Heart Classic", name_ar: "أوبن هارت كلاسيك",
    model: "RA-AG0003S",
    price: 8900, originalPrice: 10900,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 42, dialColor: "white", waterResistance: 50,
    inStock: true, stockCount: 7, isNew: false, isFeatured: false,
    createdAt: "2026-08-24",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An opening on the dial reveals the beating balance wheel. A classic automatic with a soul.",
    description_ar: "فتحة في الميناء تكشف عن الميزان النابض. ساعة أوتوماتيك كلاسيكية بروح.",
    specs:    { movement: "Automatic", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 71 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 71 جم" },
    features: ["water", "movement"]
  },
  {
    id: "orient-kamasu",
    brand: "orient",
    name: "Kamasu Diver", name_ar: "كاماسو دايفر",
    model: "RA-AA0003R",
    price: 12500,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 41.8, dialColor: "red", waterResistance: 200,
    inStock: true, stockCount: 6, isNew: true, isFeatured: false,
    createdAt: "2026-09-14",
    images: [
      "https://images.unsplash.com/photo-1725246560248-bb5f53eb2dde?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1725246560248-bb5f53eb2dde?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1725246560248-bb5f53eb2dde?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A sapphire-crystal automatic diver with a sunburst red dial. Serious specs, honest price.",
    description_ar: "ساعة غوص أوتوماتيك بزجاج سافير وميناء أحمر لامع. مواصفات جادة بسعر صادق.",
    specs:    { movement: "Automatic", caseSize: "41.8 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Red", glass: "Sapphire crystal", waterResistance: "200 m", weight: "≈ 142 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "41.8 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أحمر", glass: "زجاج سافير", waterResistance: "200 متر", weight: "حوالي 142 جم" },
    features: ["water", "movement", "sapphire", "lume"]
  },
  {
    id: "orient-sun-moon",
    brand: "orient",
    name: "Sun & Moon", name_ar: "صن آند مون",
    model: "RA-AK0803S",
    price: 11900, originalPrice: 13900,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 42, dialColor: "silver", waterResistance: 50,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-04-11",
    images: [
      "https://images.unsplash.com/photo-1525342306245-c6a1e32087ce?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525342306245-c6a1e32087ce?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1525342306245-c6a1e32087ce?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A day-night indicator turns slowly on the silver dial: a quiet complication for the classic dresser.",
    description_ar: "مؤشر الليل والنهار يدور بهدوء على الميناء الفضي: تعقيد هادئ لعشاق الكلاسيكية.",
    specs:    { movement: "Automatic", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Silver", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 71 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "فضي", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 71 جم" },
    features: ["water", "movement"]
  },

  /* ---------- FOSSIL ---------- */
  {
    id: "fossil-machine",
    brand: "fossil",
    name: "Machine Chronograph", name_ar: "ماشين كرونوغراف",
    model: "FS4656",
    price: 7900, originalPrice: 10500,
    gender: "men", style: "casual", strap: "leather", movement: "quartz",
    caseSize: 45, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 11, isNew: false, isFeatured: false,
    createdAt: "2026-05-18",
    images: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An industrial-inspired chronograph with a smoke-tone case and a strong, bold presence.",
    description_ar: "كرونوغراف بطابع صناعي وعلبة بلون دخاني وحضور قوي وجريء.",
    specs:    { movement: "Quartz", caseSize: "45 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 77 g" },
    specs_ar: { movement: "كوارتز", caseSize: "45 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 77 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "fossil-grant",
    brand: "fossil",
    name: "Grant Chronograph", name_ar: "جرانت كرونوغراف",
    model: "FS4735",
    price: 6900, originalPrice: 9200,
    gender: "men", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 44, dialColor: "white", waterResistance: 50,
    inStock: true, stockCount: 10, isNew: false, isFeatured: false,
    createdAt: "2026-06-25",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "Roman numerals, a cream dial and a brown leather strap for timeless vintage charm.",
    description_ar: "أرقام رومانية وميناء كريمي وسوار جلدي بني بسحر كلاسيكي لا يزول.",
    specs:    { movement: "Quartz", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 75 g" },
    specs_ar: { movement: "كوارتز", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 75 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "fossil-gen6",
    brand: "fossil",
    name: "Gen 6 Smartwatch", name_ar: "الساعة الذكية Gen 6",
    model: "FTW4061",
    price: 13500, originalPrice: 16900,
    gender: "men", style: "smart", strap: "steel", movement: "smart",
    caseSize: 44, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 8, isNew: true, isFeatured: false,
    createdAt: "2026-09-25",
    images: [
      "https://images.unsplash.com/photo-1632794716789-42d9995fb5b6?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632794716789-42d9995fb5b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1632794716789-42d9995fb5b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A classic round smartwatch with Wear OS, heart-rate and SpO2 tracking, and fast charging.",
    description_ar: "ساعة ذكية دائرية كلاسيكية بنظام Wear OS، مع قياس النبض والأكسجين وشحن سريع.",
    specs:    { movement: "Smart (Wear OS)", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Gorilla Glass", waterResistance: "30 m", weight: "≈ 95 g" },
    specs_ar: { movement: "ذكية (Wear OS)", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج جوريلا", waterResistance: "30 متر", weight: "حوالي 95 جم" },
    features: ["water", "movement", "smart"]
  },
  {
    id: "fossil-carlie",
    brand: "fossil",
    name: "Carlie Rose Gold", name_ar: "كارلي روز جولد",
    model: "ES4433",
    price: 5400, originalPrice: 6900,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 28, dialColor: "rose", waterResistance: 30,
    inStock: true, stockCount: 13, isNew: false, isFeatured: false,
    createdAt: "2026-08-12",
    images: [
      "https://images.unsplash.com/photo-1751437761644-460ae92e34c9?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1751437761644-460ae92e34c9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1751437761644-460ae92e34c9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A petite rose-gold watch with a delicate dial and a glowing bracelet. Effortlessly feminine.",
    description_ar: "ساعة صغيرة بلون الذهب الوردي مع ميناء رقيق وسوار لامع. أنوثة بلا تكلّف.",
    specs:    { movement: "Quartz", caseSize: "28 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Rose", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 95 g" },
    specs_ar: { movement: "كوارتز", caseSize: "28 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "وردي", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 95 جم" },
    features: ["water", "movement"]
  },

  /* ---------- TISSOT ---------- */
  {
    id: "tissot-prx",
    brand: "tissot",
    name: "PRX Powermatic 80", name_ar: "PRX باورماتيك 80",
    model: "T137.407.11.041.00",
    price: 32500,
    gender: "men", style: "sport", strap: "steel", movement: "automatic",
    caseSize: 40, dialColor: "blue", waterResistance: 100,
    inStock: true, stockCount: 6, isNew: true, isFeatured: true,
    createdAt: "2026-09-23",
    images: [
      "https://images.unsplash.com/photo-1684766288396-1fd5c7d92112?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1684766288396-1fd5c7d92112?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1684766288396-1fd5c7d92112?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "The 1970s-inspired integrated-bracelet icon, with an 80-hour power reserve and a sapphire crystal.",
    description_ar: "الأيقونة المستوحاة من السبعينيات بسوار مدمج واحتياطي طاقة 80 ساعة وزجاج سافير.",
    specs:    { movement: "Automatic", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 136 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 136 جم" },
    features: ["water", "movement", "sapphire", "date"]
  },
  {
    id: "tissot-seastar-chrono",
    brand: "tissot",
    name: "Seastar 1000 Chronograph", name_ar: "سي ستار 1000 كرونوغراف",
    model: "T120.417.11.041.00",
    price: 24900, originalPrice: 28500,
    gender: "men", style: "diver", strap: "steel", movement: "quartz",
    caseSize: 45.5, dialColor: "blue", waterResistance: 300,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-04-26",
    images: [
      "https://images.unsplash.com/photo-1700650140318-3919c2b41686?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1700650140318-3919c2b41686?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1700650140318-3919c2b41686?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A 300 m Swiss diver's chronograph with a ceramic-look bezel and a sporty blue dial.",
    description_ar: "كرونوغراف غوص سويسري مقاوم حتى 300 متر بإطار أنيق وميناء أزرق رياضي.",
    specs:    { movement: "Quartz", caseSize: "45.5 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "300 m", weight: "≈ 155 g" },
    specs_ar: { movement: "كوارتز", caseSize: "45.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "300 متر", weight: "حوالي 155 جم" },
    features: ["water", "movement", "sapphire", "chronograph", "lume"]
  },
  {
    id: "tissot-le-locle",
    brand: "tissot",
    name: "Le Locle Powermatic 80", name_ar: "لو لوكل باورماتيك 80",
    model: "T006.407.16.033.00",
    price: 28900,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 39.3, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 4, isNew: false, isFeatured: false,
    createdAt: "2026-05-06",
    images: [
      "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1557531365-e8b22d93dbd0?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "Named after Tissot's hometown: a classic white dial, a leather strap and a smooth automatic movement.",
    description_ar: "تحمل اسم موطن تيسو: ميناء أبيض كلاسيكي وسوار جلدي وحركة أوتوماتيك سلسة.",
    specs:    { movement: "Automatic", caseSize: "39.3 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Sapphire crystal", waterResistance: "30 m", weight: "≈ 67 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "39.3 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "30 متر", weight: "حوالي 67 جم" },
    features: ["water", "movement", "sapphire", "date"]
  },
  {
    id: "tissot-lovely-square",
    brand: "tissot",
    name: "Lovely Square", name_ar: "لافلي سكوير",
    model: "T058.109.16.031.00",
    price: 13900, originalPrice: 16500,
    gender: "women", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 20, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 6, isNew: false, isFeatured: false,
    createdAt: "2026-06-13",
    images: [
      "https://images.unsplash.com/photo-1773414686135-cffd9fbe3590?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1773414686135-cffd9fbe3590?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1773414686135-cffd9fbe3590?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A refined rectangular watch with Roman numerals and a slim leather strap. Pure Swiss elegance.",
    description_ar: "ساعة مستطيلة راقية بأرقام رومانية وسوار جلدي نحيف. أناقة سويسرية خالصة.",
    specs:    { movement: "Quartz", caseSize: "20 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Sapphire crystal", waterResistance: "30 m", weight: "≈ 34 g" },
    specs_ar: { movement: "كوارتز", caseSize: "20 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "30 متر", weight: "حوالي 34 جم" },
    features: ["water", "movement", "sapphire"]
  },

  /* ---------- HAMILTON ---------- */
  {
    id: "hamilton-khaki-field",
    brand: "hamilton",
    name: "Khaki Field Mechanical", name_ar: "كاكي فيلد ميكانيكال",
    model: "H69439531",
    price: 34900,
    gender: "men", style: "casual", strap: "leather", movement: "automatic",
    caseSize: 38, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-07-20",
    images: [
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1495856458515-0637185db551?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A military field watch with an 80-hour hand-wound movement. Rugged, legible, and endlessly versatile.",
    description_ar: "ساعة ميدانية عسكرية بحركة تعبئة يدوية واحتياطي 80 ساعة. متينة وواضحة ومتعددة الاستخدام.",
    specs:    { movement: "Hand-wound mechanical", caseSize: "38 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 65 g" },
    specs_ar: { movement: "ميكانيكية بتعبئة يدوية", caseSize: "38 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 65 جم" },
    features: ["water", "movement", "sapphire", "lume"]
  },
  {
    id: "hamilton-jazzmaster-open-heart",
    brand: "hamilton",
    name: "Jazzmaster Open Heart", name_ar: "جاز ماستر أوبن هارت",
    model: "H32675740",
    price: 49900, originalPrice: 56900,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 40, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 3, isNew: true, isFeatured: false,
    createdAt: "2026-09-18",
    images: [
      "https://images.unsplash.com/photo-1598463370698-bba402980d47?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598463370698-bba402980d47?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1598463370698-bba402980d47?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An open-worked dial shows the automatic movement at work. Modern, refined and full of life.",
    description_ar: "ميناء مفتوح يُظهر الحركة الأوتوماتيكية أثناء عملها. عصرية وراقية ومليئة بالحياة.",
    specs:    { movement: "Automatic", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 68 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 68 جم" },
    features: ["water", "movement", "sapphire"]
  },
  {
    id: "hamilton-khaki-pilot",
    brand: "hamilton",
    name: "Khaki Aviation Pilot", name_ar: "كاكي أفييشن بايلوت",
    model: "H64615135",
    price: 62000,
    gender: "men", style: "sport", strap: "leather", movement: "automatic",
    caseSize: 42, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 4, isNew: false, isFeatured: false,
    createdAt: "2026-03-07",
    images: [
      "https://images.unsplash.com/photo-1663426752652-b696d57f78ef?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1663426752652-b696d57f78ef?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1663426752652-b696d57f78ef?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A pilot's watch with a highly legible dial, a day-date display and a sapphire crystal.",
    description_ar: "ساعة طيار بميناء واضح جداً وعرض لليوم والتاريخ وزجاج سافير.",
    specs:    { movement: "Automatic", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 71 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 71 جم" },
    features: ["water", "movement", "sapphire", "lume", "date"]
  },

  /* ---------- LONGINES ---------- */
  {
    id: "longines-hydroconquest",
    brand: "longines",
    name: "HydroConquest", name_ar: "هايدروكونكويست",
    model: "L3.781.4.56.6",
    price: 98000,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 41, dialColor: "black", waterResistance: 300,
    inStock: true, stockCount: 4, isNew: false, isFeatured: true,
    createdAt: "2026-04-14",
    images: [
      "https://images.unsplash.com/photo-1730628801130-61ca50004a48?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1730628801130-61ca50004a48?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1730628801130-61ca50004a48?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1730628801130-61ca50004a48?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "A refined 300 m diver with a ceramic bezel, a sapphire crystal and an anti-magnetic silicon balance spring.",
    description_ar: "ساعة غوص راقية مقاومة حتى 300 متر بإطار سيراميك وزجاج سافير ونابض توازن سيليكون مقاوم للمغناطيس.",
    specs:    { movement: "Automatic", caseSize: "41 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "300 m", weight: "≈ 139 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "41 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "300 متر", weight: "حوالي 139 جم" },
    features: ["water", "movement", "sapphire", "lume"]
  },
  {
    id: "longines-master-collection",
    brand: "longines",
    name: "Master Collection", name_ar: "ماستر كوليكشن",
    model: "L2.793.4.78.6",
    price: 165000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 40, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 2, isNew: false, isFeatured: false,
    createdAt: "2026-05-21",
    images: [
      "https://images.unsplash.com/photo-1694598152256-a346298ae0b5?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1694598152256-a346298ae0b5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1694598152256-a346298ae0b5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1694598152256-a346298ae0b5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "A barleycorn-pattern dial, blued hands and a small seconds sub-dial: classic Longines watchmaking at its best.",
    description_ar: "ميناء بنقش حبات الشعير وعقارب زرقاء وعداد ثوانٍ صغير: صناعة لونجين الكلاسيكية في أفضل صورها.",
    specs:    { movement: "Automatic", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "White", glass: "Sapphire crystal", waterResistance: "30 m", weight: "≈ 136 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "30 متر", weight: "حوالي 136 جم" },
    features: ["water", "movement", "sapphire"]
  },
  {
    id: "longines-la-grande-classique",
    brand: "longines",
    name: "La Grande Classique", name_ar: "لا جراند كلاسيك",
    model: "L4.209.2.11.2",
    price: 89000,
    gender: "women", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 29, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 3, isNew: false, isFeatured: false,
    createdAt: "2026-06-01",
    images: [
      "https://images.unsplash.com/photo-1580226223521-5412ec88237a?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580226223521-5412ec88237a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1580226223521-5412ec88237a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An ultra-thin, timeless dress watch with Roman numerals. The definition of quiet elegance.",
    description_ar: "ساعة أنيقة نحيفة جداً بأرقام رومانية. تعريف الأناقة الهادئة.",
    specs:    { movement: "Quartz", caseSize: "29 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Sapphire crystal", waterResistance: "30 m", weight: "≈ 49 g" },
    specs_ar: { movement: "كوارتز", caseSize: "29 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "30 متر", weight: "حوالي 49 جم" },
    features: ["water", "movement", "sapphire"]
  },

  /* ---------- TAG HEUER ---------- */
  {
    id: "tag-heuer-carrera",
    brand: "tag-heuer",
    name: "Carrera Chronograph", name_ar: "كاريرا كرونوغراف",
    model: "CBN2011.BA0642",
    price: 285000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 44, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 2, isNew: false, isFeatured: false,
    createdAt: "2026-07-08",
    images: [
      "https://images.unsplash.com/photo-1548171838-1fd4cb4ab854?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548171838-1fd4cb4ab854?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1548171838-1fd4cb4ab854?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1548171838-1fd4cb4ab854?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "The legendary racing chronograph with an in-house Heuer 02 movement and an 80-hour power reserve.",
    description_ar: "كرونوغراف السباقات الأسطوري بحركة Heuer 02 من صنع الدار واحتياطي طاقة 80 ساعة.",
    specs:    { movement: "Automatic", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 150 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 150 جم" },
    features: ["water", "movement", "sapphire", "chronograph"]
  },
  {
    id: "tag-heuer-aquaracer",
    brand: "tag-heuer",
    name: "Aquaracer Professional 300", name_ar: "أكواريسر بروفيشنال 300",
    model: "WBP201A.BA0632",
    price: 175000, originalPrice: 195000,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 43, dialColor: "black", waterResistance: 300,
    inStock: true, stockCount: 3, isNew: false, isFeatured: false,
    createdAt: "2026-08-15",
    images: [
      "https://images.unsplash.com/photo-1662384205880-2c7a9879cc0c?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1662384205880-2c7a9879cc0c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1662384205880-2c7a9879cc0c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1662384205880-2c7a9879cc0c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "A professional 300 m diver with a twelve-sided bezel and a horizontally lined dial.",
    description_ar: "ساعة غوص احترافية حتى 300 متر بإطار ذي اثني عشر ضلعاً وميناء بخطوط أفقية.",
    specs:    { movement: "Automatic", caseSize: "43 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "300 m", weight: "≈ 146 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "43 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "300 متر", weight: "حوالي 146 جم" },
    features: ["water", "movement", "sapphire", "lume", "date"]
  },
  {
    id: "tag-heuer-formula1",
    brand: "tag-heuer",
    name: "Formula 1 Chronograph", name_ar: "فورمولا 1 كرونوغراف",
    model: "CAZ101AH.FT8024",
    price: 92000, originalPrice: 110000,
    gender: "men", style: "sport", strap: "rubber", movement: "quartz",
    caseSize: 43, dialColor: "white", waterResistance: 200,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-03-22",
    images: [
      "https://images.unsplash.com/photo-1582121757128-252a7f88f7a2?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582121757128-252a7f88f7a2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1582121757128-252a7f88f7a2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1582121757128-252a7f88f7a2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "A sporty Swiss chronograph inspired by motor racing, on a comfortable rubber strap.",
    description_ar: "كرونوغراف سويسري رياضي مستوحى من سباقات السيارات على سوار مطاطي مريح.",
    specs:    { movement: "Quartz", caseSize: "43 mm", caseMaterial: "Stainless steel", strap: "Rubber strap", dialColor: "White", glass: "Sapphire crystal", waterResistance: "200 m", weight: "≈ 73 g" },
    specs_ar: { movement: "كوارتز", caseSize: "43 مم", caseMaterial: "ستانلس ستيل", strap: "سوار مطاط", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "200 متر", weight: "حوالي 73 جم" },
    features: ["water", "movement", "sapphire", "chronograph"]
  },

  /* ---------- OMEGA ---------- */
  {
    id: "omega-seamaster-300",
    brand: "omega",
    name: "Seamaster Diver 300M", name_ar: "سي ماستر دايفر 300M",
    model: "210.30.42.20.03.001",
    price: 365000,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 42, dialColor: "blue", waterResistance: 300,
    inStock: true, stockCount: 3, isNew: false, isFeatured: false,
    createdAt: "2026-04-02",
    images: [
      "https://images.unsplash.com/photo-1691865179028-1729b766a5cd?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1691865179028-1729b766a5cd?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1691865179028-1729b766a5cd?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1691865179028-1729b766a5cd?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "An icon of ocean exploration, with a wave-pattern ceramic dial and a Master Chronometer movement.",
    description_ar: "أيقونة استكشاف المحيطات بميناء سيراميك بنقش الأمواج وحركة ماستر كرونوميتر.",
    specs:    { movement: "Automatic", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "300 m", weight: "≈ 143 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "300 متر", weight: "حوالي 143 جم" },
    features: ["water", "movement", "sapphire", "lume", "date"]
  },
  {
    id: "omega-planet-ocean-chrono",
    brand: "omega",
    name: "Planet Ocean Chronograph", name_ar: "بلانيت أوشن كرونوغراف",
    model: "215.30.46.51.03.001",
    price: 480000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 45.5, dialColor: "blue", waterResistance: 600,
    inStock: true, stockCount: 2, isNew: false, isFeatured: false,
    createdAt: "2026-05-09",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "A 600 m professional diving chronograph: bold, precise and built for the deep.",
    description_ar: "كرونوغراف غوص احترافي حتى 600 متر: جريء ودقيق وصُنع للأعماق.",
    specs:    { movement: "Automatic", caseSize: "45.5 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "600 m", weight: "≈ 155 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "45.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "600 متر", weight: "حوالي 155 جم" },
    features: ["water", "movement", "sapphire", "chronograph", "lume"]
  },
  {
    id: "omega-speedmaster-moonwatch",
    brand: "omega",
    name: "Speedmaster Moonwatch", name_ar: "سبيدماستر مون ووتش",
    model: "310.30.42.50.01.001",
    price: 420000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 42, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 3, isNew: false, isFeatured: true,
    createdAt: "2026-06-16",
    images: [
      "https://images.unsplash.com/photo-1625391382883-ec8ec1032552?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625391382883-ec8ec1032552?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1625391382883-ec8ec1032552?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1625391382883-ec8ec1032552?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "The first watch worn on the moon, with a hand-wound Master Chronometer chronograph movement.",
    description_ar: "أول ساعة ارتُديت على سطح القمر، بحركة كرونوغراف ماستر كرونوميتر بتعبئة يدوية.",
    specs:    { movement: "Hand-wound chronograph (Calibre 3861)", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 143 g" },
    specs_ar: { movement: "كرونوغراف بتعبئة يدوية (كاليبر 3861)", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 143 جم" },
    features: ["water", "movement", "sapphire", "chronograph"]
  },
  {
    id: "omega-constellation-29",
    brand: "omega",
    name: "Constellation 29 mm", name_ar: "كونستليشن 29 مم",
    model: "131.10.29.20.55.001",
    price: 245000,
    gender: "women", style: "luxury", strap: "steel", movement: "quartz",
    caseSize: 29, dialColor: "silver", waterResistance: 50,
    inStock: false, stockCount: 0, isNew: false, isFeatured: false,
    createdAt: "2026-07-23",
    images: [
      "https://images.unsplash.com/photo-1552742275-6aee5589cd29?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552742275-6aee5589cd29?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1552742275-6aee5589cd29?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1552742275-6aee5589cd29?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "The famous 'claws' and a silvery dial set with diamonds. A jewel that tells the time.",
    description_ar: "المخالب الشهيرة وميناء فضي مرصع بالألماس. جوهرة تخبرك بالوقت.",
    specs:    { movement: "Quartz", caseSize: "29 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Silver", glass: "Sapphire crystal", waterResistance: "50 m", weight: "≈ 99 g" },
    specs_ar: { movement: "كوارتز", caseSize: "29 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "فضي", glass: "زجاج سافير", waterResistance: "50 متر", weight: "حوالي 99 جم" },
    features: ["water", "movement", "sapphire"]
  },

  /* ---------- ROLEX ---------- */
  {
    id: "rolex-submariner-date",
    brand: "rolex",
    name: "Submariner Date", name_ar: "صب مارينر ديت",
    model: "126610LN",
    price: 720000,
    gender: "men", style: "diver", strap: "steel", movement: "automatic",
    caseSize: 41, dialColor: "black", waterResistance: 300,
    inStock: true, stockCount: 1, isNew: false, isFeatured: true,
    createdAt: "2026-08-03",
    images: [
      "https://images.unsplash.com/photo-1662384197911-e82189f4dc60?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1662384197911-e82189f4dc60?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1662384197911-e82189f4dc60?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1662384197911-e82189f4dc60?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "The reference among divers' watches: Oystersteel, a Cerachrom bezel and the calibre 3235. Timeless and robust.",
    description_ar: "المرجع بين ساعات الغوص: أويستر ستيل وإطار سيراكروم وكاليبر 3235. خالدة ومتينة.",
    specs:    { movement: "Automatic (Calibre 3235)", caseSize: "41 mm", caseMaterial: "Oystersteel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Sapphire crystal", waterResistance: "300 m", weight: "≈ 139 g" },
    specs_ar: { movement: "أوتوماتيك (كاليبر 3235)", caseSize: "41 مم", caseMaterial: "أويستر ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج سافير", waterResistance: "300 متر", weight: "حوالي 139 جم" },
    features: ["water", "movement", "sapphire", "lume", "date"]
  },
  {
    id: "rolex-cosmograph-daytona",
    brand: "rolex",
    name: "Cosmograph Daytona", name_ar: "كوزموغراف دايتونا",
    model: "126500LN",
    price: 1450000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 40, dialColor: "white", waterResistance: 100,
    inStock: false, stockCount: 0, isNew: false, isFeatured: false,
    createdAt: "2026-03-10",
    images: [
      "https://images.unsplash.com/photo-1619946928632-abefa12506e2?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619946928632-abefa12506e2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1619946928632-abefa12506e2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1619946928632-abefa12506e2?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "The ultimate racing chronograph, with a white 'panda' dial and a black ceramic tachymeter bezel.",
    description_ar: "كرونوغراف السباقات المطلق بميناء أبيض «باندا» وإطار سيراميك أسود لقياس السرعة.",
    specs:    { movement: "Automatic chronograph (Calibre 4131)", caseSize: "40 mm", caseMaterial: "Oystersteel", strap: "Stainless steel bracelet", dialColor: "White", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 136 g" },
    specs_ar: { movement: "كرونوغراف أوتوماتيك (كاليبر 4131)", caseSize: "40 مم", caseMaterial: "أويستر ستيل", strap: "سوار ستانلس ستيل", dialColor: "أبيض", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 136 جم" },
    features: ["water", "movement", "sapphire", "chronograph"]
  },
  {
    id: "rolex-datejust-36",
    brand: "rolex",
    name: "Datejust 36 Everose", name_ar: "ديت جست 36 إيفر روز",
    model: "126231",
    price: 780000,
    gender: "unisex", style: "luxury", strap: "gold", movement: "automatic",
    caseSize: 36, dialColor: "brown", waterResistance: 100,
    inStock: true, stockCount: 2, isNew: false, isFeatured: false,
    createdAt: "2026-04-17",
    images: [
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "Oystersteel and Everose gold, a chocolate dial and the famous Jubilee bracelet. The classic watch of reference.",
    description_ar: "أويستر ستيل وذهب إيفر روز وميناء بلون الشوكولاتة وسوار جوبيلي الشهير. الساعة الكلاسيكية المرجعية.",
    specs:    { movement: "Automatic", caseSize: "36 mm", caseMaterial: "Oystersteel & 18 ct Everose gold", strap: "Gold-tone steel bracelet", dialColor: "Brown", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 122 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "36 مم", caseMaterial: "أويستر ستيل وذهب إيفر روز عيار 18", strap: "سوار ستيل بلون ذهبي", dialColor: "بني", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 122 جم" },
    features: ["water", "movement", "sapphire", "date"]
  },
  {
    id: "rolex-oyster-perpetual-41",
    brand: "rolex",
    name: "Oyster Perpetual 41", name_ar: "أويستر بربتشوال 41",
    model: "124300",
    price: 520000,
    gender: "men", style: "luxury", strap: "steel", movement: "automatic",
    caseSize: 41, dialColor: "blue", waterResistance: 100,
    inStock: true, stockCount: 2, isNew: true, isFeatured: false,
    createdAt: "2026-09-18",
    images: [
      "https://images.unsplash.com/photo-1636639818651-d97365346a5c?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1636639818651-d97365346a5c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1636639818651-d97365346a5c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3",
      "https://images.unsplash.com/photo-1636639818651-d97365346a5c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.56&fp-y=0.44&fp-z=2.4"
    ],
    description: "Rolex in its purest form: a bright blue dial, an Oyster bracelet and nothing that isn't needed.",
    description_ar: "رولكس في أنقى صورها: ميناء أزرق مشرق وسوار أويستر ولا شيء زائد.",
    specs:    { movement: "Automatic", caseSize: "41 mm", caseMaterial: "Oystersteel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Sapphire crystal", waterResistance: "100 m", weight: "≈ 139 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "41 مم", caseMaterial: "أويستر ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج سافير", waterResistance: "100 متر", weight: "حوالي 139 جم" },
    features: ["water", "movement", "sapphire"]
  },

  /* ---------- SWATCH ---------- */
  {
    id: "swatch-moonswatch",
    brand: "swatch",
    name: "MoonSwatch Mission to the Moon", name_ar: "مون سواتش مهمة إلى القمر",
    model: "SO33M100",
    price: 14900,
    gender: "unisex", style: "sport", strap: "fabric", movement: "quartz",
    caseSize: 42, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 4, isNew: true, isFeatured: false,
    createdAt: "2026-09-17",
    images: [
      "https://images.unsplash.com/photo-1674208884812-cdc0b4bc1cf0?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1674208884812-cdc0b4bc1cf0?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1674208884812-cdc0b4bc1cf0?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "The famous Bioceramic tribute to the Speedmaster, with a velcro strap. Fun, light and collectible.",
    description_ar: "التحية الشهيرة لسبيدماستر بخامة البايوسيراميك وسوار فيلكرو. ممتعة وخفيفة ومطلوبة للاقتناء.",
    specs:    { movement: "Quartz", caseSize: "42 mm", caseMaterial: "Bioceramic", strap: "Fabric (NATO / velcro) strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 71 g" },
    specs_ar: { movement: "كوارتز", caseSize: "42 مم", caseMaterial: "بايوسيراميك", strap: "سوار قماش", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 71 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "swatch-sistem51",
    brand: "swatch",
    name: "Sistem51 Irony Blue", name_ar: "سيستم 51 آيروني أزرق",
    model: "YIS409G",
    price: 9900, originalPrice: 11900,
    gender: "men", style: "casual", strap: "steel", movement: "automatic",
    caseSize: 42, dialColor: "blue", waterResistance: 30,
    inStock: true, stockCount: 8, isNew: false, isFeatured: false,
    createdAt: "2026-07-11",
    images: [
      "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1582150264904-e0bea5ef0ad1?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A Swiss automatic with just 51 parts and a 90-hour power reserve, on a fine steel mesh bracelet.",
    description_ar: "ساعة سويسرية أوتوماتيك من 51 قطعة فقط واحتياطي طاقة 90 ساعة على سوار ستيل شبكي ناعم.",
    specs:    { movement: "Automatic", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Blue", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 143 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أزرق", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 143 جم" },
    features: ["water", "movement"]
  },
  {
    id: "swatch-skin-classic",
    brand: "swatch",
    name: "Skin Classic", name_ar: "سكين كلاسيك",
    model: "SS08K100",
    price: 4900, originalPrice: 5900,
    gender: "unisex", style: "casual", strap: "leather", movement: "quartz",
    caseSize: 40, dialColor: "grey", waterResistance: 30,
    inStock: true, stockCount: 15, isNew: false, isFeatured: false,
    createdAt: "2026-08-18",
    images: [
      "https://images.unsplash.com/photo-1689287428096-7e1dcc705a5c?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1689287428096-7e1dcc705a5c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1689287428096-7e1dcc705a5c?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "Ultra-thin and almost weightless: a minimal grey dial you'll forget you're wearing.",
    description_ar: "نحيفة جداً وشبه عديمة الوزن: ميناء رمادي بسيط ستنسى أنك ترتديه.",
    specs:    { movement: "Quartz", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Grey", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 68 g" },
    specs_ar: { movement: "كوارتز", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "رمادي", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 68 جم" },
    features: ["water", "movement"]
  },

  /* ---------- DANIEL WELLINGTON ---------- */
  {
    id: "dw-classic-sheffield",
    brand: "daniel-wellington",
    name: "Classic Sheffield", name_ar: "كلاسيك شيفيلد",
    model: "DW00100127",
    price: 6900, originalPrice: 8900,
    gender: "unisex", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 40, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 12, isNew: false, isFeatured: true,
    createdAt: "2026-03-25",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A clean white dial, slim rose-gold case and a black leather strap. Minimalism at its finest.",
    description_ar: "ميناء أبيض نظيف وعلبة نحيفة بلون الذهب الوردي وسوار جلد أسود. البساطة في أبهى صورها.",
    specs:    { movement: "Quartz", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "White", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 68 g" },
    specs_ar: { movement: "كوارتز", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 68 جم" },
    features: ["water", "movement"]
  },
  {
    id: "dw-petite-melrose",
    brand: "daniel-wellington",
    name: "Petite Melrose", name_ar: "بيتيت ميلروز",
    model: "DW00100163",
    price: 7400, originalPrice: 9500,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 32, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 10, isNew: false, isFeatured: false,
    createdAt: "2026-04-05",
    images: [
      "https://images.unsplash.com/photo-1451290337906-ac938fc89bce?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451290337906-ac938fc89bce?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1451290337906-ac938fc89bce?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A petite white dial on a fine rose-gold mesh bracelet. Light, delicate and endlessly elegant.",
    description_ar: "ميناء أبيض صغير على سوار شبكي رقيق بلون الذهب الوردي. خفيفة ورقيقة وأنيقة دائماً.",
    specs:    { movement: "Quartz", caseSize: "32 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "White", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 109 g" },
    specs_ar: { movement: "كوارتز", caseSize: "32 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 109 جم" },
    features: ["water", "movement"]
  },
  {
    id: "dw-quadro-evergold",
    brand: "daniel-wellington",
    name: "Quadro Pressed Evergold", name_ar: "كوادرو إيفرجولد",
    model: "DW00100437",
    price: 8500,
    gender: "women", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 26, dialColor: "green", waterResistance: 30,
    inStock: true, stockCount: 7, isNew: true, isFeatured: false,
    createdAt: "2026-09-12",
    images: [
      "https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1657159810148-f6a1f3d74f7e?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A rectangular gold case with an emerald-green dial: bold geometry, softly done.",
    description_ar: "علبة مستطيلة ذهبية بميناء أخضر زمردي: هندسة جريئة بلمسة ناعمة.",
    specs:    { movement: "Quartz", caseSize: "26 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Green", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 44 g" },
    specs_ar: { movement: "كوارتز", caseSize: "26 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أخضر", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 44 جم" },
    features: ["water", "movement"]
  },
  {
    id: "dw-iconic-link-emerald",
    brand: "daniel-wellington",
    name: "Iconic Link Emerald", name_ar: "أيكونيك لينك إميرالد",
    model: "DW00100419",
    price: 8900, originalPrice: 11500,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 32, dialColor: "green", waterResistance: 30,
    inStock: true, stockCount: 6, isNew: false, isFeatured: false,
    createdAt: "2026-06-19",
    images: [
      "https://images.unsplash.com/photo-1751437819603-aaf4dfa8420a?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1751437819603-aaf4dfa8420a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1751437819603-aaf4dfa8420a?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A sunray green dial and a polished gold link bracelet. A jewel for every day.",
    description_ar: "ميناء أخضر لامع وسوار ذهبي مصقول. قطعة مجوهرات لكل يوم.",
    specs:    { movement: "Quartz", caseSize: "32 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Green", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 109 g" },
    specs_ar: { movement: "كوارتز", caseSize: "32 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "أخضر", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 109 جم" },
    features: ["water", "movement"]
  },

  /* ---------- GUESS ---------- */
  {
    id: "guess-continental",
    brand: "guess",
    name: "Continental Chronograph", name_ar: "كونتيننتال كرونوغراف",
    model: "GW0260G1",
    price: 8900, originalPrice: 13900,
    gender: "men", style: "sport", strap: "steel", movement: "quartz",
    caseSize: 44, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 9, isNew: false, isFeatured: false,
    createdAt: "2026-07-26",
    images: [
      "https://images.unsplash.com/photo-1671014978748-84f661cc2f93?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1671014978748-84f661cc2f93?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1671014978748-84f661cc2f93?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A bold black-and-steel chronograph with sporty sub-dials and a solid bracelet.",
    description_ar: "كرونوغراف جريء بالأسود والستيل مع عدادات رياضية وسوار متين.",
    specs:    { movement: "Quartz", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 150 g" },
    specs_ar: { movement: "كوارتز", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 150 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "guess-sparkling-rose",
    brand: "guess",
    name: "Sparkling Rose", name_ar: "سباركلينج روز",
    model: "GW0033L3",
    price: 7500, originalPrice: 10500,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 36, dialColor: "brown", waterResistance: 30,
    inStock: true, stockCount: 8, isNew: false, isFeatured: false,
    createdAt: "2026-08-06",
    images: [
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1751437774882-deeea4352018?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A rose-gold watch with a warm brown dial and a touch of sparkle. Glamorous, every day.",
    description_ar: "ساعة بلون الذهب الوردي بميناء بني دافئ ولمسة من اللمعان. فخامة يومية.",
    specs:    { movement: "Quartz", caseSize: "36 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Brown", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 122 g" },
    specs_ar: { movement: "كوارتز", caseSize: "36 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "بني", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 122 جم" },
    features: ["water", "movement"]
  },
  {
    id: "guess-lady-g-green",
    brand: "guess",
    name: "Lady G Green", name_ar: "ليدي جي جرين",
    model: "GW0099L2",
    price: 6500, originalPrice: 8900,
    gender: "women", style: "casual", strap: "leather", movement: "quartz",
    caseSize: 34, dialColor: "green", waterResistance: 30,
    inStock: true, stockCount: 10, isNew: false, isFeatured: false,
    createdAt: "2026-03-13",
    images: [
      "https://images.unsplash.com/photo-1657159810382-226b58af626f?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1657159810382-226b58af626f?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1657159810382-226b58af626f?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A fresh green dial on a matching leather strap. Playful, chic and easy to wear.",
    description_ar: "ميناء أخضر منعش على سوار جلدي بنفس اللون. مرحة وأنيقة وسهلة الارتداء.",
    specs:    { movement: "Quartz", caseSize: "34 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Green", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 58 g" },
    specs_ar: { movement: "كوارتز", caseSize: "34 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أخضر", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 58 جم" },
    features: ["water", "movement"]
  },

  /* ---------- ZARA ---------- */
  {
    id: "zara-minimal-rose",
    brand: "zara",
    name: "Minimal Rose Dial", name_ar: "مينيمال بميناء وردي",
    model: "ZW-1101",
    price: 1899, originalPrice: 2499,
    gender: "unisex", style: "casual", strap: "leather", movement: "quartz",
    caseSize: 38, dialColor: "rose", waterResistance: 30,
    inStock: true, stockCount: 20, isNew: false, isFeatured: false,
    createdAt: "2026-04-20",
    images: [
      "https://images.unsplash.com/photo-1451859757691-f318d641ab4d?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451859757691-f318d641ab4d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1451859757691-f318d641ab4d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A soft rose dial with slim hands on a leather strap. Simple, warm and easy to style.",
    description_ar: "ميناء وردي ناعم بعقارب نحيفة على سوار جلدي. بسيطة ودافئة وسهلة التنسيق.",
    specs:    { movement: "Quartz", caseSize: "38 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Rose", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 65 g" },
    specs_ar: { movement: "كوارتز", caseSize: "38 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "وردي", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 65 جم" },
    features: ["water", "movement"]
  },
  {
    id: "zara-black-mesh",
    brand: "zara",
    name: "Black Mesh Minimal", name_ar: "بلاك ميش مينيمال",
    model: "ZW-1205",
    price: 2199,
    gender: "men", style: "casual", strap: "steel", movement: "quartz",
    caseSize: 40, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 18, isNew: false, isFeatured: false,
    createdAt: "2026-05-27",
    images: [
      "https://images.unsplash.com/photo-1634595947394-87012e7b12ba?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1634595947394-87012e7b12ba?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1634595947394-87012e7b12ba?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "An all-black minimal dial on a fine mesh bracelet. Sharp, modern and understated.",
    description_ar: "ميناء أسود بسيط بالكامل على سوار شبكي رقيق. حاد وعصري وهادئ.",
    specs:    { movement: "Quartz", caseSize: "40 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 136 g" },
    specs_ar: { movement: "كوارتز", caseSize: "40 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 136 جم" },
    features: ["water", "movement"]
  },
  {
    id: "zara-square-green",
    brand: "zara",
    name: "Square Green Dial", name_ar: "سكوير بميناء أخضر",
    model: "ZW-1312",
    price: 1799, originalPrice: 2299,
    gender: "women", style: "dress", strap: "leather", movement: "quartz",
    caseSize: 24, dialColor: "green", waterResistance: 30,
    inStock: true, stockCount: 15, isNew: false, isFeatured: false,
    createdAt: "2026-06-07",
    images: [
      "https://images.unsplash.com/photo-1658973071034-0710cd4296a4?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1658973071034-0710cd4296a4?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1658973071034-0710cd4296a4?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A small square case with a green dial: vintage-inspired and perfectly on trend.",
    description_ar: "علبة مربعة صغيرة بميناء أخضر: مستوحاة من الكلاسيكيات ومواكبة للموضة.",
    specs:    { movement: "Quartz", caseSize: "24 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Green", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 41 g" },
    specs_ar: { movement: "كوارتز", caseSize: "24 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أخضر", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 41 جم" },
    features: ["water", "movement"]
  },

  /* ---------- MICHAEL KORS ---------- */
  {
    id: "mk-lexington-chrono",
    brand: "michael-kors",
    name: "Lexington Chronograph", name_ar: "ليكسينغتون كرونوغراف",
    model: "MK8494",
    price: 12900, originalPrice: 16900,
    gender: "men", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 44, dialColor: "black", waterResistance: 100,
    inStock: true, stockCount: 6, isNew: false, isFeatured: false,
    createdAt: "2026-07-14",
    images: [
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A gold-tone chronograph with a black dial: big, polished and made to be noticed.",
    description_ar: "كرونوغراف بلون ذهبي وميناء أسود: كبير ولامع وصُنع ليلفت الأنظار.",
    specs:    { movement: "Quartz", caseSize: "44 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "100 m", weight: "≈ 150 g" },
    specs_ar: { movement: "كوارتز", caseSize: "44 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "100 متر", weight: "حوالي 150 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "mk-darci-rose",
    brand: "michael-kors",
    name: "Darci Rose Gold", name_ar: "دارسي روز جولد",
    model: "MK3192",
    price: 11500, originalPrice: 14900,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 39, dialColor: "rose", waterResistance: 50,
    inStock: true, stockCount: 8, isNew: false, isFeatured: false,
    createdAt: "2026-08-21",
    images: [
      "https://images.unsplash.com/photo-1653651460770-73513a4b25a5?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1653651460770-73513a4b25a5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1653651460770-73513a4b25a5?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A rose-gold watch with a pavé crystal bezel. Glamour you can wear every day.",
    description_ar: "ساعة بلون الذهب الوردي بإطار مرصع بالكريستال. فخامة يمكنك ارتداؤها كل يوم.",
    specs:    { movement: "Quartz", caseSize: "39 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Rose", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 133 g" },
    specs_ar: { movement: "كوارتز", caseSize: "39 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "وردي", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 133 جم" },
    features: ["water", "movement"]
  },
  {
    id: "mk-bradshaw-smart",
    brand: "michael-kors",
    name: "Gen 6 Bradshaw Smartwatch", name_ar: "الساعة الذكية برادشو Gen 6",
    model: "MKT5139",
    price: 15500, originalPrice: 18900,
    gender: "unisex", style: "smart", strap: "leather", movement: "smart",
    caseSize: 44, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 5, isNew: false, isFeatured: false,
    createdAt: "2026-03-01",
    images: [
      "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1461141346587-763ab02bced9?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A fashion smartwatch with Wear OS, health tracking and custom dials, on a leather strap.",
    description_ar: "ساعة ذكية عصرية بنظام Wear OS وتتبع للصحة وموانئ قابلة للتخصيص، على سوار جلدي.",
    specs:    { movement: "Smart (Wear OS)", caseSize: "44 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Gorilla Glass", waterResistance: "30 m", weight: "≈ 45 g" },
    specs_ar: { movement: "ذكية (Wear OS)", caseSize: "44 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج جوريلا", waterResistance: "30 متر", weight: "حوالي 45 جم" },
    features: ["water", "movement", "smart"]
  },

  /* ---------- EMPORIO ARMANI ---------- */
  {
    id: "ea-chronograph-black-gold",
    brand: "emporio-armani",
    name: "Chronograph Black & Gold", name_ar: "كرونوغراف أسود وذهبي",
    model: "AR11368",
    price: 11900, originalPrice: 15900,
    gender: "men", style: "dress", strap: "steel", movement: "quartz",
    caseSize: 43, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 7, isNew: false, isFeatured: false,
    createdAt: "2026-04-08",
    images: [
      "https://images.unsplash.com/photo-1600003014637-ff82a275e191?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600003014637-ff82a275e191?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1600003014637-ff82a275e191?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A black dial with gold accents and a steel bracelet: Italian style with a sporty edge.",
    description_ar: "ميناء أسود بلمسات ذهبية وسوار ستيل: أسلوب إيطالي بلمسة رياضية.",
    specs:    { movement: "Quartz", caseSize: "43 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 146 g" },
    specs_ar: { movement: "كوارتز", caseSize: "43 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 146 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "ea-luigi-automatic",
    brand: "emporio-armani",
    name: "Luigi Automatic", name_ar: "لويجي أوتوماتيك",
    model: "AR60050",
    price: 16900,
    gender: "men", style: "dress", strap: "leather", movement: "automatic",
    caseSize: 43, dialColor: "black", waterResistance: 50,
    inStock: true, stockCount: 4, isNew: false, isFeatured: false,
    createdAt: "2026-05-15",
    images: [
      "https://images.unsplash.com/photo-1580287017488-706e4d7598a1?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580287017488-706e4d7598a1?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1580287017488-706e4d7598a1?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A refined automatic with a dark dial and rose-gold details, on a black leather strap.",
    description_ar: "ساعة أوتوماتيك راقية بميناء داكن وتفاصيل بلون الذهب الوردي على سوار جلد أسود.",
    specs:    { movement: "Automatic", caseSize: "43 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "50 m", weight: "≈ 73 g" },
    specs_ar: { movement: "أوتوماتيك", caseSize: "43 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "50 متر", weight: "حوالي 73 جم" },
    features: ["water", "movement"]
  },
  {
    id: "ea-gianni-t-bar",
    brand: "emporio-armani",
    name: "Gianni T-Bar", name_ar: "جياني تي-بار",
    model: "AR1926",
    price: 9900, originalPrice: 12900,
    gender: "women", style: "dress", strap: "steel", movement: "quartz",
    caseSize: 32, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 9, isNew: false, isFeatured: false,
    createdAt: "2026-06-22",
    images: [
      "https://images.unsplash.com/photo-1580837428500-74aa7eefc672?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580837428500-74aa7eefc672?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1580837428500-74aa7eefc672?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A slim white dial and a T-bar bracelet detail. Modern Italian femininity.",
    description_ar: "ميناء أبيض نحيف وتفصيلة تي-بار في السوار. أنوثة إيطالية عصرية.",
    specs:    { movement: "Quartz", caseSize: "32 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "White", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 109 g" },
    specs_ar: { movement: "كوارتز", caseSize: "32 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 109 جم" },
    features: ["water", "movement"]
  },

  /* ---------- CURREN ---------- */
  {
    id: "curren-8023-steel",
    brand: "curren",
    name: "8023 Chronograph Steel", name_ar: "8023 كرونوغراف ستيل",
    model: "8023-W",
    price: 1450, originalPrice: 1950,
    gender: "men", style: "sport", strap: "steel", movement: "quartz",
    caseSize: 47, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 25, isNew: false, isFeatured: false,
    createdAt: "2026-07-02",
    images: [
      "https://images.unsplash.com/photo-1661030418924-52142661241d?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1661030418924-52142661241d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1661030418924-52142661241d?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A big white sports chronograph on a steel bracelet. Great looks at a great price.",
    description_ar: "كرونوغراف رياضي كبير بميناء أبيض على سوار ستيل. شكل رائع بسعر رائع.",
    specs:    { movement: "Quartz", caseSize: "47 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "White", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 160 g" },
    specs_ar: { movement: "كوارتز", caseSize: "47 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 160 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "curren-8114-leather",
    brand: "curren",
    name: "8114 Leather Chronograph", name_ar: "8114 كرونوغراف جلد",
    model: "8114-C",
    price: 1299, originalPrice: 2099,
    gender: "men", style: "casual", strap: "leather", movement: "quartz",
    caseSize: 45, dialColor: "champagne", waterResistance: 30,
    inStock: true, stockCount: 30, isNew: false, isFeatured: false,
    createdAt: "2026-08-09",
    images: [
      "https://images.unsplash.com/photo-1604727199378-bf5dd08726ad?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604727199378-bf5dd08726ad?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1604727199378-bf5dd08726ad?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A champagne dial and a brown leather strap: a warm, casual chronograph for every day.",
    description_ar: "ميناء بلون الشامبين وسوار جلد بني: كرونوغراف دافئ وكاجوال لكل يوم.",
    specs:    { movement: "Quartz", caseSize: "45 mm", caseMaterial: "Stainless steel", strap: "Genuine leather strap", dialColor: "Champagne", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 77 g" },
    specs_ar: { movement: "كوارتز", caseSize: "45 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد طبيعي", dialColor: "شامبين", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 77 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "curren-8301-classic",
    brand: "curren",
    name: "8301 Classic Black", name_ar: "8301 كلاسيك أسود",
    model: "8301-B",
    price: 1350,
    gender: "men", style: "dress", strap: "steel", movement: "quartz",
    caseSize: 42, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 22, isNew: false, isFeatured: false,
    createdAt: "2026-03-16",
    images: [
      "https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1695345272166-4efd76dd7a21?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A simple black dial on a steel bracelet. The easy choice for work and evenings.",
    description_ar: "ميناء أسود بسيط على سوار ستيل. الاختيار السهل للعمل والسهرات.",
    specs:    { movement: "Quartz", caseSize: "42 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 143 g" },
    specs_ar: { movement: "كوارتز", caseSize: "42 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 143 جم" },
    features: ["water", "movement"]
  },
  {
    id: "curren-9003-ladies",
    brand: "curren",
    name: "9003 Ladies Gold", name_ar: "9003 حريمي ذهبي",
    model: "9003-G",
    price: 1199, originalPrice: 1599,
    gender: "women", style: "dress", strap: "gold", movement: "quartz",
    caseSize: 34, dialColor: "white", waterResistance: 30,
    inStock: true, stockCount: 19, isNew: false, isFeatured: false,
    createdAt: "2026-04-23",
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A gold-tone ladies' watch with a white dial: elegant and very affordable. A perfect gift.",
    description_ar: "ساعة حريمي بلون ذهبي وميناء أبيض: أنيقة وبسعر مناسب جداً. هدية مثالية.",
    specs:    { movement: "Quartz", caseSize: "34 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "White", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 116 g" },
    specs_ar: { movement: "كوارتز", caseSize: "34 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "أبيض", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 116 جم" },
    features: ["water", "movement"]
  },

  /* ---------- NAVIFORCE ---------- */
  {
    id: "naviforce-nf9197",
    brand: "naviforce",
    name: "NF9197 Dual Time", name_ar: "NF9197 دبل تايم",
    model: "NF9197-B",
    price: 1599, originalPrice: 2199,
    gender: "men", style: "sport", strap: "rubber", movement: "smart",
    caseSize: 47, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 24, isNew: false, isFeatured: false,
    createdAt: "2026-05-03",
    images: [
      "https://images.unsplash.com/photo-1650811518721-c7adbfe08035?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1650811518721-c7adbfe08035?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1650811518721-c7adbfe08035?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "Analog and digital time together, with alarm, stopwatch and backlight. Rugged and practical.",
    description_ar: "الوقت بالعقارب والأرقام معاً، مع منبه وساعة إيقاف وإضاءة. متينة وعملية.",
    specs:    { movement: "Analog-digital quartz", caseSize: "47 mm", caseMaterial: "Resin & alloy", strap: "Rubber strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 45 g" },
    specs_ar: { movement: "كوارتز تناظري ورقمي", caseSize: "47 مم", caseMaterial: "ريزن وسبيكة معدنية", strap: "سوار مطاط", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 45 جم" },
    features: ["water", "movement"]
  },
  {
    id: "naviforce-nf9163",
    brand: "naviforce",
    name: "NF9163 Chronograph", name_ar: "NF9163 كرونوغراف",
    model: "NF9163-S",
    price: 1850, originalPrice: 2400,
    gender: "men", style: "sport", strap: "steel", movement: "quartz",
    caseSize: 46, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 17, isNew: false, isFeatured: false,
    createdAt: "2026-06-10",
    images: [
      "https://images.unsplash.com/photo-1703505841379-2f863b201212?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1703505841379-2f863b201212?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1703505841379-2f863b201212?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A busy pilot-style chronograph dial on a steel bracelet. Lots of watch for the money.",
    description_ar: "ميناء كرونوغراف بطابع الطيارين على سوار ستيل. ساعة كاملة مقابل سعرها.",
    specs:    { movement: "Quartz", caseSize: "46 mm", caseMaterial: "Stainless steel", strap: "Stainless steel bracelet", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 156 g" },
    specs_ar: { movement: "كوارتز", caseSize: "46 مم", caseMaterial: "ستانلس ستيل", strap: "سوار ستانلس ستيل", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 156 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "naviforce-nf8023-gold",
    brand: "naviforce",
    name: "NF8023 Gold Chronograph", name_ar: "NF8023 كرونوغراف ذهبي",
    model: "NF8023-G",
    price: 1999, originalPrice: 2799,
    gender: "men", style: "casual", strap: "gold", movement: "quartz",
    caseSize: 44, dialColor: "gold", waterResistance: 30,
    inStock: true, stockCount: 14, isNew: false, isFeatured: false,
    createdAt: "2026-07-17",
    images: [
      "https://images.unsplash.com/photo-1613704193420-a53cab02d194?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613704193420-a53cab02d194?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1613704193420-a53cab02d194?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A full gold-tone chronograph that shines. Bold, festive and affordable.",
    description_ar: "كرونوغراف ذهبي بالكامل يلمع. جريء ومبهج وفي المتناول.",
    specs:    { movement: "Quartz", caseSize: "44 mm", caseMaterial: "Gold-tone stainless steel", strap: "Gold-tone steel bracelet", dialColor: "Gold", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 150 g" },
    specs_ar: { movement: "كوارتز", caseSize: "44 مم", caseMaterial: "ستانلس ستيل بلون ذهبي", strap: "سوار ستيل بلون ذهبي", dialColor: "ذهبي", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 150 جم" },
    features: ["water", "movement", "chronograph"]
  },
  {
    id: "naviforce-smart-band",
    brand: "naviforce",
    name: "NF Smart Band", name_ar: "سمارت باند NF",
    model: "NFS-01",
    price: 999, originalPrice: 1599,
    gender: "unisex", style: "smart", strap: "rubber", movement: "smart",
    caseSize: 40, dialColor: "black", waterResistance: 30,
    inStock: true, stockCount: 40, isNew: true, isFeatured: false,
    createdAt: "2026-09-21",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&q=75&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.8",
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&q=75&auto=format&fit=crop&crop=focalpoint&fp-x=0.42&fp-y=0.58&fp-z=1.3"
    ],
    description: "A slim fitness band with steps, heart rate, sleep tracking and phone notifications.",
    description_ar: "سوار لياقة نحيف يحسب الخطوات والنبض والنوم ويعرض إشعارات الهاتف.",
    specs:    { movement: "Smart (fitness band)", caseSize: "40 mm", caseMaterial: "Polycarbonate", strap: "Rubber strap", dialColor: "Black", glass: "Mineral crystal", waterResistance: "30 m", weight: "≈ 45 g" },
    specs_ar: { movement: "ذكية (سوار لياقة)", caseSize: "40 مم", caseMaterial: "بولي كربونات", strap: "سوار مطاط", dialColor: "أسود", glass: "زجاج معدني", waterResistance: "30 متر", weight: "حوالي 45 جم" },
    features: ["water", "movement", "smart"]
  }
];
