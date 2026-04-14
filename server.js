// ═══════════════════════════════════════════════════════
//  Aura Clothings – Backend API Server
//  Stack: Node.js + Express + MongoDB + JWT Auth
// ═══════════════════════════════════════════════════════

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { OAuth2Client } = require('google-auth-library');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy-client-id');

// Setup Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'web2hub.official@gmail.com',
    pass: process.env.EMAIL_PASS || 'dummy_password'
  }
});

// Setup Twilio
const twilioClient = process.env.TWILIO_SID && process.env.TWILIO_TOKEN 
  ? twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN) 
  : null;

async function sendOrderNotifications(order, user) {
  const adminEmail = process.env.ADMIN_EMAIL || 'web2hub.official@gmail.com';
  const adminPhone = process.env.ADMIN_PHONE || '+916382003593';
  
  // Email logic
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'web2hub.official@gmail.com',
      to: `${user.email}, ${adminEmail}`,
      subject: `Aura Clothings Order Confirmation: #${order._id}`,
      html: `<h3>Thank you for your order!</h3><p>Your order for ₹${order.total} is being processed.</p>`
    };
    if (process.env.EMAIL_PASS) await transporter.sendMail(mailOptions);
    else console.log('Mock Email sent to', mailOptions.to);
  } catch (err) {
    console.error('Email notification failed:', err.message);
  }
  
  // WhatsApp logic
  try {
    if (twilioClient) {
      await twilioClient.messages.create({
        body: `Aura Clothings: New order #${order._id} for ₹${order.total} placed by ${user.name||user.email}.`,
        from: 'whatsapp:+14155238886', // Twilio sandbox number
        to: `whatsapp:${adminPhone}`
      });
    } else {
      console.log(`Mock WhatsApp message sent to ${adminPhone}: Aura Clothings Order #${order._id}`);
    }
  } catch (err) {
    console.error('WhatsApp notification failed:', err.message);
  }
}


const app = express();

// ── SECURITY & LOGGING ─────────────────────────────────
app.use(helmet({ 
  contentSecurityPolicy: false, 
  crossOriginEmbedderPolicy: false 
}));
app.use(morgan('combined'));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

// ── MIDDLEWARE ─────────────────────────────────────────
app.use('/api', apiLimiter);
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(express.static("frontend"));

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

// ── FILE UPLOAD (Multer) ──────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// ═══════════════════════════════════════════════════════
//  MONGOOSE SCHEMAS
// ═══════════════════════════════════════════════════════

// ── USER ──────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },          // null for Google OAuth users
  googleId: { type: String },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  gender: { type: String, default: '' },
  addresses: [{
    label: String,
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean,
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// ── PRODUCT ────────────────────────────────────────────
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, enum: ['men', 'women', 'kids'], required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  emoji: { type: String, default: '👕' },
  images: [String],
  sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }],
  colors: [String],
  material: { type: String, default: 'Premium Cotton Blend' },
  fit: { type: String, default: 'Regular Fit' },
  stock: { type: Number, default: 100 },
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String, enum: ['trending', 'new', 'bestseller'] }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ── ORDER ──────────────────────────────────────────────
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    size: String,
    qty: Number,
    emoji: String,
  }],
  shippingAddress: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  paymentMethod: { type: String, enum: ['cod', 'upi', 'debit', 'credit'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  subtotal: Number,
  shipping: { type: Number, default: 99 },
  total: Number,
  trackingId: String,
}, { timestamps: true });

// ── CATEGORY ───────────────────────────────────────────
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// ── SYSTEM SETTING ─────────────────────────────────────
const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Category = mongoose.model('Category', categorySchema);
const Setting = mongoose.model('Setting', settingSchema);

// ═══════════════════════════════════════════════════════
//  AUTH MIDDLEWARE
// ═══════════════════════════════════════════════════════
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'threadhaus_secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const adminMiddleware = (req, res, next) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin access required' });
    next();
  });
};

// ═══════════════════════════════════════════════════════
//  ROUTES
// ═══════════════════════════════════════════════════════

// ── AUTH ───────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'threadhaus_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'threadhaus_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/google', async (req, res) => {
  try {
    const { token: googleToken } = req.body;
    let payload;
    
    // Check if real token or simulated payload
    if (googleToken) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: googleToken,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        payload = ticket.getPayload();
      } catch (e) {
        return res.status(400).json({ error: 'Invalid Google token' });
      }
    } else {
      // Allow fallback payload if no client ID configured for local dev
      payload = req.body;
    }
    
    const { sub: googleId, name, email, picture: avatar } = payload;
    
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) user = await User.create({ googleId, name, email, avatar });
    else if (!user.googleId) await User.findByIdAndUpdate(user._id, { googleId, avatar });
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'threadhaus_secret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password').populate('wishlist');
  res.json(user);
});

