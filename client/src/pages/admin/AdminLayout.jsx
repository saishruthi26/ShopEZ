import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiUsers, FiLogOut, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { path:'/admin', label:'Dashboard', icon:FiGrid, exact:true },
  { path:'/admin/products', label:'Products', icon:FiPackage },
  { path:'/admin/orders', label:'Orders', icon:FiShoppingBag },
  { path:'/admin/users', label:'Users', icon:FiUsers },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="admin-layout" style={{ paddingTop:0 }}>
      <aside className="admin-sidebar">
        <div className="admin-logo">⚡ ShopEZ</div>
        <div className="admin-nav-label">Main Menu</div>
        {NAV.map(n => (
          <NavLink
            key={n.path}
            to={n.path}
            end={n.exact}
            className={({ isActive }) => `admin-nav-item${isActive ? ' active' : ''}`}
          >
            <n.icon size={16} /> {n.label}
          </NavLink>
        ))}
        <div className="admin-nav-label" style={{ marginTop:'2rem' }}>Actions</div>
        <div className="admin-nav-item" onClick={() => navigate('/')} style={{ cursor:'pointer' }}>
          <FiArrowLeft size={16} /> View Store
        </div>
        <div className="admin-nav-item" onClick={() => { logout(); navigate('/login'); }} style={{ cursor:'pointer', color:'var(--danger)' }}>
          <FiLogOut size={16} /> Logout
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
