import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { getProductsAPI, createProductAPI, updateProductAPI, deleteProductAPI } from '../../api/productsAPI';
import Loader from '../../components/Loader';

const fmt = (p) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(p);
const BLANK = { name:'', description:'', price:'', originalPrice:'', discount:0, category:'Electronics', image:'', brand:'', stock:10, featured:false };
const CATS = ['Electronics','Fashion','Home & Kitchen','Sports','Beauty','Books'];

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => { setLoading(true); getProductsAPI({}).then(setProducts).catch(console.error).finally(() => setLoading(false)); };
  useEffect(load, []);

  const openAdd = () => { setForm(BLANK); setEditId(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ ...p, price:p.price, originalPrice:p.originalPrice||'', discount:p.discount||0 }); setEditId(p._id); setShowModal(true); };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg('');
    try {
      if (editId) await updateProductAPI(editId, form);
      else await createProductAPI(form);
      setMsg('✅ Product saved!'); setShowModal(false); load();
    } catch (err) { setMsg('❌ ' + (err.response?.data?.message || 'Error')); } finally { setSaving(false); }
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await deleteProductAPI(id); load();
  };

  return (
    <div>
      <div className="admin-header">
        <h1>📦 Products</h1>
        <button className="btn btn-primary" onClick={openAdd}><FiPlus size={16} /> Add Product</button>
      </div>
      {msg && <div className={`alert ${msg.includes('✅')?'alert-success':'alert-error'}`} style={{ marginBottom:'1rem' }}>{msg}</div>}
      {loading ? <Loader /> : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td><img src={p.image} alt={p.name} style={{ width:44, height:44, borderRadius:'var(--radius-sm)', objectFit:'cover' }} /></td>
                  <td style={{ color:'var(--text-primary)', fontWeight:500, maxWidth:180 }}><div style={{ overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div></td>
                  <td><span className="badge badge-primary">{p.category}</span></td>
                  <td style={{ fontWeight:600, color:'var(--text-primary)' }}>{fmt(p.price)}</td>
                  <td><span style={{ color: p.stock>0?'#34d399':'#f87171', fontWeight:600 }}>{p.stock}</span></td>
                  <td>{p.featured ? '⭐' : '—'}</td>
                  <td>
                    <div style={{ display:'flex', gap:'.5rem' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}><FiEdit2 size={13} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}><FiTrash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editId ? 'Edit Product' : 'Add Product'}</div>
              <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}><FiX size={14} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                <div className="form-group" style={{ gridColumn:'1/-1' }}><label className="form-label">Product Name *</label><input className="form-input" value={form.name} onChange={(e) => setForm({...form,name:e.target.value})} required /></div>
                <div className="form-group"><label className="form-label">Category</label>
                  <select className="form-select" value={form.category} onChange={(e) => setForm({...form,category:e.target.value})}>
                    {CATS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group"><label className="form-label">Brand</label><input className="form-input" value={form.brand} onChange={(e) => setForm({...form,brand:e.target.value})} /></div>
                <div className="form-group"><label className="form-label">Price (₹) *</label><input className="form-input" type="number" value={form.price} onChange={(e) => setForm({...form,price:Number(e.target.value)})} required /></div>
                <div className="form-group"><label className="form-label">Original Price (₹)</label><input className="form-input" type="number" value={form.originalPrice} onChange={(e) => setForm({...form,originalPrice:Number(e.target.value)})} /></div>
                <div className="form-group"><label className="form-label">Discount (%)</label><input className="form-input" type="number" min="0" max="100" value={form.discount} onChange={(e) => setForm({...form,discount:Number(e.target.value)})} /></div>
                <div className="form-group"><label className="form-label">Stock</label><input className="form-input" type="number" value={form.stock} onChange={(e) => setForm({...form,stock:Number(e.target.value)})} /></div>
                <div className="form-group" style={{ gridColumn:'1/-1' }}><label className="form-label">Image URL *</label><input className="form-input" value={form.image} onChange={(e) => setForm({...form,image:e.target.value})} placeholder="https://..." required /></div>
                <div className="form-group" style={{ gridColumn:'1/-1' }}><label className="form-label">Description *</label><textarea className="form-textarea" value={form.description} onChange={(e) => setForm({...form,description:e.target.value})} required /></div>
                <div className="form-group"><label style={{ display:'flex', alignItems:'center', gap:'.5rem', cursor:'pointer', fontSize:'.875rem', color:'var(--text-secondary)' }}><input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form,featured:e.target.checked})} /> Featured Product</label></div>
              </div>
              <button type="submit" className="btn btn-primary w-full" style={{ marginTop:'.5rem' }} disabled={saving}><FiSave size={15} />{saving?'Saving...':'Save Product'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
