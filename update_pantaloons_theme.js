const fs = require('fs');
let html = fs.readFileSync('d:\\cloth shop\\index.html', 'utf8');

// Helper to replace text between two strings
function replaceBetween(str, startStr, endStr, replacement) {
  const startIndex = str.indexOf(startStr);
  if (startIndex === -1) return str;
  const endIndex = str.indexOf(endStr, startIndex + startStr.length);
  if (endIndex === -1) return str;
  return str.substring(0, startIndex) + startStr + '\n' + replacement + '\n' + str.substring(endIndex);
}

// 1. Root & Fonts
html = html.replace(/<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Playfair\+Display[^>]+>/, '<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>');

const cssRootNew = `:root{
  --teal:#00A99D;
  --teal-dark:#008f85;
  --ink:#222;
  --cream:#fff;
  --warm:#f5f5f5;
  --gold:#00A99D;
  --gold-lt:#e6f7f6;
  --rust:#D8383F;
  --sage:#008f85;
  --slate:#4A4A4A;
  --mid:#757575;
  --border:#eaeaea;
  --card:#ffffff;
  --shadow:0 4px 16px rgba(0,0,0,.06);
  --radius:0px;
}`;
html = replaceBetween(html, ':root{', '}', cssRootNew.replace(':root{', ''));

// 2. Typography
html = html.replace(/font-family:'DM Sans',sans-serif/g, "font-family:'Jost',sans-serif");
html = html.replace(/font-family:'Playfair Display',serif/g, "font-family:'Jost',sans-serif; text-transform:uppercase; letter-spacing:1px;");
html = html.replace(/font-family:'Bebas Neue',sans-serif/g, "font-family:'Jost',sans-serif; font-weight:800; text-transform:uppercase;");

// 3. Radius
html = html.replace(/border-radius:8px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:10px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:12px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:16px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:20px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:24px;/g, 'border-radius:0px;');
html = html.replace(/border-radius:30px;/g, 'border-radius:0px;');

// 4. Nav
const navCssNew = `.topbar{background:#000;color:#fff;text-align:center;padding:10px;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:600}
nav{background:#fff;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:1000}
.nav-inner{max-width:1440px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:12px 40px}
.logo{font-family:'Jost',sans-serif;font-size:24px;font-weight:900;letter-spacing:2px;cursor:pointer;color:var(--ink);text-transform:uppercase}
.logo span{color:var(--teal)}
.nav-menu{display:flex;gap:32px;align-items:center;flex:1;justify-content:center}
.nav-link{background:none;border:none;cursor:pointer;font-size:14px;font-weight:600;color:var(--ink);transition:all .2s;text-transform:uppercase;letter-spacing:1px;font-family:'Jost',sans-serif;padding:0}
.nav-link:hover,.nav-link.active{color:var(--teal);background:none}
.nav-link.offers{color:var(--rust)}
.nav-link.offers:hover{color:#d32f2f;background:none}
.nav-right{display:flex;align-items:center;gap:24px}
.search-wrap{position:relative;width:240px}
.search-input{width:100%;padding:10px 14px 10px 40px;border:1px solid var(--border);border-radius:0;font-size:13px;font-family:'Jost',sans-serif;background:#fff;outline:none;transition:border-color .2s}
.search-input:focus{border-color:var(--teal)}
.search-btn{position:absolute;left:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--mid);cursor:pointer;font-size:14px}
.search-suggestions{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#fff;border:1px solid var(--border);border-radius:0;box-shadow:0 12px 40px rgba(0,0,0,.12);z-index:200;overflow:hidden;max-height:320px;overflow-y:auto}
.sugg-item{padding:12px 18px;cursor:pointer;display:flex;align-items:center;gap:12px;font-size:13px;border-bottom:1px solid var(--border)}
.sugg-item:hover{background:var(--warm)}
.sugg-item:last-child{border-bottom:none}
.nav-icons{display:flex;align-items:center;gap:16px}
.nav-icon-btn{position:relative;background:none;border:none;cursor:pointer;padding:0;color:var(--ink);font-size:20px;transition:all .2s;display:flex;align-items:center}
.nav-icon-btn:hover{color:var(--teal);background:none}
.nav-badge{position:absolute;top:-6px;right:-8px;background:var(--rust);color:#fff;font-size:9px;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}
`;
html = replaceBetween(html, '/* ── NAV ── */', '/* ── HERO ── */', navCssNew);

