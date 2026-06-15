const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com')
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => res.send('ShopEZ API is running ✅'));

// ── Auto-seed on first deploy ─────────────────────────────────────────────
// Seeds the DB with demo products & users if it's completely empty.
// Runs automatically on startup — no Shell access needed!
const autoSeed = async () => {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User');
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`ℹ️  DB already has ${count} products — skipping seed`);
      return;
    }
    console.log('🌱 Empty DB detected — auto-seeding...');

    await User.deleteMany();
    await User.create({ name: 'Admin User', email: 'admin@shopez.com', password: 'admin123', isAdmin: true });
    await User.create({ name: 'John Doe', email: 'user@shopez.com', password: 'user123', isAdmin: false });

    const products = [
      { name: 'iPhone 15 Pro', description: 'Experience Apple Intelligence with the iPhone 15 Pro. Features a titanium design, 48MP camera system, and A17 Pro chip for unmatched performance.', price: 127900, originalPrice: 134900, discount: 5, category: 'Electronics', image: 'https://images.unsplash.com/photo-1696446702183-b7d1d3592f36?w=400&h=400&fit=crop', brand: 'Apple', stock: 15, rating: 4.8, numReviews: 245, featured: true },
      { name: 'Samsung Galaxy S24 Ultra', description: 'The ultimate Galaxy experience. Built-in S Pen, 200MP camera, 5000mAh battery and Galaxy AI features that transform how you work and create.', price: 89999, originalPrice: 99999, discount: 10, category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', brand: 'Samsung', stock: 20, rating: 4.7, numReviews: 189, featured: true },
      { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise canceling with Dual Noise Sensor technology. 30-hour battery life and exceptional sound quality.', price: 25490, originalPrice: 29990, discount: 15, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', brand: 'Sony', stock: 30, rating: 4.9, numReviews: 312, featured: true },
      { name: 'Apple MacBook Air M3', description: 'Supercharged by M3 chip. 18-hour battery life, 15.3-inch Liquid Retina display, and MagSafe charging.', price: 114900, originalPrice: 124900, discount: 8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop', brand: 'Apple', stock: 10, rating: 4.9, numReviews: 178, featured: true },
      { name: 'OnePlus 12', description: 'Snapdragon 8 Gen 3, Hasselblad camera system, 100W SUPERVOOC charging and 6.82-inch ProXDR display.', price: 64999, originalPrice: 69999, discount: 7, category: 'Electronics', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop', brand: 'OnePlus', stock: 25, rating: 4.6, numReviews: 134, featured: false },
      { name: 'Boat Airdopes 141', description: 'True wireless earbuds with 42 hours total playback, ENx Technology for clear calls, and IPX4 water resistance.', price: 1299, originalPrice: 2990, discount: 57, category: 'Electronics', image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&h=400&fit=crop', brand: 'Boat', stock: 50, rating: 4.2, numReviews: 892, featured: false },
      { name: "Men's Premium Polo T-Shirt", description: "Crafted from 100% pima cotton with a comfortable regular fit. Perfect for casual outings.", price: 899, originalPrice: 1499, discount: 40, category: 'Fashion', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop', brand: 'Allen Solly', stock: 100, rating: 4.3, numReviews: 456, featured: true },
      { name: "Women's Floral Wrap Dress", description: "Elegant floral print wrap dress with adjustable tie waist. Lightweight fabric ideal for summer.", price: 1799, originalPrice: 2999, discount: 40, category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', brand: 'W', stock: 60, rating: 4.5, numReviews: 267, featured: true },
      { name: 'Nike Air Max 270', description: "Ultra-soft ride all day long. The large Max Air unit delivers unparalleled comfort with a modern look.", price: 8995, originalPrice: 10995, discount: 18, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', brand: 'Nike', stock: 40, rating: 4.7, numReviews: 523, featured: true },
      { name: 'Leather Tote Bag', description: 'Premium genuine leather tote bag with multiple compartments, padded handles, and detachable shoulder strap.', price: 3499, originalPrice: 5999, discount: 42, category: 'Fashion', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', brand: 'Caprese', stock: 35, rating: 4.4, numReviews: 198, featured: false },
      { name: 'Aviator Sunglasses', description: 'Classic aviator style with UV400 protection. Polarized lenses and scratch-resistant coating.', price: 1299, originalPrice: 2499, discount: 48, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', brand: 'Ray-Ban', stock: 45, rating: 4.6, numReviews: 334, featured: false },
      { name: 'Instant Pot Duo 7-in-1', description: 'Replaces 7 kitchen appliances. 6-quart capacity with 13 smart programs for pressure cooking, slow cooking and more.', price: 6499, originalPrice: 8999, discount: 28, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', brand: 'Instant Pot', stock: 22, rating: 4.8, numReviews: 1204, featured: true },
      { name: 'Philips Digital Air Fryer', description: 'Cook fried foods with up to 90% less fat. 4.1L capacity, rapid air technology, digital touchscreen.', price: 5999, originalPrice: 7499, discount: 20, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1648170645897-b2e91a7f2571?w=400&h=400&fit=crop', brand: 'Philips', stock: 18, rating: 4.6, numReviews: 678, featured: false },
      { name: 'Wooden Study Desk', description: 'Premium engineered wood desk with cable management, storage drawer, and monitor shelf.', price: 8999, originalPrice: 12999, discount: 31, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', brand: 'Wakefit', stock: 12, rating: 4.4, numReviews: 234, featured: false },
      { name: 'Smart LED Desk Lamp', description: 'USB-C charging port, 5 brightness levels, 4 color modes, touch control and auto-dim feature.', price: 1999, originalPrice: 3499, discount: 43, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', brand: 'Syska', stock: 55, rating: 4.3, numReviews: 445, featured: false },
      { name: 'Premium Yoga Mat', description: 'Extra-thick 6mm NBR foam mat with non-slip surface, alignment lines, and carry strap.', price: 1299, originalPrice: 1999, discount: 35, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', brand: 'Boldfit', stock: 80, rating: 4.5, numReviews: 567, featured: false },
      { name: 'Resistance Bands Set (5-Pack)', description: 'Professional quality latex bands in 5 resistance levels. Includes carrying bag, door anchor, and ankle straps.', price: 799, originalPrice: 1499, discount: 47, category: 'Sports', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop', brand: 'Boldfit', stock: 120, rating: 4.4, numReviews: 789, featured: false },
      { name: 'MyProtein Impact Whey Protein', description: '25g protein per serving, 5g BCAAs. Chocolate flavor. 1kg pack with 40 servings. NSF certified.', price: 2999, originalPrice: 3799, discount: 21, category: 'Sports', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop', brand: 'MyProtein', stock: 65, rating: 4.6, numReviews: 934, featured: false },
      { name: 'Lakme Absolute Skin Natural Mousse', description: 'Lightweight mousse foundation with SPF 8. Natural matte finish lasting 12 hours. Dermatologically tested.', price: 549, originalPrice: 699, discount: 21, category: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', brand: 'Lakmé', stock: 90, rating: 4.2, numReviews: 1102, featured: false },
      { name: 'The Ordinary Skincare Set', description: 'Complete routine with Hyaluronic Acid 2%, Niacinamide 10%, AHA/BHA Peeling Solution. Vegan formula.', price: 3499, originalPrice: 4999, discount: 30, category: 'Beauty', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop', brand: 'The Ordinary', stock: 40, rating: 4.7, numReviews: 445, featured: true },
      { name: 'Atomic Habits – James Clear', description: '#1 NYT bestseller. Learn how tiny changes lead to remarkable results. Framework for building good habits.', price: 399, originalPrice: 599, discount: 33, category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop', brand: 'Penguin Books', stock: 200, rating: 4.9, numReviews: 3456, featured: true },
      { name: 'Rich Dad Poor Dad', description: 'Robert Kiyosaki shares lessons from his two dads about money, investing, and financial independence.', price: 299, originalPrice: 450, discount: 34, category: 'Books', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop', brand: 'Warner Books', stock: 150, rating: 4.7, numReviews: 2891, featured: false },
    ];

    await Product.insertMany(products);
    console.log(`✅ Auto-seed complete! ${products.length} products and 2 users created.`);
    console.log('📧 Admin: admin@shopez.com / admin123');
    console.log('📧 User:  user@shopez.com  / user123');
  } catch (err) {
    console.error('⚠️ Auto-seed failed:', err.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await autoSeed(); // ← Seeds only if DB is empty
});
