import re

with open("d:/cloth shop/index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Colors & Typograhpy
old_root = re.search(r':root\s*\{.*?\}(?=\s*\*\{)', html, re.DOTALL)
new_root = """
:root {
  --primary: #800020;      /* Royal Maroon / Deep Red */
  --primary-light: #C41E3A; /* Bright Red */
  --gold: #FFD700;         /* Premium Gold */
  --gold-dark: #ccad00;
  --pink: #FF1493;         /* Bright Pink */
  --teal: #008080;         /* Deep Teal */
  --ink: #111111;
  --text-soft: #555555;
  --cream: #FFFDD0;
  --warm: #FAF9F6;         /* Off white */
  --border: #EAEAEA;
  --card: #FFFFFF;
  --shadow: 0 8px 30px rgba(0,0,0,0.08);
  --shadow-hover: 0 12px 40px rgba(0,0,0,0.15);
  --radius: 12px;
  --radius-lg: 20px;
}
"""
if old_root:
    html = html.replace(old_root.group(0), new_root.strip())

# 2. Advanced CSS Styles
advanced_css = """
/* ANIMATIONS */
@keyframes fadeIn { from{opacity:0;} to{opacity:1;} }
@keyframes slideUp { from{transform:translateY(30px);opacity:0;} to{transform:translateY(0);opacity:1;} }
.fade-in { animation: fadeIn 0.8s ease-out; }
.slide-up { animation: slideUp 0.8s ease-out forwards; }

body { background: var(--warm); font-family: 'Jost', sans-serif; color: var(--ink); }

/* HEADER / NAV */
nav { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 1000; border-bottom: 1px solid var(--border); transition: all 0.3s; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.nav-inner { max-width: 1440px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; }
.logo { font-size: 28px; font-weight: 900; color: var(--primary); letter-spacing: 2px; text-transform: uppercase; cursor: pointer; }
.logo span { color: var(--gold); }
.nav-menu { display: flex; gap: 32px; align-items: center; }
.nav-link { background: none; border: none; font-size: 14px; font-weight: 600; color: var(--ink); text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: color 0.3s; position: relative; }
.nav-link:hover, .nav-link.active { color: var(--primary); }
.nav-link::after { content: ''; position: absolute; left: 0; bottom: -4px; width: 0; height: 2px; background: var(--primary); transition: width 0.3s; }
.nav-link:hover::after, .nav-link.active::after { width: 100%; }
.nav-icons { display: flex; gap: 20px; align-items: center; }
.nav-icon-btn { font-size: 20px; color: var(--ink); background: none; border: none; cursor: pointer; transition: color 0.3s; position: relative; }
.nav-icon-btn:hover { color: var(--primary); }

/* HERO CAROUSEL */
.hero-slider { position: relative; width: 100%; height: 80vh; min-height: 500px; overflow: hidden; background: #000; }
.hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 1s ease-in-out; display:flex; align-items:center; justify-content:center; text-align:center; padding: 40px; background-size: cover; background-position: center; }
.hero-slide.active { opacity: 1; z-index: 2; }
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)); z-index: 1; }
.hero-content-inner { position: relative; z-index: 3; color: #fff; max-width: 800px; opacity: 0; transform: translateY(20px); transition: all 0.8s ease 0.3s; }
.hero-slide.active .hero-content-inner { opacity: 1; transform: translateY(0); }
.hero-subtitle { font-size: 16px; font-weight: 700; letter-spacing: 4px; color: var(--gold); text-transform: uppercase; margin-bottom: 16px; }
.hero-title { font-size: clamp(40px, 5vw, 70px); font-weight: 900; line-height: 1.1; margin-bottom: 24px; text-shadow: 0 4px 12px rgba(0,0,0,0.3); }
.hero-actions { display: flex; gap: 16px; justify-content: center; margin-top: 32px; }
.btn-gold { background: var(--gold); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s, background 0.3s; border: none; cursor: pointer; }
.btn-gold:hover { background: var(--gold-dark); transform: translateY(-2px); }
.btn-primary { background: var(--primary); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; transition: transform 0.2s; border: none; cursor: pointer; }
.btn-primary:hover { background: var(--primary-light); transform: translateY(-2px); }

/* CATEGORY CARDS */
.section-title { text-align: center; font-size: 32px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 40px; color: var(--ink); }
.section-title span { color: var(--primary); }
.cat-wrapper { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1440px; margin: 60px auto; padding: 0 40px; }
.cat-box { position: relative; height: 400px; border-radius: var(--radius); overflow: hidden; cursor: pointer; box-shadow: var(--shadow); }
.cat-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; }
.cat-box:hover img { transform: scale(1.1); }
.cat-layer { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); display: flex; flex-direction: column; justify-content: flex-end; padding: 32px; }
.cat-box-title { color: #fff; font-size: 28px; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
.cat-box-link { color: var(--gold); font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; opacity: 0; transform: translateY(10px); transition: all 0.3s; }
.cat-box:hover .cat-box-link { opacity: 1; transform: translateY(0); }

/* HORIZONTAL SCROLLING ROW */
.scroll-track { display: flex; gap: 24px; overflow-x: auto; padding: 10px 40px 40px; scroll-snap-type: x mandatory; max-width: 1440px; margin: 0 auto; -ms-overflow-style: none; scrollbar-width: none; }
.scroll-track::-webkit-scrollbar { display: none; }
.scroll-track > * { min-width: 300px; scroll-snap-align: start; }

/* PRODUCT CARDS */
.prod-card { background: var(--card); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow); transition: var(--shadow-hover); position: relative; }
.prod-card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); z-index:2; }
.prod-img-box { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.prod-img-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.prod-card:hover .prod-img-box img { transform: scale(1.08); }
.prod-badge { position: absolute; top: 12px; left: 12px; background: var(--primary); color: #fff; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; text-transform: uppercase; z-index: 2; }
.prod-hover-actions { position: absolute; bottom: -50px; left: 0; right: 0; background: rgba(255,255,255,0.95); display: flex; padding: 10px; gap: 8px; transition: bottom 0.3s ease; backdrop-filter: blur(4px); z-index: 2; }
.prod-card:hover .prod-hover-actions { bottom: 0; }
.action-btn { flex: 1; background: var(--ink); color: #fff; border: none; padding: 12px; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 4px; text-transform: uppercase; transition: background 0.3s; }
.action-btn:hover { background: var(--primary); }
.action-icon { width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid var(--border); border-radius: 4px; color: var(--ink); cursor: pointer; transition: all 0.2s; }
.action-icon:hover { color: var(--primary); border-color: var(--primary); }
.action-icon.wishlisted { color: var(--primary); background: #ffeeeeee; border-color: var(--primary); }
.prod-info { padding: 20px; text-align: left; }
.prod-brand { font-size: 12px; font-weight: 700; color: var(--text-soft); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
.prod-title { font-size: 16px; font-weight: 600; color: var(--ink); margin-bottom: 8px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.prod-stars { color: var(--gold); font-size: 12px; margin-bottom: 12px; }
.prod-price-wrap { display: flex; align-items: baseline; gap: 10px; }
.prod-price { font-size: 18px; font-weight: 800; color: var(--primary); }
.prod-orig { font-size: 14px; text-decoration: line-through; color: var(--text-soft); }

/* PROMO BANNER */
.promo-strip { background: linear-gradient(135deg, var(--primary), var(--pink)); padding: 80px 40px; margin: 60px 0; text-align: center; color: #fff; border-radius: 0; box-shadow: inset 0 0 100px rgba(0,0,0,0.2); }
.promo-title { font-size: clamp(32px, 4vw, 56px); font-weight: 900; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; text-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.promo-sub { font-size: 20px; font-weight: 400; margin-bottom: 30px; }

/* REVIEWS SLIDER */
.reviews-sec { background: var(--cream); padding: 80px 40px; text-align: center; }
.review-card { background: #fff; padding: 40px; border-radius: var(--radius-lg); box-shadow: var(--shadow); max-width: 600px; margin: 0 auto; }
.reviewer-img { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 0 auto 16px; border: 3px solid var(--gold); }
.review-text { font-size: 18px; font-style: italic; color: var(--text-soft); margin-bottom: 20px; line-height: 1.6; }
.reviewer-name { font-weight: 800; font-size: 16px; color: var(--ink); text-transform: uppercase; }

/* FEATURES GRID */
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1440px; margin: 60px auto; padding: 0 40px; }
.feat-box { text-align: center; background: #fff; padding: 40px 20px; border-radius: var(--radius); box-shadow: var(--shadow); transition: transform 0.3s; }
.feat-box:hover { transform: translateY(-10px); }
.feat-icon { font-size: 40px; color: var(--primary); margin-bottom: 20px; }
.feat-title { font-size: 16px; font-weight: 800; text-transform: uppercase; margin-bottom: 10px; }
.feat-desc { font-size: 14px; color: var(--text-soft); }

/* NEWSLETTER */
.newsletter-wrapper { background: var(--ink); padding: 80px 40px; text-align: center; color: #fff; }
.news-title { font-size: 32px; font-weight: 800; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px; }
.news-form { display: flex; max-width: 500px; margin: 40px auto 0; background: #fff; border-radius: 30px; overflow: hidden; padding: 4px; }
.news-input { flex: 1; border: none; padding: 16px 24px; font-size: 16px; font-family: 'Jost', sans-serif; outline: none; }
.news-btn { background: var(--primary); color: #fff; border: none; padding: 0 32px; font-weight: 700; border-radius: 26px; cursor: pointer; text-transform: uppercase; transition: background 0.3s; }

/* MOBILE RESPONSIVENESS */
@media (max-width: 1024px) {
  .cat-wrapper { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .nav-menu { display: none; } /* Hide for standard mobile, could add drawer */
  .hero-slider { height: 60vh; }
  .cat-wrapper { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .scroll-track { padding: 10px 20px 40px; }
  .scroll-track > * { min-width: 240px; }
  .promo-strip { padding: 60px 20px; }
}
"""
html = re.sub(r'/\*\s*── NAV ──\s*\*/.*?/\*\s*── BANNERS ──\s*\*/', advanced_css, html, flags=re.DOTALL)

# Let's fix fetch API definitions using simple replace loops
html = html.replace("fetch('/api/", "fetch('http://localhost:5000/api/")

with open("d:/cloth shop/index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("CSS injected and fetched updated!")
