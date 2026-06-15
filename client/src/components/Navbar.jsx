import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiSearch, FiLogOut, FiPackage, FiGrid, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const h = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setShowDropdown(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) { navigate(`/products?search=${encodeURIComponent(search)}`); setSearch(''); setShowMobile(false); }
  };

  const handleLogout = () => { logout(); setShowDropdown(false); navigate('/'); };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">ShopEZ</Link>

          <form className="navbar-search" onSubmit={handleSearch}>
            <FiSearch className="search-icon" size={15} />
            <input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>

          <nav className="navbar-nav">
            <NavLink to="/" end className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>Products</NavLink>
            {user?.isAdmin && <NavLink to="/admin" className={({ isActive }) => `navbar-link${isActive ? ' active' : ''}`}>Admin</NavLink>}
          </nav>

          <div className="navbar-actions">
            {user && (
              <button className="cart-btn" onClick={() => navigate('/cart')}>
                <FiShoppingCart size={18} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            )}

            {user ? (
              <div className="user-menu" ref={dropdownRef}>
                <div className="user-avatar" onClick={() => setShowDropdown(!showDropdown)} title={user.name}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {showDropdown && (
                  <div className="dropdown">
                    <div style={{ padding:'.5rem .75rem', marginBottom:'.25rem' }}>
                      <div style={{ fontSize:'.875rem', fontWeight:600, color:'var(--text-primary)' }}>{user.name}</div>
                      <div style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>{user.email}</div>
                    </div>
                    <div className="dropdown-divider" />
                    <div className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}><FiUser size={14} /> My Profile</div>
                    <div className="dropdown-item" onClick={() => { navigate('/profile'); setShowDropdown(false); }}><FiPackage size={14} /> My Orders</div>
                    {user.isAdmin && <div className="dropdown-item" onClick={() => { navigate('/admin'); setShowDropdown(false); }}><FiGrid size={14} /> Admin Panel</div>}
                    <div className="dropdown-divider" />
                    <div className="dropdown-item" onClick={handleLogout} style={{ color:'var(--danger)' }}><FiLogOut size={14} /> Logout</div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/login')}>Login</button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/register')}>Sign Up</button>
              </>
            )}

            <button className="mobile-menu-btn" onClick={() => setShowMobile(!showMobile)}>
              {showMobile ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {showMobile && (
        <div style={{ position:'fixed', top:70, left:0, right:0, bottom:0, background:'rgba(10,10,26,.98)', backdropFilter:'blur(20px)', zIndex:999, padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
          <form onSubmit={handleSearch} style={{ position:'relative' }}>
            <FiSearch style={{ position:'absolute', left:'.875rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
            <input className="form-input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ paddingLeft:'2.5rem' }} />
          </form>
          <Link to="/" className="navbar-link" onClick={() => setShowMobile(false)}>🏠 Home</Link>
          <Link to="/products" className="navbar-link" onClick={() => setShowMobile(false)}>🛍️ Products</Link>
          {user && <Link to="/cart" className="navbar-link" onClick={() => setShowMobile(false)}>🛒 Cart ({cartCount})</Link>}
          {user && <Link to="/profile" className="navbar-link" onClick={() => setShowMobile(false)}>👤 My Profile</Link>}
          {user?.isAdmin && <Link to="/admin" className="navbar-link" onClick={() => setShowMobile(false)}>⚙️ Admin</Link>}
          {!user && (
            <div style={{ display:'flex', gap:'.875rem', marginTop:'1rem' }}>
              <Link to="/login" className="btn btn-secondary" style={{ flex:1, textAlign:'center' }} onClick={() => setShowMobile(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ flex:1, textAlign:'center' }} onClick={() => setShowMobile(false)}>Sign Up</Link>
            </div>
          )}
          {user && <button className="btn btn-danger" style={{ marginTop:'auto' }} onClick={() => { handleLogout(); setShowMobile(false); }}><FiLogOut /> Logout</button>}
        </div>
      )}
    </>
  );
};

export default Navbar;
