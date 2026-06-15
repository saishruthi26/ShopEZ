const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [

  // ═══════════════════════════════════════
  //  ELECTRONICS
  // ═══════════════════════════════════════
  {
    name: 'Apple iPhone 15 Pro',
    description: 'The iPhone 15 Pro features a strong titanium design, 48MP Main camera with 5x optical zoom, A17 Pro chip, USB 3 speeds, and Action button. Available in Natural Titanium, Blue Titanium, White Titanium, and Black Titanium.',
    price: 127900, originalPrice: 134900, discount: 5,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    brand: 'Apple', stock: 15, rating: 4.8, numReviews: 245, featured: true,
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Galaxy S24 Ultra has a built-in S Pen, 200MP camera, Snapdragon 8 Gen 3 processor, 5000mAh battery, and a 6.8" Dynamic AMOLED 2X display. The ultimate productivity powerhouse.',
    price: 89999, originalPrice: 99999, discount: 10,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    brand: 'Samsung', stock: 20, rating: 4.7, numReviews: 189, featured: true,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise cancellation with 8 microphones and Auto NC Optimizer. 30-hour battery, multipoint connection, Speak-to-Chat technology. Crystal clear hands-free calling.',
    price: 25490, originalPrice: 29990, discount: 15,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    brand: 'Sony', stock: 30, rating: 4.9, numReviews: 312, featured: true,
  },
  {
    name: 'Apple MacBook Air M3',
    description: 'MacBook Air with M3 chip is strikingly thin at just 11.5mm and featherlight at 1.24kg. Up to 18-hour battery life, 15.3-inch Liquid Retina display, and MagSafe charging.',
    price: 114900, originalPrice: 124900, discount: 8,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    brand: 'Apple', stock: 10, rating: 4.9, numReviews: 178, featured: true,
  },
  {
    name: 'Apple iPad Air 11-inch (M2)',
    description: 'iPad Air with M2 chip, 11-inch Liquid Retina display, USB-C connectivity, Apple Pencil Pro support, and Magic Keyboard compatibility. Available in Blue, Purple, Starlight, Space Grey.',
    price: 59900, originalPrice: 64900, discount: 8,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    brand: 'Apple', stock: 18, rating: 4.8, numReviews: 203, featured: true,
  },
  {
    name: 'OnePlus 12 5G',
    description: 'Powered by Snapdragon 8 Gen 3, co-developed with Hasselblad camera system, 100W SUPERVOOC fast charging, 6.82-inch ProXDR LTPO AMOLED display with 4500 nits peak brightness.',
    price: 64999, originalPrice: 69999, discount: 7,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop',
    brand: 'OnePlus', stock: 25, rating: 4.6, numReviews: 134, featured: false,
  },
  {
    name: 'JBL Flip 6 Bluetooth Speaker',
    description: 'JBL Flip 6 delivers powerful sound with bold bass. IP67 waterproof and dustproof, 12 hours playtime, PartyBoost to connect multiple speakers. Compact and portable design.',
    price: 9999, originalPrice: 13999, discount: 29,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    brand: 'JBL', stock: 40, rating: 4.6, numReviews: 567, featured: false,
  },
  {
    name: 'Apple Watch Series 9 (GPS)',
    description: 'Apple Watch Series 9 with S9 chip, Always-On Retina display, Double Tap gesture, Carbon Neutral, and advanced health sensors including blood oxygen and ECG app.',
    price: 41900, originalPrice: 44900, discount: 7,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    brand: 'Apple', stock: 22, rating: 4.7, numReviews: 289, featured: true,
  },
  {
    name: 'Boat Airdopes 141 TWS Earbuds',
    description: 'True wireless earbuds with 42 hours total playback, ENx Technology for clear calls, BEAST Mode for ultra-low latency gaming, and IPX4 water resistance. Comfortable in-ear fit.',
    price: 1299, originalPrice: 2990, discount: 57,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=400&h=400&fit=crop',
    brand: 'Boat', stock: 50, rating: 4.2, numReviews: 892, featured: false,
  },

  // ═══════════════════════════════════════
  //  FASHION
  // ═══════════════════════════════════════
  {
    name: "Men's Regular Fit Polo T-Shirt",
    description: "Crafted from 100% premium pima cotton with a comfortable regular fit. Ribbed collar and cuffs. Available in 8 colors — Navy, White, Black, Red, Green, Grey, Yellow, Blue. Machine washable.",
    price: 899, originalPrice: 1499, discount: 40,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&h=400&fit=crop',
    brand: 'Allen Solly', stock: 100, rating: 4.3, numReviews: 456, featured: true,
  },
  {
    name: "Women's Floral Wrap Midi Dress",
    description: "Elegant floral print wrap dress with an adjustable self-tie waist. V-neckline, short sleeves, and a flattering A-line midi skirt. Lightweight polyester fabric ideal for summer outings.",
    price: 1799, originalPrice: 2999, discount: 40,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
    brand: 'AND', stock: 60, rating: 4.5, numReviews: 267, featured: true,
  },
  {
    name: 'Nike Air Max 270 React Sneakers',
    description: "Nike's largest Air unit yet for incredible comfort underfoot. Foam midsole cradles your foot in lightweight cushioning. Breathable mesh upper with bold rubber outsole.",
    price: 8995, originalPrice: 10995, discount: 18,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Nike', stock: 40, rating: 4.7, numReviews: 523, featured: true,
  },
  {
    name: "Men's Slim Fit Denim Jeans",
    description: "Premium quality stretch denim with slim fit design. Mid-rise waist, 5-pocket styling, and zip fly. 98% cotton, 2% elastane for a perfect fit. Available in Dark Blue, Light Blue, Black.",
    price: 1499, originalPrice: 2499, discount: 40,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    brand: 'Levi\'s', stock: 75, rating: 4.4, numReviews: 389, featured: false,
  },
  {
    name: 'Puma Running Shoes for Men',
    description: 'Lightweight and breathable running shoes with IGNITE foam midsole for energy return. EverFit+ cage for secure fit, rubber outsole for grip. Suitable for road running and gym.',
    price: 3999, originalPrice: 5999, discount: 33,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop',
    brand: 'Puma', stock: 55, rating: 4.5, numReviews: 312, featured: false,
  },
  {
    name: 'Caprese Genuine Leather Tote Bag',
    description: 'Premium genuine leather tote bag with multiple interior compartments, zip pocket, and card slots. Magnetic snap closure, padded top handles, and detachable shoulder strap.',
    price: 3499, originalPrice: 5999, discount: 42,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    brand: 'Caprese', stock: 35, rating: 4.4, numReviews: 198, featured: false,
  },
  {
    name: 'Ray-Ban Aviator Classic Sunglasses',
    description: 'Iconic Ray-Ban Aviator with G-15 green polarized lenses offering 100% UV protection. Gold-tone metal frame, adjustable nose pads. Comes with Ray-Ban case and cleaning cloth.',
    price: 7490, originalPrice: 9490, discount: 21,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    brand: 'Ray-Ban', stock: 45, rating: 4.6, numReviews: 334, featured: false,
  },

  // ═══════════════════════════════════════
  //  HOME & KITCHEN
  // ═══════════════════════════════════════
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: 'Replace 7 kitchen appliances — pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer. 6-quart capacity, 13 one-touch cooking programs.',
    price: 6499, originalPrice: 8999, discount: 28,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop',
    brand: 'Instant Pot', stock: 22, rating: 4.8, numReviews: 1204, featured: true,
  },
  {
    name: 'Philips HD9252 Digital Air Fryer',
    description: 'Fry, bake, grill, and roast with up to 90% less fat. 4.1L capacity for family-size portions. Rapid Air Technology for crispy results. Digital touchscreen with 7 preset programs.',
    price: 5999, originalPrice: 7499, discount: 20,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1648170645897-b2e91a7f2571?w=400&h=400&fit=crop',
    brand: 'Philips', stock: 18, rating: 4.6, numReviews: 678, featured: false,
  },
  {
    name: 'Nescafé Dolce Gusto Coffee Machine',
    description: 'Brew café-style hot and cold drinks at home with 15-bar pump pressure. Compatible with 30+ drink varieties. 0.8L detachable water tank, automatic capsule puncturing, quick heat-up in 25 seconds.',
    price: 7999, originalPrice: 11999, discount: 33,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop',
    brand: 'Nescafé', stock: 15, rating: 4.5, numReviews: 423, featured: false,
  },
  {
    name: 'Wakefit Engineered Wood Study Desk',
    description: 'Premium engineered wood study desk with built-in cable management hole, pull-out drawer, raised monitor shelf, and metal legs. Scratch-resistant laminate finish. Dimensions: 120×60×75cm.',
    price: 8999, originalPrice: 12999, discount: 31,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    brand: 'Wakefit', stock: 12, rating: 4.4, numReviews: 234, featured: false,
  },
  {
    name: 'Syska Smart LED Desk Lamp',
    description: 'Touch-sensitive smart LED desk lamp with USB-C fast charging port, 5 brightness levels, 4 color temperature modes, 60-minute auto-off timer, and flicker-free eye protection technology.',
    price: 1999, originalPrice: 3499, discount: 43,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    brand: 'Syska', stock: 55, rating: 4.3, numReviews: 445, featured: false,
  },

  // ═══════════════════════════════════════
  //  SPORTS & FITNESS
  // ═══════════════════════════════════════
  {
    name: 'Boldfit Anti-Slip Yoga Mat (6mm)',
    description: 'Extra-thick 6mm NBR foam yoga mat with non-slip texture on both sides. Includes alignment lines for correct posture, carry strap, and mesh bag. Size: 183cm × 61cm. Ideal for yoga, pilates, and stretching.',
    price: 1299, originalPrice: 1999, discount: 35,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
    brand: 'Boldfit', stock: 80, rating: 4.5, numReviews: 567, featured: false,
  },
  {
    name: 'Adjustable Resistance Bands Set (5-Pack)',
    description: 'Set of 5 latex resistance bands in progressive resistance levels: 2kg, 4kg, 6kg, 8kg, 10kg. Includes carrying bag, door anchor, handles, and ankle straps. Great for home workouts.',
    price: 799, originalPrice: 1499, discount: 47,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop',
    brand: 'Boldfit', stock: 120, rating: 4.4, numReviews: 789, featured: false,
  },
  {
    name: 'Kore Cast Iron Dumbbells Set (10kg Pair)',
    description: 'Professional-grade cast iron dumbbells with rubber coating for floor protection. Ergonomic knurled grip handle for secure hold. Each dumbbell: 5kg. Ideal for home and gym workouts.',
    price: 1899, originalPrice: 2999, discount: 37,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop',
    brand: 'Kore', stock: 60, rating: 4.6, numReviews: 423, featured: false,
  },
  {
    name: 'MyProtein Impact Whey Protein 1kg',
    description: '25g protein and 5.5g BCAAs per serving. Low sugar, low fat. Available in 50+ flavors including Chocolate Smooth, Vanilla, and Strawberry. 40 servings per pack. NSF Certified for Sport.',
    price: 2999, originalPrice: 3799, discount: 21,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop',
    brand: 'MyProtein', stock: 65, rating: 4.6, numReviews: 934, featured: false,
  },

  // ═══════════════════════════════════════
  //  BEAUTY & PERSONAL CARE
  // ═══════════════════════════════════════
  {
    name: 'Lakmé 9to5 Primer + Matte Foundation',
    description: 'Lakmé 9to5 primer and matte foundation with SPF 20. Covers blemishes for a smooth, natural-matte finish that lasts 16 hours. Oil-free, non-comedogenic formula. Available in 10 shades.',
    price: 549, originalPrice: 699, discount: 21,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    brand: 'Lakmé', stock: 90, rating: 4.2, numReviews: 1102, featured: false,
  },
  {
    name: 'The Ordinary Complete Skincare Routine Set',
    description: 'Complete 4-step skincare routine: Hyaluronic Acid 2% + B5 (hydration), Niacinamide 10% + Zinc 1% (pores & blemishes), AHA 30% + BHA 2% Peeling Solution (exfoliation), Moisturizing Factors (barrier support). 100% vegan.',
    price: 3499, originalPrice: 4999, discount: 30,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop',
    brand: 'The Ordinary', stock: 40, rating: 4.7, numReviews: 445, featured: true,
  },
  {
    name: 'Himalaya Purifying Neem Face Wash',
    description: 'Himalaya Purifying Neem Face Wash removes dirt, impurities, and excess oil without stripping skin of natural moisture. With neem and turmeric extracts. Soap-free, paraben-free. 200ml.',
    price: 199, originalPrice: 280, discount: 29,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    brand: 'Himalaya', stock: 150, rating: 4.4, numReviews: 2103, featured: false,
  },

  // ═══════════════════════════════════════
  //  BOOKS
  // ═══════════════════════════════════════
  {
    name: 'Atomic Habits by James Clear',
    description: "The #1 New York Times bestseller. James Clear's groundbreaking book on how tiny 1% improvements compound into remarkable results. The most comprehensive guide to building good habits and breaking bad ones ever written.",
    price: 399, originalPrice: 599, discount: 33,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
    brand: 'Penguin Random House', stock: 200, rating: 4.9, numReviews: 3456, featured: true,
  },
  {
    name: 'Rich Dad Poor Dad by Robert Kiyosaki',
    description: "Robert Kiyosaki's #1 personal finance book of all time. Challenges the myth that you need to earn a high income to be rich. Teaches financial literacy, investing, and building assets that generate passive income.",
    price: 299, originalPrice: 450, discount: 34,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=400&fit=crop',
    brand: 'Plata Publishing', stock: 150, rating: 4.7, numReviews: 2891, featured: false,
  },
  {
    name: 'The Psychology of Money by Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness. 19 short stories exploring the strange ways people think about money. A must-read for anyone looking to understand financial behaviour and make better money decisions.',
    price: 349, originalPrice: 499, discount: 30,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop',
    brand: 'Jaico Publishing', stock: 180, rating: 4.8, numReviews: 1987, featured: true,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await User.deleteMany();
    await Product.deleteMany();
    console.log('🗑️  Cleared existing data');

    await User.create({ name: 'Admin User', email: 'admin@shopez.com', password: 'admin123', isAdmin: true });
    await User.create({ name: 'John Doe', email: 'user@shopez.com', password: 'user123', isAdmin: false });
    console.log('👤 Users created');

    await Product.insertMany(products);
    console.log(`📦 ${products.length} Products seeded successfully`);

    console.log('\n✅ Database seeded!');
    console.log('📧 Admin: admin@shopez.com / admin123');
    console.log('📧 User:  user@shopez.com  / user123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