// 5. Product Grid
const productCssNew = `.product-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:2px;background:var(--border)}
.product-card{background:#fff;overflow:hidden;position:relative;padding:16px}
.product-card:hover{z-index:2}
.product-img-wrap{position:relative;aspect-ratio:3/4;overflow:hidden;background:var(--warm);cursor:pointer;margin-bottom:16px}
.product-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.product-badges{position:absolute;top:0;left:0;display:flex;flex-direction:column;gap:6px;padding:12px}
.product-actions{position:absolute;bottom:0;left:0;right:0;display:flex;flex-direction:column;gap:8px;opacity:0;transition:opacity .25s;padding:12px;background:linear-gradient(to top, rgba(0,0,0,0.4), transparent)}
.product-card:hover .product-actions{opacity:1}
.product-action-btn{width:100%;padding:12px;background:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:700;text-transform:uppercase;color:var(--ink);transition:all .2s}
.product-action-btn:hover{background:var(--teal);color:#fff}
.product-action-btn.wishlisted{color:var(--rust)}
.product-body{padding:0}
.product-brand{font-size:12px;font-weight:700;color:var(--mid);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
.product-name{font-size:14px;margin-bottom:8px;line-height:1.4;cursor:pointer;color:var(--ink)}
.product-name:hover{color:var(--teal)}
.product-price-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.price-current{font-size:16px;font-weight:800;color:var(--ink)}
.price-original{font-size:13px;color:var(--mid);text-decoration:line-through}
.price-off{font-size:12px;font-weight:700;color:var(--rust)}
.add-to-cart{display:none !important}
.product-rating{display:none !important}
.product-sizes{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:0}
.size-chip{padding:2px 6px;border:1px solid var(--border);font-size:11px;font-weight:600;cursor:pointer;color:var(--mid)}
.size-chip:hover,.size-chip.active{border-color:var(--ink);background:var(--ink);color:#fff}
`;
html = replaceBetween(html, '/* ── PRODUCT GRID ── */', '/* ── BANNERS ── */', productCssNew);

// 6. Hero
const heroCssNew = `.hero{position:relative}
.hero-content{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:120px 40px;background:var(--warm)}
.hero-eyebrow{color:var(--teal);font-size:14px;font-weight:700;letter-spacing:4px;text-transform:uppercase;margin-bottom:24px}
.hero-title{font-size:clamp(40px,6vw,80px);font-weight:900;line-height:1.1;color:var(--ink);margin-bottom:24px;letter-spacing:2px}
.hero-sub{color:var(--mid);font-size:18px;margin-bottom:40px;max-width:600px;font-weight:400}
.hero-visual{display:none}
.hero-stats{display:none}
`;
html = replaceBetween(html, '/* ── HERO ── */', '/* ── SECTIONS ── */', heroCssNew);

// 7. Categories
const catCssNew = `.cat-grid{display:flex;gap:32px;justify-content:center;flex-wrap:wrap}
.cat-card{width:160px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:16px}
.cat-card:hover .cat-img-box{border-color:var(--teal)}
.cat-img-box{border-radius:50%;overflow:hidden;width:160px;height:160px;border:4px solid var(--border);transition:border-color .3s;background:var(--warm)}
.cat-img{width:100%;height:100%;object-fit:cover;transition:transform .5s}
.cat-card:hover .cat-img{transform:scale(1.05)}
.cat-content{text-align:center; position:relative; bottom:auto; left:auto; right:auto; padding:0; color:var(--ink)}
.cat-name{font-size:15px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink)}
.cat-count{display:none}
.cat-arrow{display:none}
`;
html = replaceBetween(html, '/* ── CATEGORY TILES ── */', '/* ── PRODUCT GRID ── */', catCssNew);

// 8. Nav JS
const navReactNew = `<nav>
      <div className="nav-inner">
        <div className="logo" onClick={()=>navigate('home')}>Pantaloons</div>
        <div className="nav-menu">
          {[
            {label:'Women',key:'women',cat:'women'},
            {label:'Men',key:'men',cat:'men'},
            {label:'Kids',key:'kids',cat:'kids'},
            {label:'New Arrivals',key:'new',cat:'new'},
            {label:'Trending',key:'trending',cat:'trending'},
            {label:'Offers',key:'offers',cat:'offers',cls:'offers'}
          ].map(item=>(
            <button
              key={item.key}
              className={\`nav-link \${item.cls||''} \${page===item.key?'active':''}\`}
              onClick={()=>navigate(item.cat?'category':'home',item.cat||item.key)}
            >{item.label}</button>
          ))}
          {isAdmin&&<button className="nav-link" onClick={()=>navigate('admin')}>ADMIN</button>}
          {!isAdmin&&<button className="nav-link" onClick={()=>setShowAdminLogin(true)}>LOGIN</button>}
        </div>
        <div className="nav-right">
          <div className="search-wrap" ref={searchRef}>
            <input
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={e=>setSearchQuery(e.target.value)}
              onFocus={()=>setShowSugg(true)}
              onKeyDown={e=>e.key==='Enter'&&doSearch()}
            />
            <button className="search-btn" onClick={doSearch}><i className="fas fa-search"/></button>
            {showSugg&&searchSugg.length>0&&(
              <div className="search-suggestions">
                {searchSugg.map(p=>(
                  <div key={p.id} className="sugg-item" onClick={()=>{setSelectedProduct(p);setShowSugg(false);navigate('product')}}>
                    <img src={p.images?.[0]||''} style={{width:40,height:40,borderRadius:0,objectFit:'cover'}} alt=""/>
                    <div>
                      <div style={{fontWeight:700,fontSize:14}}>{p.name}</div>
                      <div style={{fontSize:12,color:'var(--mid)'}}>{p.brand} · ₹{p.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="nav-icons">
            <button className="nav-icon-btn" onClick={()=>{if(!user){setShowAuth(true);return;}setShowWishlist(true);}} title="Wishlist">
              <i className="far fa-heart"/>
              {wishlistCount>0&&<span className="nav-badge">{wishlistCount}</span>}
            </button>
            <button className="nav-icon-btn" onClick={()=>setShowCart(true)} title="Bag">
              <i className="fas fa-shopping-bag"/>
              {cartCount>0&&<span className="nav-badge">{cartCount}</span>}
            </button>
            {user?(
              <button className="nav-icon-btn" onClick={()=>navigate('dashboard')} title="Account">
                <i className="far fa-user"/>
              </button>
            ):(
              <button className="nav-icon-btn" onClick={()=>setShowAuth(true)} title="Login">
                <i className="far fa-user"/>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>`;
