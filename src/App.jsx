import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import DataEntry from './components/DataEntry';
import MoodDetail from './components/MoodDetail';
import { Trash2 } from 'lucide-react';
import './index.css';

function App() {
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('periodRecords');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  const handleAddRecord = (record) => {
    const updated = [...records, record];
    setRecords(updated);
    localStorage.setItem('periodRecords', JSON.stringify(updated));
  };

  const clearData = () => {
    if(window.confirm("Are you sure you want to delete all historical records?")) {
      setRecords([]);
      localStorage.removeItem('periodRecords');
    }
  }

  return (
    <div style={{padding: '32px', maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px'}}>
      <header className="text-center" style={{paddingBottom: '20px', borderBottom: '2px dashed rgba(0,0,0,0.1)'}}>
        <h1 style={{fontSize: '48px', color: 'var(--text-dark)', letterSpacing: '-1px'}}>Cycle & Mood Predictor</h1>
        <p style={{fontSize: '20px', color: 'var(--text-light)'}}>Light Clay Aesthetic Dashboard • ML Powered Insights</p>
      </header>

      <div style={{display: 'flex', gap: '32px', flexWrap: 'wrap', flexDirection: 'row'}}>
        {/* Left Side: Adding Data */}
        <div style={{flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '24px'}}>
          <DataEntry onAddRecord={handleAddRecord} />
          {records.length > 0 && (
            <div className="clay-card">
               <h4 className="mb-4">Logged Cycles ({records.length})</h4>
               <p style={{fontSize: '14px', marginBottom: '16px'}}>Algorithm is currently learning from {records.length} {records.length === 1 ? 'record' : 'records'}.</p>
               <button onClick={clearData} className="clay-button" style={{color: 'red', display: 'flex', alignItems: 'center', gap: '8px'}}>
                 <Trash2 size={16} /> Clear All Data
               </button>
               <div style={{marginTop: '16px', maxHeight: '150px', overflowY: 'auto', fontSize: '13px', background: 'rgba(255,255,255,0.4)', borderRadius: '8px', padding: '8px'}}>
                 {records.map((r, i) => (
                   <div key={r.id} style={{padding: '6px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between'}}>
                     <strong>Cycle {i+1}</strong> <span>{new Date(r.start).toLocaleDateString()} ➔ {new Date(r.end).toLocaleDateString()}</span>
                   </div>
                 ))}
               </div>
            </div>
          )}
        </div>
        
        {/* Right Side: Mood Highlight */}
        <div style={{flex: '2', minWidth: '400px'}}>
          <MoodDetail selectedDate={selectedDate} records={records} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-center mb-4" style={{fontSize: '32px'}}>Your 3-Month View</h3>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} records={records} />
      </div>

      <div className="mt-4 clay-card" style={{padding: '32px'}}>
        <h3 className="mb-4 text-center" style={{fontSize: '28px'}}>Understanding Her Cycles</h3>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '16px'}}>
            <thead>
              <tr style={{borderBottom: '2px solid rgba(0,0,0,0.1)'}}>
                <th style={{padding: '16px'}}>Phase</th>
                <th style={{padding: '16px'}}>What it Means</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                <td style={{padding: '16px'}}><span className="bg-pink" style={{padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', boxShadow: 'var(--clay-shadow-base)'}}>Menstrual</span></td>
                <td style={{padding: '16px'}}><strong>The Bleeding Phase.</strong> Shedding of the uterine lining. She might experience cramps, fatigue, and lower energy. Give her some space, warmth, and chocolate!</td>
              </tr>
              <tr style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                <td style={{padding: '16px'}}><span className="bg-mint" style={{padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', boxShadow: 'var(--clay-shadow-base)'}}>Follicular</span></td>
                <td style={{padding: '16px'}}><strong>The Happy Phase.</strong> Starts with the period and lasts till ovulation. Estrogen rises, making her feel motivated, energetic, and generally very positive.</td>
              </tr>
              <tr style={{borderBottom: '1px solid rgba(0,0,0,0.05)'}}>
                <td style={{padding: '16px'}}><span className="bg-purple" style={{padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', boxShadow: 'var(--clay-shadow-base)'}}>Ovulation</span></td>
                <td style={{padding: '16px'}}><strong>The Fertile Phase.</strong> The egg is released. Peak estrogen and testosterone. She usually feels her best, highly confident, affectionate, and may have a high libido.</td>
              </tr>
              <tr>
                <td style={{padding: '16px'}}><span className="bg-blue" style={{padding: '8px 16px', borderRadius: '12px', fontWeight: 'bold', boxShadow: 'var(--clay-shadow-base)'}}>Luteal</span></td>
                <td style={{padding: '16px'}}><strong>The PMS Phase.</strong> After ovulation until the next period. Progesterone rises then drops. Can cause PMS symptoms like mood swings, bloating, and irritability. Be extra patient!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
