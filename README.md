# BunaChain ☕️⛓️

**Trace the journey of coffee – from farm to cup – on-chain.**

BunaChain is a Solana-powered supply chain transparency platform for the global coffee industry. We help farmers, processors, exporters, and importers prove the authenticity and origin of their coffee lots through QR-linked traceability and immutable on-chain records.

---

## 🔍 Why BunaChain?

Smallholder farmers grow over 80% of the world’s coffee, yet they remain invisible in the final product journey. BunaChain uses blockchain to give producers recognition and buyers verifiable trust.

> “Buna” means “coffee” in Amharic – and BunaChain is built to trace it, fairly.

---

## 🛠️ Tech Stack

| Layer      | Tech Used                                                              |
| ---------- | ---------------------------------------------------------------------- |
| Blockchain | [Solana](https://solana.com), [Anchor](https://book.anchor-lang.com/)  |
| Frontend   | [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com) |
| Backend    | [Supabase](https://supabase.com), [Prisma](https://www.prisma.io)      |
| Auth       | Solana wallet adapter                                                  |
| Storage    | Supabase Storage (for export documents)                                |

---

## ⚙️ Features

* 📟 **Farmer Dashboard** – Register coffee lots with metadata
* 🏭 **Processor Flow** – Update processing stages (washed, sun-dried, etc.)
* 🚢 **Exporter Module** – Upload export documents and finalize trace
* 🌍 **Importer Portal** – Scan QR code to view verified trace history
* 🔗 **Solana Smart Contracts** – All trace records stored immutably on-chain
* 📱 **Public Trace Page** – Each lot has a unique QR code anyone can verify

---

## 📦 Repo Structure

```bash
bunachain/
├── app/                   # Next.js frontend
├── anchor/                # Solana smart contracts (Anchor framework)
├── prisma/                # Prisma schema & migrations
├── scripts/               # Wallet + program utilities
├── public/                # QR & static assets
└── README.md
```

---

## 🚀 Deploy Locally

### 📦 Backend

```bash
cd anchor
anchor build
anchor deploy
```

### 🌐 Frontend

```bash
cd app
npm install
npm run dev
```

---

## 📄 Smart Contract

* Program: `bunachain`
* Solana Devnet ID: `ETRaj3YGbcqA9AxCqmeNKshteAw2M5dQveocHsssmNqm`
* Anchor IDL auto-generated in `target/idl/`

## 🧠 Team

Built by a team of four developers from Ethiopia 🇪🇹

* Minase – Full-stack & Solana lead
* Zerfu – Blockchain & Infra
* Yeabsira – UI/UX & experience
* Aron – Frontend systems

---

## 📜 License

MIT License – open-source, built for global transparency.

---

> ✨ Bringing trust to trade, one coffee lot at a time.