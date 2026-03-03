import { Trash2, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import type { MOT } from '../types';
import {
  DIMENSIONS,
  DIMENSION_LABELS,
  PEAK_END_TAGS,
  COGNITIVE_SYSTEMS,
  COGNITIVE_SYSTEM_LABELS,
  EMOTIONAL_MOTIVES,
  GROWTH_TYPES,
  GROWTH_TYPE_LABELS,
} from '../types';

interface Props {
  mot: MOT;
  index: number;
}

export default function MOTCard({ mot, index }: Props) {
  const { state, updateMOT, deleteMOT, getMessagesForDimension } = useAppContext();

  const update = (updates: Partial<Omit<MOT, 'id'>>) =>
    updateMOT(mot.id, updates);

  const isPeak = mot.peakEndTag === '最高';

  // Only show messages from the same dimension
  const dimensionMessages = getMessagesForDimension(mot.dimension);

  return (
    <div
      className={`glass rounded-2xl p-5 transition-all ${
        isPeak
          ? 'neu-raised ring-2 ring-amber-300/40 border-amber-300/60'
          : 'neu-raised-sm'
      }`}
    >
      {/* 卡片標頭 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-bold text-indigo-600">
            {index + 1}
          </span>
          <h3 className="font-semibold text-slate-800">MOT #{index + 1}</h3>
          {isPeak && (
            <span className="flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-xs font-semibold text-amber-700">
              <Sparkles className="h-3 w-3" /> 峰值
            </span>
          )}
        </div>
        <button
          onClick={() => deleteMOT(mot.id)}
          className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50/80 hover:text-red-500 transition"
          title="刪除此 MOT"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* 所屬維度 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            所屬維度
          </label>
          <select
            value={mot.dimension}
            onChange={(e) => update({ dimension: e.target.value as MOT['dimension'] })}
            className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800"
          >
            {DIMENSIONS.map((d) => (
              <option key={d} value={d}>
                {d}（{DIMENSION_LABELS[d]}）
              </option>
            ))}
          </select>
        </div>

        {/* 增長類型 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            增長目標
          </label>
          <div className="flex gap-2">
            {GROWTH_TYPES.map((gt) => {
              const isActive = mot.growthType === gt;
              return (
                <label
                  key={gt}
                  className={`flex-1 cursor-pointer rounded-lg px-3 py-1.5 text-center text-sm font-medium transition-all ${
                    isActive
                      ? 'neu-inset bg-indigo-50/80 text-indigo-700'
                      : 'neu-raised-sm bg-white/50 text-slate-500 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name={`growth-${mot.id}`}
                    value={gt}
                    checked={isActive}
                    onChange={() => update({ growthType: gt })}
                    className="sr-only"
                  />
                  {gt}
                  <span className="ml-0.5 text-[10px] opacity-60">
                    {GROWTH_TYPE_LABELS[gt]}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* 黃金時刻標籤 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            黃金時刻標籤（峰終定律）
          </label>
          <div className="flex flex-wrap gap-2">
            {PEAK_END_TAGS.map((tag) => {
              const isActive = mot.peakEndTag === tag;
              return (
                <label
                  key={tag}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive
                      ? tag === '最高'
                        ? 'neu-inset bg-amber-50/80 text-amber-700'
                        : 'neu-inset bg-indigo-50/80 text-indigo-700'
                      : 'neu-raised-sm bg-white/50 text-slate-500 hover:bg-white/70'
                  }`}
                >
                  <input
                    type="radio"
                    name={`peak-${mot.id}`}
                    value={tag}
                    checked={isActive}
                    onChange={() => update({ peakEndTag: tag })}
                    className="sr-only"
                  />
                  {tag}
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOT 三元素 */}
      <div className="mt-4 rounded-xl bg-white/30 p-4 neu-inset">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          MOT 三元素
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              是誰 (Who)
            </label>
            <textarea
              value={mot.elementWho}
              onChange={(e) => update({ elementWho: e.target.value })}
              placeholder="目標對象是誰？"
              rows={2}
              className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              在什麼狀況下 (Context)
            </label>
            <textarea
              value={mot.elementContext}
              onChange={(e) => update({ elementContext: e.target.value })}
              placeholder="發生在什麼場景？"
              rows={2}
              className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">
              感受到什麼 (Feeling)
            </label>
            <textarea
              value={mot.elementFeeling}
              onChange={(e) => update({ elementFeeling: e.target.value })}
              placeholder="顧客的情緒感受？"
              rows={2}
              className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>
      </div>

      {/* 底部：品牌訊息連結 + 心理系統 + 動機 */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {/* 對應品牌訊息（僅同維度） */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            對應品牌訊息
          </label>
          {dimensionMessages.length === 0 ? (
            <p className="rounded-lg border border-dashed border-amber-300/50 bg-amber-50/50 px-3 py-2 text-xs text-amber-600">
              請先在「戰略設定」為 {mot.dimension} 新增訊息
            </p>
          ) : (
            <select
              value={mot.linkedMessageId}
              onChange={(e) => update({ linkedMessageId: e.target.value })}
              className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800"
            >
              <option value="">— 請選擇 —</option>
              {dimensionMessages.map((m, idx) => (
                <option key={m.id} value={m.id}>
                  {idx + 1}. {m.text || '（未填寫）'}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* 認知系統 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            觸發系統
          </label>
          <select
            value={mot.cognitiveSystem}
            onChange={(e) =>
              update({
                cognitiveSystem: e.target.value as MOT['cognitiveSystem'],
              })
            }
            className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800"
          >
            {COGNITIVE_SYSTEMS.map((s) => (
              <option key={s} value={s}>
                {s}（{COGNITIVE_SYSTEM_LABELS[s]}）
              </option>
            ))}
          </select>
        </div>

        {/* 情感動機 */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">
            情感動機（動機七情）
          </label>
          <select
            value={mot.emotionalMotive}
            onChange={(e) =>
              update({
                emotionalMotive: e.target.value as MOT['emotionalMotive'],
              })
            }
            className="input-glass w-full rounded-lg px-3 py-2 text-sm text-slate-800"
          >
            {EMOTIONAL_MOTIVES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
