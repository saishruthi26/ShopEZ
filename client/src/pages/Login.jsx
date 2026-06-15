import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email:'', password:'' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    try {
      const user = await login(form.email, form.password);
      navigate(user.isAdmin ? '/admin' : '/');
    } catch (err) { setError(err.response?.data?.message || 'Login failed. Please try again.'); }
  };

  return (
    <div className="auth-page">
      <div style={{ position:'absolute', top:'10%', right:'10%', width:300, height:300, background:'rgba(124,58,237,.15)', borderRadius:'50%', filter:'blur(80px)' }} />
      <div style={{ position:'absolute', bottom:'10%', left:'10%', width:250, height:250, background:'rgba(236,72,153,.1)', borderRadius:'50%', filter:'blur(80px)' }} />
      <div className="auth-card">
        <div className="auth-logo">ShopEZ</div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue shopping</p>
        {error && <div className="alert alert-error" style={{ marginBottom:'1.25rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position:'relative' }}>
              <FiMail style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
              <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} style={{ paddingLeft:'2.75rem' }} required />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position:'relative' }}>
              <FiLock style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
              <input className="form-input" type={show?'text':'password'} placeholder="Enter password" value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} style={{ paddingLeft:'2.75rem', paddingRight:'2.75rem' }} required />
              <button type="button" style={{ position:'absolute', right:'1rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }} onClick={() => setShow(!show)}>
                {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ padding:'.875rem', fontSize:'1rem', marginBottom:'1.25rem' }} disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div style={{ background:'rgba(124,58,237,.06)', border:'1px solid rgba(124,58,237,.2)', borderRadius:'var(--radius-md)', padding:'.875rem', marginBottom:'1.25rem', fontSize:'.8rem', color:'var(--text-secondary)' }}>
          <div style={{ fontWeight:600, color:'var(--primary-light)', marginBottom:'.375rem' }}>🔑 Demo Credentials</div>
          <div>User: user@shopez.com / user123</div>
          <div>Admin: admin@shopez.com / admin123</div>
        </div>
        <div className="text-center" style={{ fontSize:'.875rem', color:'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color:'var(--primary-light)', fontWeight:600 }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