html = replaceBetween(html, '<nav>', '</nav>', navReactNew.replace('<nav>', '').replace('</nav>', ''));

// Update Topbar
const oldTop = html.match(/<div className="topbar">.*?<\/div>/);
if(oldTop) {
  html = html.replace(oldTop[0], '<div className="topbar">Track Order &nbsp;|&nbsp; Up to 50% Off &nbsp;|&nbsp; New Arrivals Live</div>');
}

// 9. Categories JSX
const catMapNew = `{[
          {key:'women',label:'Women',img:'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'},
          {key:'men',label:'Men',img:'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=600'},
          {key:'kids',label:'Kids',img:'https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=600'},
          {key:'new',label:'Just In',img:'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600'},
          {key:'trending',label:'Trending',img:'https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=600'},
        ].map(cat=>(
          <div key={cat.key} className="cat-card" onClick={()=>navigate('category',cat.key)}>
            <div className="cat-img-box"><img className="cat-img" src={cat.img} alt={cat.label} /></div>
            <div className="cat-content"><div className="cat-name">{cat.label}</div></div>
          </div>
        ))}`;
if (html.includes("{key:'men',label:'Men'")) {
  const tStart = html.indexOf("{[\n          {key:'men',label:'Men'");
  const tEnd = html.indexOf("))}", tStart);
  if (tStart > -1 && tEnd > -1) {
    html = html.substring(0, tStart) + catMapNew + html.substring(tEnd + 3);
  }
}

// 10. Hero JSX
const heroJSXNew = `<section className="hero">
      <div className="hero-content" style={{backgroundImage:"url('https://images.pexels.com/photos/934069/pexels-photo-934069.jpeg?auto=compress&cs=tinysrgb&w=1440')", backgroundSize:'cover', backgroundPosition:'center', width:'100%', minHeight:'500px'}}>
        <div style={{background:'rgba(255,255,255,0.9)', padding:'40px', textAlign:'center', maxWidth:'500px'}}>
            <div className="hero-eyebrow">Spring Collection</div>
            <h1 className="hero-title" style={{fontSize:'48px'}}>FRESH FASHION</h1>
            <p className="hero-sub" style={{marginBottom:'24px'}}>Refresh your wardrobe with the latest trends and styles curated just for you.</p>
            <div className="hero-actions">
            <button className="btn btn-gold" onClick={()=>{navigate('category','women')}}>Explore Women</button>
            <button className="btn btn-outline" style={{borderColor:'var(--ink)'}} onClick={()=>navigate('category','new')}>Just In</button>
            </div>
        </div>
      </div>
    </section>`;
if(html.includes('<section className="hero">')) {
  html = replaceBetween(html, '<section className="hero">', '</section>', heroJSXNew.replace('<section className="hero">', '').replace('</section>', ''));
}

// 11. Product Card Hover Actions
const productActionsJSXNew = `
        <button className={\`product-action-btn \${wishlisted?'wishlisted':''}\`} onClick={e=>{e.stopPropagation();onWishlist(product);}}>
          <i className={\`fa\${wishlisted?'s':'r'} fa-heart\`}/> Wishlist
        </button>
        <button className="product-action-btn" onClick={(e)=>{e.stopPropagation();onAdd(product,selectedSize);}}>
          <i className={\`fas fa-\${inCart?'check':'shopping-bag'}\`}/> {inCart?'Added':'Add to Bag'}
        </button>
      `;
if(html.includes('<div className="product-actions">')) {
  html = replaceBetween(html, '<div className="product-actions">', '</div>\n    </div>\n    <div className="product-body">', productActionsJSXNew);
}

// 12. Admin Credentials Fix inside Index
html = html.replace(/admin@auraclothings\.com/g, 'web2hub.officfial');

fs.writeFileSync('d:\\\\cloth shop\\\\index.html', html);
console.log('Successfully updated the theme.');
