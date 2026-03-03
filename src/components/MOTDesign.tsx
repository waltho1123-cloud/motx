import { Plus, Zap } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { MAX_MOTS } from '../types';
import MOTCard from './MOTCard';

export default function MOTDesign() {
  const { state, addMOT } = useAppContext();
  const count = state.mots.length;
  const isFull = count >= MAX_MOTS;

  return (
    <div className="space-y-6">
      {/* 標頭 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-slate-800">
            關鍵時刻設計 (MOT)
          </h2>
          <span className="ml-2 rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-medium text-emerald-600">
            做對事
          </span>
        </div>
        <span className="text-sm text-slate-500">
          {count} / {MAX_MOTS}
        </span>
      </div>

      {/* MOT 卡片列表 */}
      {count === 0 && (
        <div className="glass rounded-2xl border border-dashed border-slate-300/50 py-16 text-center">
          <Zap className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-400">
            尚未新增任何關鍵時刻，點擊下方按鈕開始設計
          </p>
        </div>
      )}

      <div className="space-y-4">
        {state.mots.map((mot, idx) => (
          <MOTCard key={mot.id} mot={mot} index={idx} />
        ))}
      </div>

      {/* 新增按鈕 */}
      <div className="text-center">
        <button
          onClick={addMOT}
          disabled={isFull}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all ${
            isFull
              ? 'cursor-not-allowed bg-slate-100/50 text-slate-400'
              : 'neu-raised bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 active:scale-[0.98]'
          }`}
        >
          <Plus className="h-4 w-4" />
          新增 MOT
        </button>
        {isFull && (
          <p className="mt-2 text-sm text-amber-600">
            資源有限，品牌輪最多僅需 {MAX_MOTS} 個 MOT 以集中火力打透
          </p>
        )}
      </div>
    </div>
  );
}
