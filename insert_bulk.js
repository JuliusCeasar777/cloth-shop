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
  material: { type: String, default: 'Premium Cotton Blend' },
  fit: { type: String, default: 'Regular Fit' },
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String, enum: ['trending', 'new', 'bestseller'] }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const newProducts = [
  // MEN
  {
    name: "Classic Silk Lungi",
    brand: "Aura Exclusives",
    category: "men",
    description: "Premium handwoven silk lungi with gold border detailing.",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: ["https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=600&auto=format&fit=crop&q=80"],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["White", "Gold"],
    material: "100% Pure Silk",
    fit: "Relaxed Fit",
    tags: ["trending", "bestseller"],
    rating: 4.9,
    reviewCount: 342,
    stock: 50
  },
  {
    name: "Midnight Linen Shirt",
    brand: "Allen Solly",
    category: "men",
    description: "Breathable pure linen shirt tailored for a sophisticated evening look.",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Black"],
    material: "Organic Linen",
    fit: "Slim Fit",
    tags: ["new"],
    rating: 4.6,
    reviewCount: 120,
    stock: 80
  },
  {
    name: "Royal Velvet Kurta",
    brand: "FabIndia",
    category: "men",
    description: "Intricately embroidered velvet kurta set for grand festivities.",
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    images: ["https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=600&auto=format&fit=crop&q=80"],
    sizes: ["M", "L", "XL"],
    colors: ["Red", "Maroon"],
    material: "Premium Velvet",
    fit: "Tailored Fit",
    tags: ["trending"],
    rating: 4.8,
    reviewCount: 85,
    stock: 30
  },
  {
    name: "Urban Denim Jacket",
    brand: "Levi's",
    category: "men",
    description: "Classic light wash denim jacket with silver hardware.",
    price: 3299,
    originalPrice: 4299,
    discount: 23,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80"],
    sizes: ["M", "L", "XL"],
    colors: ["Blue"],
    material: "Denim Wash",
    fit: "Regular Fit",
    tags: ["bestseller"],
    rating: 4.7,
    reviewCount: 540,
    stock: 120
  },
  {
    name: "Tailored Trousers",
    brand: "Zara",
    category: "men",
    description: "Versatile tailored trousers suitable for both office and casual wear.",
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    images: ["https://images.unsplash.com/photo-1624378439575-d1ead6bb0446?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Grey", "Black"],
    material: "Spandex Blend",
    fit: "Slim Fit",
    tags: ["new"],
    rating: 4.5,
    reviewCount: 200,
    stock: 100
  },

  // WOMEN
  {
    name: "Banarasi Silk Saree",
    brand: "Aura Exclusives",
    category: "women",
    description: "Authentic Banarasi silk saree featuring heavy zari work and a luxurious drape.",
    price: 8999,
    originalPrice: 12999,
    discount: 30,
    images: ["https://images.unsplash.com/photo-1610189013629-23c21a1ec098?w=600&auto=format&fit=crop&q=80"],
    sizes: [], // Sarees rarely have typical sizes
    colors: ["Green", "Gold"],
    material: "Pure Banarasi Silk",
    fit: "Regular Fit",
    tags: ["trending", "bestseller"],
    rating: 5.0,
    reviewCount: 154,
    stock: 25
  },
  {
    name: "Embroidered Chudithar Set",
    brand: "FabIndia",
    category: "women",
    description: "Elegant 3-piece chudithar set with intricate threadwork and matching dupatta.",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Yellow"],
    material: "Premium Cotton Blend",
    fit: "Regular Fit",
    tags: ["new"],
    rating: 4.8,
    reviewCount: 310,
    stock: 60
  },
  {
    name: "Pastel Flora Kurti",
    brand: "Mango",
    category: "women",
    description: "A breezy pastel kurti featuring delicate floral prints, perfect for summer.",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    images: ["https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&auto=format&fit=crop&q=80"],
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Pink"],
    material: "Organic Linen",
    fit: "Relaxed Fit",
    tags: ["trending"],
    rating: 4.6,
    reviewCount: 420,
    stock: 150
  },
  {
    name: "Crimson Evening Gown",
    brand: "Zara",
    category: "women",
    description: "Floor-length crimson gown with a plunging neckline and sweeping skirt.",
    price: 6499,
    originalPrice: 8999,
    discount: 27,
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L"],
    colors: ["Red"],
    material: "Silk & Viscose",
    fit: "Tailored Fit",
    tags: ["new", "trending"],
    rating: 4.9,
    reviewCount: 89,
    stock: 40
  },
  {
    name: "Classic Skinny Jeans",
    brand: "Levi's",
    category: "women",
    description: "High-waisted skinny jeans designed to contour and flatter.",
    price: 2799,
    originalPrice: 3599,
    discount: 22,
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    material: "Lycra Stretch",
    fit: "Slim Fit",
    tags: ["bestseller"],
    rating: 4.7,
    reviewCount: 850,
    stock: 200
  },

  // KIDS
  {
    name: "Sunny Romper",
    brand: "H&M",
    category: "kids",
    description: "Cheerful yellow romper with easy snap buttons for quick changes.",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    images: ["https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&auto=format&fit=crop&q=80"],
    sizes: ["XS", "S", "M"],
    colors: ["Yellow"],
    material: "100% Cotton",
    fit: "Relaxed Fit",
    tags: ["bestseller"],
    rating: 4.8,
    reviewCount: 220,
    stock: 90
  },
  {
    name: "Mini Explorer Jacket",
    brand: "Zara",
    category: "kids",
    description: "Durable denim jacket for little adventurers.",
    price: 1499,
    originalPrice: 2199,
    discount: 31,
    images: ["https://images.unsplash.com/photo-1471286174890-9c112fc3eb43?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L"],
    colors: ["Blue"],
    material: "Denim Wash",
    fit: "Regular Fit",
    tags: ["trending"],
    rating: 4.7,
    reviewCount: 150,
    stock: 65
  },
  {
    name: "Festive Frock",
    brand: "Aura Exclusives",
    category: "kids",
    description: "Twirl-worthy frock with delicate tulle and sequins for special days.",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&auto=format&fit=crop&q=80"],
    sizes: ["XS", "S", "M"],
    colors: ["Pink", "White"],
    material: "Silk & Viscose",
    fit: "Regular Fit",
    tags: ["new"],
    rating: 4.9,
    reviewCount: 95,
    stock: 80
  },
  {
    name: "Playtime Graphic Tee",
    brand: "Puma",
    category: "kids",
    description: "Soft cotton tee with vibrant prints for all-day play.",
    price: 599,
    originalPrice: 999,
    discount: 40,
    images: ["https://images.unsplash.com/photo-1519238396593-199676770fcc?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Red"],
    material: "100% Cotton",
    fit: "Regular Fit",
    tags: ["bestseller"],
    rating: 4.5,
    reviewCount: 300,
    stock: 150
  },
  {
    name: "Cozy Winter Sweats",
    brand: "Adidas",
    category: "kids",
    description: "Fleece-lined sweatpants keeping them warm during chilly outdoor activities.",
    price: 1199,
    originalPrice: 1799,
    discount: 33,
    images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&auto=format&fit=crop&q=80"],
    sizes: ["S", "M", "L"],
    colors: ["Grey", "Navy"],
    material: "Premium Cotton Blend",
    fit: "Relaxed Fit",
    tags: ["trending"],
    rating: 4.6,
    reviewCount: 180,
    stock: 100
  }
];

async function addProducts() {
    try {
        await mongoose.connect('mongodb://localhost:27017/threadhaus');
        console.log('Connected to DB. Inserting new premium products...');
        
        await Product.deleteMany({});
        console.log('Cleared old products.');
        
        await Product.insertMany(newProducts);
        
        console.log(`Successfully inserted ${newProducts.length} custom products!`);
        process.exit(0);
    } catch (error) {
        console.error('Error inserting products:', error);
        process.exit(1);
    }
}
addProducts();
