import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCreditCard, FiSmartphone, FiDollarSign } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderAPI } from '../api/ordersAPI';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);
const PAYMENTS = [
  { id:'Credit Card', icon:FiCreditCard, label:'Credit / Debit Card' },
  { id:'UPI', icon:FiSmartphone, label:'UPI Payment' },
  { id:'Net Banking', icon:FiDollarSign, label:'Net Banking' },
  { id:'Cash on Delivery', icon:FiDollarSign, label:'Cash on Delivery' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [payment, setPayment] = useState('Credit Card');
  const [addr, setAddr] = useState({ fullName:user?.name||'', phone:user?.phone||'', street:user?.address?.street||'', city:user?.address?.city||'', state:user?.address?.state||'', pincode:user?.address?.pincode||'', country:'India' });

  const items = cart?.items || [];
  const shipping = cartTotal > 499 ? 0 : 49;
  const total = cartTotal + shipping;

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!items.length) { setError('Cart is empty'); return; }
    setLoading(true); setError('');
    try {
      const order = await createOrderAPI({
        items: items.map(i => ({ product:i.product._id, name:i.product.name, image:i.product.image, price:i.product.price, quantity:i.quantity })),
        shippingAddress: addr, paymentMethod: payment, itemsPrice: cartTotal, shippingPrice: shipping, totalPrice: total
      });
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) { setError(err.response?.data?.message || 'Failed to place order'); } finally { setLoading(false); }
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>Secure <span className="text-gradient">Checkout</span></h1>
        <p>Complete your purchase securely</p>
      </div>
      <div className="container" style={{ paddingBottom:'4rem' }}>
        <form onSubmit={handleOrder}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:'1.5rem', alignItems:'start' }}>
            <div>
              {/* Shipping */}
              <div className="card" style={{ marginBottom:'1.25rem' }}>
                <h2 style={{ fontSize:'1.15rem', fontWeight:700, marginBottom:'1.5rem' }}>📦 Shipping Address</h2>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  {[['fullName','Full Name','text'],['phone','Phone Number','tel']].map(([k,l,t]) => (
                    <div key={k} className="form-group"><label className="form-label">{l} *</label><input className="form-input" type={t} value={addr[k]} onChange={(e) => setAddr({...addr,[k]:e.target.value})} required /></div>
                  ))}
                </div>
                <div className="form-group"><label className="form-label">Street Address *</label><input className="form-input" value={addr.street} onChange={(e) => setAddr({...addr,street:e.target.value})} placeholder="House No., Street, Area" required /></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                  {[['city','City'],['state','State'],['pincode','Pincode']].map(([k,l]) => (
                    <div key={k} className="form-group"><label className="form-label">{l} *</label><input className="form-input" value={addr[k]} onChange={(e) => setAddr({...addr,[k]:e.target.value})} required /></div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="card">
                <h2 style={{ fontSize:'1.15rem', fontWeight:700, marginBottom:'1.5rem' }}>💳 Payment Method</h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'.875rem' }}>
                  {PAYMENTS.map(m => (
                    <div key={m.id} onClick={() => setPayment(m.id)} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', border:`2px solid ${payment===m.id?'var(--primary)':'var(--border)'}`, borderRadius:'var(--radius-md)', cursor:'pointer', background:payment===m.id?'rgba(124,58,237,.1)':'var(--bg-glass)', transition:'all var(--transition)' }}>
                      <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${payment===m.id?'var(--primary)':'var(--border)'}`, background:payment===m.id?'var(--primary)':'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        {payment===m.id && <div style={{ width:7, height:7, borderRadius:'50%', background:'#fff' }} />}
                      </div>
                      <m.icon size={18} color={payment===m.id?'var(--primary-light)':'var(--text-secondary)'} />
                      <span style={{ fontWeight:500, color:payment===m.id?'var(--text-primary)':'var(--text-secondary)' }}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="order-summary" style={{ position:'sticky', top:90 }}>
              <h3 style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'1.25rem' }}>Order Summary</h3>
              <div style={{ maxHeight:220, overflowY:'auto', marginBottom:'1rem' }}>
                {items.map(item => (
                  <div key={item._id} style={{ display:'flex', gap:'.75rem', alignItems:'center', paddingBottom:'.875rem', borderBottom:'1px solid var(--border)', marginBottom:'.875rem' }}>
                    <img src={item.product?.image} alt="" style={{ width:44, height:44, borderRadius:'var(--radius-sm)', objectFit:'cover', flexShrink:0 }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:'.8rem', fontWeight:600 }}>{item.product?.name}</div>
                      <div style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>×{item.quantity}</div>
                    </div>
                    <div style={{ fontSize:'.875rem', fontWeight:700 }}>{fmt((item.product?.price||0)*item.quantity)}</div>
                  </div>
                ))}
              </div>
              <div className="summary-row"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
              <div className="summary-row"><span>Shipping</span><span style={{ color:shipping===0?'#34d399':'inherit' }}>{shipping===0?'FREE':fmt(shipping)}</span></div>
              <div className="summary-row total"><span>Total</span><span style={{ background:'var(--gradient-primary)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{fmt(total)}</span></div>
              {error && <div className="alert alert-error" style={{ margin:'1rem 0' }}>{error}</div>}
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop:'1.25rem', padding:'.875rem', fontSize:'1rem' }} disabled={loading}>
                {loading ? 'Placing Order...' : `Place Order · ${fmt(total)}`}
              </button>
              <div style={{ marginTop:'.875rem', textAlign:'center', fontSize:'.75rem', color:'var(--text-muted)' }}>🔒 Your payment information is secure</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
