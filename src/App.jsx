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
    </div>
  );
}

export default App;
