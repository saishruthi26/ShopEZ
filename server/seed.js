const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [
  { name: 'iPhone 15 Pro', description: 'Experience Apple Intelligence with the iPhone 15 Pro. Features a titanium design, 48MP camera system, and A17 Pro chip for unmatched performance. With ProMotion display and up to 29 hours battery life.', price: 127900, originalPrice: 134900, discount: 5, category: 'Electronics', image: 'https://picsum.photos/seed/iphone15/400/400', brand: 'Apple', stock: 15, rating: 4.8, numReviews: 245, featured: true },
  { name: 'Samsung Galaxy S24 Ultra', description: 'The ultimate Galaxy experience. Built-in S Pen, 200MP camera, 5000mAh battery and Galaxy AI features that transform how you work and create.', price: 89999, originalPrice: 99999, discount: 10, category: 'Electronics', image: 'https://picsum.photos/seed/samsung24/400/400', brand: 'Samsung', stock: 20, rating: 4.7, numReviews: 189, featured: true },
  { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise canceling with Dual Noise Sensor technology. 30-hour battery life, lightweight design, and exceptional sound quality with LDAC support.', price: 25490, originalPrice: 29990, discount: 15, category: 'Electronics', image: 'https://picsum.photos/seed/sonywh1000/400/400', brand: 'Sony', stock: 30, rating: 4.9, numReviews: 312, featured: true },
  { name: 'Apple MacBook Air M3', description: 'Supercharged by M3 chip. Strikingly thin design with 18-hour battery life, 15.3-inch Liquid Retina display, and MagSafe charging.', price: 114900, originalPrice: 124900, discount: 8, category: 'Electronics', image: 'https://picsum.photos/seed/macbookm3/400/400', brand: 'Apple', stock: 10, rating: 4.9, numReviews: 178, featured: true },
  { name: 'OnePlus 12', description: 'Flagship performance meets elegant design. Snapdragon 8 Gen 3, Hasselblad camera system, 100W SUPERVOOC charging and 6.82-inch ProXDR display.', price: 64999, originalPrice: 69999, discount: 7, category: 'Electronics', image: 'https://picsum.photos/seed/oneplus12/400/400', brand: 'OnePlus', stock: 25, rating: 4.6, numReviews: 134, featured: false },
  { name: 'Boat Airdopes 141', description: 'True wireless earbuds with 42 hours total playback, ENx Technology for clear calls, BEAST Mode for gaming, and IPX4 water resistance.', price: 1299, originalPrice: 2990, discount: 57, category: 'Electronics', image: 'https://picsum.photos/seed/boatairdopes/400/400', brand: 'Boat', stock: 50, rating: 4.2, numReviews: 892, featured: false },
  { name: "Men's Premium Polo T-Shirt", description: "Crafted from 100% pima cotton with a comfortable regular fit. Available in multiple colors. Perfect for casual outings and semi-formal settings.", price: 899, originalPrice: 1499, discount: 40, category: 'Fashion', image: 'https://picsum.photos/seed/menspolo/400/400', brand: 'Allen Solly', stock: 100, rating: 4.3, numReviews: 456, featured: true },
  { name: "Women's Floral Wrap Dress", description: "Elegant floral print wrap dress with adjustable tie waist. Lightweight fabric ideal for summer. Available in S, M, L, XL sizes.", price: 1799, originalPrice: 2999, discount: 40, category: 'Fashion', image: 'https://picsum.photos/seed/womensdress/400/400', brand: 'W', stock: 60, rating: 4.5, numReviews: 267, featured: true },
  { name: 'Nike Air Max 270', description: "Nike's first lifestyle Air Max unit offers an ultra-soft ride all day long. The large Max Air unit delivers unparalleled comfort with a modern look.", price: 8995, originalPrice: 10995, discount: 18, category: 'Fashion', image: 'https://picsum.photos/seed/nikeairmax/400/400', brand: 'Nike', stock: 40, rating: 4.7, numReviews: 523, featured: true },
  { name: 'Leather Tote Bag', description: 'Premium genuine leather tote bag with multiple compartments. Magnetic snap closure, padded handles, and detachable shoulder strap. Ideal for office and travel.', price: 3499, originalPrice: 5999, discount: 42, category: 'Fashion', image: 'https://picsum.photos/seed/totebag/400/400', brand: 'Caprese', stock: 35, rating: 4.4, numReviews: 198, featured: false },
  { name: 'Aviator Sunglasses', description: 'Classic aviator style with UV400 protection. Lightweight metal frame, polarized lenses, and scratch-resistant coating. Suitable for all face shapes.', price: 1299, originalPrice: 2499, discount: 48, category: 'Fashion', image: 'https://picsum.photos/seed/aviator/400/400', brand: 'Ray-Ban', stock: 45, rating: 4.6, numReviews: 334, featured: false },
  { name: 'Instant Pot Duo 7-in-1', description: 'Replaces 7 kitchen appliances: pressure cooker, slow cooker, rice cooker, steamer, saute pan, yogurt maker, and warmer. 6-quart capacity with 13 programs.', price: 6499, originalPrice: 8999, discount: 28, category: 'Home & Kitchen', image: 'https://picsum.photos/seed/instantpot/400/400', brand: 'Instant Pot', stock: 22, rating: 4.8, numReviews: 1204, featured: true },
  { name: 'Philips Digital Air Fryer', description: 'Cook your favorite fried foods with up to 90% less fat. 4.1L capacity, rapid air technology, digital touchscreen, and 7 preset programs.', price: 5999, originalPrice: 7499, discount: 20, category: 'Home & Kitchen', image: 'https://picsum.photos/seed/airfryer/400/400', brand: 'Philips', stock: 18, rating: 4.6, numReviews: 678, featured: false },
  { name: 'Wooden Study Desk', description: 'Premium engineered wood desk with cable management, storage drawer, and monitor shelf. Easy assembly. Dimensions: 120cm x 60cm x 75cm.', price: 8999, originalPrice: 12999, discount: 31, category: 'Home & Kitchen', image: 'https://picsum.photos/seed/wooddesk/400/400', brand: 'Wakefit', stock: 12, rating: 4.4, numReviews: 234, featured: false },
  { name: 'Smart LED Desk Lamp', description: 'USB-C charging port, 5 brightness levels, 4 color modes, touch control, and auto-dim feature. Eye-caring technology reduces flicker and blue light.', price: 1999, originalPrice: 3499, discount: 43, category: 'Home & Kitchen', image: 'https://picsum.photos/seed/desklamp/400/400', brand: 'Syska', stock: 55, rating: 4.3, numReviews: 445, featured: false },
  { name: 'Premium Yoga Mat', description: 'Extra-thick 6mm NBR foam mat with non-slip surface, alignment lines, and carry strap. 183cm x 61cm. Suitable for yoga, pilates, and floor exercises.', price: 1299, originalPrice: 1999, discount: 35, category: 'Sports', image: 'https://picsum.photos/seed/yogamat/400/400', brand: 'Boldfit', stock: 80, rating: 4.5, numReviews: 567, featured: false },
  { name: 'Resistance Bands Set (5-Pack)', description: 'Professional quality latex resistance bands in 5 resistance levels. Includes carrying bag, door anchor, and ankle straps. Suitable for all fitness levels.', price: 799, originalPrice: 1499, discount: 47, category: 'Sports', image: 'https://picsum.photos/seed/resistancebands/400/400', brand: 'Boldfit', stock: 120, rating: 4.4, numReviews: 789, featured: false },
  { name: 'MyProtein Impact Whey Protein', description: '25g protein per serving, 5g BCAAs, available in 30+ flavors. Chocolate Smooth flavor. 1kg pack providing 40 servings. NSF certified.', price: 2999, originalPrice: 3799, discount: 21, category: 'Sports', image: 'https://picsum.photos/seed/protein/400/400', brand: 'MyProtein', stock: 65, rating: 4.6, numReviews: 934, featured: false },
  { name: 'Lakme Absolute Skin Natural Mousse', description: 'Lightweight mousse foundation with SPF 8 protection. Gives a natural matte finish that lasts 12 hours. Available in 9 shades. Dermatologically tested.', price: 549, originalPrice: 699, discount: 21, category: 'Beauty', image: 'https://picsum.photos/seed/foundation/400/400', brand: 'Lakmé', stock: 90, rating: 4.2, numReviews: 1102, featured: false },
  { name: 'The Ordinary Skincare Set', description: 'Complete routine set including Hyaluronic Acid 2% + B5, Niacinamide 10% + Zinc 1%, AHA 30% + BHA 2% Peeling Solution, and Moisturizing Factors. Vegan formula.', price: 3499, originalPrice: 4999, discount: 30, category: 'Beauty', image: 'https://picsum.photos/seed/skincareset/400/400', brand: 'The Ordinary', stock: 40, rating: 4.7, numReviews: 445, featured: true },
  { name: 'Atomic Habits - James Clear', description: 'The #1 New York Times bestseller. Learn how tiny changes in behavior can lead to remarkable results. Practical framework for building good habits and breaking bad ones.', price: 399, originalPrice: 599, discount: 33, category: 'Books', image: 'https://picsum.photos/seed/atomichabits/400/400', brand: 'Penguin Books', stock: 200, rating: 4.9, numReviews: 3456, featured: true },
  { name: 'Rich Dad Poor Dad', description: 'Robert Kiyosaki shares the story of his two dads and the ways in which both men shaped his thoughts about money and investing. A global bestseller on financial literacy.', price: 299, originalPrice: 450, discount: 34, category: 'Books', image: 'https://picsum.photos/seed/richdad/400/400', brand: 'Warner Books', stock: 150, rating: 4.7, numReviews: 2891, featured: false },
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
    console.log(`📦 ${products.length} Products seeded`);

    console.log('\n✅ Database seeded successfully!');
    console.log('📧 Admin: admin@shopez.com / admin123');
    console.log('📧 User:  user@shopez.com  / user123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
