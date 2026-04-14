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

async function addProducts() {
    await mongoose.connect('mongodb://localhost:27017/threadhaus');
    const newProducts = [
        {
            name: "Aura Signature Lungi",
            brand: "Aura Exclusives",
            category: "men",
            description: "A premium soft cotton lungi designed for ultimate comfort and cultural elegance.",
            price: 1999,
            originalPrice: 2499,
            discount: 20,
            images: ["https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600"],
            sizes: ["M", "L", "XL"],
            colors: ["White", "Navy"],
            material: "100% Pure Cotton",
            fit: "Relaxed Fit",
            tags: ["new", "trending", "bestseller"],
            rating: 4.9,
            reviewCount: 42
        },
        {
            name: "Velvet Chudithar Elite",
            brand: "Aura Exclusives",
            category: "women",
            description: "Stunning handcrafted velvet chudithar offering a deeply regal look for special occasions.",
            price: 4999,
            originalPrice: 6999,
            discount: 28,
            images: ["https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600"],
            sizes: ["S", "M", "L"],
            colors: ["Black", "Red"],
            material: "Premium Velvet",
            fit: "Tailored Fit",
            tags: ["new", "trending", "bestseller"],
            rating: 5.0,
            reviewCount: 115
        },
        {
            name: "Spring Bloom Frock",
            brand: "Aura Exclusives",
            category: "kids",
            description: "An adorable, ultra-soft frock designed for active kids who want to look fashionable.",
            price: 1299,
            originalPrice: 1599,
            discount: 18,
            images: ["https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg?auto=compress&cs=tinysrgb&w=600"],
            sizes: ["XS", "S", "M"],
            colors: ["Yellow", "White"],
            material: "Organic Linen",
            fit: "Regular Fit",
            tags: ["new", "trending"],
            rating: 4.8,
            reviewCount: 60
        }
    ];

    await Product.insertMany(newProducts);
    console.log('Inserted custom elite products!');
    process.exit(0);
}
addProducts();
