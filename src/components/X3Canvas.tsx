import { Lock, Sparkles, LayoutGrid } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { DIMENSIONS, DIMENSION_SLOGANS, COGNITIVE_SYSTEM_LABELS } from '../types';
import type { AppState, MOT } from '../types';

// ===== 28 格定義 =====
// gridArea: "row-start / col-start / row-end / col-end" (1-indexed)

interface CellDef {
  num: number;
  title: string;
  subtitle?: string;
  gridArea: string;
  autoFill?: (state: AppState, mot: MOT) => string;
}

const CELLS: CellDef[] = [
  // ── Column A (col 1) ──
  { num: 1, title: '細節描述MOT', subtitle: '就是那個截屏',
    gridArea: '1/1/2/2',
    autoFill: (_s, m) => [m.elementWho, m.elementContext, m.elementFeeling].filter(Boolean).join('；') || '' },
  { num: 2, title: '這個時刻多久', gridArea: '2/1/3/2' },
  { num: 3, title: 'TA 是誰', subtitle: '增量、存量',
    gridArea: '3/1/4/2',
    autoFill: (s, m) => `${s.targetAudience.description || '—'}（${m.growthType}）` },
  { num: 4, title: '美在哪裡', subtitle: '拿什麼產品交付', gridArea: '4/1/5/2' },
  { num: 5, title: '品牌訊息', subtitle: '針對哪個維度',
    gridArea: '5/1/6/2',
    autoFill: (s, m) => {
      const msg = m.linkedMessageId ? s.brandMessages.find((b) => b.id === m.linkedMessageId) : null;
      return msg ? `[${m.dimension}] ${msg.text}` : m.dimension;
    } },

  // ── Column B (col 2) ──
  { num: 10, title: '哪個黃金時刻', subtitle: '最初、最高、最終',
    gridArea: '1/2/2/3',
    autoFill: (_s, m) => m.peakEndTag },
  { num: 9, title: '吹哪種風？', subtitle: '六種風', gridArea: '2/2/3/3' },
  { num: 8, title: '消費者的角色', subtitle: '十大障礙在哪裡', gridArea: '3/2/4/3' },
  { num: 7, title: '錨在哪裡', subtitle: '十五錨', gridArea: '4/2/5/3' },
  { num: 6, title: '疊加哪個印記', subtitle: '十大印記', gridArea: '5/2/6/3' },

  // ── Column C (col 3) ──
  { num: 11, title: '運用心理效應', subtitle: '錨定前景框架助推', gridArea: '1/3/2/4' },
  { num: 12, title: '四大維度側重', subtitle: '進店轉化複購推薦',
    gridArea: '2/3/3/4',
    autoFill: (_s, m) => `${m.dimension}（${DIMENSION_SLOGANS[m.dimension]}）` },
  { num: 13, title: '運用系統1或2', subtitle: '消費者是什麼黨',
    gridArea: '3/3/4/4',
    autoFill: (_s, m) => `${m.cognitiveSystem}（${COGNITIVE_SYSTEM_LABELS[m.cognitiveSystem]}）` },
  { num: 14, title: '消費者動機', subtitle: '七大底層情緒',
    gridArea: '4/3/5/4',
    autoFill: (_s, m) => m.emotionalMotive },
  { num: 15, title: '品牌擬人標籤', subtitle: '28個品牌個性標籤', gridArea: '5/3/6/4' },

  // ── Column D (col 4) ──
  { num: 20, title: '哪個落地點', subtitle: '12個落地點', gridArea: '1/4/2/5' },
  { num: 19, title: '佔據了消費者哪些感官', gridArea: '2/4/3/5' },
  { num: 18, title: '消費者裝什麼', subtitle: '十裝', gridArea: '3/4/4/5' },
  { num: 17, title: '消費者什麼時候覺得值了', subtitle: '十值', gridArea: '4/4/5/5' },
  { num: 16, title: '高焫信息 vs. 高信息增益', gridArea: '5/4/6/5' },

  // ── Column E (col 5) — cell 21 spans 2 rows, logo below ──
  { num: 21, title: 'MOTX 頂層設計',
    subtitle: '說清楚體驗設計為何（佈景、道具、動作、服裝、走位、表情、台詞）與第3-20格的關係',
    gridArea: '1/5/3/6' },

  // ── Column F (col 6) ──
  { num: 26, title: '企業成本為何', subtitle: '激勵機制為何', gridArea: '1/6/2/7' },
  { num: 25, title: '消費者最後做了什麼動作', gridArea: '2/6/3/7' },
  { num: 24, title: '企業第一負責人是誰？', subtitle: '最終誰在執行？', gridArea: '3/6/4/7' },
  { num: 23, title: '這個MOT的指標為何', gridArea: '4/6/5/7' },
  { num: 22, title: '消費者最後說了什麼', gridArea: '5/6/6/7' },
];

