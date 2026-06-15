import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiShield, FiTruck, FiPackage } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import Loader from '../components/Loader';
import { getProductByIdAPI, createReviewAPI } from '../api/productsAPI';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

const ProductDetail = () => {
  const { id } = useParams(); const navigate = useNavigate();
  const { addToCart } = useCart(); const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [cartMsg, setCartMsg] = useState('');
  const [rRating, setRRating] = useState(5);
  const [rComment, setRComment] = useState('');
  const [rSubmitting, setRSubmitting] = useState(false);
  const [rMsg, setRMsg] = useState('');

  useEffect(() => {
    getProductByIdAPI(id).then(setProduct).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) { navigate('/login'); return; }
    setAdding(true);
    try { await addToCart(product._id, qty); setCartMsg('✅ Added to cart!'); setTimeout(() => setCartMsg(''), 2500); }
    catch { setCartMsg('Failed to add'); } finally { setAdding(false); }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    setRSubmitting(true);
    try {
      await createReviewAPI(id, { rating: rRating, comment: rComment });
      setRMsg('✅ Review submitted!');
      setProduct(await getProductByIdAPI(id));
      setRComment('');
    } catch (err) { setRMsg(err.response?.data?.message || 'Failed'); } finally { setRSubmitting(false); }
  };

  if (loading) return <div className="page-wrapper"><Loader /></div>;
  if (!product) return <div className="page-wrapper"><div className="container" style={{paddingTop:'4rem'}}>Product not found.</div></div>;

  return (
    <div className="page-wrapper">
      <div className="container" style={{ paddingTop:'2rem', paddingBottom:'4rem' }}>
        <button className="btn btn-secondary btn-sm" onClick={() => navigate(-1)} style={{ marginBottom:'1.5rem' }}>
          <FiArrowLeft size={14} /> Back
        </button>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'3rem' }}>
          {/* Image */}
          <div style={{ borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--border)', background:'var(--bg-glass)', aspectRatio:'1' }}>
            <img src={product.image} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>

          {/* Info */}
          <div>
            <div style={{ marginBottom:'.75rem' }}>
              <span className="badge badge-primary">{product.category}</span>
              {product.discount > 0 && <span className="badge" style={{ background:'var(--gradient-primary)', color:'#fff', marginLeft:'.5rem' }}>{product.discount}% OFF</span>}
            </div>
            <h1 style={{ fontSize:'clamp(1.25rem,3vw,2rem)', fontWeight:800, marginBottom:'.875rem', lineHeight:1.2 }}>{product.name}</h1>
            {product.brand && <div style={{ color:'var(--text-muted)', fontSize:'.875rem', marginBottom:'.875rem' }}>Brand: <span style={{ color:'var(--primary-light)' }}>{product.brand}</span></div>}
            <div style={{ display:'flex', alignItems:'center', gap:'.875rem', marginBottom:'1.25rem' }}>
              <StarRating rating={product.rating} size="lg" />
              <span style={{ color:'var(--text-secondary)', fontSize:'.875rem' }}>{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>
            <div style={{ display:'flex', alignItems:'baseline', gap:'.875rem', marginBottom:'1.25rem' }}>
              <span style={{ fontSize:'2rem', fontWeight:900, background:'var(--gradient-primary)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{fmt(product.price)}</span>
              {product.originalPrice > product.price && <span style={{ color:'var(--text-muted)', textDecoration:'line-through' }}>{fmt(product.originalPrice)}</span>}
            </div>
            <p style={{ color:'var(--text-secondary)', lineHeight:1.8, marginBottom:'1.25rem' }}>{product.description}</p>
            <div style={{ display:'flex', alignItems:'center', gap:'.75rem', padding:'.875rem', background:'var(--bg-glass)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', marginBottom:'1.25rem' }}>
              <FiPackage color="var(--primary-light)" size={16} />
              <span style={{ fontSize:'.875rem', color: product.stock > 0 ? '#34d399' : 'var(--danger)', fontWeight:600 }}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
                <span style={{ fontSize:'.875rem', fontWeight:600, color:'var(--text-secondary)' }}>Qty:</span>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty(Math.max(1,qty-1))}>−</button>
                  <span className="qty-value">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty(Math.min(product.stock,qty+1))}>+</button>
                </div>
              </div>
            )}

            {cartMsg && <div className="alert alert-success" style={{ marginBottom:'1rem' }}>{cartMsg}</div>}
            <div style={{ display:'flex', gap:'1rem', marginBottom:'1.25rem' }}>
              <button className="btn btn-primary btn-lg" style={{ flex:1 }} onClick={handleAddToCart} disabled={adding || product.stock === 0}>
                <FiShoppingCart size={18} />{adding ? 'Adding...' : 'Add to Cart'}
              </button>
              <button className="btn btn-secondary btn-lg" style={{ flex:1 }} onClick={() => { handleAddToCart(); navigate('/cart'); }} disabled={product.stock === 0}>
                Shop Now
              </button>
            </div>
            <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
              {[[FiShield,'Secure Payment'],[FiTruck,'Free Delivery'],[FiPackage,'Easy Returns']].map(([I,t],i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'.375rem', fontSize:'.8rem', color:'var(--text-secondary)' }}><I size={13} color="var(--primary-light)" />{t}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div style={{ marginTop:'4rem' }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:700, marginBottom:'2rem' }}>Customer <span className="text-gradient">Reviews</span></h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem' }}>
            <div className="card">
              <h3 style={{ marginBottom:'1.25rem', fontWeight:600 }}>Write a Review</h3>
              {!user ? (
                <p style={{ color:'var(--text-secondary)' }}>Please <span style={{ color:'var(--primary-light)', cursor:'pointer' }} onClick={() => navigate('/login')}>login</span> to write a review.</p>
              ) : (
                <form onSubmit={handleReview}>
                  <div className="form-group">
                    <label className="form-label">Your Rating</label>
                    <div style={{ display:'flex', gap:'.375rem' }}>
                      {[1,2,3,4,5].map(r => <FaStar key={r} size={24} color={r<=rRating?'#fbbf24':'var(--text-muted)'} style={{ cursor:'pointer' }} onClick={() => setRRating(r)} />)}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Comment</label>
                    <textarea className="form-textarea" placeholder="Share your experience..." value={rComment} onChange={(e) => setRComment(e.target.value)} required />
                  </div>
                  {rMsg && <div className={`alert ${rMsg.includes('✅')?'alert-success':'alert-error'}`} style={{ marginBottom:'1rem' }}>{rMsg}</div>}
                  <button type="submit" className="btn btn-primary w-full" disabled={rSubmitting}>{rSubmitting?'Submitting...':'Submit Review'}</button>
                </form>
              )}
            </div>
            <div style={{ maxHeight:400, overflowY:'auto', display:'flex', flexDirection:'column', gap:'.875rem' }}>
              {product.reviews.length === 0 ? (
                <div className="empty-state"><div className="empty-icon">💬</div><p className="empty-text">No reviews yet. Be the first!</p></div>
              ) : product.reviews.map(r => (
                <div key={r._id} className="card" style={{ padding:'1rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.375rem' }}>
                    <span style={{ fontWeight:600, fontSize:'.875rem' }}>{r.name}</span>
                    <span style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                  </div>
                  <StarRating rating={r.rating} size="sm" />
                  <p style={{ color:'var(--text-secondary)', fontSize:'.875rem', marginTop:'.5rem' }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
