const fs = require('fs');

const cssAdditions = `
    /* NEW PREMIUM ANIMATIONS */
    @keyframes kenburns {
      0% { transform: scale(1); }
      100% { transform: scale(1.15); }
    }
    
    .parallax-bg {
      background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }
    
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(40px);
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .reveal-on-scroll.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    /* Category Cards */
    .flex-gap-30 { display: flex; gap: 30px; }
    @media (max-width: 768px) {
      .flex-gap-30 { flex-direction: column; }
    }
    .cat-card { flex: 1; height: 500px; position: relative; overflow: hidden; border-radius: var(--radius); cursor: pointer; background: #111; }
    .cat-card-img { position: absolute; inset: 0; background-position: center; background-size: cover; transition: transform 0.6s, filter 0.6s; }
    .cat-card:hover .cat-card-img { transform: scale(1.08); filter: brightness(0.7); }
    .cat-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 40px; color: #fff; }
    .cat-card-overlay h3 { font-family: var(--font-brand); font-size: 2.5rem; margin-bottom: 10px; }
    .explore-cta { font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); opacity: 0; transform: translateY(10px); transition: 0.3s; }
    .cat-card:hover .explore-cta { opacity: 1; transform: translateY(0); }

    /* Marquee */
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .marquee-content { animation: marquee 25s linear infinite; display: inline-block; }

    /* Trending Collections */
    .trending-collection-card { position: relative; width: 320px; height: 450px; border-radius: var(--radius); overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
    .trending-collection-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .trending-collection-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-lg); }
    .trending-collection-card:hover img { transform: scale(1.05); }
    .tc-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 30px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); color: #fff; font-family: var(--font-brand); font-size: 1.5rem; font-weight: 700; text-align: center; }

    /* Customer Gallery */
    @keyframes scrollGallery { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes scrollGalleryReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }

    /* Responsive adjustments */
    @media (max-width: 768px) {
       .header-inner { padding: 0 20px; }
       .nav-links { display: none; }
       .hero-h1 { font-size: 3rem; }
       .admin-modal { width: 95vw; }
       .admin-modal-body { flex-direction: column; }
       .admin-modal-body > div { width: 100% !important; border-bottom: 1px solid var(--border); }
    }
`;

