import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiShield, FiRefreshCw, FiHeadphones, FiTruck } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getFeaturedProductsAPI } from '../api/productsAPI';

const CATEGORIES = [
  { name:'Electronics', icon:'📱' }, { name:'Fashion', icon:'👗' },
  { name:'Home & Kitchen', icon:'🏠' }, { name:'Sports', icon:'⚽' },
  { name:'Beauty', icon:'💄' }, { name:'Books', icon:'📚' },
];

const FEATURES = [
  { icon:FiTruck, title:'Free Shipping', desc:'On orders above ₹499' },
  { icon:FiShield, title:'Secure Payment', desc:'100% secure transactions' },
  { icon:FiRefreshCw, title:'Easy Returns', desc:'30-day return policy' },
  { icon:FiHeadphones, title:'24/7 Support', desc:'Dedicated customer care' },
];

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProductsAPI().then(setProducts).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" /><div className="hero-orb hero-orb-2" /><div className="hero-orb hero-orb-3" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge"><FiShoppingBag size={14} /> India's Smartest Shopping Destination</div>
            <h1 className="hero-title">Everything You <span className="text-gradient">Love</span>,<br />Delivered to Your <span className="text-gradient">Door</span></h1>
            <p className="hero-subtitle">From the latest electronics to trendy fashion — shop thousands of products at unbeatable prices with lightning-fast delivery and easy returns.</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}>Start Shopping <FiArrowRight size={18} /></button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/register')}>Join ShopEZ Free</button>
            </div>
            <div className="hero-stats">
              {[['32+','Products'],['10K+','Happy Customers'],['100%','Secure Payments']].map(([v,l]) => (
                <div key={l} className="hero-stat"><span className="hero-stat-value">{v}</span><span className="hero-stat-label">{l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" style={{ paddingBottom:0 }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom:'2rem' }}>
            <h2 className="section-title">Shop by <span className="text-gradient">Category</span></h2>
            <p className="section-subtitle">Explore our wide range of product categories</p>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat,i) => (
              <div key={cat.name} className={`category-card animate-fade-in stagger-${i+1}`} onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}>
                <div className="category-icon">{cat.icon}</div>
                <div className="category-name">{cat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'2rem' }}>
            <div>
              <h2 className="section-title">Featured <span className="text-gradient">Products</span></h2>
              <p style={{ color:'var(--text-secondary)' }}>Handpicked deals just for you</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate('/products')}>View All <FiArrowRight size={15} /></button>
          </div>
          {loading ? <Loader /> : (
            <div className="products-grid">
              {products.map((p,i) => (
                <div key={p._id} className="animate-fade-in" style={{ animationDelay:`${i*0.07}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section style={{ background:'rgba(124,58,237,.03)', borderTop:'1px solid var(--border)', borderBottom:'1px solid var(--border)', padding:'3rem 0' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2rem' }}>
            {FEATURES.map((f,i) => (
              <div key={i} className="animate-fade-in" style={{ textAlign:'center', animationDelay:`${i*0.1}s` }}>
                <div style={{ width:64, height:64, background:'rgba(124,58,237,.1)', border:'1px solid rgba(124,58,237,.2)', borderRadius:'var(--radius-lg)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', color:'var(--primary-light)' }}>
                  <f.icon size={26} />
                </div>
                <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'.25rem' }}>{f.title}</h3>
                <p style={{ fontSize:'.875rem', color:'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div style={{ background:'linear-gradient(135deg,rgba(124,58,237,.2),rgba(236,72,153,.15))', border:'1px solid rgba(124,58,237,.3)', borderRadius:'var(--radius-xl)', padding:'4rem 3rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200, background:'rgba(124,58,237,.2)', borderRadius:'50%', filter:'blur(60px)' }} />
            <div style={{ position:'absolute', bottom:-50, left:-50, width:200, height:200, background:'rgba(236,72,153,.2)', borderRadius:'50%', filter:'blur(60px)' }} />
            <h2 style={{ fontSize:'clamp(1.5rem,4vw,2.5rem)', fontWeight:900, marginBottom:'.875rem', position:'relative' }}>Ready to Start <span className="text-gradient">Shopping?</span></h2>
            <p style={{ color:'var(--text-secondary)', fontSize:'1.1rem', marginBottom:'2rem', position:'relative' }}>Join millions of happy customers and discover amazing deals today.</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', position:'relative' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>Get Started Free <FiArrowRight size={18} /></button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/products')}>Browse Products</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