// ===== 單一格子元件 =====
function Cell({
  cell,
  value,
  isAuto,
  onChange,
}: {
  cell: CellDef;
  value: string;
  isAuto: boolean;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className={`flex flex-col rounded-lg p-2 ${
        isAuto
          ? 'bg-indigo-50/40 border border-indigo-200/50'
          : 'bg-white/50 border border-white/40'
      }`}
      style={{ gridArea: cell.gridArea }}
    >
      <div className="mb-1 flex items-start gap-1">
        <span className="shrink-0 rounded-md bg-slate-700 px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
          {cell.num}
        </span>
        <span className="text-[11px] font-semibold leading-tight text-slate-700">
          {cell.title}
        </span>
      </div>
      {cell.subtitle && (
        <p className="mb-1.5 text-[10px] leading-tight text-slate-400">
          {cell.subtitle}
        </p>
      )}
      {isAuto ? (
        <div className="flex-1 rounded-md bg-indigo-100/50 px-2 py-1.5 text-xs text-indigo-700 leading-relaxed">
          {value || '—'}
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="填寫..."
          className="input-glass flex-1 resize-none rounded-md px-2 py-1.5 text-xs text-slate-700 placeholder:text-slate-300"
          rows={2}
        />
      )}
    </div>
  );
}

// ===== 主元件 =====
export default function X3Canvas() {
  const { state, setX3Cell, setX3SelectedMotId } = useAppContext();
  const { mots, x3Canvas, x3SelectedMotId } = state;

  // 找出所有峰值 MOT
  const peakMots = mots.filter((m) => m.peakEndTag === '最高');

  // 自動選取第一個峰值 MOT（若尚未選取或已選的被刪除）
  const selectedMot =
    peakMots.find((m) => m.id === x3SelectedMotId) || peakMots[0] || null;

  // 無峰值 MOT → 鎖定狀態
  if (!selectedMot) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          X3 戰略畫布
        </h3>
        <div className="glass flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300/40 py-16 px-8 text-center">
          <Lock className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm font-medium text-slate-500">
            請先在 MOT 設計中標記至少一個「最高」峰值 MOT
          </p>
          <p className="mt-1 text-xs text-slate-400">
            X3 畫布需要品牌輪收斂後的「金榜 TOP 1」MOT 才能展開
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
        <LayoutGrid className="h-5 w-5 text-indigo-500" />
        X3 戰略畫布
      </h3>

      {/* 峰值 MOT 選擇器 */}
      {peakMots.length > 1 && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-slate-500">選擇 TOP 1 MOT：</span>
          <select
            value={selectedMot.id}
            onChange={(e) => setX3SelectedMotId(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {peakMots.map((m, i) => (
              <option key={m.id} value={m.id}>
                {m.dimension} — {m.elementWho || `峰值 MOT #${i + 1}`}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 目標 MOT 摘要 */}
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-amber-300/50 bg-amber-50/50 px-4 py-2.5">
        <Sparkles className="h-5 w-5 shrink-0 text-amber-500" />
        <div className="text-sm">
          <span className="font-bold text-amber-800">金榜 TOP 1：</span>
          <span className="text-amber-700">
            {selectedMot.dimension} — {selectedMot.elementWho || '（未填寫）'}
          </span>
        </div>
      </div>

      {/* 28 格畫布 */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[900px] overflow-hidden rounded-2xl glass neu-raised">
          {/* Header */}
          <div className="flex items-center justify-center border-b border-slate-200/40 bg-white/30 py-3">
            <h4 className="text-lg font-bold tracking-wide text-slate-700">
              X3 畫布
            </h4>
          </div>

          {/* Grid */}
          <div
            className="p-1"
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(5, minmax(100px, auto))',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: 4,
            }}
          >
            {CELLS.map((cell) => {
              const autoFn = cell.autoFill;
              const isAuto = !!autoFn;
              const autoValue = autoFn ? autoFn(state, selectedMot) : '';
              const userValue = x3Canvas[cell.num] ?? '';
              return (
                <Cell
                  key={cell.num}
                  cell={cell}
                  value={isAuto ? autoValue : userValue}
                  isAuto={isAuto}
                  onChange={(v) => setX3Cell(cell.num, v)}
                />
              );
            })}

            {/* 浮水印區 (col 5, rows 3-5) */}
            <div
              className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300/40 bg-white/20 p-3 text-center"
              style={{ gridArea: '3/5/6/6' }}
            >
              <div className="rounded border border-slate-300 px-2 py-1 text-[9px] font-medium tracking-wide text-slate-400">
                Moment of Truth
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 圖例 */}
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded border border-indigo-200 bg-indigo-50" />
          <span>自動帶入（來自品牌輪資料）</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded border border-slate-200 bg-white" />
          <span>手動填寫</span>
        </div>
      </div>
    </div>
  );
}
