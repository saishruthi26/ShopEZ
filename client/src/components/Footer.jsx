import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiInstagram, FiFacebook, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">ShopEZ</div>
          <p className="footer-desc">Your one-stop destination for effortless online shopping. Discover thousands of products with amazing deals and a seamless checkout experience.</p>
          <div className="footer-social">
            {[FiTwitter, FiInstagram, FiFacebook, FiLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="social-link"><Icon size={15} /></a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="footer-title">Shop</h4>
          <div className="footer-links">
            {[['All Products','/products'],['Electronics','/products?category=Electronics'],['Fashion','/products?category=Fashion'],['Home & Kitchen','/products?category=Home+%26+Kitchen'],['Sports','/products?category=Sports'],['Books','/products?category=Books']].map(([label,to]) => (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="footer-title">Account</h4>
          <div className="footer-links">
            {[['Sign In','/login'],['Create Account','/register'],['My Profile','/profile'],['My Cart','/cart'],['My Orders','/profile']].map(([label,to]) => (
              <Link key={label} to={to} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="footer-title">Contact</h4>
          <div className="footer-links">
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.875rem', color:'var(--text-secondary)', padding:'.2rem 0' }}><FiMail size={14} color="var(--primary-light)" /> support@shopez.com</div>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.875rem', color:'var(--text-secondary)', padding:'.2rem 0' }}><FiPhone size={14} color="var(--primary-light)" /> +91 9876543210</div>
            <div style={{ display:'flex', alignItems:'center', gap:'.5rem', fontSize:'.875rem', color:'var(--text-secondary)', padding:'.2rem 0' }}><FiMapPin size={14} color="var(--primary-light)" /> Mumbai, India</div>
          </div>
          <div style={{ marginTop:'1rem', padding:'.875rem', background:'rgba(124,58,237,.08)', border:'1px solid rgba(124,58,237,.2)', borderRadius:'var(--radius-md)', fontSize:'.8rem', color:'var(--text-secondary)' }}>
            <div style={{ fontWeight:600, color:'var(--primary-light)', marginBottom:'.25rem' }}>🔒 Safe & Secure</div>
            <div>100% secure payments. Trusted by 2M+ customers.</div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© {new Date().getFullYear()} ShopEZ. All rights reserved.</div>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          <a href="#" style={{ color:'var(--text-muted)', fontSize:'.875rem' }}>Privacy Policy</a>
          <a href="#" style={{ color:'var(--text-muted)', fontSize:'.875rem' }}>Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
