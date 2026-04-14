# 🛍️ ThreadHaus – Complete E-Commerce Fashion Store

## Project Overview
A full-stack, production-ready e-commerce clothing store built with React, Node.js, Express, and MongoDB.

---

## 📁 Project Structure

```
ThreadHaus/
├── index.html              ← Complete frontend (single-file React app)
├── backend/
│   ├── server.js           ← Express API server
│   ├── package.json        ← Backend dependencies
│   └── .env.example        ← Environment variables template
├── DEPLOYMENT.md           ← This file
└── README.md
```

---

## 🎯 Features Implemented

### Frontend (index.html)
- ✅ **Modern Hero Section** – Animated, full-screen with stats
- ✅ **Navigation Bar** – Responsive with search, cart, wishlist, user icons
- ✅ **Category Pages** – Men, Women, Kids with product grids
- ✅ **Advanced Filters** – Price, size, brand, color, discount, sort
- ✅ **Smart Search** – Real-time suggestions with instant results
- ✅ **Product Cards** – Ratings, sizes, discount labels, wishlist/cart
- ✅ **Product Detail Page** – Full details, related products, size guide
- ✅ **Shopping Cart Drawer** – Sliding drawer with quantity controls
- ✅ **Wishlist Drawer** – Save favorites
- ✅ **Checkout Flow** – 2-step (address → payment) with 4 payment options
- ✅ **User Authentication** – Login, Register, Google OAuth simulation
- ✅ **User Dashboard** – Profile, orders, wishlist, addresses, settings
- ✅ **Admin Panel** – Full CRUD for products, orders, inventory, categories
- ✅ **Trending/New Arrivals/Offers Sections** – Homepage featured sections
- ✅ **Toast Notifications** – Global success/error feedback
- ✅ **Footer** – Newsletter, social links, payment logos, contact info
- ✅ **Responsive Design** – Mobile, tablet, desktop
- ✅ **Professional Typography** – Playfair Display + DM Sans + Bebas Neue

### Backend (server.js)
- ✅ **REST API** – Full CRUD for products, orders, users, categories
- ✅ **JWT Authentication** – Secure token-based auth
- ✅ **Password Hashing** – bcryptjs
- ✅ **Google OAuth** – OAuth user creation/linking
- ✅ **File Upload** – Multer for product images
- ✅ **Admin Middleware** – Role-based access control
- ✅ **MongoDB Schemas** – Users, Products, Orders, Categories
- ✅ **Error Handling** – Global error middleware
- ✅ **CORS** – Cross-origin configured for Vercel frontend

---

## 🚀 Deployment Instructions

### Frontend → Vercel

1. **Create a React project** (or use the provided index.html as-is):
   ```bash
   npx create-react-app threadhaus-frontend
   # Copy the React component code into src/App.js
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/threadhaus-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - Go to https://vercel.com → New Project
   - Import your GitHub repository
   - Vercel auto-detects React → Click Deploy
   - Set environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com`

4. **Or deploy the single HTML file:**
   - Upload `index.html` directly to Vercel via drag-and-drop

---

### Backend → Render.com

1. **Set up backend project:**
   ```bash
   mkdir threadhaus-backend && cd threadhaus-backend
   cp server.js .
   npm init -y
   npm install express mongoose cors jsonwebtoken bcryptjs multer dotenv
   ```

2. **Create package.json:**
   ```json
   {
     "name": "threadhaus-backend",
     "version": "1.0.0",
     "main": "server.js",
     "scripts": {
       "start": "node server.js",
       "dev": "nodemon server.js"
     },
     "dependencies": {
       "express": "^4.18.2",
       "mongoose": "^7.6.3",
       "cors": "^2.8.5",
       "jsonwebtoken": "^9.0.2",
       "bcryptjs": "^2.4.3",
       "multer": "^1.4.5-lts.1",
       "dotenv": "^16.3.1"
     }
   }
   ```

3. **Create .env file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/threadhaus
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

4. **Push to GitHub and deploy on Render:**
   - Go to https://render.com → New → Web Service
   - Connect your GitHub repository
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add environment variables from .env

---

### MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com
2. Create a free cluster (M0)
3. Create a database user with read/write access
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Copy the connection string → paste in `MONGODB_URI`

---

## 🔑 Admin Access

**Demo Admin Login:**
- Username: `admin`
- Password: `admin123`

To create a real admin in MongoDB:
```javascript
db.users.updateOne(
  { email: "admin@threadhaus.com" },
  { $set: { role: "admin" } }
)
```

---

## 🌐 API Endpoints

### Auth
```
POST /api/auth/register    → Register new user
POST /api/auth/login       → Login with email/password
POST /api/auth/google      → Google OAuth login
GET  /api/auth/me          → Get current user (auth required)
```

### Products
```
GET    /api/products                    → List products (with filters)
GET    /api/products/:id                → Get single product
POST   /api/products                    → Create product (admin)
PUT    /api/products/:id                → Update product (admin)
DELETE /api/products/:id                → Soft-delete product (admin)
```

### Orders
```
GET    /api/orders                      → User's orders / All orders (admin)
POST   /api/orders                      → Place new order
PUT    /api/orders/:id/status           → Update order status (admin)
DELETE /api/orders/:id                  → Cancel order (admin)
```

### Users
```
PUT    /api/users/profile               → Update profile
POST   /api/users/wishlist/:productId   → Toggle wishlist item
POST   /api/users/address               → Add address
```

### Admin
```
GET    /api/admin/stats                 → Dashboard statistics
GET    /api/categories                  → List categories
POST   /api/categories                  → Create category (admin)
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| `--ink` | `#0f0e0d` – Primary text |
| `--cream` | `#faf8f4` – Background |
| `--gold` | `#c9a84c` – Accent |
| `--rust` | `#c0392b` – Danger/Sale |
| `--sage` | `#4a5e4e` – Success |
| Font | Playfair Display + DM Sans + Bebas Neue |

---

## 📱 Responsive Breakpoints

- **Desktop:** ≥ 1024px – Full multi-column layout
- **Tablet:** 768–1023px – 2-column, collapsed sidebar
- **Mobile:** < 768px – Single column, full-width drawer

---

## ✨ Future Enhancements

- [ ] Real Google OAuth integration (Firebase Auth)
- [ ] Razorpay / Stripe payment gateway
- [ ] Email notifications (Nodemailer / SendGrid)
- [ ] Product reviews & ratings
- [ ] Push notifications
- [ ] Multi-language support
- [ ] PWA / offline support
- [ ] Image CDN (Cloudinary)
- [ ] Redis caching
- [ ] ElasticSearch for advanced search

---

## 🛡️ Security Checklist

- [x] JWT token authentication
- [x] Password hashing (bcrypt)
- [x] Admin role middleware
- [x] CORS configured
- [x] Input validation
- [ ] Rate limiting (add `express-rate-limit`)
- [ ] Helmet.js security headers
- [ ] HTTPS (handled by Vercel/Render)

---

Built with ❤️ for ThreadHaus Fashion Store
