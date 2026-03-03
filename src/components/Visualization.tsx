import { BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BrandWheel from './BrandWheel';
import StrategyTable from './StrategyTable';
import X3Canvas from './X3Canvas';

export default function Visualization() {
  const { state } = useAppContext();
  const hasMOTs = state.mots.length > 0;

  if (!hasMOTs) {
    return (
      <div className="glass flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/40 py-24">
        <BarChart3 className="mb-4 h-12 w-12 text-slate-300" />
        <p className="max-w-sm text-center text-sm leading-relaxed text-slate-500">
          「請先挖出您的關鍵時刻，沒有底層邏輯的體驗設計一定不高階」
        </p>
        <p className="mt-2 text-xs text-slate-400">
          — 《峰值體驗》
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <BrandWheel />
      <hr className="border-slate-200/50" />
      <StrategyTable />
      <hr className="border-slate-200/50" />
      <X3Canvas />
    </div>
  );
}