const reactAdditions = `
      // useScrollReveal hook equiv
      useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('revealed');
            });
        }, { threshold: 0.1 });
        const targets = document.querySelectorAll('.reveal-on-scroll:not(.revealed)');
        targets.forEach(el => observer.observe(el));
        return () => observer.disconnect();
      });

      // --- NEW PREMIUM COMPONENTS ---
      const TopBar = () => (
        <div style={{background: 'var(--secondary)', color: '#fff', fontSize: '0.8rem', padding: '8px 40px', display: 'flex', justifyContent: 'space-between', flexWrap:'wrap', gap:10}}>
           <div style={{display:'flex', gap: 15}}>
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
           </div>
           <div style={{display:'flex', gap: 20}}>
              <span><i className="fas fa-phone-alt"></i> +1 800 AURA 202</span>
              <span><i className="fas fa-envelope"></i> support@auraclothing.com</span>
           </div>
        </div>
      );

      const MarqueeStrip = () => (
        <div style={{background: 'var(--primary)', color:'#fff', padding: '12px 0', overflow:'hidden', whiteSpace:'nowrap', display:'flex', fontWeight:600, letterSpacing:'2px', fontSize:'0.85rem'}}>
           <div className="marquee-content">
              <span>👗 FREE SHIPPING ON ORDERS OVER ₹1000 &nbsp; • &nbsp; 🌟 NEW ARRIVALS DROP EVERY FRIDAY &nbsp; • &nbsp; 💸 15% OFF YOUR FIRST ORDER WITH CODE: AURA15 &nbsp; • &nbsp; 👗 FREE SHIPPING ON ORDERS OVER ₹1000 &nbsp; • &nbsp; 🌟 NEW ARRIVALS DROP EVERY FRIDAY &nbsp; • &nbsp; 💸 15% OFF YOUR FIRST ORDER WITH CODE: AURA15</span>
           </div>
        </div>
      );

      const HeroSlider = () => {
        const slides = [
          { img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80', title: 'Family Fashion', subtitle: 'Timeless style for everyone.' },
          { img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=80', title: "Men's Style", subtitle: 'Bold and sophisticated.' },
          { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80', title: "Women's Collection", subtitle: 'Elegance redefined.' }
        ];
        const [current, setCurrent] = useState(0);

        useEffect(() => {
          const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000);
          return () => clearInterval(timer);
        }, []);

        return (
          <div style={{position: 'relative', height: '100vh', overflow: 'hidden', background:'#000'}}>
            {slides.map((slide, i) => (
              <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === current ? 1 : 0, transition: 'opacity 1.5s ease-in-out', zIndex: i === current ? 1 : 0 }}>
                 <div style={{ position:'absolute', inset:0, background: \`url(\${slide.img}) center/cover\`, animation: i === current ? 'kenburns 12s linear infinite alternate' : 'none' }}></div>
                 <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.3)'}}></div>
                 <div style={{position:'absolute', top:'50%', left:'10%', transform:'translateY(-50%)', color:'#fff', maxWidth: 600}}>
                   <h1 style={{fontFamily:'var(--font-brand)', fontSize:'5rem', fontStyle:'italic', fontWeight:800, marginBottom:10, lineHeight: 1.1, transform: i === current ? 'translateY(0)' : 'translateY(30px)', opacity: i === current ? 1 : 0, transition: 'all 1s ease 0.5s'}}>{slide.title}</h1>
                   <p style={{fontSize:'1.5rem', marginBottom: 30, transform: i === current ? 'translateY(0)' : 'translateY(30px)', opacity: i === current ? 1 : 0, transition: 'all 1s ease 0.7s'}}>{slide.subtitle}</p>
                   <button className="btn btn-solid" style={{padding:'15px 40px', fontSize:'1.1rem'}} onClick={()=>handleNav('women')}>Shop Collection</button>
                 </div>
              </div>
            ))}
            <div style={{position:'absolute', bottom:40, left:40, zIndex:10, display:'flex', gap:10, alignItems:'center'}}>
               <span style={{color:'#fff', fontWeight:700, marginRight: 20}}>OUR COLLECTIONS</span>
               {slides.map((s, i) => (
                  <div key={i} onClick={() => setCurrent(i)} style={{ width: 60, height: 40, background:\`url(\${s.img}) center/cover\`, border: i===current ? '2px solid var(--primary)' : '2px solid transparent', cursor:'pointer', transition:'0.3s' }}></div>
               ))}
            </div>
            <div style={{position:'absolute', bottom:40, right:40, zIndex:10, color:'#fff', fontSize:'1.5rem', fontWeight:600, fontFamily:'var(--font-brand)'}}>
               {String(current + 1).padStart(2, '0')} <span style={{fontSize:'1rem', opacity:0.7}}>/ {String(slides.length).padStart(2, '0')}</span>
            </div>
          </div>
        );
      };

      const CategoryCards = () => {
        const cats = [
          { title: 'Men', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800', link: 'men' },
          { title: 'Women', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', link: 'women' },
          { title: 'Kids', img: 'https://plus.unsplash.com/premium_photo-1663045689531-15a0c10b7f84?w=800', link: 'kids' }
        ];
        return (
          <div className="page-container flex-gap-30 reveal-on-scroll">
             {cats.map(c => (
               <div key={c.link} className="cat-card" onClick={() => handleNav(c.link)}>
                  <div className="cat-card-img" style={{backgroundImage: \`url(\${c.img})\`}}></div>
                  <div className="cat-card-overlay">
                     <h3>{c.title}</h3>
                     <span className="explore-cta">Explore Collection &rarr;</span>
                  </div>
               </div>
             ))}
          </div>
        )
      };

      const AboutSection = () => (
        <div className="page-container reveal-on-scroll" style={{display:'flex', alignItems:'center', gap: 60, padding: '80px 40px', flexWrap:'wrap'}}>
           <div style={{flex: '1 1 400px'}}>
              <h2 className="sec-title" style={{marginBottom: 20}}>Crafting The Perfect Look</h2>
              <p style={{fontSize:'1.1rem', color:'var(--text-light)', lineHeight:1.8, marginBottom:40}}>
                 AURA was established to deliver premium apparel bridging timeless tradition and modern retail flair. We source top-tier fabrics manually stitched for absolute perfection, establishing ourselves as leaders in modern fashion for the whole family.
              </p>
              <div style={{display:'flex', gap: 40, flexWrap:'wrap'}}>
                 <div><h3 style={{fontSize:'2.5rem', color:'var(--secondary)', fontFamily:'var(--font-brand)'}}>500+</h3><span style={{color:'var(--text-light)', textTransform:'uppercase', fontSize:'0.85rem', fontWeight:600}}>Products</span></div>
                 <div><h3 style={{fontSize:'2.5rem', color:'var(--secondary)', fontFamily:'var(--font-brand)'}}>10K+</h3><span style={{color:'var(--text-light)', textTransform:'uppercase', fontSize:'0.85rem', fontWeight:600}}>Customers</span></div>
                 <div><h3 style={{fontSize:'2.5rem', color:'var(--secondary)', fontFamily:'var(--font-brand)'}}>50+</h3><span style={{color:'var(--text-light)', textTransform:'uppercase', fontSize:'0.85rem', fontWeight:600}}>Brands</span></div>
              </div>
           </div>
           <div style={{flex: '1 1 400px', position:'relative', paddingTop: 20}}>
               <div style={{position:'absolute', inset: '0 -20px -20px 20px', border: '2px solid var(--primary)', borderRadius: 'var(--radius)', zIndex: 0}}></div>
               <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800" style={{position:'relative', zIndex: 1, borderRadius: 'var(--radius)', width:'100%', height:'450px', objectFit:'cover'}} />
           </div>
        </div>
      );

      const FeaturedCollections = () => {
          const collections = [
             {name: "Silk Sarees", img: "https://images.unsplash.com/photo-1610189013038-0329fc5f8e65?w=500"},
             {name: "Festive Kurtas", img: "https://images.unsplash.com/photo-1583391733958-69aa4a66a3ea?w=500"},
             {name: "Urban Denim", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"},
             {name: "Kids Partywear", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500"},
             {name: "Wedding Specials", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"},
          ];
          return (
             <div style={{padding: '80px 40px', background:'var(--bg-alt)'}} className="reveal-on-scroll">
                <div style={{maxWidth:1600, margin:'0 auto'}}>
                   <h2 className="sec-title" style={{textAlign:'center', marginBottom: 40}}>Trending Collections</h2>
                   <div className="scroll-container" style={{gap: 20, paddingBottom: 20}}>
                      {collections.map(c => (
                         <div key={c.name} className="scroll-item trending-collection-card">
                            <img src={c.img} alt={c.name} />
                            <div className="tc-overlay">{c.name}</div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          );
      };

      const LifestyleBanner = () => (
         <div className="parallax-bg reveal-on-scroll" style={{height: '500px', backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600)', position:'relative', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{position:'absolute', inset:0, background:'rgba(0,0,0,0.4)'}}></div>
            <div style={{position:'relative', zIndex:1, textAlign:'center', color:'#fff', padding:'0 20px'}}>
               <h2 style={{fontFamily:'var(--font-brand)', fontSize:'3.5rem', marginBottom: 20}}>Define Your Authentic Self</h2>
               <button className="btn btn-solid" style={{padding:'12px 30px'}} onClick={()=>handleNav('women')}>Discover The Campaign</button>
            </div>
         </div>
      );

      const CustomerGallery = () => {
         const photos = [
             "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
             "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=400",
             "https://images.unsplash.com/photo-1601288496924-118fefb0f2a7?w=400",
             "https://images.unsplash.com/photo-1506869640319-a1c220be18b5?w=400",
             "https://images.unsplash.com/photo-1544723795-3bc29aa18df1?w=400",
             "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=400",
             "https://images.unsplash.com/photo-1523824922870-7471bea48eb2?w=400",
             "https://images.unsplash.com/photo-1616428751505-df1b99790be6?w=400"
         ];
         return (
            <div style={{padding: '80px 0', overflow:'hidden', background:'#111', color:'#fff'}} className="reveal-on-scroll">
               <h2 className="sec-title" style={{textAlign:'center', marginBottom: 40, color:'#fff'}}>Our Happy Customers</h2>
               <div style={{display:'flex', width: '200%', animation: 'scrollGallery 30s linear infinite'}}>
                  <div style={{display:'flex', gap: 15, padding: '0 7.5px'}}>
                     {photos.map((p,i) => <img key={i} src={p} style={{width: 250, height: 250, objectFit:'cover', borderRadius: 'var(--radius)'}}/>)}
                  </div>
                  <div style={{display:'flex', gap: 15, padding: '0 7.5px'}}>
                     {photos.map((p,i) => <img key={i} src={p} style={{width: 250, height: 250, objectFit:'cover', borderRadius: 'var(--radius)'}}/>)}
                  </div>
               </div>
               <div style={{display:'flex', width: '200%', animation: 'scrollGalleryReverse 35s linear infinite', marginTop: 15}}>
                  <div style={{display:'flex', gap: 15, padding: '0 7.5px'}}>
                     {photos.slice().reverse().map((p,i) => <img key={i} src={p} style={{width: 250, height: 250, objectFit:'cover', borderRadius: 'var(--radius)'}}/>)}
                  </div>
                  <div style={{display:'flex', gap: 15, padding: '0 7.5px'}}>
                     {photos.slice().reverse().map((p,i) => <img key={i} src={p} style={{width: 250, height: 250, objectFit:'cover', borderRadius: 'var(--radius)'}}/>)}
                  </div>
               </div>
            </div>
         );
      };

      const ServicesStrip = () => (
         <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap: 30, padding:'60px 40px', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', background:'#fff'}} className="reveal-on-scroll">
            <div style={{textAlign:'center', minWidth:200}}>
              <i className="fas fa-shipping-fast" style={{fontSize:'2.5rem', color:'var(--primary)', marginBottom: 15}}></i>
              <h4 style={{fontFamily:'var(--font-brand)', fontSize:'1.1rem'}}>Free Shipping</h4>
              <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginTop:5}}>On all orders over ₹1000</p>
            </div>
            <div style={{textAlign:'center', minWidth:200}}>
              <i className="fas fa-undo" style={{fontSize:'2.5rem', color:'var(--primary)', marginBottom: 15}}></i>
              <h4 style={{fontFamily:'var(--font-brand)', fontSize:'1.1rem'}}>14 Days Returns</h4>
              <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginTop:5}}>Easy, hassle-free return policy</p>
            </div>
            <div style={{textAlign:'center', minWidth:200}}>
              <i className="fas fa-shield-alt" style={{fontSize:'2.5rem', color:'var(--primary)', marginBottom: 15}}></i>
              <h4 style={{fontFamily:'var(--font-brand)', fontSize:'1.1rem'}}>100% Authentic</h4>
              <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginTop:5}}>Genuine, branded products</p>
            </div>
            <div style={{textAlign:'center', minWidth:200}}>
              <i className="fas fa-headset" style={{fontSize:'2.5rem', color:'var(--primary)', marginBottom: 15}}></i>
              <h4 style={{fontFamily:'var(--font-brand)', fontSize:'1.1rem'}}>24/7 Support</h4>
              <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginTop:5}}>Dedicated customer help center</p>
            </div>
         </div>
      );
`;

