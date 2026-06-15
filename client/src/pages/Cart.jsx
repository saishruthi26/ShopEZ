import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, cartTotal, updateItem, removeItem } = useCart();
  const items = cart?.items || [];
  const shipping = cartTotal > 499 ? 0 : 49;

  if (loading) return <div className="page-wrapper"><Loader /></div>;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>My <span className="text-gradient">Cart</span></h1>
        <p>{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
      </div>
      <div className="container" style={{ paddingBottom:'4rem' }}>
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3 className="empty-title">Your Cart is Empty</h3>
            <p className="empty-text">Add some products to your cart to get started.</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/products')}><FiShoppingBag size={18} /> Start Shopping</button>
          </div>
        ) : (
          <div className="cart-layout">
            <div>
              {items.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-img" onClick={() => navigate(`/products/${item.product?._id}`)}>
                    <img src={item.product?.image} alt={item.product?.name} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, marginBottom:'.25rem' }}>{item.product?.name}</div>
                    <div style={{ fontSize:'.75rem', color:'var(--primary-light)', marginBottom:'.5rem' }}>{item.product?.category}</div>
                    <div style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--primary-light)', marginBottom:'.625rem' }}>{fmt(item.product?.price || 0)}</div>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'.5rem' }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => updateItem(item.product?._id, item.quantity - 1)}>−</button>
                        <span className="qty-value">{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateItem(item.product?._id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.product?._id)}><FiTrash2 size={13} /> Remove</button>
                    </div>
                  </div>
                  <div style={{ textAlign:'right', fontWeight:700, fontSize:'1rem', color:'var(--primary-light)', minWidth:90, flexShrink:0 }}>
                    {fmt((item.product?.price || 0) * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <h3 style={{ marginBottom:'1.25rem', fontSize:'1.1rem', fontWeight:700 }}>Order Summary</h3>
              <div className="summary-row"><span>Subtotal ({items.length} items)</span><span>{fmt(cartTotal)}</span></div>
              <div className="summary-row">
                <span>Shipping</span>
                <span style={{ color: shipping===0?'#34d399':'inherit' }}>{shipping===0?'FREE':fmt(shipping)}</span>
              </div>
              {shipping > 0 && <div style={{ fontSize:'.75rem', color:'var(--text-muted)', paddingBottom:'.5rem' }}>Add {fmt(499-cartTotal)} more for free shipping</div>}
              <div className="summary-row total">
                <span>Total</span>
                <span style={{ background:'var(--gradient-primary)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontSize:'1.1rem' }}>{fmt(cartTotal + shipping)}</span>
              </div>
              <button className="btn btn-primary w-full" style={{ marginTop:'1.25rem', padding:'.875rem' }} onClick={() => navigate('/checkout')}>
                Proceed to Checkout <FiArrowRight size={17} />
              </button>
              <button className="btn btn-secondary w-full" style={{ marginTop:'.625rem' }} onClick={() => navigate('/products')}>Continue Shopping</button>
              <div style={{ marginTop:'1rem', padding:'.75rem', background:'rgba(16,185,129,.05)', border:'1px solid rgba(16,185,129,.2)', borderRadius:'var(--radius-md)', fontSize:'.75rem', color:'#34d399', textAlign:'center' }}>
                🔒 Secure checkout powered by ShopEZ
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
