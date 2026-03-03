import {
  Building2,
  Users,
  MessageSquareText,
  Plus,
  X,
  DoorOpen,
  ShoppingCart,
  Repeat,
  Megaphone,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  TA_TYPES,
  TA_TYPE_LABELS,
  DIMENSIONS,
  DIMENSION_LABELS,
  MAX_MESSAGES_PER_DIMENSION,
} from '../types';
import type { Dimension } from '../types';
import type { ReactNode } from 'react';

const DIMENSION_ICONS: Record<Dimension, ReactNode> = {
  進店率: <DoorOpen className="h-4 w-4" />,
  轉化率: <ShoppingCart className="h-4 w-4" />,
  複購率: <Repeat className="h-4 w-4" />,
  推薦率: <Megaphone className="h-4 w-4" />,
};

const DIMENSION_COLORS: Record<Dimension, { border: string; bg: string; text: string; badge: string }> = {
  進店率: { border: 'border-pink-200', bg: 'bg-pink-50', text: 'text-pink-700', badge: 'bg-pink-100 text-pink-700' },
  轉化率: { border: 'border-teal-200', bg: 'bg-teal-50', text: 'text-teal-700', badge: 'bg-teal-100 text-teal-700' },
  複購率: { border: 'border-violet-200', bg: 'bg-violet-50', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
  推薦率: { border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
};

export default function StrategySetup() {
  const {
    state,
    setBrandName,
    setTADescription,
    setTAType,
    addBrandMessage,
    updateBrandMessage,
    deleteBrandMessage,
    getMessagesForDimension,
  } = useAppContext();

  return (
    <div className="space-y-8">
      {/* 品牌基本資料 */}
      <section className="glass neu-raised rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-2 text-slate-800">
          <Building2 className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">品牌基本資料</h2>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            品牌名稱
          </label>
          <input
            type="text"
            value={state.brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="輸入品牌名稱"
            className="input-glass w-full rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </section>

      {/* 目標客群 TA 定義 */}
      <section className="glass neu-raised rounded-2xl p-6">
        <div className="mb-4 flex items-center gap-2 text-slate-800">
          <Users className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">目標客群 (TA) 定義</h2>
          <span className="ml-auto rounded-full bg-indigo-500/10 px-3 py-0.5 text-xs font-medium text-indigo-600">
            選對人
          </span>
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-slate-600">
            TA 描述
          </label>
          <input
            type="text"
            value={state.targetAudience.description}
            onChange={(e) => setTADescription(e.target.value)}
            placeholder="例：30-40 歲都市高知女性、注重生活品質"
            className="input-glass w-full rounded-lg px-4 py-2.5 text-slate-800 placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            客群類型
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {TA_TYPES.map((type) => {
              const isSelected = state.targetAudience.type === type;
              return (
                <label
                  key={type}
                  className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-all ${
                    isSelected
                      ? 'neu-inset bg-indigo-50/80 text-indigo-700'
                      : 'neu-raised-sm bg-white/50 text-slate-600 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name="taType"
                    value={type}
                    checked={isSelected}
                    onChange={() => setTAType(type)}
                    className="sr-only"
                  />
                  <span className="text-sm font-semibold">{type}</span>
                  <span className="text-xs opacity-75">
                    {TA_TYPE_LABELS[type]}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </section>

      {/* 品牌訊息 — 按維度分組 */}
      <section className="glass neu-raised rounded-2xl p-6">
        <div className="mb-2 flex items-center gap-2 text-slate-800">
          <MessageSquareText className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold">品牌訊息</h2>
          <span className="ml-auto rounded-full bg-amber-500/10 px-3 py-0.5 text-xs font-medium text-amber-600">
            說對話
          </span>
        </div>
        <p className="mb-5 text-sm text-slate-500">
          針對四大維度，各挖掘最多 {MAX_MESSAGES_PER_DIMENSION} 個高熵值品牌訊息，讓每個 MOT 都能承載靈魂。
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {DIMENSIONS.map((dim) => {
            const colors = DIMENSION_COLORS[dim];
            const messages = getMessagesForDimension(dim);
            const isFull = messages.length >= MAX_MESSAGES_PER_DIMENSION;

            return (
              <div
                key={dim}
                className={`neu-flat rounded-xl border ${colors.border} ${colors.bg} bg-opacity-50 p-4`}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={colors.text}>{DIMENSION_ICONS[dim]}</span>
                  <span className={`text-sm font-semibold ${colors.text}`}>
                    {dim}（{DIMENSION_LABELS[dim]}）
                  </span>
                  <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold ${colors.badge}`}>
                    {messages.length}/{MAX_MESSAGES_PER_DIMENSION}
                  </span>
                </div>

                <div className="space-y-2">
                  {messages.map((msg, idx) => (
                    <div key={msg.id} className="flex items-center gap-2">
                      <span className="shrink-0 text-xs font-medium text-slate-400 w-4 text-right">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={msg.text}
                        onChange={(e) => updateBrandMessage(msg.id, e.target.value)}
                        placeholder={`第 ${idx + 1} 個品牌訊息`}
                        className="input-glass flex-1 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400"
                      />
                      <button
                        onClick={() => deleteBrandMessage(msg.id)}
                        className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-red-50/80 hover:text-red-500 transition"
                        title="刪除"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  {!isFull && (
                    <button
                      onClick={() => addBrandMessage(dim)}
                      className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300/40 bg-white/30 py-2 text-xs font-medium text-slate-500 hover:border-slate-400 hover:bg-white/50 hover:text-slate-700 transition"
                    >
                      <Plus className="h-3 w-3" />
                      新增訊息
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