const file = fs.readFileSync('index.html', 'utf8');

// Inject CSS
let newFile = file.replace('</style>', cssAdditions + '\n  </style>');

// Inject React components right before the \`const fetchProducts\` defined inside function App()
newFile = newFile.replace('const fetchProducts =', reactAdditions + '\n\n      const fetchProducts =');

// Inject TopBar above Header and Marquee below Header
const headerStr = '<header className="header">';
const topBarNav = '<TopBar />\n          ' + headerStr;
newFile = newFile.replace(headerStr, topBarNav);

// Update Logo to say AURA instead of Aura
newFile = newFile.replace('Aura <span>.</span>', 'AURA <span>.</span>');

// Replace the old Hero and MAIN renderer logic for "home"
const oldHeroRegex = /<section className="hero">.*?<\/section>\s*<main className="page-container".*?<\/main>/sv;

const newHomeRender = `
                  <HeroSlider />
                  <MarqueeStrip />
                  <CategoryCards />
                  
                  <section className="page-container reveal-on-scroll" style={{padding: '60px 40px 20px 40px'}}>
                    <div className="sec-header">
                      <h2 className="sec-title">New Arrivals</h2>
                      <a style={{color:'var(--primary)', fontWeight:600}} onClick={()=>handleNav('men')}>View All &rarr;</a>
                    </div>
                    <div className="grid">
                      {newArrivals.length > 0 ? newArrivals.map(prod => (
                        <ProductCard key={prod._id} prod={prod} />
                      )) : <p>Loading new arrivals...</p>}
                    </div>
                  </section>
                  
                  <AboutSection />
                  
                  <FeaturedCollections />
                  
                  <LifestyleBanner />
                  
                  <section className="page-container reveal-on-scroll" style={{padding: '60px 40px'}}>
                    <div className="sec-header">
                      <h2 className="sec-title">Trending Now</h2>
                    </div>
                    <div className="scroll-container">
                      {trending.length > 0 ? trending.map(prod => (
                        <div className="scroll-item" key={prod._id}><ProductCard prod={prod} /></div>
                      )) : <p>Loading trends...</p>}
                    </div>
                  </section>
                  
                  <CustomerGallery />
                  <ServicesStrip />
`;

