import React, { useEffect, useState } from 'react';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiRefreshCw } from 'react-icons/fi';
import { getAdminStatsAPI } from '../../api/adminAPI';
import Loader from '../../components/Loader';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getAdminStatsAPI().then(setStats).catch(console.error).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  const CARDS = [
    { label:'Total Users', value:stats?.totalUsers||0, icon:FiUsers, color:'#7c3aed' },
    { label:'Total Products', value:stats?.totalProducts||0, icon:FiPackage, color:'#ec4899' },
    { label:'Total Orders', value:stats?.totalOrders||0, icon:FiShoppingBag, color:'#06b6d4' },
    { label:'Total Revenue', value:fmt(stats?.totalRevenue||0), icon:FiDollarSign, color:'#10b981' },
  ];

  const STATUS_COLORS = { Pending:'#fbbf24', Processing:'#22d3ee', Shipped:'var(--primary-light)', Delivered:'#34d399', Cancelled:'#f87171' };

  return (
    <div>
      <div className="admin-header">
        <h1>📊 Dashboard</h1>
        <button className="btn btn-secondary btn-sm" onClick={() => window.location.reload()}><FiRefreshCw size={13} /> Refresh</button>
      </div>

      <div className="stats-grid">
        {CARDS.map((card,i) => (
          <div key={i} className="stat-card animate-fade-in" style={{ animationDelay:`${i*0.1}s` }}>
            <div style={{ position:'absolute', top:-20, right:-20, width:80, height:80, background:card.color, borderRadius:'50%', opacity:.1 }} />
            <div className="stat-card-icon"><card.icon size={28} color={card.color} /></div>
            <div className="stat-card-value" style={{ background:`linear-gradient(135deg,${card.color},${card.color}99)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{card.value}</div>
            <div className="stat-card-label">{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem' }}>
        {/* Recent Orders */}
        <div>
          <h2 style={{ fontSize:'1.15rem', fontWeight:700, marginBottom:'1rem' }}>Recent Orders</h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead><tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {(stats?.recentOrders||[]).map(o => (
                  <tr key={o._id}>
                    <td style={{ fontFamily:'monospace', fontSize:'.75rem', color:'var(--primary-light)' }}>#{o._id.slice(-6).toUpperCase()}</td>
                    <td style={{ color:'var(--text-primary)', fontWeight:500 }}>{o.user?.name||'N/A'}</td>
                    <td style={{ fontWeight:600, color:'var(--text-primary)' }}>{fmt(o.totalPrice)}</td>
                    <td><span className={`badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                  </tr>
                ))}
                {(!stats?.recentOrders||stats.recentOrders.length===0) && <tr><td colSpan={4} style={{ textAlign:'center', padding:'2rem' }}>No orders yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Status */}
        <div>
          <h2 style={{ fontSize:'1.15rem', fontWeight:700, marginBottom:'1rem' }}>Order Status</h2>
          <div className="card">
            {Object.entries(stats?.ordersByStatus||{}).map(([status, count]) => {
              const total = stats?.totalOrders || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={status} style={{ marginBottom:'1rem' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'.375rem', fontSize:'.875rem' }}>
                    <span style={{ color:'var(--text-secondary)' }}>{status}</span>
                    <span style={{ fontWeight:600, color:STATUS_COLORS[status] }}>{count}</span>
                  </div>
                  <div style={{ height:6, background:'var(--bg-input)', borderRadius:999, overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${pct}%`, background:STATUS_COLORS[status], borderRadius:999, transition:'width 1s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
