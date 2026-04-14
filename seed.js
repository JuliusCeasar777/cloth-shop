const mongoose = require('mongoose');
require('dotenv').config();

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
  stock: { type: Number, default: 100 },
  material: { type: String, default: 'Premium Cotton Blend' },
  fit: { type: String, default: 'Regular Fit' },
  rating: { type: Number, default: 4.0 },
  reviewCount: { type: Number, default: 0 },
  tags: [{ type: String, enum: ['trending', 'new', 'bestseller'] }],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const BRANDS = ['Zara', 'H&M', 'Levi\'s', 'Nike', 'Adidas', 'Puma', 'FabIndia', 'Mango', 'Allen Solly', 'US Polo'];
const COLORS = ['Black', 'White', 'Navy', 'Red', 'Green', 'Beige', 'Grey', 'Yellow'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const MATERIALS = ['100% Cotton', 'Premium Cotton Blend', 'Silk & Viscose', 'Lycra Stretch', 'Organic Linen', 'Denim Wash', 'Spandex Blend'];
const FITS = ['Regular Fit', 'Slim Fit', 'Oversized', 'Tailored Fit', 'Relaxed Fit'];

const CATEGORIES = ['men', 'women', 'kids'];

const ADJECTIVES = ['Premium', 'Classic', 'Modern', 'Essential', 'Vintage', 'Urban', 'Casual', 'Signature', 'Tailored', 'Comfort'];
const NOUNS_MEN = ['Shirt', 'T-Shirt', 'Pant', 'Trouser', 'Lungi'];
const NOUNS_WOMEN = ['Frock', 'Chudithar', 'Saree', 'Kurti', 'Lehenga'];
const NOUNS_KIDS = ['T-Shirt', 'Shorts', 'Frock', 'Romper', 'Pants'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomItems(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generateProducts() {
    const products = [];
    
    for (let c = 0; c < CATEGORIES.length; c++) {
        const category = CATEGORIES[c];
        const nouns = category === 'men' ? NOUNS_MEN : category === 'women' ? NOUNS_WOMEN : NOUNS_KIDS;
        for (let i = 0; i < 100; i++) {
            const originalPrice = getRandomInt(1000, 6000);
            const discount = getRandomInt(10, 75);
            const price = Math.floor(originalPrice * (1 - discount / 100));
            const name = `${ADJECTIVES[getRandomInt(0, ADJECTIVES.length - 1)]} ${nouns[getRandomInt(0, nouns.length - 1)]}`;
            let catTag = category === 'men' ? 'mens,clothing' : category === 'women' ? 'womens,clothing' : 'kids,clothing';
            const finalImage = `https://loremflickr.com/600/800/${catTag}?lock=${i+c*100}`;
            const secondaryImage = `https://loremflickr.com/600/800/${catTag}?lock=${i+c*100+1000}`;

            products.push({
                name,
                brand: BRANDS[getRandomInt(0, BRANDS.length - 1)],
                category,
                description: `Elevate your style with this ${name}. Featuring a comfortable fit and premium materials, it's perfect for any occasion. Designed for those who value both aesthetics and functionality.`,
                price,
                originalPrice,
                discount,
                images: [finalImage, secondaryImage],
                sizes: getRandomItems(SIZES, getRandomInt(3, 5)),
                colors: getRandomItems(COLORS, getRandomInt(2, 4)),
                material: MATERIALS[getRandomInt(0, MATERIALS.length - 1)],
                fit: FITS[getRandomInt(0, FITS.length - 1)],
                stock: getRandomInt(20, 200),
                rating: +(Math.random() * 1.5 + 3.5).toFixed(1),
                reviewCount: getRandomInt(10, 1000),
                tags: getRandomItems(['trending', 'new', 'bestseller'], getRandomInt(1, 3)),
                isActive: true
            });
        }
    }
    return products;
}

async function runSeed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/threadhaus');
        console.log('✅ Connected to MongoDB');
        await Product.deleteMany({});
        const products = generateProducts();
        await Product.insertMany(products);
        console.log('🎉 Successfully seeded 150 products!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

runSeed();
