import React, { useState } from 'react';
import { History, RotateCcw, CheckCircle2, Search, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminActivityTab: React.FC = () => {
  const { aiActivities, undoAiActivity } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = aiActivities.filter(a => {
    if (search && !a.command.toLowerCase().includes(search.toLowerCase()) && !a.result.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight font-display">
            AI Activity & Command Audit Log
          </h1>
          <p className="text-xs text-slate-400">
            Real-time audit log of all natural-language AI operations and administrative changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search logs..."
              className="w-full sm:w-56 bg-slate-950 text-white placeholder-slate-500 text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 text-slate-300 text-xs px-3 py-2 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Undone">Undone</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Admin Command</th>
                <th className="p-3.5">Action Executed</th>
                <th className="p-3.5">Outcome Description</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Undo Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filtered.map((log) => {
                const canUndo = log.reversible && log.status === 'Success';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3.5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>

                    <td className="p-3.5 font-semibold text-white max-w-[220px] truncate">
                      "{log.command}"
                    </td>

                    <td className="p-3.5 font-mono text-[11px] text-cyan-400">
                      {log.action}
                    </td>

                    <td className="p-3.5 text-slate-300 max-w-[280px]">
                      {log.result}
                    </td>

                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'Success'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.status === 'Undone'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {log.status}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      {canUndo ? (
                        <button
                          onClick={() => undoAiActivity(log.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition-all"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          {log.status === 'Undone' ? 'Already Undone' : 'Permanent'}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
