# Managing products, brands & photos
# إدارة المنتجات والماركات والصور

Everything in the shop comes from **one file: `js/products.js`**. No admin panel, no password:
edit the file, save, and publish. Every page updates by itself: home, shop filters, product pages, offers, cart and WhatsApp messages.

كل محتوى المتجر يأتي من **ملف واحد: `js/products.js`**. لا توجد لوحة تحكم ولا كلمة مرور:
عدّل الملف، احفظه، ثم انشر الموقع. كل الصفحات تتحدث تلقائياً.

> Edit in **VS Code** and preview with **Live Server** (right-click `index.html` → *Open with Live Server*).
>
> عدّل باستخدام **VS Code** وشاهد النتيجة بـ **Live Server** (كليك يمين على `index.html` ← *Open with Live Server*).

---

## 1. A product, field by field · المنتج حقلاً بحقل

```js
{
  id: "seiko-presage-cocktail",
  brand: "seiko",
  name: "Presage Cocktail Time", name_ar: "بريساج كوكتيل تايم",
  model: "SRPB43J1",
  price: 24500, originalPrice: 29900,
  gender: "men", style: "dress", strap: "leather", movement: "automatic",
  caseSize: 40.5, dialColor: "blue", waterResistance: 50,
  inStock: true, stockCount: 3, isNew: false, isFeatured: true,
  createdAt: "2026-05-15",
  images: [
    "images/presage-1.jpg",
    "images/presage-2.jpg"
  ],
  description: "A deep blue textured dial…",
  description_ar: "ميناء أزرق عميق بملمس…",
  specs:    { movement: "Automatic", caseSize: "40.5 mm", caseMaterial: "Stainless steel", strap: "Leather strap", dialColor: "Blue", glass: "Hardlex crystal", waterResistance: "50 m", weight: "≈ 70 g" },
  specs_ar: { movement: "أوتوماتيك", caseSize: "40.5 مم", caseMaterial: "ستانلس ستيل", strap: "سوار جلد", dialColor: "أزرق", glass: "زجاج هاردلكس", waterResistance: "50 متر", weight: "حوالي 70 جم" },
  features: ["water", "movement", "date"]
}
```

| Field | What it means (English) | المعنى (عربي) |
| --- | --- | --- |
| `id` | Unique name, lowercase, no spaces. Becomes the link `product.html?id=…`. **Don't change it after publishing.** | اسم فريد بحروف إنجليزية صغيرة بدون مسافات، ويصبح رابط المنتج. **لا تغيّره بعد النشر.** |
| `brand` | The brand's `id` from `BRANDS` (e.g. `"seiko"`). | معرّف الماركة من قائمة `BRANDS` مثل `"seiko"`. |
| `name` / `name_ar` | Watch name in English / Arabic. | اسم الساعة بالإنجليزية / بالعربية. |
| `model` | Reference number, shown on the product page and searchable. | رقم الموديل، يظهر في صفحة المنتج ويمكن البحث به. |
| `price` | **Current** price in EGP, numbers only, no commas. | السعر **الحالي** بالجنيه، أرقام فقط بدون فواصل. |
| `originalPrice` | *Optional.* The old, higher price. If it's there, the site shows the discount badge (-20%), the crossed-out price and "You save". Delete it to end the offer. | *اختياري.* السعر القديم الأعلى. لو موجود يظهر الخصم (‎-20%) والسعر المشطوب و"وفّر". احذفه لإنهاء العرض. |
| `gender` | `"men"`, `"women"` or `"unisex"`. | `"men"` رجالي، `"women"` حريمي، `"unisex"` للجنسين. |
| `style` | `"luxury"`, `"dress"`, `"sport"`, `"casual"`, `"diver"`, `"smart"`. | فاخر، كلاسيكي، رياضي، كاجوال، غوص، ذكية. |
| `strap` | `"steel"`, `"leather"`, `"rubber"`, `"fabric"`, `"gold"`. | ستيل، جلد، مطاط، قماش، لون ذهبي. |
| `movement` | `"automatic"`, `"quartz"`, `"smart"` (smart / digital). | أوتوماتيك، كوارتز، ذكية/رقمية. |
| `caseSize` | Case diameter in mm (number). Used by the size filter and the wrist guide. | قطر العلبة بالمليمتر (رقم). يُستخدم في فلتر المقاس ودليل المعصم. |
| `dialColor` | `"black"`, `"blue"`, `"white"`, `"silver"`, `"grey"`, `"green"`, `"gold"`, `"rose"`, `"brown"`, `"champagne"`, `"red"`. | لون الميناء من القائمة. |
| `waterResistance` | In metres (number), e.g. `100`. | مقاومة الماء بالمتر (رقم). |
| `inStock` / `stockCount` | `stockCount: 0` or `inStock: false` → "Out of stock". 1–3 → "Only 3 left". | `stockCount: 0` أو `inStock: false` تعني غير متوفر، ومن 1 إلى 3 تُظهر "متبقٍ 3 فقط". |
| `isNew` | `true` shows a "New" badge. | `true` تُظهر علامة "جديد". |
| `isFeatured` | `true` puts it in the home page's Featured collection. | `true` تضعه في المجموعة المميزة بالصفحة الرئيسية. |
| `createdAt` | Date added, `"YYYY-MM-DD"`. Used by "Newest" sorting. | تاريخ الإضافة، ويُستخدم في ترتيب "الأحدث". |
| `images` | 1–4 photos. The first is the main photo; the second appears on hover. | من 1 إلى 4 صور. الأولى هي الرئيسية والثانية تظهر عند المرور بالماوس. |
| `description` / `description_ar` | One or two sentences. | جملة أو جملتان. |
| `specs` / `specs_ar` | The specifications table. Remove a line you don't know and it's simply hidden. | جدول المواصفات. احذف أي سطر لا تعرفه وسيختفي ببساطة. |
| `features` | Icon rows on the product page: `"water"`, `"movement"`, `"sapphire"`, `"chronograph"`, `"solar"`, `"lume"`, `"date"`, `"smart"`. | أيقونات المميزات في صفحة المنتج. |

