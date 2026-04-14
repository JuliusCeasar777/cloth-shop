const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, enum: ['men', 'women', 'kids'], required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [String],
  sizes: [{ type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }],
  colors: [String],
  stock: { type: Number, default: 100 },
  material: { type: String, default: 'Premium Material' },
  fit: { type: String, default: 'Tailored Fit' },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String, enum: ['trending', 'new', 'bestseller'] }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const menImgs = [
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
  "https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=600&q=80",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
  "https://images.unsplash.com/photo-1624378439575-d1ead6bb0446?w=600&q=80",
  "https://images.unsplash.com/photo-1594938298596-1216093df90f?w=600&q=80",
  "https://images.unsplash.com/photo-1507680434267-3256ba765f8e?w=600&q=80"
];

const womenImgs = [
  "https://images.unsplash.com/photo-1610189013629-23c21a1ec098?w=600&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
  "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&q=80",
  "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80"
];

const kidsImgs = [
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80",
  "https://images.unsplash.com/photo-1471286174890-9c112fc3eb43?w=600&q=80",
  "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
  "https://images.unsplash.com/photo-1519238396593-199676770fcc?w=600&q=80",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80"
];

const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generatePrice = (min, max) => Math.floor(Math.random() * (max - min) + min) * 100 - 1;

const newProducts = [];

for(let i=1; i<=20; i++) {
  const p = generatePrice(15, 60);
  const dp = generatePrice(25, 90);
  newProducts.push({
    name: `Premium Men's Collection Item ${i}`,
    brand: "AURA LUXE",
    category: "men",
    description: "Handcrafted style. Elegance in every thread.",
    price: p,
    originalPrice: dp > p ? dp : p + 1000,
    discount: Math.round(((dp - p)/dp)*100) > 0 ? 30 : 0,
    images: [menImgs[i % menImgs.length]],
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Midnight"],
    stock: 50,
    rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
    reviewCount: Math.floor(Math.random() * 500),
    tags: i < 5 ? ["bestseller"] : ["new"]
  });
}

for(let i=1; i<=20; i++) {
  const p = generatePrice(25, 120);
  const dp = generatePrice(40, 180);
  newProducts.push({
    name: `Luxury Women's Outfit ${i}`,
    brand: "AURA LUXE",
    category: "women",
    description: "Graceful and elegant fashion for every occasion.",
    price: p,
    originalPrice: dp > p ? dp : p + 2000,
    discount: Math.round(((dp - p)/dp)*100) > 0 ? 40 : 0,
    images: [womenImgs[i % womenImgs.length]],
    sizes: ["S", "M", "L"],
    colors: ["Red", "Maroon", "Gold"],
    stock: 100,
    rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 800),
    tags: i < 5 ? ["trending"] : []
  });
}

for(let i=1; i<=20; i++) {
  const p = generatePrice(8, 25);
  const dp = generatePrice(15, 40);
  newProducts.push({
    name: `Kids Festive Joy Suit ${i}`,
    brand: "AURA KIDS",
    category: "kids",
    description: "Comfortable and colorful.",
    price: p,
    originalPrice: dp > p ? dp : p + 500,
    discount: 0,
    images: [kidsImgs[i % kidsImgs.length]],
    sizes: ["XS", "S", "M"],
    colors: ["Yellow", "Pink"],
    stock: 200,
    rating: 4.8,
    reviewCount: 200,
    tags: ["bestseller"]
  });
}

async function addProducts() {
    try {
        await mongoose.connect('mongodb://localhost:27017/threadhaus');
        console.log('Connected to DB...');
        await Product.deleteMany({});
        console.log('Cleared database.');
        await Product.insertMany(newProducts);
        console.log(`Successfully seeded ${newProducts.length} Premium products!`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}
addProducts();