newFile = newFile.replace(oldHeroRegex, newHomeRender);

// Replace Footer
const oldFooterRegex = /<footer className="footer">.*?<\/footer>/sv;

const newFooter = `
          <footer className="footer">
            <div className="footer-grid">
              <div className="foot-col">
                <div className="logo" style={{marginBottom: 20, fontSize:'2rem'}}>AURA<span>.</span></div>
                <p>AURA Clothings is your ultimate online fashion stop, offering you the best and latest trends in premium retail.</p>
                <div className="foot-social" style={{marginTop: 20}}>
                   <a href="#"><i className="fab fa-facebook-f"></i></a>
                   <a href="#"><i className="fab fa-twitter"></i></a>
                   <a href="#"><i className="fab fa-instagram"></i></a>
                   <a href="#"><i className="fab fa-pinterest-p"></i></a>
                </div>
              </div>
              <div className="foot-col">
                <h4>Collections</h4>
                <div className="foot-list"><a onClick={(e) => handleNav('men', e)}>Men's Fashion</a><a onClick={(e) => handleNav('women', e)}>Women's Store</a><a onClick={(e) => handleNav('kids', e)}>Kids Apparel</a><a onClick={(e) => handleNav('home', e)}>New Arrivals</a></div>
              </div>
              <div className="foot-col">
                <h4>Quick Links</h4>
                <div className="foot-list"><a onClick={(e) => handleNav('about', e)}>About AURA</a><a onClick={(e) => handleNav('contact', e)}>Contact Us</a><a href="#">Track Order</a><a href="#">Return Policy</a></div>
              </div>
              <div className="foot-col">
                 <h4>Newsletter</h4>
                 <p style={{fontSize:'0.85rem'}}>Subscribe to receive updates, access to exclusive deals, and more.</p>
                 <div style={{display:'flex', marginTop: 15, gap: 5}}>
                    <input type="email" placeholder="Enter your email" style={{padding:'10px 15px', border:'1px solid var(--border)', borderRadius:'var(--radius)', flex:1}} />
                    <button className="btn btn-solid" style={{padding:'10px 20px'}}>Join</button>
                 </div>
              </div>
            </div>
            <div style={{textAlign:'center', padding:'20px 0 0 0', marginTop: 40, borderTop:'1px solid var(--border)', color:'var(--text-light)', fontSize:'0.85rem'}}>
               &copy; {new Date().getFullYear()} AURA Retail Private Limited. All Rights Reserved.
            </div>
          </footer>
`;

newFile = newFile.replace(oldFooterRegex, newFooter);

fs.writeFileSync('new_index.html', newFile);
console.log('Successfully generated new_index.html');
