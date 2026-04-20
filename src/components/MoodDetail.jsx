import React from 'react';
import { format } from 'date-fns';
import { getDayInfo } from '../utils/engine';

export default function MoodDetail({ selectedDate, records }) {
  const info = getDayInfo(selectedDate, records);
  const colorBg = info.colorClass.split(" ")[0] || "bg-yellow"; 

  return (
    <div className={`clay-card ${colorBg}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'center' }}>
      <h2 style={{fontSize: '24px'}}>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
      <div style={{padding: '8px 24px', borderRadius: '24px', background: 'rgba(255,255,255,0.5)', fontWeight: 'bold'}}>
        Phase: {info.phase}
      </div>
      
      <p style={{fontSize: '22px', fontWeight: '500', color: '#444', fontStyle: 'italic', margin: '24px 0'}}>
        "{info.sentence}"
      </p>

      {info.percentages && Object.keys(info.percentages).length > 0 && (
        <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center'}}>
          {Object.entries(info.percentages).map(([mood, pct]) => (
            <div key={mood} style={{
              background: 'rgba(255,255,255,0.7)', padding: '16px', borderRadius: '16px', 
              minWidth: '90px', display: 'flex', flexDirection: 'column',
              boxShadow: 'inset 2px 2px 5px rgba(255,255,255,1), 2px 2px 5px rgba(0,0,0,0.05)'
            }}>
              <span style={{fontSize: '14px', textTransform: 'uppercase', color: '#666', fontWeight: '600'}}>{mood}</span>
              <span style={{fontSize: '28px', fontWeight: 'bold', color: '#333'}}>{pct}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
