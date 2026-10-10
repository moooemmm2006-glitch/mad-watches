# Orders → Google Sheet: Setup Guide
# دليل ربط الطلبات بجوجل شيت

Every order placed on the website is saved as a new row in a Google Sheet, **and** sent to you on WhatsApp.
It's free and takes about 10 minutes. You only do it once.

كل طلب على الموقع يُحفظ كسطر جديد في جوجل شيت، **وأيضاً** يصلك على واتساب.
الخدمة مجانية وتأخذ حوالي 10 دقائق، وتتم مرة واحدة فقط.

> Until you finish these steps, the site still works: orders go to WhatsApp only.
>
> إلى أن تنتهي من هذه الخطوات، الموقع يعمل بشكل طبيعي: الطلبات تصل على واتساب فقط.

---

## English

### 1. Create the Google Sheet
1. Go to <https://sheets.google.com> and sign in with your Google account.
2. Click **Blank spreadsheet** and name it, for example, `Mad Watches Orders`.

### 2. Add the script
1. In the sheet, open the menu **Extensions → Apps Script**.
2. Delete everything in the editor (`function myFunction() {...}`).
3. Open the file `docs/google-apps-script.gs` from the website folder, copy **all** of it, and paste it into the editor.
4. *(Optional)* To also get an email for every order, change this line:
   ```js
   const NOTIFY_EMAIL = "";
   ```
   to:
   ```js
   const NOTIFY_EMAIL = "moooemmm2006@gmail.com";
   ```
5. Click the **Save** icon (💾).

### 3. Give it permission (one time)
1. In the toolbar, choose the function **setup** and click **▶ Run**.
2. Google asks for permission: **Review permissions** → choose your account.
3. You'll see "Google hasn't verified this app". This is normal for your own scripts:
   click **Advanced** → **Go to … (unsafe)** → **Allow**.
4. Go back to your sheet: a new tab called **Orders** with column titles has appeared.

### 4. Publish it as a Web app
1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** `Mad Watches orders`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone** ← important, otherwise the website can't send orders
4. Click **Deploy**, then copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfycb…/exec`

### 5. Paste the link into the website
1. Open `js/products.js`.
2. Find `ordersEndpoint` near the top and paste your link between the quotes:
   ```js
   ordersEndpoint: "https://script.google.com/macros/s/AKfycb…/exec",
   ```
3. Save. If the site is already online, publish it again (see **Publishing your changes** in docs/ADD-PRODUCTS.md).

### 6. Test it
1. Open your Web app URL in the browser. You should see:
   `{"ok":true,"message":"Mad Watches orders endpoint is running."}`
2. On the website, add a watch to the cart → open the **cart** page → fill in the delivery details → **Confirm order on WhatsApp**.
3. A new row appears in the **Orders** tab (customer, address, items, subtotal, savings, shipping, gift wrap, total, payment, notes), and WhatsApp opens with the full order.

### Changing the script later
If you edit the script, publish the new version **without changing the link**:
**Deploy → Manage deployments → ✏ (edit) → Version: New version → Deploy.**
(Using "New deployment" again creates a *new* link that you'd have to paste into `products.js`.)

### Good to know
- The **Status** column says `New` for every order. Change it yourself (e.g. `Confirmed`, `Shipped`, `Delivered`) to keep track.
- Always confirm the price and stock with the customer on WhatsApp before shipping. The price in the sheet comes from the customer's browser.
- If Google is slow or unreachable, the customer still sends the order on WhatsApp, so no order is lost.
- **Troubleshooting:**
  - Nothing appears in the sheet → check **Who has access** is **Anyone**, and that the link ends with `/exec`.
  - "Authorization required" → run **setup** again (step 3).
  - Still stuck → in Apps Script open **Executions** (left menu) to see errors.

---

<div dir="rtl">

## العربية

### 1. أنشئ جوجل شيت
1. ادخل على <https://sheets.google.com> وسجّل الدخول بحساب جوجل.
2. اضغط **Blank spreadsheet** (جدول فارغ) وسمّه مثلاً `Mad Watches Orders`.

### 2. أضف السكريبت
1. من داخل الشيت افتح القائمة **Extensions ← Apps Script** (الإضافات ← Apps Script).
2. امسح كل المكتوب في المحرر (`function myFunction() {...}`).
3. افتح الملف `docs/google-apps-script.gs` من مجلد الموقع، وانسخ **كل** محتواه، والصقه في المحرر.
4. *(اختياري)* لو تريد أن يصلك إيميل مع كل طلب، غيّر هذا السطر:
   ```js
   const NOTIFY_EMAIL = "";
   ```
   إلى:
   ```js
   const NOTIFY_EMAIL = "moooemmm2006@gmail.com";
   ```
5. اضغط أيقونة **الحفظ** (💾).

### 3. امنح الصلاحية (مرة واحدة فقط)
1. من شريط الأدوات اختر الدالة **setup** واضغط **▶ Run** (تشغيل).
2. سيطلب جوجل الصلاحية: **Review permissions** ← اختر حسابك.
3. ستظهر رسالة "Google hasn't verified this app"، وهذا طبيعي مع السكريبتات الخاصة بك:
   اضغط **Advanced** ← **Go to … (unsafe)** ← **Allow**.
4. ارجع للشيت: ستجد تبويباً جديداً اسمه **Orders** وفيه عناوين الأعمدة.

### 4. انشره كـ Web app
1. في محرر Apps Script اضغط **Deploy ← New deployment**.
2. اضغط الترس ⚙ بجانب "Select type" ← اختر **Web app**.
3. املأ الخانات:
   - **Description:** `Mad Watches orders`
   - **Execute as:** **Me**
   - **Who has access:** **Anyone** ← مهم جداً، وإلا لن يستطيع الموقع إرسال الطلبات
4. اضغط **Deploy**، ثم انسخ **Web app URL**، وشكله كالتالي:
   `https://script.google.com/macros/s/AKfycb…/exec`

