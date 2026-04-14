const fs = require('fs');

let file = fs.readFileSync('index.html', 'utf8');

// 1. App State Additions
const stateInjection = `
      // Modals State
      const [showLogin, setShowLogin] = useState(false);
      const [showCart, setShowCart] = useState(false);
      const [showAdmin, setShowAdmin] = useState(false);
      
      const [systemSettings, setSystemSettings] = useState({});
      const [quickViewProduct, setQuickViewProduct] = useState(null);
      const [adminTab, setAdminTab] = useState('products');
      const [settingsForm, setSettingsForm] = useState({
         hero1: '', hero2: '', hero3: '',
         menCat: '', womenCat: '', kidsCat: '',
         custPhoto1: '', custPhoto2: '', custPhoto3: '', custPhoto4: ''
      });
`;
file = file.replace(/[\s\S]*const \[showAdmin, setShowAdmin\] = useState\(false\);/, (match) => {
   return match.replace("const [showAdmin, setShowAdmin] = useState(false);", stateInjection.trim());
});

// 2. Fetch Settings in useEffect
const useEffectInjection = `
      useEffect(() => {
        if (token) {
          fetch(\`\$\{API_URL\}/api/auth/me\`, { headers: { 'Authorization': \`Bearer \$\{token\}\` } })
          .then(res => res.json())
          .then(data => {
            if(!data.error) {
              setUser(data);
              setWishlist(data.wishlist?.map(w => w._id || w) || []);
            } else {
              localStorage.removeItem('token');
              setToken(null);
            }
          }).catch(console.error);
        }
        fetchProducts();
        fetch(\`\$\{API_URL\}/api/settings\`).then(res=>res.json()).then(data => {
           setSystemSettings(data);
           setSettingsForm({...settingsForm, ...data});
        }).catch(console.error);
      }, [token]);
`;
file = file.replace(/useEffect\(\(\) => \{[\s\S]*?fetchProducts\(\);\n      \}, \[token\]\);/, useEffectInjection.trim());


// 3. Update HeroSlider, CategoryCards, CustomerGallery to use systemSettings
file = file.replace(/const slides = \[[\s\S]*?\];/, `const slides = [
          { img: systemSettings.hero1 || 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1600&q=80', title: 'Family Fashion', subtitle: 'Timeless style for everyone.' },
          { img: systemSettings.hero2 || 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=80', title: "Men's Style", subtitle: 'Bold and sophisticated.' },
          { img: systemSettings.hero3 || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80', title: "Women's Collection", subtitle: 'Elegance redefined.' }
        ];`);

file = file.replace(/const cats = \[[\s\S]*?\];/, `const cats = [
          { title: 'Men', img: systemSettings.menCat || 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800', link: 'men' },
          { title: 'Women', img: systemSettings.womenCat || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800', link: 'women' },
          { title: 'Kids', img: systemSettings.kidsCat || 'https://plus.unsplash.com/premium_photo-1663045689531-15a0c10b7f84?w=800', link: 'kids' }
        ];`);

