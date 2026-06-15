import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome, FiList } from 'react-icons/fi';
import { getOrderByIdAPI } from '../api/ordersAPI';
import Loader from '../components/Loader';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

const OrderConfirmation = () => {
  const { id } = useParams(); const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getOrderByIdAPI(id).then(setOrder).catch(console.error).finally(() => setLoading(false)); }, [id]);

  if (loading) return <div className="page-wrapper"><Loader /></div>;

  return (
    <div className="page-wrapper" style={{ paddingTop:100 }}>
      <div className="container" style={{ maxWidth:680, paddingBottom:'4rem' }}>
        <div className="text-center" style={{ marginBottom:'2rem' }}>
          <div className="animate-scale-in" style={{ width:80, height:80, background:'rgba(16,185,129,.15)', border:'2px solid rgba(16,185,129,.4)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.5rem', animation:'glowPulse 2s ease-in-out infinite' }}>
            <FiCheckCircle size={38} color="#34d399" />
          </div>
          <h1 style={{ fontSize:'clamp(1.5rem,4vw,2.25rem)', fontWeight:900, marginBottom:'.5rem' }}>Order <span className="text-gradient">Confirmed!</span></h1>
          <p style={{ color:'var(--text-secondary)', fontSize:'1.05rem' }}>Thank you for shopping with ShopEZ!</p>
        </div>

        {order && (
          <>
            <div className="card" style={{ marginBottom:'1.25rem', textAlign:'center', background:'rgba(124,58,237,.05)', border:'1px solid rgba(124,58,237,.2)' }}>
              <div style={{ fontSize:'.8rem', color:'var(--text-secondary)', marginBottom:'.25rem' }}>Order ID</div>
              <div style={{ fontSize:'1rem', fontWeight:700, fontFamily:'monospace', color:'var(--primary-light)' }}>#{order._id}</div>
              <div style={{ marginTop:'.5rem', fontSize:'.8rem', color:'var(--text-muted)' }}>
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}
              </div>
            </div>

            <div className="card" style={{ marginBottom:'1.25rem' }}>
              <h3 style={{ marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'.5rem', fontWeight:600 }}><FiPackage color="var(--primary-light)" /> Order Items</h3>
              {order.items.map((item,i) => (
                <div key={i} style={{ display:'flex', gap:'1rem', alignItems:'center', paddingBottom:i<order.items.length-1?'1rem':0, marginBottom:i<order.items.length-1?'1rem':0, borderBottom:i<order.items.length-1?'1px solid var(--border)':'none' }}>
                  <img src={item.image} alt={item.name} style={{ width:52, height:52, borderRadius:'var(--radius-md)', objectFit:'cover', flexShrink:0 }} />
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:600, fontSize:'.875rem' }}>{item.name}</div>
                    <div style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight:700, color:'var(--primary-light)' }}>{fmt(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'2rem' }}>
              <div className="card">
                <h4 style={{ marginBottom:'.875rem', fontSize:'.8rem', fontWeight:700, textTransform:'uppercase', color:'var(--text-secondary)' }}>Shipping To</h4>
                <div style={{ fontSize:'.875rem', color:'var(--text-secondary)', lineHeight:1.8 }}>
                  <div style={{ color:'var(--text-primary)', fontWeight:600 }}>{order.shippingAddress.fullName}</div>
                  <div>{order.shippingAddress.phone}</div>
                  <div>{order.shippingAddress.street}</div>
                  <div>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</div>
                </div>
              </div>
              <div className="card">
                <h4 style={{ marginBottom:'.875rem', fontSize:'.8rem', fontWeight:700, textTransform:'uppercase', color:'var(--text-secondary)' }}>Payment</h4>
                <div style={{ fontSize:'.875rem', display:'flex', flexDirection:'column', gap:'.5rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text-secondary)' }}><span>Method</span><span style={{ color:'var(--text-primary)' }}>{order.paymentMethod}</span></div>
                  <div style={{ display:'flex', justifyContent:'space-between', color:'var(--text-secondary)' }}><span>Status</span><span className={`badge status-${order.status.toLowerCase()}`}>{order.status}</span></div>
                  <div className="divider" />
                  <div style={{ display:'flex', justifyContent:'space-between', fontWeight:700, fontSize:'1rem' }}>
                    <span>Total</span>
                    <span style={{ background:'var(--gradient-primary)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{fmt(order.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display:'flex', gap:'1rem', justifyContent:'center' }}>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/')}><FiHome size={18} /> Back to Home</button>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/profile')}><FiList size={18} /> My Orders</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
