# 🧵 Wallet Customizer MVP

A lightweight **wallet customization and ordering web app** for a leather craftsman.  
Customers visually build a custom wallet, review their configuration, and submit an order — **without Instagram DMs and chats**.


---

## 🚩 Problem Statement

Custom leather wallet orders are usually handled via **Instagram DMs**, which causes:

- Miscommunication about colors and features  
- Customers unsure what they will receive  
- Endless back-and-forth messages  
- Lost or incomplete orders  

**Customers can’t clearly visualize their custom wallet before ordering.**

---

## ✅ Solution

A **web-based wallet configurator** where customers:

1. Select wallet options (outer leather, inner leather, stitching, etc.)
2. See an **instant visual preview** of their exact combination
3. Review a clear order summary
4. Submit an order request

➡️ The craftsman receives a **clear, structured order via email**  

---

## 🧠 Key Concept: 2.5D Layered Rendering

This project uses **2.5D PNG layers**, not real-time 3D.

Each customizable part of the wallet is exported as a **transparent PNG** and stacked in the browser:

- Stitching layer 
- Inner leather layer
- Outer leather layer
- Shadow / lighting


When a user changes an option, **only that layer is swapped**.

### Why this approach?
- Simple and reliable
- Fast on mobile devices
- Easy for designers to maintain
- No performance overhead
- Ideal for MVPs and craftsmen

---

## 🧱 Tech Stack

### Frontend
- **Next.js**
- React
- Tailwind CSS
- Static image layering

### Backend
- **Xano**
- REST APIs
- Email notifications
- No authentication (MVP)

---

## 🔁 Order Flow (Replacing Instagram DMs)

### 1. Build
Customer customizes the wallet:
- Outer leather color
- Inner leather color
- Stitching color
- Optional features (card slots, coin pocket)

### 2. Review
Customer sees a full, unambiguous summary:

Outer leather: Black
Inner leather: Blue
Stitching: Yellow
Card slots: 3
Coin pocket: Yes

This replaces DM confirmations like  
*"So black outside and blue inside, correct?"*

### 3. Submit Order Request
Customer provides:
- Name
- Email
- Optional notes

Order is sent to the backend.

### 4. Confirmation
- Customer sees a confirmation screen
- Customer receives an email summary
- Craftsman receives an email with all order details

💬 No chats  
📷 No screenshots  
📩 No confusion  

---

## 📦 Order Data Structure

Orders are stored as **clear attributes**, not image combinations.

```json
{
  "outer": "black",
  "inner": "blue",
  "stitch": "yellow",
  "card_slots": 3,
  "coin_pocket": true,
  "customer_name": "Anna",
  "customer_email": "anna@email.com",
  "notes": "No logo please"
}
```
Each order receives a unique identifier (e.g. Order #124) for internal tracking.

🔧 Backend Responsibilities (Xano)
Expose available customization options

Validate order requests

Calculate estimated price (optional)

Store orders

Send email notifications to craftsman and customer

🎯 MVP Scope
✅ Visual wallet customizer
✅ Live preview with layered images
✅ Order request submission
✅ Email confirmations
✅ Replacement for Instagram DMs

🛠️ Running the Project (Frontend)
```
npm install
npm run dev
Wallet image assets must exist in:
```
```
/public/wallet/
  /outer
  /inner
  /stitch
  shadow.png
```