const oldCustomerGallery = /const CustomerGallery = \(\) => \{[\s\S]*?return \(/;
file = file.replace(oldCustomerGallery, `const CustomerGallery = () => {
         const photos = [
             systemSettings.custPhoto1 || "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
             systemSettings.custPhoto2 || "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=400",
             systemSettings.custPhoto3 || "https://images.unsplash.com/photo-1601288496924-118fefb0f2a7?w=400",
             systemSettings.custPhoto4 || "https://images.unsplash.com/photo-1506869640319-a1c220be18b5?w=400",
             "https://images.unsplash.com/photo-1544723795-3bc29aa18df1?w=400",
             "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=400",
             "https://images.unsplash.com/photo-1523824922870-7471bea48eb2?w=400",
             "https://images.unsplash.com/photo-1616428751505-df1b99790be6?w=400"
         ];
         return (`);


// 4. Update ProductCard Click Action (Eye icon)
file = file.replace(/<div className="product-card" onClick=\{\(\) => \{ window\.scrollTo\(\{top:0\}\); setActiveProduct\(prod\); \}\}>/, 
  `<div className="product-card">`);

file = file.replace(/<img src=\{img1\} className="card-img-main"/, `<img src={img1} className="card-img-main" onClick={() => { window.scrollTo({top:0}); setActiveProduct(prod); }}`);
file = file.replace(/<img src=\{img2\} className="card-img-hover"/, `<img src={img2} className="card-img-hover" onClick={() => { window.scrollTo({top:0}); setActiveProduct(prod); }}`);

file = file.replace(/<div className="card-brand">\{prod\.brand/, `<div className="card-brand" onClick={() => { window.scrollTo({top:0}); setActiveProduct(prod); }}>{prod.brand`);

// Add Eye Icon
const floatingActions = `<div className="floating-actions">
                <button className={\`icon-btn \$\{isWished ? 'heart-pulse' : ''\}\`} onClick={(e) => toggleWishlist(prod._id, e)}>
                  <i className={isWished ? "fas fa-heart" : "far fa-heart"}></i>
                </button>
                <button className="icon-btn" onClick={(e) => { e.stopPropagation(); setQuickViewProduct(prod); }} title="Quick View">
                   <i className="far fa-eye"></i>
                </button>
              </div>`;
file = file.replace(/<div className="floating-actions">[\s\S]*?<\/div>\s*<div className="hover-actions">/, 
  floatingActions + '\n\n              <div className="hover-actions">');

// 5. Build Quick View Modal
const quickViewModal = `
          {/* Quick View Modal */}
          <div className={\`overlay \$\{quickViewProduct ? 'active' : ''\}\`} onClick={() => setQuickViewProduct(null)} style={{zIndex:2005}}></div>
          <div className={\`modal-center \$\{quickViewProduct ? 'active' : ''\}\`} style={{width: 800, maxWidth:'95vw', padding:30, zIndex:2006}}>
             <button className="modal-close" onClick={() => setQuickViewProduct(null)}><i className="fas fa-times"></i></button>
             {quickViewProduct && (
                 <div style={{display:'flex', gap: 30, flexWrap:'wrap'}}>
                    <img src={quickViewProduct.images?.[0] || 'https://via.placeholder.com/400'} style={{width:'40%', minWidth:250, height:400, objectFit:'cover', borderRadius:4}} />
                    <div style={{flex:1, minWidth:300}}>
                       <div style={{fontWeight:700, color:'var(--text-light)', fontSize:'0.85rem'}}>{quickViewProduct.brand}</div>
                       <h2 style={{fontFamily:'var(--font-brand)', fontSize:'2rem', marginBottom:15}}>{quickViewProduct.name}</h2>
                       <div style={{display:'flex', alignItems:'center', gap:15, marginBottom:20}}>
                          <span style={{fontSize:'1.5rem', fontWeight:700}}>₹{quickViewProduct.price}</span>
                          {quickViewProduct.originalPrice > quickViewProduct.price && <span style={{textDecoration:'line-through', color:'var(--text-light)'}}>₹{quickViewProduct.originalPrice}</span>}
                       </div>
                       <p style={{color:'var(--text-light)', lineHeight:1.6, marginBottom:20}}>{quickViewProduct.description || 'Premium quality fashion piece designed for ultimate comfort and statement style. Elevate your wardrobe instantly.'}</p>
                       <button className="btn btn-solid btn-block" onClick={(e) => { addToBag(quickViewProduct, e); setQuickViewProduct(null); }}>Add to Bag</button>
                    </div>
                 </div>
             )}
          </div>
`;
file = file.replace('{/* Cart Drawer */}', quickViewModal + '\n\n          {/* Cart Drawer */}');


// 6. HandleAdminSubmit FormData refactor
const oldHandleAdminSubmit = /const handleAdminSubmit = async \(e\) => \{[\s\S]*?fetchProducts\(\);\n          setAdminForm\(defaultAdminForm\);\n.*?alert\(.*?\);\n        \} catch \(err\) \{/;
const newHandleAdminSubmit = `const handleAdminSubmit = async (e) => {
        e.preventDefault();
        const isEdit = !!adminForm._id;
        const url = isEdit ? \`\$\{API_URL\}/api/products/\$\{adminForm._id\}\` : \`\$\{API_URL\}/api/products\`;
        
        let p = Number(adminForm.price);
        let op = Number(adminForm.originalPrice);
        const discount = op > p ? Math.round(((op - p) / op) * 100) : 0;

        const formData = new FormData();
        formData.append('name', adminForm.name);
        formData.append('brand', adminForm.brand);
        formData.append('category', adminForm.category);
        formData.append('price', p);
        formData.append('originalPrice', op);
        formData.append('discount', discount);
        if(adminForm.tags) formData.append('tags', adminForm.tags);
        if(adminForm.images) formData.append('images', adminForm.images);

        const fileInput = document.getElementById('admin-file-upload');
        if(fileInput && fileInput.files.length > 0) {
           for(let i=0; i<fileInput.files.length; i++){
               formData.append('images', fileInput.files[i]);
           }
        }

        try {
          const res = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Authorization': \`Bearer \$\{token\}\` },
            body: formData
          });
          const updatedProduct = await res.json();
          if(updatedProduct.error) throw new Error(updatedProduct.error);

          fetchProducts();
          setAdminForm(defaultAdminForm);
          if(fileInput) fileInput.value = '';
          alert(\`Product \$\{isEdit ? 'updated' : 'created'\} successfully!\`);
        } catch (err) {`;

file = file.replace(oldHandleAdminSubmit, newHandleAdminSubmit);

// 7. Handle Settings API Submission
const settingsApiHandler = `
      const handleSettingsSubmit = async (e) => {
         e.preventDefault();
         try {
             await fetch(\`\$\{API_URL\}/api/settings\`, {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json', 'Authorization': \`Bearer \$\{token\}\` },
                 body: JSON.stringify(settingsForm)
             });
             setSystemSettings(settingsForm);
             alert("Homepage Images Updated Successfully!");
         } catch(e) { alert(e.message); }
      };

      const handleSettingsUpload = async (e, key) => {
         const file = e.target.files[0];
         if(!file) return;
         const fd = new FormData(); fd.append('images', file);
         try {
             const res = await fetch(\`\$\{API_URL\}/api/upload\`, { method: 'POST', headers: { 'Authorization': \`Bearer \$\{token\}\` }, body: fd });
             const data = await res.json();
             if(data.urls) setSettingsForm({...settingsForm, [key]: data.urls[0]});
         } catch(err) { alert(err.message); }
      };
      
      const handleAdminSubmit`;
file = file.replace('const handleAdminSubmit', settingsApiHandler);


// 8. Overhaul Admin Modal UI
const oldAdminModalBody = /<div className="admin-modal-body">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;

const newAdminModalBody = `<div className="admin-modal-body" style={{flexDirection:'column'}}>
                 <div style={{display:'flex', width:'100%', background:'#eee', borderBottom:'1px solid var(--border)'}}>
                    <button style={{padding:'15px 30px', fontWeight:600, background: adminTab === 'products' ? '#fff' : 'transparent', color: adminTab === 'products' ? 'var(--primary)' : 'var(--secondary)'}} onClick={() => setAdminTab('products')}>Products Management</button>
                    <button style={{padding:'15px 30px', fontWeight:600, background: adminTab === 'settings' ? '#fff' : 'transparent', color: adminTab === 'settings' ? 'var(--primary)' : 'var(--secondary)'}} onClick={() => setAdminTab('settings')}>Homepage Layout Settings</button>
                 </div>
                 
                 {adminTab === 'products' && (
                 <div style={{display:'flex', flex:1, overflow:'hidden'}}>
                    <div style={{width: '40%', padding: '30px', borderRight: '1px solid var(--border)', overflowY: 'auto', background:'#fff'}}>
                       <h3 style={{marginBottom: 20}}>{adminForm._id ? 'Edit Product' : 'Add New Product'}</h3>
                       <form onSubmit={handleAdminSubmit}>
                         <div className="form-group"><label className="form-label">Name</label><input className="form-input" value={adminForm.name} onChange={e => setAdminForm({...adminForm, name: e.target.value})} required/></div>
                         <div className="form-group"><label className="form-label">Brand</label><input className="form-input" value={adminForm.brand} onChange={e => setAdminForm({...adminForm, brand: e.target.value})} required/></div>
                         <div className="form-group"><label className="form-label">Category</label>
                            <select className="form-input" value={adminForm.category} onChange={e => setAdminForm({...adminForm, category: e.target.value})}>
                              <option value="men">Men's Wear</option><option value="women">Women's Wear</option><option value="kids">Kids Wear</option>
                            </select>
                         </div>
                         <div style={{display:'flex', gap:10}}>
                           <div className="form-group" style={{flex:1}}><label className="form-label">Selling Price (₹)</label><input type="number" className="form-input" value={adminForm.price} onChange={e => setAdminForm({...adminForm, price: e.target.value})} required/></div>
                           <div className="form-group" style={{flex:1}}><label className="form-label">Original Price (₹)</label><input type="number" className="form-input" value={adminForm.originalPrice} onChange={e => setAdminForm({...adminForm, originalPrice: e.target.value})} required/></div>
                         </div>
                         
                         <div className="form-group">
                           <label className="form-label">Product Images (URLs or File Upload)</label>
                           <input type="text" className="form-input" style={{marginBottom: 8}} placeholder="Image URL (comma separated if multiple)" value={adminForm.images} onChange={e => setAdminForm({...adminForm, images: e.target.value})}/>
                           <div style={{fontSize:'0.85rem', fontWeight:600, margin:'5px 0'}}>OR</div>
                           <input type="file" id="admin-file-upload" className="form-input" multiple accept="image/*" />
                         </div>

                         <div className="form-group">
                           <label className="form-label">Product Flags (Tags)</label>
                           <div style={{display:'flex', gap: 15, flexWrap:'wrap'}}>
                              <label style={{fontSize:'0.85rem'}}><input type="checkbox" checked={adminForm.tags?.includes('trending')} onChange={e => {
                                  const tg = adminForm.tags ? adminForm.tags.split(',').map(s=>s.trim()).filter(Boolean) : [];
                                  if(e.target.checked) tg.push('trending'); else { const idx = tg.indexOf('trending'); if(idx>-1) tg.splice(idx, 1); }
                                  setAdminForm({...adminForm, tags: tg.join(',')});
                              }} /> Trending Now</label>
                              <label style={{fontSize:'0.85rem'}}><input type="checkbox" checked={adminForm.tags?.includes('new')} onChange={e => {
                                  const tg = adminForm.tags ? adminForm.tags.split(',').map(s=>s.trim()).filter(Boolean) : [];
                                  if(e.target.checked) tg.push('new'); else { const idx = tg.indexOf('new'); if(idx>-1) tg.splice(idx, 1); }
                                  setAdminForm({...adminForm, tags: tg.join(',')});
                              }} /> New Arrival</label>
                              <label style={{fontSize:'0.85rem'}}><input type="checkbox" checked={adminForm.tags?.includes('bestseller')} onChange={e => {
                                  const tg = adminForm.tags ? adminForm.tags.split(',').map(s=>s.trim()).filter(Boolean) : [];
                                  if(e.target.checked) tg.push('bestseller'); else { const idx = tg.indexOf('bestseller'); if(idx>-1) tg.splice(idx, 1); }
                                  setAdminForm({...adminForm, tags: tg.join(',')});
                              }} /> Bestseller</label>
                           </div>
                         </div>
                         
                         <button type="submit" className="btn btn-solid" style={{width: '100%', padding: '15px'}}>{adminForm._id ? 'Update Product' : 'Create Product'}</button>
                         {adminForm._id && <button type="button" className="btn btn-outline" style={{width: '100%', padding: '15px', marginTop: 10}} onClick={() => setAdminForm({ _id: null, name: '', brand: '', category: 'men', price: '', originalPrice: '', images: '', tags: '' })}>Cancel Edit</button>}
                       </form>
                    </div>
                    <div style={{width: '60%', padding: '30px', overflowY: 'auto', background:'var(--bg-alt)'}}>
                       <h3 style={{marginBottom: 20}}>Product Inventory ({products.length})</h3>
                       <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '15px'}}>
                         {products.map(p => (
                            <div key={p._id} style={{display:'flex', alignItems:'center', background:'#fff', padding:'15px', borderRadius:'var(--radius)', border:'1px solid var(--border)'}}>
                               <img src={p.images?.[0]} style={{width: 60, height: 60, objectFit:'cover', borderRadius: 4, marginRight: 15}}/>
                               <div style={{flex: 1}}>
                                  <div style={{fontWeight:600}}>{p.name}</div>
                                  <div style={{fontSize: '0.85rem', color: 'var(--text-light)', marginTop:4}}>{p.brand} • {p.category} • ₹{p.price}</div>
                                  <div style={{fontSize: '0.75rem', color: 'var(--primary)', marginTop:4, textTransform:'uppercase'}}>{p.tags?.join(', ')}</div>
                               </div>
                               <button className="icon-btn" style={{marginRight: 10}} onClick={() => { setAdminTab('products'); setAdminForm({_id: p._id, name: p.name||'', brand: p.brand||'', category: p.category||'men', price: p.price||'', originalPrice: p.originalPrice||'', images: p.images?.join(', ')||'', tags: p.tags?.join(', ')||''}); }} title="Edit"><i className="fas fa-pen"></i></button>
                               <button className="icon-btn" onClick={() => deleteProduct(p._id)} title="Delete"><i className="fas fa-trash" style={{color: 'var(--primary)'}}></i></button>
                            </div>
                         ))}
                       </div>
                    </div>
                 </div>)}

                 {adminTab === 'settings' && (
                    <div style={{padding: '40px', overflowY:'auto', background:'#fff', flex:1}}>
                       <h3 style={{marginBottom: 30, fontSize:'1.5rem', borderBottom:'1px solid var(--border)', paddingBottom:15}}>Homepage Layout Configuration</h3>
                       <form onSubmit={handleSettingsSubmit} style={{maxWidth: 800}}>
                          
                          <h4 style={{marginTop: 30, marginBottom: 15, color:'var(--primary)'}}>Hero Slider Images (1920x1080)</h4>
                          {['hero1', 'hero2', 'hero3'].map((key, i) => (
                             <div className="form-group" style={{display:'flex', gap: 15, alignItems:'center'}} key={key}>
                                <div style={{width: 100}}>Slide \${i+1}</div>
                                <input className="form-input" style={{flex:1}} value={settingsForm[key]} onChange={e => setSettingsForm({...settingsForm, [key]: e.target.value})} placeholder="Image URL"/>
                                <input type="file" accept="image/*" onChange={(e) => handleSettingsUpload(e, key)} />
                             </div>
                          ))}

                          <h4 style={{marginTop: 40, marginBottom: 15, color:'var(--primary)'}}>Category Banners</h4>
                          {['menCat', 'womenCat', 'kidsCat'].map((key) => (
                             <div className="form-group" style={{display:'flex', gap: 15, alignItems:'center'}} key={key}>
                                <div style={{width: 100, textTransform:'capitalize'}}>\${key.replace('Cat', '')}</div>
                                <input className="form-input" style={{flex:1}} value={settingsForm[key]} onChange={e => setSettingsForm({...settingsForm, [key]: e.target.value})} placeholder="Image URL"/>
                                <input type="file" accept="image/*" onChange={(e) => handleSettingsUpload(e, key)} />
                             </div>
                          ))}

                          <h4 style={{marginTop: 40, marginBottom: 15, color:'var(--primary)'}}>Customer Gallery Highlights</h4>
                          {['custPhoto1', 'custPhoto2', 'custPhoto3', 'custPhoto4'].map((key, i) => (
                             <div className="form-group" style={{display:'flex', gap: 15, alignItems:'center'}} key={key}>
                                <div style={{width: 100}}>Photo \${i+1}</div>
                                <input className="form-input" style={{flex:1}} value={settingsForm[key]} onChange={e => setSettingsForm({...settingsForm, [key]: e.target.value})} placeholder="Image URL"/>
                                <input type="file" accept="image/*" onChange={(e) => handleSettingsUpload(e, key)} />
                             </div>
                          ))}

                          <button type="submit" className="btn btn-solid" style={{marginTop: 40, padding:'15px 30px', fontSize:'1.1rem'}}>Save Homepage Configuration</button>
                       </form>
                    </div>
                 )}

              </div>
           </div>
        </div>
      </div>
    );
`;

file = file.replace(oldAdminModalBody, newAdminModalBody);


fs.writeFileSync('new_index.html', file);
console.log('Successfully completed new_index.html generation step!');
