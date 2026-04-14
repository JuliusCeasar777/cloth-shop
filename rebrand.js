const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Rebrand to Aura Clothings
html = html.replace(/ThreadHaus/g, 'Aura Clothings');
html = html.replace(/Thread<span style=\{\{color:'var\(--gold\)'\}\}>Haus<\/span>/g, 'Aura<span style={{color:\'var(--gold)\'}}>Clothings</span>');
html = html.replace(/admin@threadhaus\.com/g, 'admin@auraclothings.com');

// 2. Remove Accessories from Hero and update Hero grid to imagery
const oldHeroGrid = `          {[{e:'👗',label:'WOMEN'},{e:'👔',label:'MEN'},{e:'🧥',label:'KIDS'},{e:'👠',label:'ACCESSORIES'}].map((c,i)=>(
            <div key={i} className="hero-img-cell" style={{background:i%2===0?'linear-gradient(135deg,#2c2820,#1a1410)':'linear-gradient(135deg,#1a1410,#3d2f1a)'}}>
              <span style={{fontSize:i===0?100:60}}>{c.e}</span>
              <div className="hero-img-overlay"/>
              <div className="hero-img-label">{c.label}</div>
            </div>
          ))}`;

const newHeroGrid = `          {[{img:'https://images.unsplash.com/photo-1518140880193-455b5d19d675?w=600&h=800&fit=crop',label:'WOMEN'},
            {img:'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop',label:'MEN'},
            {img:'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=600&h=800&fit=crop',label:'KIDS'}].map((c,i)=>(
            <div key={i} className="hero-img-cell" style={{position:'relative', overflow:'hidden', gridColumn: i === 0 ? 'span 2' : 'span 1'}}>
              <img src={c.img} style={{width:'100%',height:'100%',objectFit:'cover'}} alt={c.label}/>
              <div className="hero-img-overlay" style={{position:'absolute',inset:0,background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'}}/>
              <div className="hero-img-label" style={{position:'absolute',bottom:24,left:24,fontWeight:900,fontSize:24,letterSpacing:2}}>{c.label}</div>
            </div>
          ))}`;

html = html.replace(oldHeroGrid, newHeroGrid);

// 3. Emojis replacement in Admin & Dashboard
// Banners & Empty States
html = html.replace(/<div className="empty-icon">🔍<\/div>/g, '<div className="empty-icon"><i className="fas fa-search"></i></div>');
html = html.replace(/<div className="empty-icon">🛒<\/div>/g, '<div className="empty-icon"><i className="fas fa-shopping-cart"></i></div>');
html = html.replace(/<div className="empty-icon">💝<\/div>/g, '<div className="empty-icon"><i className="fas fa-heart"></i></div>');
html = html.replace(/<div className="empty-icon">❤️<\/div>/g, '<div className="empty-icon"><i className="fas fa-heart"></i></div>');
html = html.replace(/<div className="empty-icon">📦<\/div>/g, '<div className="empty-icon"><i className="fas fa-box-open"></i></div>');