// ── PRODUCTS ───────────────────────────────────────────
app.get('/api/products', async (req, res) => {
  try {
    const { category, tag, brand, minPrice, maxPrice, size, color, sort, q, limit = 24, page = 1 } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (brand) filter.brand = { $in: brand.split(',') };
    if (minPrice || maxPrice) filter.price = { $gte: +minPrice || 0, $lte: +maxPrice || 999999 };
    if (size) filter.sizes = { $in: size.split(',') };
    if (color) filter.colors = { $in: color.split(',') };
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { brand: new RegExp(q, 'i') }, { category: new RegExp(q, 'i') }];

    const sortMap = { popular: { reviewCount: -1 }, newest: { createdAt: -1 }, 'price-asc': { price: 1 }, 'price-desc': { price: -1 }, rating: { rating: -1 } };
    const sortObj = sortMap[sort] || sortMap.popular;

    const skip = (+page - 1) * +limit;
    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(+limit),
      Product.countDocuments(filter),
    ]);
    res.json({ products, total, page: +page, pages: Math.ceil(total / +limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', adminMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    let images = req.files?.length ? req.files.map(f => `/uploads/${f.filename}`) : [];
    if (req.body.images && !req.files?.length) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }
    const product = await Product.create({ 
      ...req.body, 
      images, 
      sizes: req.body.sizes ? String(req.body.sizes).split(',').map(s=>s.trim()).filter(Boolean) : undefined, 
      tags: req.body.tags ? String(req.body.tags).split(',').map(s=>s.trim()).filter(Boolean) : undefined 
    });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/products/:id', adminMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.files?.length) updates.images = req.files.map(f => `/uploads/${f.filename}`);
    if (updates.sizes) updates.sizes = String(updates.sizes).split(',').map(s=>s.trim()).filter(Boolean);
    if (updates.tags) updates.tags = String(updates.tags).split(',').map(s=>s.trim()).filter(Boolean);
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/products/:id', adminMiddleware, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: 'Product removed' });
});

// ── ORDERS ─────────────────────────────────────────────
app.get('/api/orders', authMiddleware, async (req, res) => {
  const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
  const orders = await Order.find(filter).populate('items.product').sort({ createdAt: -1 });
  res.json(orders);
});

app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shipping, total } = req.body;
    const order = await Order.create({ user: req.user.id, items, shippingAddress, paymentMethod, subtotal, shipping, total });
    
    // Trigger notifications asynchronously
    sendOrderNotifications(order, req.user).catch(console.error);

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/orders/:id/status', adminMiddleware, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
  res.json(order);
});

app.delete('/api/orders/:id', adminMiddleware, async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, { orderStatus: 'cancelled' });
  res.json({ message: 'Order cancelled' });
});

// ── USER ───────────────────────────────────────────────
app.put('/api/users/profile', authMiddleware, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
  res.json(user);
});

app.post('/api/users/wishlist/:productId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  const idx = user.wishlist.indexOf(req.params.productId);
  if (idx > -1) user.wishlist.splice(idx, 1);
  else user.wishlist.push(req.params.productId);
  await user.save();
  res.json({ wishlist: user.wishlist });
});

app.post('/api/users/address', authMiddleware, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { $push: { addresses: req.body } }, { new: true }).select('-password');
  res.json(user.addresses);
});

// ── CATEGORIES ─────────────────────────────────────────
app.get('/api/categories', async (req, res) => {
  const cats = await Category.find({ isActive: true });
  res.json(cats);
});

app.post('/api/categories', adminMiddleware, async (req, res) => {
  const cat = await Category.create(req.body);
  res.json(cat);
});

// ── SETTINGS ───────────────────────────────────────────
app.get('/api/settings', async (req, res) => {
  const settings = await Setting.find({});
  const config = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});
  res.json(config);
});

app.post('/api/settings', adminMiddleware, async (req, res) => {
  const keys = Object.keys(req.body);
  for (const key of keys) {
    await Setting.findOneAndUpdate({ key }, { value: req.body[key] }, { upsert: true });
  }
  res.json({ message: 'Settings updated' });
});

// ── UPLOAD HELPER ──────────────────────────────────────
app.post('/api/upload', adminMiddleware, upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
  const urls = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});

// ── ADMIN STATS ────────────────────────────────────────
app.get('/api/admin/stats', adminMiddleware, async (req, res) => {
  const [totalProducts, totalOrders, totalUsers, orders] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    User.countDocuments({ role: 'user' }),
    Order.find({ orderStatus: 'delivered' }),
  ]);
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  res.json({ totalProducts, totalOrders, totalUsers, revenue });
});

// ── HEALTH CHECK ───────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

// ── 404 ────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── ERROR HANDLER ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${req.method} ${req.url}:`, err.message);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred.' : err.message 
  });
});

// ── DATABASE + SERVER ─────────────────────────────────
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    User.findOne({ email: 'admincenter' }).then(async admin => {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      if (admin) {
        await User.findByIdAndUpdate(admin._id, { password: hashedPassword });
      } else {
        await User.create({ name: 'Admin Center', email: 'admincenter', password: hashedPassword, role: 'admin' });
      }
      console.log('✅ Admin credentials ready: admincenter / admin123');
    });
    app.listen(PORT, () => {
console.log(`API running on port ${PORT}`);
});
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });

module.exports = app;
