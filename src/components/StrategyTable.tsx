import { Trophy, Sparkles, Map } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  DIMENSIONS,
  DIMENSION_SLOGANS,
  GROWTH_TYPES,
  GROWTH_TYPE_LABELS,
} from '../types';
import type { Dimension, GrowthType } from '../types';

// 維度色系：漸層條
const DIM_BAR_COLORS: Record<Dimension, string> = {
  進店率: 'from-pink-400 to-pink-500',
  轉化率: 'from-teal-400 to-teal-500',
  複購率: 'from-violet-400 to-violet-500',
  推薦率: 'from-orange-300 to-orange-400',
};

const DIM_CARD_COLORS: Record<Dimension, { bg: string; border: string; peak: string }> = {
  進店率: { bg: 'bg-pink-50/80', border: 'border-pink-200/60', peak: 'bg-pink-400' },
  轉化率: { bg: 'bg-teal-50/80', border: 'border-teal-200/60', peak: 'bg-teal-400' },
  複購率: { bg: 'bg-violet-50/80', border: 'border-violet-200/60', peak: 'bg-violet-400' },
  推薦率: { bg: 'bg-orange-50/80', border: 'border-orange-200/60', peak: 'bg-orange-400' },
};

// 品牌訊息圓圈色
const MSG_CIRCLE_COLORS: Record<Dimension, string> = {
  進店率: 'bg-pink-100 text-pink-700',
  轉化率: 'bg-teal-100 text-teal-700',
  複購率: 'bg-violet-100 text-violet-700',
  推薦率: 'bg-orange-100 text-orange-700',
};

export default function StrategyTable() {
  const { state } = useAppContext();
  const { brandName, targetAudience, brandMessages, mots } = state;

  const getMots = (dim: Dimension, gt: GrowthType) =>
    mots.filter((m) => m.dimension === dim && m.growthType === gt);

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <Map className="h-5 w-5 text-indigo-500" />
        MOT 品牌輪落地戰略表
      </h3>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[780px] glass neu-raised rounded-2xl overflow-hidden">

          {/* ===== Header ===== */}
          <div className="flex items-center gap-4 px-5 py-4">
            {/* 標題 */}
            <div className="shrink-0 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 px-4 py-2.5 shadow-md">
              <div className="text-base font-black text-white leading-tight">MOT品牌輪</div>
              <div className="text-base font-black text-white leading-tight">落地戰略表</div>
            </div>

            {/* TA + 品牌訊息 */}
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="rounded-lg border border-slate-200/60 bg-white/40 px-3 py-1.5 text-xs text-slate-500">
                目標客群 TA
                {(brandName || targetAudience.description) && (
                  <span className="ml-1 font-semibold text-slate-700">
                    {brandName}{brandName && targetAudience.description ? '・' : ''}{targetAudience.description}
                  </span>
                )}
              </div>

              <span className="text-xs text-slate-400">品牌訊息</span>
              <div className="flex items-center gap-1.5">
                {DIMENSIONS.map((dim) => {
                  const msgs = brandMessages.filter((m) => m.dimension === dim);
                  if (msgs.length === 0) return null;
                  return msgs.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-[7px] font-bold leading-tight shadow-sm ${MSG_CIRCLE_COLORS[dim]}`}
                      title={msg.text}
                    >
                      <span className="line-clamp-2 text-center px-0.5">
                        {msg.text?.slice(0, 4) || dim.slice(0, 2)}
                      </span>
                    </div>
                  ));
                })}
              </div>
            </div>

            {/* 金榜 */}
            <div className="shrink-0 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-white shadow-md">
              <Trophy className="h-5 w-5" />
              <span className="text-lg font-black">金榜</span>
            </div>
          </div>

          {/* 三大原則 */}
          <div className="bg-indigo-50/50 px-5 py-2 text-center text-sm text-slate-600">
            <span className="font-semibold text-indigo-500">1.</span> 先改善哪個側重的維度
            <span className="mx-3 font-semibold text-indigo-500">2.</span> 讓客戶體驗到訊息
            <span className="mx-3 font-semibold text-indigo-500">3.</span> 在MOT產生峰值
          </div>

          {/* ===== 維度欄頭 ===== */}
          <div className="grid grid-cols-[60px_repeat(4,1fr)] border-t border-slate-200/50">
            {/* 左上角空格 */}
            <div />
            {DIMENSIONS.map((dim) => (
              <div key={dim} className="flex flex-col items-center gap-1.5 px-2 py-3">
                <span className="text-lg font-black text-slate-700">{dim}</span>
                <div
                  className={`w-full rounded-full bg-gradient-to-r px-4 py-1 text-center text-sm font-bold text-white shadow-sm ${DIM_BAR_COLORS[dim]}`}
                >
                  {DIMENSION_SLOGANS[dim]}
                </div>
              </div>
            ))}
          </div>

          {/* ===== 資料列：增量 / 存量 ===== */}
          {GROWTH_TYPES.map((gt) => (
            <div
              key={gt}
              className="grid grid-cols-[60px_repeat(4,1fr)] border-t border-slate-200/50"
            >
              {/* 列標頭 */}
              <div className="flex items-center justify-center border-r border-slate-200/50 px-2 py-4">
                <div className="text-center">
                  <div className="text-lg font-black leading-tight text-slate-700">
                    {gt.split('').map((c, i) => (
                      <span key={i} className="block">{c}</span>
                    ))}
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400">
                    {GROWTH_TYPE_LABELS[gt]}
                  </div>
                </div>
              </div>

              {/* 各維度儲存格 */}
              {DIMENSIONS.map((dim) => {
                const cellMots = getMots(dim, gt);
                const colors = DIM_CARD_COLORS[dim];

                return (
                  <div
                    key={dim}
                    className="flex min-h-[120px] flex-wrap content-start gap-2 border-r border-slate-200/50 p-3 last:border-r-0"
                  >
                    {cellMots.length === 0 && (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="text-xs text-slate-300">—</span>
                      </div>
                    )}
                    {cellMots.map((mot) => {
                      const isPeak = mot.peakEndTag === '最高';
                      return (
                        <div
                          key={mot.id}
                          className={`flex flex-col rounded-lg bg-white/50 ${
                            isPeak ? 'ring-2 ring-amber-400/50 border border-amber-300/60' : 'border border-slate-200/50'
                          }`}
                          style={{ width: 'calc(50% - 4px)', minWidth: 80 }}
                        >
                          {/* MOT 標籤 */}
                          <div className="px-2 pt-1.5 text-[10px] font-semibold text-slate-400">
                            MOT
                          </div>
                          {/* 內容方塊 */}
                          <div className="px-2 pb-2 pt-0.5">
                            <div
                              className={`flex items-center justify-center rounded-md px-2 py-2.5 text-center ${
                                isPeak
                                  ? `${colors.peak} font-black text-white shadow-sm`
                                  : `${colors.bg} ${colors.border} border font-semibold text-slate-700`
                              }`}
                            >
                              {isPeak && (
                                <Sparkles className="mr-1 h-3.5 w-3.5 shrink-0" />
                              )}
                              <span className="text-xs leading-tight line-clamp-2">
                                {isPeak ? 'TOP 1' : (mot.elementWho || '—')}
                              </span>
                            </div>
                            {isPeak && mot.elementWho && (
                              <p className="mt-1 text-center text-[9px] text-amber-600 line-clamp-1">
                                {mot.elementWho}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
