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
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String, enum: ['trending', 'new', 'bestseller'] }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const menImgs = [
  "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=600", // Shirt
  "https://images.unsplash.com/photo-1624378439575-d1ead6bb0446?w=600", // Trousers
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600", // Hoodie
  "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600", // Pants
  "https://images.unsplash.com/photo-1507680434267-3256ba765f8e?w=600"
];

const womenImgs = [
  "https://images.unsplash.com/photo-1610189013629-23c21a1ec098?w=600", // Saree style
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600", // Frock
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", // Top
  "https://images.unsplash.com/photo-1509631179647-0c115c3f17f5?w=600", // Leggings/Jeans
  "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600"
];

const kidsImgs = [
  "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600",
  "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600",
  "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600",
  "https://images.unsplash.com/photo-1519238396593-199676770fcc?w=600",
  "https://images.unsplash.com/photo-1471286174890-9c112fc3eb43?w=600"
];

const menNames = ['Classic Oxford Shirt', 'Slim Fit Chino Trousers', 'Premium Cotton Hoodie', 'Formal Business Pants', 'Casual Graphic Tee', 'Winter Puffer Jacket'];
const womenNames = ['Traditional Silk Saree', 'Floral Summer Frock', 'Georgette Ruffle Top', 'Stretchable Active Leggings', 'Embroidered Kurti', 'Elegant Evening Gown'];
const kidsNames = ['Playful Dinosaur Tees', 'Cute Party Dress', 'Comfortable Denim Jeans', 'Warm Winter Sweater', 'Active Wear Set'];

const generatePrice = (min, max) => Math.floor(Math.random() * (max - min) + min) * 100 - 1;
const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const newProducts = [];

// Generate 30 Men
for(let i=1; i<=30; i++) {
  const p = generatePrice(15, 40);
  const dp = Math.random() > 0.4 ? generatePrice(45, 80) : p;
  const isTrending = Math.random() > 0.7;
  const isNew = Math.random() > 0.5;

  let tags = [];
  if(isTrending) tags.push("trending");
  if(isNew) tags.push("new");

  newProducts.push({
    name: `${getRand(menNames)} - Edition ${i}`,
    brand: Math.random() > 0.5 ? "AURA ORIGINALS" : "THREADHAUS CO.",
    category: "men",
    description: "Built for comfort and lasting style.",
    price: p,
    originalPrice: dp,
    discount: dp > p ? Math.round(((dp - p)/dp)*100) : 0,
    images: [getRand(menImgs)],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black", "Grey"],
    stock: generatePrice(1, 4),
    rating: (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1),
    reviewCount: Math.floor(Math.random() * 300),
    tags
  });
}

// Generate 30 Women
for(let i=1; i<=30; i++) {
  const p = generatePrice(25, 80);
  const dp = Math.random() > 0.3 ? generatePrice(90, 150) : p;
  
  let tags = [];
  if(Math.random() > 0.6) tags.push("trending");
  if(Math.random() > 0.5) tags.push("new");

  newProducts.push({
    name: `${getRand(womenNames)} - Edition ${i}`,
    brand: "AURA LUXE",
    category: "women",
    description: "Graceful and elegant fashion for every occasion.",
    price: p,
    originalPrice: dp,
    discount: dp > p ? Math.round(((dp - p)/dp)*100) : 0,
    images: [getRand(womenImgs)],
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rose", "Midnight", "Olive"],
    stock: generatePrice(2, 5),
    rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1),
    reviewCount: Math.floor(Math.random() * 500),
    tags
  });
}

// Generate 30 Kids
for(let i=1; i<=30; i++) {
  const p = generatePrice(8, 25);
  const dp = Math.random() > 0.5 ? generatePrice(30, 50) : p;

  let tags = ["new"];
  if(Math.random() > 0.8) tags.push("bestseller");

  newProducts.push({
    name: `${getRand(kidsNames)} - Series ${i}`,
    brand: "AURA KIDS",
    category: "kids",
    description: "Comfortable and colorful everyday wear.",
    price: p,
    originalPrice: dp,
    discount: dp > p ? Math.round(((dp - p)/dp)*100) : 0,
    images: [getRand(kidsImgs)],
    sizes: ["S", "M", "L"],
    colors: ["Yellow", "Blue"],
    stock: generatePrice(5, 10),
    rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1),
    reviewCount: Math.floor(Math.random() * 150),
    tags
  });
}

async function run() {
    try {
        await mongoose.connect('mongodb://localhost:27017/threadhaus');
        await Product.deleteMany({});
        await Product.insertMany(newProducts);
        console.log(`✅ Seeded ${newProducts.length} items (30 Men, 30 Women, 30 Kids).`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
run();
