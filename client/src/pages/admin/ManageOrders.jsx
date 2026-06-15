import React, { useEffect, useState } from 'react';
import { getAdminOrdersAPI, updateOrderStatusAPI } from '../../api/adminAPI';
import Loader from '../../components/Loader';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);
const STATUSES = ['Pending','Processing','Shipped','Delivered','Cancelled'];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState('');

  useEffect(() => { getAdminOrdersAPI().then(setOrders).catch(console.error).finally(() => setLoading(false)); }, []);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      const updated = await updateOrderStatusAPI(id, status);
      setOrders(orders.map(o => o._id === id ? { ...o, status: updated.status } : o));
    } catch (err) { console.error(err); } finally { setUpdating(''); }
  };

  return (
    <div>
      <div className="admin-header">
        <h1>🛍️ Orders</h1>
        <div style={{ fontSize:'.875rem', color:'var(--text-secondary)' }}>{orders.length} total orders</div>
      </div>
      {loading ? <Loader /> : orders.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📋</div><h3 className="empty-title">No Orders Yet</h3></div>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td style={{ fontFamily:'monospace', fontSize:'.75rem', color:'var(--primary-light)' }}>#{o._id.slice(-8).toUpperCase()}</td>
                  <td>
                    <div style={{ color:'var(--text-primary)', fontWeight:500 }}>{o.user?.name||'N/A'}</div>
                    <div style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>{o.user?.email}</div>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                  <td>{o.items.length}</td>
                  <td style={{ fontWeight:600, color:'var(--text-primary)' }}>{fmt(o.totalPrice)}</td>
                  <td style={{ fontSize:'.8rem' }}>{o.paymentMethod}</td>
                  <td>
                    <select
                      className="form-select"
                      style={{ fontSize:'.8rem', padding:'.35rem .75rem', paddingRight:'2rem', minWidth:130 }}
                      value={o.status}
                      onChange={(e) => handleStatus(o._id, e.target.value)}
                      disabled={updating === o._id}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
