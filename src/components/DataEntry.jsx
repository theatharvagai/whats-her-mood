import React, { useState } from 'react';

export default function DataEntry({ onAddRecord }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (start && end && new Date(end) >= new Date(start)) {
      onAddRecord({ id: Date.now(), start, end });
      setStart('');
      setEnd('');
    } else {
      alert("Invalid dates. Ensure both are filled and End is >= Start.");
    }
  };

  return (
    <div className="clay-card">
      <h3 className="mb-4">Log Past Period</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label style={{display: 'block', marginBottom: '4px', color: 'var(--text-light)'}}>Start Date</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} required 
                 style={{width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.7)', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05)', color: 'var(--text-dark)'}} />
        </div>
        <div>
          <label style={{display: 'block', marginBottom: '4px', color: 'var(--text-light)'}}>End Date</label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} required 
                 style={{width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.7)', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05)', color: 'var(--text-dark)'}} />
        </div>
        <button type="submit" className="clay-button bg-pink mt-4 w-full" style={{color: '#333'}}>Save Historical Data</button>
      </form>
    </div>
  );
}