### 5. الصق الرابط في الموقع
1. افتح الملف `js/products.js`.
2. ابحث عن `ordersEndpoint` في أول الملف، والصق الرابط بين علامتي التنصيص:
   ```js
   ordersEndpoint: "https://script.google.com/macros/s/AKfycb…/exec",
   ```
3. احفظ الملف. لو الموقع منشور بالفعل، انشره مرة أخرى (راجع **Publishing your changes** في docs/ADD-PRODUCTS.md).

### 6. جرّب
1. افتح رابط الـ Web app في المتصفح، يجب أن يظهر:
   `{"ok":true,"message":"Mad Watches orders endpoint is running."}`
2. على الموقع: أضف ساعة للسلة ← افتح صفحة **السلة** ← املأ بيانات التوصيل ← **تأكيد الطلب عبر واتساب**.
3. سيظهر سطر جديد في تبويب **Orders**، وسيفتح واتساب ومعه تفاصيل الطلب كاملة.

### لو عدّلت السكريبت لاحقاً
انشر النسخة الجديدة **بدون تغيير الرابط**:
**Deploy ← Manage deployments ← ✏ (تعديل) ← Version: New version ← Deploy.**
(لو استخدمت "New deployment" مرة أخرى سيُنشئ رابطاً *جديداً* وستحتاج لصقه في `products.js`.)

### معلومات مهمة
- عمود **Status** مكتوب فيه `New` لكل طلب. غيّره بنفسك (مثلاً `Confirmed` أو `Shipped` أو `Delivered`) لتتابع الطلبات.
- أكّد دائماً السعر والتوفر مع العميل على واتساب قبل الشحن، لأن السعر في الشيت يأتي من متصفح العميل.
- لو جوجل بطيء أو غير متاح، العميل يرسل الطلب على واتساب على أي حال، فلا يضيع أي طلب.
- **حل المشاكل:**
  - لا يظهر شيء في الشيت ← تأكد أن **Who has access** = **Anyone**، وأن الرابط ينتهي بـ `/exec`.
  - رسالة "Authorization required" ← شغّل **setup** مرة أخرى (الخطوة 3).
  - ما زالت المشكلة موجودة ← في Apps Script افتح **Executions** من القائمة الجانبية لترى الأخطاء.

</div>
