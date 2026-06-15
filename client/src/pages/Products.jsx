import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { getProductsAPI } from '../api/productsAPI';

const CATS = ['All','Electronics','Fashion','Home & Kitchen','Sports','Beauty','Books'];
const SORTS = [{ value:'newest',label:'Newest First' },{ value:'price_asc',label:'Price: Low → High' },{ value:'price_desc',label:'Price: High → Low' },{ value:'rating',label:'Best Rating' }];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [sort, setSort] = useState('newest');

  const fetchProducts = async (s = search) => {
    setLoading(true);
    try {
      const params = { sort };
      if (category !== 'All') params.category = category;
      if (s) params.search = s;
      setProducts(await getProductsAPI(params));
    } catch(e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [category, sort]);

  const handleSearch = (e) => { e.preventDefault(); fetchProducts(search); };
  const handleCat = (c) => { setCategory(c); setSearchParams(c !== 'All' ? { category:c } : {}); };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div style={{ position:'absolute', top:-50, right:'20%', width:200, height:200, background:'rgba(124,58,237,.2)', borderRadius:'50%', filter:'blur(60px)' }} />
        <h1>Explore <span className="text-gradient">Products</span></h1>
        <p>{loading ? '...' : `${products.length} products available`}</p>
      </div>

      <div className="container" style={{ paddingBottom:'4rem' }}>
        {/* Search + Sort */}
        <form onSubmit={handleSearch} style={{ display:'flex', gap:'1rem', marginBottom:'2rem', alignItems:'center', flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:200, position:'relative' }}>
            <FiSearch style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }} size={15} />
            <input className="form-input" style={{ paddingLeft:'2.75rem' }} placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary"><FiSearch size={15} /> Search</button>
          <select className="form-select" style={{ width:'auto', minWidth:180 }} value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </form>

        <div style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start' }}>
          {/* Sidebar */}
          <div className="filter-sidebar">
            <div className="filter-section">
              <div className="filter-title">Categories</div>
              {CATS.map(c => (
                <label key={c} className="filter-option">
                  <input type="radio" name="cat" checked={category===c} onChange={() => handleCat(c)} /> {c}
                </label>
              ))}
            </div>
            <div className="filter-section">
              <div className="filter-title">Sort By</div>
              {SORTS.map(s => (
                <label key={s.value} className="filter-option">
                  <input type="radio" name="sort" checked={sort===s.value} onChange={() => setSort(s.value)} /> {s.label}
                </label>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ flex:1 }}>
            {loading ? <Loader /> : products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3 className="empty-title">No Products Found</h3>
                <p className="empty-text">Try adjusting your search or filters.</p>
                <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory('All'); fetchProducts(''); }}>Clear Filters</button>
              </div>
            ) : (
              <div className="products-grid">
                {products.map((p,i) => (
                  <div key={p._id} className="animate-fade-in" style={{ animationDelay:`${i*0.04}s` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
