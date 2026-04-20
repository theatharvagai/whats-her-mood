import React from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, getDay, addMonths, subMonths, isSameDay } from 'date-fns';
import { getDayInfo } from '../utils/engine';

const MonthView = ({ titleDate, selectedDate, setSelectedDate, records }) => {
  const start = startOfMonth(titleDate);
  const end = endOfMonth(titleDate);
  const days = eachDayOfInterval({ start, end });
  const startDay = getDay(start); // 0 (Sun) to 6 (Sat)
  
  const placeholders = Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} className="p-2"></div>);

  return (
    <div className="clay-card flex-col flex" style={{flex: 1, minWidth: '360px', padding: '16px'}}>
      <h4 className="text-center mb-4 text-dark" style={{fontSize: '20px'}}>{format(titleDate, 'MMMM yyyy')}</h4>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center'}}>
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} style={{fontWeight: 'bold', fontSize: '14px', color: 'var(--text-light)', marginBottom: '8px'}}>{d}</div>)}
        {placeholders}
        {days.map(day => {
          const info = getDayInfo(day, records);
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, new Date());
          
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              style={{
                width: '38px',
                height: '38px',
                margin: '0 auto',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                fontWeight: isSelected ? '700' : '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isSelected ? 'inset 3px 3px 6px rgba(0,0,0,0.1)' : '4px 4px 8px rgba(0,0,0,0.05), -4px -4px 8px rgba(255,255,255,0.8)',
                border: isToday ? '3px solid #666' : '1px solid rgba(255,255,255,0.7)',
                color: 'var(--text-dark)',
                fontSize: '16px',
                transition: 'all 0.2s',
                ...(isSelected ? { transform: 'scale(0.95)' } : {})
              }}
              className={`hover:scale-110 ${info.colorClass.split(" ")[0]}`}
              title={info.phase}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default function Calendar({ selectedDate, setSelectedDate, records }) {
  const currentMonthDate = selectedDate; 
  const prevMonthDate = subMonths(currentMonthDate, 1);
  const nextMonthDate = addMonths(currentMonthDate, 1);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 flex-wrap mb-2" style={{fontSize: '16px', fontWeight: '500'}}>
        <span className="flex items-center gap-2"><div style={{width:'16px',height:'16px',borderRadius:'50%'}} className="bg-pink"></div> Menstrual</span>
        <span className="flex items-center gap-2"><div style={{width:'16px',height:'16px',borderRadius:'50%'}} className="bg-mint"></div> Follicular</span>
        <span className="flex items-center gap-2"><div style={{width:'16px',height:'16px',borderRadius:'50%'}} className="bg-purple"></div> Ovulation</span>
        <span className="flex items-center gap-2"><div style={{width:'16px',height:'16px',borderRadius:'50%'}} className="bg-blue"></div> Luteal</span>
        <span className="flex items-center gap-2"><div style={{width:'16px',height:'16px',borderRadius:'50%', background: '#eee', border: '1px solid #ccc'}}></div> Unknown</span>
      </div>

      <div style={{display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '16px'}}>
        <MonthView titleDate={prevMonthDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} records={records} />
        <MonthView titleDate={currentMonthDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} records={records} />
        <MonthView titleDate={nextMonthDate} selectedDate={selectedDate} setSelectedDate={setSelectedDate} records={records} />
      </div>
    </div>
  );
}
