import React from 'react';
import { History, Trash2, FileText } from 'lucide-react';
import { getSessions, clearSessions } from '../utils/sessionStorage';

export default function SessionHistory({ sessions, onClear, onViewReport }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black tracking-tight text-gray-900 uppercase tracking-widest text-[11px] opacity-40">Records</h3>
        {sessions.length > 0 && (
          <button 
            onClick={onClear} 
            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors rounded-lg cursor-pointer" 
            title="Clear All"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sessions.length === 0 ? (
          <div className="col-span-full py-10 flex flex-col items-center justify-center bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
            <History size={40} className="text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold">No clinical sessions recorded yet</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="group relative p-6 bg-white border border-black/[0.03] rounded-[32px] hover:shadow-xl hover:shadow-black/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-black text-gray-900">{session.exercise}</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{new Date(session.timestamp || session.date).toLocaleDateString()}</span>
                </div>
                <button 
                  className="w-10 h-10 rounded-xl bg-brand-primary/5 text-brand-primary flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer" 
                  onClick={() => onViewReport(session)}
                >
                  <FileText size={18} />
                </button>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Reps</div>
                  <div className="text-xl font-black text-gray-900">{session.reps}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Avg ROM</div>
                  <div className="text-xl font-black text-brand-primary">{session.romScore ?? 0}%</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

