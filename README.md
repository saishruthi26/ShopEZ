# 🛍️ ShopEZ – Full-Stack E-Commerce Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-shopez--frontend--wzsg.onrender.com-7c3aed?style=for-the-badge)](https://shopez-frontend-wzsg.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-saishruthi26%2FShopEZ-181717?style=for-the-badge&logo=github)](https://github.com/saishruthi26/ShopEZ)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://cloud.mongodb.com)
[![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge)](https://render.com)

**Your one-stop destination for effortless online shopping.**

[🚀 View Live Demo](https://shopez-frontend-wzsg.onrender.com) · [🐛 Report Bug](https://github.com/saishruthi26/ShopEZ/issues) · [✨ Request Feature](https://github.com/saishruthi26/ShopEZ/issues)

</div>

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| 🌐 **Frontend** | https://shopez-frontend-wzsg.onrender.com |
| 🔧 **Backend API** | https://shopez-9f7k.onrender.com |

### 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👤 **User** | user@shopez.com | user123 |
| 👑 **Admin** | admin@shopez.com | admin123 |

> ⚠️ **Note:** Hosted on Render free tier — first load may take ~30 seconds to wake up.

---

## ✨ Features

### 👤 User Features
- 🔐 Register & Login with JWT Authentication
- 🛍️ Browse **22+ products** across 6 categories
- 🔍 Search & filter by category, price, rating
- 🛒 Add to cart, update quantities, remove items
- 💳 Secure checkout with address & payment method
- 📦 Order confirmation with unique order ID
- 👤 Profile page with complete order history
- ⭐ Write product reviews with star ratings

### 👑 Admin Features
- 📊 Dashboard with total stats (Users, Products, Orders, Revenue)
- 📦 Manage products — Add, Edit, Delete
- 🛍️ Manage orders — Update status (Pending → Delivered)
- 👥 Manage users — View & Delete

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js 18, React Router v6, Axios, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **Styling** | Vanilla CSS (Glassmorphism, Dark Theme) |
| **Deployment** | Render (Frontend + Backend), MongoDB Atlas |

---

## 📁 Project Structure

```
ShopEZ/
├── client/                  # React Frontend (Vite)
│   ├── public/
│   │   └── _redirects       # Render SPA routing fix
│   └── src/
│       ├── api/             # Axios API calls
│       ├── components/      # Navbar, Footer, ProductCard, etc.
│       ├── context/         # AuthContext, CartContext
│       └── pages/
│           ├── Home.jsx
│           ├── Products.jsx
│           ├── ProductDetail.jsx
│           ├── Cart.jsx
│           ├── Checkout.jsx
│           ├── OrderConfirmation.jsx
│           ├── Profile.jsx
│           ├── Login.jsx
│           ├── Register.jsx
│           └── admin/
│               ├── AdminDashboard.jsx
│               ├── ManageProducts.jsx
│               ├── ManageOrders.jsx
│               └── ManageUsers.jsx
│
└── server/                  # Node.js + Express Backend
    ├── config/db.js         # MongoDB connection
    ├── middleware/auth.js   # JWT middleware
    ├── models/              # User, Product, Cart, Order
    ├── controllers/         # Business logic
    ├── routes/              # API routes
    ├── server.js            # Entry point (auto-seeds DB)
    └── seed.js              # Manual DB seeder
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB running locally

### 1. Clone the repo
```bash
git clone https://github.com/saishruthi26/ShopEZ.git
cd ShopEZ
```

### 2. Setup Backend
```bash
cd server
npm install
npm run seed      # Seeds 22 products + demo users
npm run dev       # Starts on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd client
npm install
npm run dev       # Starts on http://localhost:5173
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login | Public |
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/featured` | Featured products | Public |
| GET | `/api/products/:id` | Product detail | Public |
| POST | `/api/products/:id/reviews` | Add review | User |
| GET | `/api/cart` | Get user cart | User |
| POST | `/api/cart/add` | Add to cart | User |
| POST | `/api/orders` | Place order | User |
| GET | `/api/orders/my` | My orders | User |
| GET | `/api/users/profile` | Get profile | User |
| GET | `/api/admin/stats` | Dashboard stats | Admin |
| GET | `/api/admin/orders` | All orders | Admin |
| PUT | `/api/admin/orders/:id/status` | Update order status | Admin |

---

## 🎨 Design Highlights

- 🌑 **Dark Theme** with purple `#7c3aed` primary color
- ✨ **Glassmorphism** cards with backdrop-filter blur
- 🌈 **Gradient** text and buttons
- 💫 **Smooth animations** with CSS keyframes
- 📱 **Fully responsive** — works on mobile, tablet, desktop
- 🔤 **Inter font** from Google Fonts

---



### 🏠 Home Page
![Home](https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop)

### 🛍️ Products Page
![Products](https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop)

---

## 👨‍💻 Skills Used

`HTML` `CSS` `JavaScript` `React.js` `Node.js` `Express.js` `MongoDB` `JWT` `REST API` `Git` `GitHub` `Render` `MongoDB Atlas`

---

<div align="center">

 [saishruthi26](https://github.com/saishruthi26)
</div>
