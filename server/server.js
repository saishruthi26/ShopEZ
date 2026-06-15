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
      { name: 'Apple iPhone 15 Pro', description: 'Titanium design, 48MP Main camera with 5x optical zoom, A17 Pro chip, USB 3 speeds, and Action button.', price: 127900, originalPrice: 134900, discount: 5, category: 'Electronics', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop', brand: 'Apple', stock: 15, rating: 4.8, numReviews: 245, featured: true },
      { name: 'Samsung Galaxy S24 Ultra', description: 'Built-in S Pen, 200MP camera, Snapdragon 8 Gen 3, 5000mAh battery, 6.8" Dynamic AMOLED 2X display.', price: 89999, originalPrice: 99999, discount: 10, category: 'Electronics', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop', brand: 'Samsung', stock: 20, rating: 4.7, numReviews: 189, featured: true },
      { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation with 8 microphones. 30-hour battery, multipoint connection, Speak-to-Chat.', price: 25490, originalPrice: 29990, discount: 15, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', brand: 'Sony', stock: 30, rating: 4.9, numReviews: 312, featured: true },
      { name: 'Apple MacBook Air M3', description: '11.5mm thin, 1.24kg, 18-hour battery, 15.3-inch Liquid Retina display, and MagSafe charging.', price: 114900, originalPrice: 124900, discount: 8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop', brand: 'Apple', stock: 10, rating: 4.9, numReviews: 178, featured: true },
      { name: 'Apple iPad Air 11-inch (M2)', description: 'M2 chip, 11-inch Liquid Retina display, USB-C, Apple Pencil Pro support, Magic Keyboard compatible.', price: 59900, originalPrice: 64900, discount: 8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', brand: 'Apple', stock: 18, rating: 4.8, numReviews: 203, featured: true },
      { name: 'OnePlus 12 5G', description: 'Snapdragon 8 Gen 3, Hasselblad camera, 100W SUPERVOOC charging, 6.82-inch ProXDR AMOLED display.', price: 64999, originalPrice: 69999, discount: 7, category: 'Electronics', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop', brand: 'OnePlus', stock: 25, rating: 4.6, numReviews: 134, featured: false },
      { name: 'JBL Flip 6 Bluetooth Speaker', description: 'IP67 waterproof, powerful sound with bold bass, 12 hours playtime, PartyBoost support.', price: 9999, originalPrice: 13999, discount: 29, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', brand: 'JBL', stock: 40, rating: 4.6, numReviews: 567, featured: false },
      { name: 'Apple Watch Series 9 (GPS)', description: 'S9 chip, Always-On Retina display, Double Tap gesture, blood oxygen sensor, ECG app, Carbon Neutral.', price: 41900, originalPrice: 44900, discount: 7, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', brand: 'Apple', stock: 22, rating: 4.7, numReviews: 289, featured: true },
      { name: 'Boat Airdopes 141 TWS Earbuds', description: '42 hours total playback, ENx Technology for calls, BEAST Mode gaming, IPX4 water resistance.', price: 1299, originalPrice: 2990, discount: 57, category: 'Electronics', image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&h=400&fit=crop', brand: 'Boat', stock: 50, rating: 4.2, numReviews: 892, featured: false },
      { name: "Men's Regular Fit Polo T-Shirt", description: "100% premium pima cotton, ribbed collar and cuffs. Available in 8 colors. Machine washable.", price: 899, originalPrice: 1499, discount: 40, category: 'Fashion', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop', brand: 'Allen Solly', stock: 100, rating: 4.3, numReviews: 456, featured: true },
      { name: "Women's Floral Wrap Midi Dress", description: "Floral print wrap dress with adjustable tie waist. V-neckline, short sleeves, A-line midi skirt.", price: 1799, originalPrice: 2999, discount: 40, category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop', brand: 'AND', stock: 60, rating: 4.5, numReviews: 267, featured: true },
      { name: 'Nike Air Max 270 React Sneakers', description: "Nike's largest Air unit for incredible underfoot comfort. Breathable mesh upper, bold rubber outsole.", price: 8995, originalPrice: 10995, discount: 18, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', brand: 'Nike', stock: 40, rating: 4.7, numReviews: 523, featured: true },
      { name: "Men's Slim Fit Denim Jeans", description: "Premium stretch denim, slim fit, mid-rise waist, 5-pocket styling. 98% cotton 2% elastane.", price: 1499, originalPrice: 2499, discount: 40, category: 'Fashion', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', brand: "Levi's", stock: 75, rating: 4.4, numReviews: 389, featured: false },
      { name: 'Puma Running Shoes for Men', description: 'IGNITE foam midsole for energy return, EverFit+ cage for secure fit, rubber outsole for grip.', price: 3999, originalPrice: 5999, discount: 33, category: 'Fashion', image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop', brand: 'Puma', stock: 55, rating: 4.5, numReviews: 312, featured: false },
      { name: 'Caprese Genuine Leather Tote Bag', description: 'Genuine leather tote with multiple compartments, zip pocket, card slots, padded handles and shoulder strap.', price: 3499, originalPrice: 5999, discount: 42, category: 'Fashion', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop', brand: 'Caprese', stock: 35, rating: 4.4, numReviews: 198, featured: false },
      { name: 'Ray-Ban Aviator Classic Sunglasses', description: 'G-15 green polarized lenses, 100% UV protection, gold-tone metal frame with adjustable nose pads.', price: 7490, originalPrice: 9490, discount: 21, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', brand: 'Ray-Ban', stock: 45, rating: 4.6, numReviews: 334, featured: false },
      { name: 'Instant Pot Duo 7-in-1 Pressure Cooker', description: 'Replaces 7 kitchen appliances. 6-quart capacity, 13 one-touch cooking programs.', price: 6499, originalPrice: 8999, discount: 28, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop', brand: 'Instant Pot', stock: 22, rating: 4.8, numReviews: 1204, featured: true },
      { name: 'Philips HD9252 Digital Air Fryer', description: 'Up to 90% less fat. 4.1L capacity, Rapid Air Technology, digital touchscreen, 7 preset programs.', price: 5999, originalPrice: 7499, discount: 20, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1648170645897-b2e91a7f2571?w=400&h=400&fit=crop', brand: 'Philips', stock: 18, rating: 4.6, numReviews: 678, featured: false },
      { name: 'Nescafé Dolce Gusto Coffee Machine', description: '15-bar pump pressure, 30+ drink varieties, 0.8L water tank, quick heat-up in 25 seconds.', price: 7999, originalPrice: 11999, discount: 33, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop', brand: 'Nescafé', stock: 15, rating: 4.5, numReviews: 423, featured: false },
      { name: 'Wakefit Engineered Wood Study Desk', description: 'Cable management, pull-out drawer, monitor shelf, metal legs. Scratch-resistant laminate. 120×60×75cm.', price: 8999, originalPrice: 12999, discount: 31, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', brand: 'Wakefit', stock: 12, rating: 4.4, numReviews: 234, featured: false },
      { name: 'Syska Smart LED Desk Lamp', description: 'USB-C charging, 5 brightness levels, 4 color modes, 60-min auto-off, flicker-free eye protection.', price: 1999, originalPrice: 3499, discount: 43, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', brand: 'Syska', stock: 55, rating: 4.3, numReviews: 445, featured: false },
      { name: 'Boldfit Anti-Slip Yoga Mat (6mm)', description: 'Extra-thick 6mm NBR foam, non-slip texture, alignment lines, carry strap. 183cm × 61cm.', price: 1299, originalPrice: 1999, discount: 35, category: 'Sports', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', brand: 'Boldfit', stock: 80, rating: 4.5, numReviews: 567, featured: false },
      { name: 'Adjustable Resistance Bands Set (5-Pack)', description: '5 latex bands, progressive resistance levels 2–10kg. Includes bag, door anchor, handles, ankle straps.', price: 799, originalPrice: 1499, discount: 47, category: 'Sports', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop', brand: 'Boldfit', stock: 120, rating: 4.4, numReviews: 789, featured: false },
      { name: 'Kore Cast Iron Dumbbells Set (10kg Pair)', description: 'Rubber-coated cast iron dumbbells, 5kg each. Ergonomic knurled grip handle. Home & gym use.', price: 1899, originalPrice: 2999, discount: 37, category: 'Sports', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop', brand: 'Kore', stock: 60, rating: 4.6, numReviews: 423, featured: false },
      { name: 'MyProtein Impact Whey Protein 1kg', description: '25g protein per serving, 5.5g BCAAs, low sugar. 50+ flavors, 40 servings. NSF Certified for Sport.', price: 2999, originalPrice: 3799, discount: 21, category: 'Sports', image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop', brand: 'MyProtein', stock: 65, rating: 4.6, numReviews: 934, featured: false },
      { name: 'Lakmé 9to5 Primer + Matte Foundation', description: 'SPF 20, covers blemishes, natural-matte finish lasting 16 hours. Oil-free, non-comedogenic. 10 shades.', price: 549, originalPrice: 699, discount: 21, category: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop', brand: 'Lakmé', stock: 90, rating: 4.2, numReviews: 1102, featured: false },
      { name: 'The Ordinary Complete Skincare Routine Set', description: 'Hyaluronic Acid 2%, Niacinamide 10%, AHA 30% + BHA 2% Peeling Solution, Moisturizing Factors. 100% vegan.', price: 3499, originalPrice: 4999, discount: 30, category: 'Beauty', image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop', brand: 'The Ordinary', stock: 40, rating: 4.7, numReviews: 445, featured: true },
      { name: 'Himalaya Purifying Neem Face Wash', description: 'Removes dirt and excess oil without stripping moisture. Neem and turmeric extracts. Soap-free. 200ml.', price: 199, originalPrice: 280, discount: 29, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', brand: 'Himalaya', stock: 150, rating: 4.4, numReviews: 2103, featured: false },
      { name: 'Atomic Habits by James Clear', description: '#1 NYT bestseller. How tiny 1% improvements compound into remarkable results. Build good habits, break bad ones.', price: 399, originalPrice: 599, discount: 33, category: 'Books', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop', brand: 'Penguin Random House', stock: 200, rating: 4.9, numReviews: 3456, featured: true },
      { name: 'Rich Dad Poor Dad by Robert Kiyosaki', description: '#1 personal finance book. Teaches financial literacy, investing, and building assets that generate passive income.', price: 299, originalPrice: 450, discount: 34, category: 'Books', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop', brand: 'Plata Publishing', stock: 150, rating: 4.7, numReviews: 2891, featured: false },
      { name: 'The Psychology of Money by Morgan Housel', description: '19 stories exploring the strange ways people think about money. Timeless lessons on wealth and financial behaviour.', price: 349, originalPrice: 499, discount: 30, category: 'Books', image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop', brand: 'Jaico Publishing', stock: 180, rating: 4.8, numReviews: 1987, featured: true },
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
