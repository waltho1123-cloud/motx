// ===== 列舉常數 =====

export const TA_TYPES = ['小紅', '小黑', '紅轉黑', '小白'] as const;
export type TAType = (typeof TA_TYPES)[number];

export const TA_TYPE_LABELS: Record<TAType, string> = {
  小紅: '愛你的',
  小黑: '不愛你的',
  紅轉黑: '愛過你的',
  小白: '從沒愛過',
};

export const DIMENSIONS = ['進店率', '轉化率', '複購率', '推薦率'] as const;
export type Dimension = (typeof DIMENSIONS)[number];

export const DIMENSION_LABELS: Record<Dimension, string> = {
  進店率: '引流',
  轉化率: '首單',
  複購率: '習慣',
  推薦率: '裂變',
};

export const PEAK_END_TAGS = ['最初', '最高', '最終', '一般'] as const;
export type PeakEndTag = (typeof PEAK_END_TAGS)[number];

export const COGNITIVE_SYSTEMS = ['系統一', '系統二'] as const;
export type CognitiveSystem = (typeof COGNITIVE_SYSTEMS)[number];

export const COGNITIVE_SYSTEM_LABELS: Record<CognitiveSystem, string> = {
  系統一: '直覺／五感／快思',
  系統二: '邏輯／分析／慢想',
};

export const EMOTIONAL_MOTIVES = [
  '大理念為他人',
  '把自己變美好',
  '學新認知爽感',
  '被看見裝起來',
  '認同感被需要',
  '先避損解焦慮',
  '五感刺激快樂',
] as const;
export type EmotionalMotive = (typeof EMOTIONAL_MOTIVES)[number];

export const GROWTH_TYPES = ['增量', '存量'] as const;
export type GrowthType = (typeof GROWTH_TYPES)[number];

export const GROWTH_TYPE_LABELS: Record<GrowthType, string> = {
  增量: '獲取新客',
  存量: '經營老客',
};

export const DIMENSION_SLOGANS: Record<Dimension, string> = {
  進店率: '一見就進',
  轉化率: '一進就買',
  複購率: '一買再買',
  推薦率: '一傳千里',
};

export const MAX_MOTS = 8;
export const MAX_MESSAGES_PER_DIMENSION = 3;

// ===== 資料模型 =====

export interface BrandMessage {
  id: string;
  dimension: Dimension;
  text: string;
}

export interface TargetAudience {
  description: string;
  type: TAType;
}

export interface MOT {
  id: string;
  dimension: Dimension;
  elementWho: string;
  elementContext: string;
  elementFeeling: string;
  peakEndTag: PeakEndTag;
  linkedMessageId: string; // references BrandMessage.id within same dimension
  cognitiveSystem: CognitiveSystem;
  emotionalMotive: EmotionalMotive;
  growthType: GrowthType;
}

export interface AppState {
  brandName: string;
  targetAudience: TargetAudience;
  brandMessages: BrandMessage[]; // per-dimension, up to 3 each (max 12)
  mots: MOT[];                   // max 8, distributed across 4 dimensions
  x3Canvas: Record<number, string>; // cell number → user input text
  x3SelectedMotId: string;          // which peak MOT the X3 canvas targets
}
