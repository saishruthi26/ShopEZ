import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMyOrdersAPI } from '../api/ordersAPI';
import { FiUser, FiPackage, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import Loader from '../components/Loader';
import api from '../api/axios';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [tab, setTab] = useState('orders');
  const [form, setForm] = useState({ name:user?.name||'', email:user?.email||'', phone:user?.phone||'', address:{ street:user?.address?.street||'', city:user?.address?.city||'', state:user?.address?.state||'', pincode:user?.address?.pincode||'' } });

  useEffect(() => { getMyOrdersAPI().then(setOrders).catch(console.error).finally(() => setLoading(false)); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put('/users/profile', form);
      updateUser(res.data); setEditing(false); setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch { setMsg('Failed to update profile'); } finally { setSaving(false); }
  };

  const TABS = [{ id:'orders', label:'My Orders', icon:FiPackage }, { id:'profile', label:'Edit Profile', icon:FiUser }];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h1>My <span className="text-gradient">Profile</span></h1>
        <p>Manage your account and track your orders</p>
      </div>
      <div className="container" style={{ paddingBottom:'4rem' }}>
        <div style={{ display:'grid', gridTemplateColumns:'280px 1fr', gap:'1.5rem', alignItems:'start' }}>
          <div>
            <div className="card" style={{ textAlign:'center', marginBottom:'.875rem' }}>
              <div style={{ width:72, height:72, background:'var(--gradient-primary)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto .875rem', fontSize:'1.75rem', fontWeight:900, color:'#fff' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3 style={{ fontWeight:700, marginBottom:'.25rem' }}>{user?.name}</h3>
              <div style={{ fontSize:'.875rem', color:'var(--text-secondary)', marginBottom:'.875rem' }}>{user?.email}</div>
              {user?.isAdmin && <span className="badge badge-primary">Admin</span>}
            </div>
            <div className="card" style={{ padding:'.5rem' }}>
              {TABS.map(t => (
                <div key={t.id} onClick={() => setTab(t.id)} style={{ display:'flex', alignItems:'center', gap:'.5rem', padding:'.875rem .75rem', borderRadius:'var(--radius-md)', cursor:'pointer', background:tab===t.id?'rgba(124,58,237,.15)':'transparent', color:tab===t.id?'var(--primary-light)':'var(--text-secondary)', fontWeight:500, fontSize:'.875rem', transition:'all var(--transition)', marginBottom:'.25rem' }}>
                  <t.icon size={15} /> {t.label}
                </div>
              ))}
            </div>
          </div>

          <div>
            {msg && <div className={`alert ${msg.includes('success')?'alert-success':'alert-error'}`} style={{ marginBottom:'1.25rem' }}>{msg}</div>}

            {tab === 'orders' && (
              <div>
                <h2 style={{ fontSize:'1.4rem', fontWeight:700, marginBottom:'1.5rem' }}>Order History</h2>
                {loading ? <Loader /> : orders.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3 className="empty-title">No Orders Yet</h3>
                    <p className="empty-text">You haven't placed any orders yet.</p>
                    <button className="btn btn-primary" onClick={() => window.location.href='/products'}>Start Shopping</button>
                  </div>
                ) : (
                  <div className="table-wrapper">
                    <table className="data-table">
                      <thead><tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o._id}>
                            <td style={{ fontFamily:'monospace', fontSize:'.75rem', color:'var(--primary-light)' }}>#{o._id.slice(-8).toUpperCase()}</td>
                            <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                            <td>{o.items.length} item{o.items.length!==1?'s':''}</td>
                            <td style={{ fontWeight:600, color:'var(--text-primary)' }}>{fmt(o.totalPrice)}</td>
                            <td>{o.paymentMethod}</td>
                            <td><span className={`badge status-${o.status.toLowerCase()}`}>{o.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div className="card">
                <div className="modal-header">
                  <h2 style={{ fontSize:'1.15rem', fontWeight:700 }}>Personal Information</h2>
                  {!editing ? (
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}><FiEdit2 size={13} /> Edit</button>
                  ) : (
                    <div style={{ display:'flex', gap:'.5rem' }}>
                      <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}><FiSave size={13} />{saving?'Saving...':'Save'}</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}><FiX size={13} /></button>
                    </div>
                  )}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                  {[['name','Full Name','text'],['email','Email Address','email'],['phone','Phone Number','tel']].map(([k,l,t]) => (
                    <div key={k} className="form-group"><label className="form-label">{l}</label><input className="form-input" type={t} value={form[k]||''} onChange={(e) => setForm({...form,[k]:e.target.value})} disabled={!editing} /></div>
                  ))}
                </div>
                <div className="divider" />
                <h3 style={{ fontWeight:600, marginBottom:'1rem' }}>Address</h3>
                <div className="form-group"><label className="form-label">Street Address</label><input className="form-input" value={form.address.street} onChange={(e) => setForm({...form,address:{...form.address,street:e.target.value}})} disabled={!editing} placeholder="Enter street address" /></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' }}>
                  {[['city','City'],['state','State'],['pincode','Pincode']].map(([k,l]) => (
                    <div key={k} className="form-group"><label className="form-label">{l}</label><input className="form-input" value={form.address[k]} onChange={(e) => setForm({...form,address:{...form.address,[k]:e.target.value}})} disabled={!editing} /></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
