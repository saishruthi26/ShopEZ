import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try { await register(form.name, form.email, form.password); navigate('/'); }
    catch (err) { setError(err.response?.data?.message || 'Registration failed'); }
  };

  return (
    <div className="auth-page">
      <div style={{ position:'absolute', top:'10%', left:'10%', width:300, height:300, background:'rgba(124,58,237,.15)', borderRadius:'50%', filter:'blur(80px)' }} />
      <div style={{ position:'absolute', bottom:'10%', right:'10%', width:250, height:250, background:'rgba(236,72,153,.1)', borderRadius:'50%', filter:'blur(80px)' }} />
      <div className="auth-card">
        <div className="auth-logo">ShopEZ</div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join ShopEZ and start shopping today</p>
        {error && <div className="alert alert-error" style={{ marginBottom:'1.25rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          {[{ k:'name', l:'Full Name', t:'text', icon:FiUser, ph:'Your full name' }, { k:'email', l:'Email Address', t:'email', icon:FiMail, ph:'your@email.com' }].map(f => (
            <div key={f.k} className="form-group">
              <label className="form-label">{f.l}</label>
              <div style={{ position:'relative' }}>
                <f.icon style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
                <input className="form-input" type={f.t} placeholder={f.ph} value={form[f.k]} onChange={(e) => setForm({...form,[f.k]:e.target.value})} style={{ paddingLeft:'2.75rem' }} required />
              </div>
            </div>
          ))}
          {[{ k:'password', l:'Password' }, { k:'confirm', l:'Confirm Password' }].map(f => (
            <div key={f.k} className="form-group">
              <label className="form-label">{f.l}</label>
              <div style={{ position:'relative' }}>
                <FiLock style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
                <input className="form-input" type={show?'text':'password'} placeholder={`Enter ${f.l.toLowerCase()}`} value={form[f.k]} onChange={(e) => setForm({...form,[f.k]:e.target.value})} style={{ paddingLeft:'2.75rem', paddingRight:'2.75rem' }} required />
                <button type="button" style={{ position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }} onClick={() => setShow(!show)}>
                  {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>
          ))}
          <button type="submit" className="btn btn-primary w-full" style={{ padding:'.875rem', fontSize:'1rem', marginBottom:'1.25rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="text-center" style={{ fontSize:'.875rem', color:'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color:'var(--primary-light)', fontWeight:600 }}>Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