// Admin Stats
html = html.replace(/{icon:'🛍️'/g, "{icon:<i className='fas fa-shopping-bag'></i>");
html = html.replace(/{icon:'📦'/g, "{icon:<i className='fas fa-box'></i>");
html = html.replace(/{icon:'⏳'/g, "{icon:<i className='fas fa-hourglass-half'></i>");
html = html.replace(/{icon:'💰'/g, "{icon:<i className='fas fa-wallet'></i>");
html = html.replace(/{icon:'✅'/g, "{icon:<i className='fas fa-check-circle'></i>");
html = html.replace(/{icon:'⚠️'/g, "{icon:<i className='fas fa-exclamation-triangle'></i>");
html = html.replace(/{icon:'❌'/g, "{icon:<i className='fas fa-times-circle'></i>");
html = html.replace(/{key:'men',icon:'👔'/g, "{key:'men',icon:<i className='fas fa-male'></i>");
html = html.replace(/{key:'women',icon:'👗'/g, "{key:'women',icon:<i className='fas fa-female'></i>");
html = html.replace(/{key:'kids',icon:'🧒'/g, "{key:'kids',icon:<i className='fas fa-child'></i>");
html = html.replace(/{key:'all',icon:'🛍️'/g, "{key:'all',icon:<i className='fas fa-layer-group'></i>");

// Other emojis
html = html.replace(/<span style=\{\{fontSize:20\}\}>🔵<\/span>/g, '<i className="fab fa-google" style={{fontSize:20, marginRight:12, color:"#DB4437"}}></i>');
html = html.replace(/<div className="drawer-title">🛍️ Your Cart/g, '<div className="drawer-title"><i className="fas fa-shopping-bag" style={{marginRight:8}}></i> Your Cart');
html = html.replace(/<div className="drawer-title">❤️ Wishlist/g, '<div className="drawer-title"><i className="fas fa-heart" style={{marginRight:8}}></i> Wishlist');
html = html.replace(/<div style=\{\{fontSize:80,marginBottom:24,animation:'pulse 2s infinite'\}\}>🎉<\/div>/g, '<div style={{fontSize:80,marginBottom:24,animation:\'pulse 2s infinite\',color:\'var(--gold)\'}}><i className="fas fa-check-circle"></i></div>');
html = html.replace(/🔥/g, '<i className="fas fa-fire"></i>');
html = html.replace(/✨/g, '<i className="fas fa-star"></i>');
html = html.replace(/⭐/g, '<i className="fas fa-star"></i>');
html = html.replace(/🚚/g, '<i className="fas fa-truck"></i>');
html = html.replace(/🔄/g, '<i className="fas fa-sync"></i>');
html = html.replace(/🔒/g, '<i className="fas fa-lock"></i>');
html = html.replace(/💬/g, '<i className="fas fa-comments"></i>');
html = html.replace(/✅/g, ''); // Handled in features manually or leave blank
html = html.replace(/{icon:'💵'}/g, "{icon:<i className='fas fa-money-bill-wave'></i>}");
html = html.replace(/{icon:'📱'}/g, "{icon:<i className='fas fa-mobile-alt'></i>}");
html = html.replace(/{icon:'💳'}/g, "{icon:<i className='fas fa-credit-card'></i>}");
html = html.replace(/<div className="dash-avatar">👤<\/div>/g, '<div className="dash-avatar"><i className="fas fa-user-circle"></i></div>');

// 4. Update Product Details (Specification & Buy Now)
const oldProductDetailsActions = `<div className="detail-actions">
          <button className={\`btn \${isInCart(product.id)?'btn-gold':'btn-primary'}\`} onClick={()=>addToCart(product,selSize)}>
            <i className={\`fas fa-\${isInCart(product.id)?'check':'shopping-bag'}\`}/> {isInCart(product.id)?'Added!':'Add to Cart'}
          </button>
          <button className={\`btn btn-outline\`} onClick={()=>toggleWishlist(product)} style={{color:isWishlisted(product.id)?'var(--rust)':'var(--ink)'}}>
            <i className={\`fa\${isWishlisted(product.id)?'s':'r'} fa-heart\`}/> Wishlist
          </button>
        </div>`;

const newProductDetailsActions = `<div className="detail-actions">
          <button className={\`btn \${isInCart(product.id)?'btn-gold':'btn-outline'}\`} onClick={()=>addToCart(product,selSize)} style={{flex:1}}>
            <i className={\`fas fa-\${isInCart(product.id)?'check':'shopping-bag'}\`}/> {isInCart(product.id)?'Added!':'Add to Cart'}
          </button>
          <button className="btn btn-primary" onClick={()=>{addToCart(product,selSize); setTimeout(()=>{ document.querySelector('.nav-icon-btn[title="Cart"]').click(); }, 150)}} style={{flex:1}}>
            <i className="fas fa-bolt"/> Buy Now
          </button>
          <button className={\`btn btn-outline\`} onClick={()=>toggleWishlist(product)} style={{color:isWishlisted(product.id)?'var(--rust)':'var(--ink)', padding:'0 16px', flex:'none'}}>
            <i className={\`fa\${isWishlisted(product.id)?'s':'r'} fa-heart\`}/>
          </button>
        </div>`;

html = html.replace(oldProductDetailsActions, newProductDetailsActions);

const oldDescription = `<p style={{color:'var(--mid)',fontSize:15,lineHeight:1.7,marginBottom:24}}>{product.description}</p>`;
const newDescription = `<p style={{color:'var(--mid)',fontSize:15,lineHeight:1.7,marginBottom:16}}>{product.description}</p>
        <div style={{display:'flex', gap:'16px', marginBottom:'24px', flexWrap:'wrap'}}>
          {product.material && <span style={{background:'var(--warm)', padding:'6px 12px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', color:'var(--ink)'}}><i className="fas fa-layer-group" style={{marginRight:'6px', color:'var(--gold)'}}></i>{product.material}</span>}
          {product.fit && <span style={{background:'var(--warm)', padding:'6px 12px', borderRadius:'8px', fontSize:'13px', fontWeight:'600', color:'var(--ink)'}}><i className="fas fa-tshirt" style={{marginRight:'6px', color:'var(--gold)'}}></i>{product.fit}</span>}
        </div>`;

html = html.replace(oldDescription, newDescription);

fs.writeFileSync('index.html', html, 'utf8');
console.log('✅ index.html updated successfully');
