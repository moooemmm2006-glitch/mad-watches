/**
 * =========================================================================
 *  MAD WATCHES — ORDERS → GOOGLE SHEET
 * -------------------------------------------------------------------------
 *  Paste this whole file into Extensions → Apps Script of your Google Sheet,
 *  then deploy it as a Web app (step-by-step: docs/ORDERS-SETUP.md).
 *
 *  Every order confirmed on the website becomes one new row in the
 *  "Orders" tab. Optional: get an email for every order (NOTIFY_EMAIL).
 * =========================================================================
 */

// Name of the tab where orders are saved (created automatically)
const SHEET_NAME = "Orders";

// Put your email here to get an email for every new order, or leave "" for none.
// Example: const NOTIFY_EMAIL = "moooemmm2006@gmail.com";
const NOTIFY_EMAIL = "";

// Column titles (row 1 of the sheet)
const HEADERS = [
  "Date", "Order ID", "Status", "Name", "Phone", "Governorate", "City / Area", "Address",
  "Items", "Subtotal", "Savings", "First order discount", "Discount code", "Shipping", "Gift wrap", "Gift message", "Total", "Currency",
  "Payment", "Notes", "Language", "Page"
];


/**
 * Runs when the website sends an order.
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);   // one order at a time, so rows never overwrite each other

  try {
    const order = JSON.parse(e.postData.contents);

    // Spam trap: real customers never fill this hidden field
    if (order.website) return reply({ ok: true });

    if (!order.orderId || !order.name || !order.phone || !Array.isArray(order.items) || order.items.length === 0) {
      return reply({ ok: false, error: "Missing order details" });
    }

    const sheet = getOrdersSheet();

    // The same order sent twice (double click / resend) is saved only once
    if (orderExists(sheet, order.orderId, order.phone)) return reply({ ok: true, duplicate: true });

    const itemsText = order.items.map(function (i) {
      return i.qty + " × " + i.brand + " " + i.name + (i.model ? " (" + i.model + ")" : "") +
        " @ " + i.price + (i.discount ? " (-" + i.discount + "%)" : "") + " = " + i.subtotal;
    }).join("\n");

    sheet.appendRow([
      new Date(),
      clean(order.orderId),
      "New",
      clean(order.name),
      clean(order.phone),
      clean(order.governorate),
      clean(order.city),
      clean(order.address),
      clean(itemsText),
      Number(order.subtotal) || 0,
      Number(order.savings) || 0,
      Number(order.discount) || 0,
      clean(order.discountCode || (order.discount ? "automatic (first order)" : "")),
      Number(order.shipping) || 0,
      order.giftWrap ? "Yes (" + (Number(order.giftFee) || 0) + ")" : "No",
      clean(order.giftMessage),
      Number(order.total) || 0,
      clean(order.currency || "EGP"),
      clean(order.paymentName || order.paymentMethod),
      clean(order.notes),
      clean(order.language),
      clean(order.page)
    ]);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New order " + order.orderId + " — " + order.name + " — " + order.total + " " + (order.currency || "EGP"),
        body:
          "Order: " + order.orderId + "\n" +
          "Name: " + order.name + "\n" +
          "Phone: " + order.phone + "\n" +
          "Address: " + order.address + ", " + order.city + ", " + order.governorate + "\n" +
          "Payment: " + (order.paymentName || order.paymentMethod) + "\n" +
          (order.notes ? "Notes: " + order.notes + "\n" : "") +
          "\n" + itemsText + "\n\n" +
          "Subtotal: " + order.subtotal +
          (order.discount ? "\nFirst order discount: -" + order.discount + (order.discountCode ? " (" + order.discountCode + ")" : "") : "") +
          "\nShipping: " + order.shipping +
          (order.giftWrap ? "\nGift wrap: " + order.giftFee : "") +
          "\nTOTAL: " + order.total + " " + (order.currency || "EGP") +
          "\n\nOpen the sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      });
    }

    return reply({ ok: true, orderId: order.orderId });

  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}


/**
 * Open the Web app link in your browser to check it's running.
 */
function doGet() {
  return reply({ ok: true, message: "Mad Watches orders endpoint is running." });
}


/**
 * Run this once from the editor (▶ Run) to create the "Orders" tab and
 * give the script permission to use your sheet.
 */
function setup() {
  getOrdersSheet();
}


/* ---------------------------- helpers ---------------------------- */

function getOrdersSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#0A2C47").setFontColor("#A2C5E3");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm");
    sheet.getRange("E:E").setNumberFormat("@");   // keep the leading 0 of phone numbers
    sheet.getRange("I:I").setWrap(true);
  }
  return sheet;
}

// Same order number AND same phone in the last 300 rows = a duplicate
function orderExists(sheet, orderId, phone) {
  const last = sheet.getLastRow();
  if (last < 2) return false;
  const start = Math.max(2, last - 299);
  const rows = sheet.getRange(start, 2, last - start + 1, 4).getValues();   // columns B (ID) … E (Phone)
  return rows.some(function (r) { return r[0] === orderId && String(r[3]) === String(phone); });
}

// Text is limited in length, and anything that starts like a formula
// (= + - @) is stored as plain text so it can never run in the sheet.
function clean(value) {
  let text = String(value === undefined || value === null ? "" : value).slice(0, 2000);
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}

function reply(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
