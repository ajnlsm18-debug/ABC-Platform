# ABC Platform – Next.js Demo Application

This is a **minimal, clean Next.js + React + TypeScript** application designed to demonstrate:

- Safe data fetching
- Pagination (100 users, 10 per page)
- Loading, error, and retry states
- A simple User Profile Settings page

The app uses **mocked APIs only** — no backend, database, or authentication is required.

---

## 📦 Tech Stack

- Next.js (Pages Router)
- React 18
- TypeScript
- Plain CSS (no Tailwind, no PostCSS plugins)

---

## ✅ Prerequisites

You must have the following installed:

- **Node.js v18 or higher** (18, 20, or 24 supported)
- **npm** (comes with Node.js)

Verify installation:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1️⃣ Unzip the Project

Unzip the folder and navigate into it:

```bash
cd abc-platform
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

This installs all required dependencies (Next.js, React, TypeScript).

---

### 3️⃣ Run the Application

```bash
npm run dev
```

You should see:

```text
Local: http://localhost:3000
```

---

## 🌐 Application Pages

| Page         | URL                                                            | Description                                   |
| ------------ | -------------------------------------------------------------- | --------------------------------------------- |
| Users List   | [http://localhost:3000/users](http://localhost:3000/users)     | 100 users with pagination (10 per page)       |
| User Profile | [http://localhost:3000/profile](http://localhost:3000/profile) | Update name & email with loading/error states |

---

## 🧪 What This App Demonstrates

- Mock API calls with simulated latency and failures
- Clear loading, success, and error UI states
- Retry handling for failed requests
- Pagination logic suitable for production systems
- Type-safe React components using TypeScript
- Designed to fit into an existing, imperfect codebase

---

## ⚠️ Important Notes

- This project **does NOT use Tailwind CSS**
- This project **does NOT require PostCSS plugins**
- All data is mocked in the frontend
- No environment variables are required

---

## 🛠️ Troubleshooting

### ❌ Tailwind / PostCSS Error

If you see an error mentioning Tailwind or PostCSS:

```text
Cannot find module '@tailwindcss/postcss'
```

Fix it by running:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Also ensure these files do NOT exist in the project root:

```text
tailwind.config.js
postcss.config.js
```

---

## 📦 Zipping the Project

⚠️ **Do NOT include `node_modules` when zipping**

### Windows

Right‑click the project folder → **Send to → Compressed (zipped) folder**

### macOS / Linux

```bash
zip -r abc-platform.zip abc-platform -x "abc-platform/node_modules/*"
```

---

## 📄 License

This project is provided for demonstration and evaluation purposes only.

---

## 🤝 Questions

If you have trouble running the app, ensure:

- Node.js is installed correctly
- Dependencies were installed successfully
- No leftover Tailwind/PostCSS config files exist

Happy coding 🚀
