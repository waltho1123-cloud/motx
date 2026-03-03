import { CircleDot, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { DIMENSIONS, DIMENSION_LABELS } from '../types';
import type { Dimension, MOT } from '../types';

// ---------- 用 DIMENSIONS 常數索引，避免字元不一致 ----------
const 進店率 = DIMENSIONS[0]; // '進店率'
const 轉化率 = DIMENSIONS[1]; // '轉化率'
const 複購率 = DIMENSIONS[2]; // '複購率'
const 推薦率 = DIMENSIONS[3]; // '推薦率'

interface QuadrantStyle {
  color: string;
  colorDark: string;
  cardBg: string;
  angleStart: number;
  angleEnd: number;
}

// 統一色系: 進店=pink, 轉化=teal, 複購=violet, 推薦=orange
const STYLES: Record<Dimension, QuadrantStyle> = {
  [進店率]: { color: '#f9a8d4', colorDark: '#9d174d', cardBg: '#fce7f3', angleStart: -Math.PI / 2, angleEnd: 0 },
  [轉化率]: { color: '#99f6e4', colorDark: '#115e59', cardBg: '#ccfbf1', angleStart: 0, angleEnd: Math.PI / 2 },
  [複購率]: { color: '#c4b5fd', colorDark: '#5b21b6', cardBg: '#ede9fe', angleStart: Math.PI / 2, angleEnd: Math.PI },
  [推薦率]: { color: '#fdba74', colorDark: '#9a3412', cardBg: '#ffedd5', angleStart: Math.PI, angleEnd: Math.PI * 1.5 },
};

// Grid 順序: [top-left, top-right, bottom-left, bottom-right]
// 對應參考圖: 推薦率(左上), 進店率(右上), 複購率(左下), 轉化率(右下)
const GRID_ORDER: Dimension[] = [推薦率, 進店率, 複購率, 轉化率];

// ---------- MOT 迷你卡片 ----------
function MOTCardMini({ mot, style }: { mot: MOT; style: QuadrantStyle }) {
  const isPeak = mot.peakEndTag === '最高';
  return (
    <div
      className={`flex items-stretch rounded-lg glass ${
        isPeak ? 'ring-1 ring-amber-300/50 border-amber-300/60' : ''
      }`}
      style={{ width: 164 }}
      title={[mot.elementWho, mot.elementContext, mot.elementFeeling].filter(Boolean).join('\n')}
    >
      {/* 彩色方塊 */}
      <div
        className="flex w-[66px] shrink-0 items-center justify-center rounded-l-lg p-1.5 text-center"
        style={{
          backgroundColor: isPeak ? '#fde68a' : style.cardBg,
          color: isPeak ? '#92400e' : style.colorDark,
        }}
      >
        <span className="text-[11px] font-bold leading-tight line-clamp-2">
          {mot.elementWho || 'MOT'}
        </span>
      </div>
      {/* 文字區 */}
      <div className="flex min-w-0 flex-col justify-center px-2 py-1.5">
        {isPeak && (
          <span className="mb-0.5 flex items-center gap-0.5 text-[10px] font-bold text-amber-600">
            <Sparkles className="h-3 w-3" />
            峰值
          </span>
        )}
        <span className="text-[10px] leading-snug text-slate-500 line-clamp-2">
          {mot.elementContext || mot.elementFeeling || '—'}
        </span>
      </div>
    </div>
  );
}

// ---------- 主元件 ----------
export default function BrandWheel() {
  const { state } = useAppContext();
  const { targetAudience, brandName, brandMessages, mots } = state;

  const W = 900;
  const H = 780;
  const cx = W / 2;
  const cy = H / 2;
  const outerR = 160;
  const innerR = 66;

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <CircleDot className="h-5 w-5 text-indigo-500" />
        品牌輪 (Brand Wheel)
      </h3>

      <div className="relative" style={{ width: W, height: H }}>
        {/* === Layer 1: SVG 底圖 — 十字線 + 同心圓 === */}
        <svg
          width={W}
          height={H}
          className="absolute inset-0 pointer-events-none"
        >
          {/* 十字分割線 */}
          <line x1={cx} y1={0} x2={cx} y2={H} stroke="#d1d5db" strokeWidth={1} strokeDasharray="6 4" />
          <line x1={0} y1={cy} x2={W} y2={cy} stroke="#d1d5db" strokeWidth={1} strokeDasharray="6 4" />
          {/* 外圈 */}
          <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#374151" strokeWidth={1.5} />
          {/* 內圈 */}
          <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#374151" strokeWidth={1.5} />
          {/* 品牌訊息 標籤 */}
          <text x={cx} y={cy + outerR + 20} textAnchor="middle" fill="#9ca3af" fontSize={13}>
            品牌訊息
          </text>
        </svg>

        {/* === Layer 2: 2×2 Grid 四象限內容 === */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {GRID_ORDER.map((dim, gridIdx) => {
            const isTop = gridIdx < 2;
            const isLeft = gridIdx % 2 === 0;
            const ds = STYLES[dim];
            const dimMots = mots.filter((m) => m.dimension === dim);

            const label = (
              <div
                className="inline-flex items-center rounded-lg border-2 border-slate-700 px-3 py-1.5"
                style={{ alignSelf: isLeft ? 'flex-start' : 'flex-end' }}
              >
                <span className="text-base font-black text-slate-800">{dim}</span>
              </div>
            );

            const cards = (
              <div
                className="flex flex-wrap gap-1.5"
                style={{
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  alignSelf: isLeft ? 'flex-start' : 'flex-end',
                  marginTop: isTop ? 6 : 0,
                  marginBottom: isTop ? 0 : 6,
                }}
              >
                {dimMots.map((mot) => (
                  <MOTCardMini key={mot.id} mot={mot} style={ds} />
                ))}
              </div>
            );

            return (
              <div
                key={dim}
                className="flex flex-col overflow-hidden p-2"
                style={{
                  justifyContent: isTop ? 'flex-start' : 'flex-end',
                  alignItems: isLeft ? 'flex-start' : 'flex-end',
                }}
              >
                {isTop ? (
                  <>
                    {label}
                    {cards}
                  </>
                ) : (
                  <>
                    {cards}
                    {label}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* === Layer 3: 品牌訊息圓形 (在外圈上) === */}
        {GRID_ORDER.map((dim) => {
          const ds = STYLES[dim];
          const msgs = brandMessages.filter((m) => m.dimension === dim);
          const count = msgs.length;
          if (count === 0) return null;

          const padding = Math.PI / 10;
          const available = (ds.angleEnd - ds.angleStart) - padding * 2;

          return msgs.map((msg, i) => {
            const step = count === 1 ? 0 : available / (count - 1);
            const angle = ds.angleStart + padding + (count === 1 ? available / 2 : step * i);
            const x = cx + outerR * Math.cos(angle);
            const y = cy + outerR * Math.sin(angle);
            return (
              <div
                key={msg.id}
                className="absolute z-10 flex h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-sm"
                style={{ left: x, top: y, backgroundColor: ds.color, opacity: 0.92 }}
                title={msg.text}
              >
                <span
                  className="px-1 text-center text-xs font-semibold leading-tight line-clamp-2"
                  style={{ color: ds.colorDark }}
                >
                  {msg.text || '訊息'}
                </span>
              </div>
            );
          });
        })}

        {/* === Layer 4: 中心 TA === */}
        <div
          className="absolute z-10 flex flex-col items-center justify-center rounded-full glass-strong text-center"
          style={{
            left: cx - innerR,
            top: cy - innerR,
            width: innerR * 2,
            height: innerR * 2,
          }}
        >
          <span className="text-xs font-bold leading-tight text-slate-700">
            目標客群 TA
          </span>
          {(brandName || targetAudience.description) && (
            <span className="mt-0.5 line-clamp-2 px-2 text-[11px] leading-tight text-slate-500">
              {brandName}
              {brandName && targetAudience.description ? ' · ' : ''}
              {targetAudience.description}
            </span>
          )}
        </div>
      </div>

      {/* 圖例 */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-slate-500">
        {GRID_ORDER.map((dim) => (
          <div key={dim} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: STYLES[dim].color }}
            />
            <span>{dim}（{DIMENSION_LABELS[dim]}）</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-amber-500" />
          <span>峰值 MOT</span>
        </div>
      </div>
    </div>
  );
}
