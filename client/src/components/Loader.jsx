import React from 'react';

const Loader = ({ fullPage = false }) => {
  if (fullPage) {
    return (
      <div style={{ position:'fixed', inset:0, background:'var(--bg-dark)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:9999, gap:'1rem' }}>
        <div className="loader" />
        <p style={{ color:'var(--text-secondary)', fontSize:'.875rem' }}>Loading...</p>
      </div>
    );
  }
  return <div className="loader-wrapper"><div className="loader" /></div>;
};

export default Loader;