**Only `id`, `brand`, `name`, `price`, `images` and `description` are required.** Everything else is optional and the site adapts.
**الحقول المطلوبة فقط: `id` و`brand` و`name` و`price` و`images` و`description`.** الباقي اختياري.

---

## 2. Common tasks · مهام شائعة

| Task | How | الطريقة |
| --- | --- | --- |
| **Add a watch** | Copy a whole `{ … },` block inside `PRODUCTS`, paste it under the same brand, change the values. | انسخ كتلة `{ … },` كاملة والصقها تحت نفس الماركة وغيّر القيم. |
| **Start a discount** | Put the old price in `originalPrice` and the new one in `price`. | ضع السعر القديم في `originalPrice` والجديد في `price`. |
| **End a discount** | Delete `originalPrice: …,`. | احذف `originalPrice: …,`. |
| **Sold out** | `stockCount: 0` | `stockCount: 0` |
| **Remove a watch** | Delete its whole `{ … },` block. | احذف الكتلة كاملة. |
| **Offer end date** | `STORE.offerEndsAt` (countdown on the offers page). | `STORE.offerEndsAt` (العد التنازلي في صفحة العروض). |
| **Shipping price** | `STORE.shippingFee`: one fixed price for every order. | `STORE.shippingFee`: سعر شحن ثابت لكل الطلبات. |
| **First order discount** | `STORE.firstOrderDiscount`: EGP taken off the subtotal (e.g. `100`; `0` turns the discount off). `STORE.firstOrderCode`: the code customers can type in the cart (e.g. `"FIRST100"`, capitals don't matter). The discount is applied automatically when the device has never ordered before, or when the code is typed. One discount per order, and it never makes the total negative. If you change the amount, also change the first line of `STORE.announcement`. | `STORE.firstOrderDiscount`: قيمة الخصم بالجنيه من المجموع (مثلاً `100`، و`0` يلغي الخصم). `STORE.firstOrderCode`: الكود الذي يكتبه العميل في السلة (مثلاً `"FIRST100"`، الحروف الكبيرة والصغيرة سواء). الخصم يُطبق تلقائياً لو الجهاز لم يطلب من قبل، أو عند كتابة الكود. خصم واحد لكل أوردر، ولا يجعل الإجمالي بالسالب أبداً. لو غيّرت القيمة غيّر أيضاً أول سطر في `STORE.announcement`. |
| **Announcement bar** | `STORE.announcement` (`[]` hides it). | `STORE.announcement` (`[]` لإخفائه). |
| **Payment methods** | `STORE.paymentMethods` → `enabled: true/false`. | `STORE.paymentMethods` ← `enabled: true/false`. |
| **Working hours** | `STORE.hours`: `"24/7"` shows "Open 24/7" everywhere. For other hours: `{ text: "…", text_ar: "…" }` (and update `STORE.openingHours` for Google). | `STORE.hours`: `"24/7"` تُظهر "متاحين 24 ساعة" في كل مكان. لمواعيد أخرى: `{ text: "…", text_ar: "…" }` (وعدّل `STORE.openingHours` لجوجل). |
| **Customer review video** | Paste one Instagram reel/post link in `STORE.reviewVideo`. It appears on the home page and the Reviews tab of every product. `""` shows nothing. | الصق رابط ريل/بوست واحد من إنستجرام في `STORE.reviewVideo` ليظهر في الرئيسية وفي تبويب التقييمات لكل منتج. `""` لا يُظهر شيئاً. |

### Add a brand · إضافة ماركة
Add a block to `BRANDS`. The order there is the order on the site:
أضف كتلة في `BRANDS`، وترتيبها هو ترتيب ظهورها في الموقع:

```js
{
  id: "hublot",
  name: "Hublot", name_ar: "هوبلو",
  origin: "Switzerland · Since 1980", origin_ar: "سويسرا · منذ 1980",
  story: "One or two sentences about the brand.",
  story_ar: "جملة أو جملتان عن الماركة."
},
```
Its shop page works right away: `products.html?brand=hublot`.

---

## 3. Photos · الصور

1. Put photos in `images/`, e.g. `images/presage-1.jpg`. Lowercase names, no spaces (use `-`).
   ضع الصور في مجلد `images/` بأسماء إنجليزية صغيرة بدون مسافات.
2. **Square photos** (1200 × 1200 px) on a plain background look best.
   الصور **المربعة** (1200 × 1200) بخلفية بسيطة هي الأفضل.
3. Keep each photo **under ~250 KB**: compress free at <https://squoosh.app> (WebP or MozJPEG, quality ~75).
   اجعل حجم الصورة **أقل من 250 كيلوبايت** تقريباً، واضغطها مجاناً على squoosh.app.
4. Write the paths in `images: [ … ]`.

> All current photos are free Unsplash samples, and some show a different watch than the name.
> **Replace them with photos of your real watches.** The extra gallery photos are zoomed crops of the main one.
>
> كل الصور الحالية صور تجريبية مجانية من Unsplash وبعضها لساعة مختلفة عن الاسم. **استبدلها بصور ساعاتك الحقيقية.**

---

## 4. After adding products: sitemap · بعد الإضافة: خريطة الموقع

Add a line for each new product to `sitemap.xml` so Google finds it:
أضف سطراً لكل منتج جديد في `sitemap.xml` حتى يجده جوجل:

```xml
<url><loc>https://example.com/product.html?id=seiko-presage-cocktail</loc></url>
```
(Replace `https://example.com` everywhere with your real domain once the site is online: VS Code → **Ctrl+Shift+H**.)

---

## 5. If something breaks · لو حدثت مشكلة

| Problem | Cause |
| --- | --- |
| The page is empty / no products | A missing comma `,` between two `{ … }` blocks, or a missing quote `"`. Press **F12 → Console**: the red message gives the line number. |
| A product is missing from its brand | `brand` doesn't exactly match the brand `id` (lowercase!). |
| Photo shows a placeholder | Wrong file name or path. Online, `Rolex.JPG` ≠ `rolex.jpg`. |
| Price shows `NaN` | Price written with quotes or commas. Use `price: 24500`. |
| Arabic shows `???` | Save the file as **UTF-8** (VS Code does this by default). |

لو ظهرت الصفحة فارغة فغالباً هناك فاصلة `,` أو علامة تنصيص `"` ناقصة. اضغط **F12 ← Console** لترى رقم السطر.

---

## 6. Publishing your changes · نشر التعديلات

**Netlify (drag & drop):** <https://app.netlify.com> → your site → **Deploys** → drag the whole website folder onto the page.
**Netlify + GitHub:** commit and push, and Netlify publishes automatically.

**Netlify (سحب وإفلات):** ادخل على موقعك في Netlify ← **Deploys** ← اسحب مجلد الموقع بالكامل إلى الصفحة.
