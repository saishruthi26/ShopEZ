import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const fmt = (price) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(price);

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    try { await addToCart(product._id); } catch (err) { console.error(err); }
  };

  return (
    <div className="product-card" onClick={() => navigate(`/products/${product._id}`)}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.discount > 0 && <div className="product-disc-badge">{product.discount}% OFF</div>}
        <div className="product-wish" onClick={(e) => e.stopPropagation()}><FiHeart size={13} /></div>
      </div>
      <div className="product-info">
        <div className="product-cat">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <StarRating rating={product.rating} size="sm" />
          <span className="rating-count">({product.numReviews})</span>
        </div>
        <div className="product-price">
          <span className="price-curr">{fmt(product.price)}</span>
          {product.originalPrice > product.price && <span className="price-orig">{fmt(product.originalPrice)}</span>}
          {product.discount > 0 && <span className="price-save">-{product.discount}%</span>}
        </div>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={handleAddToCart} disabled={product.stock === 0}>
            <FiShoppingCart size={13} />{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
