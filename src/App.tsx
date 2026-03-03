import { useState } from 'react';
import { Settings, Zap, BarChart3 } from 'lucide-react';
import { AppProvider } from './context/AppContext';
import StrategySetup from './components/StrategySetup';
import MOTDesign from './components/MOTDesign';
import Visualization from './components/Visualization';

const TABS = [
  { id: 'strategy', label: '戰略設定', sublabel: '選對人．說對話', icon: Settings },
  { id: 'mot', label: 'MOT 設計', sublabel: '做對事', icon: Zap },
  { id: 'viz', label: '可視化輸出', sublabel: '品牌輪．X3 畫布', icon: BarChart3 },
] as const;

type TabId = (typeof TABS)[number]['id'];

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabId>('strategy');

  return (
    <div className="min-h-screen">
      {/* 頂部導覽 */}
      <header className="glass-strong sticky top-0 z-30 border-b border-white/30">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-sm font-black text-white shadow-md">
                M
              </div>
              <div>
                <h1 className="text-base font-bold leading-tight text-slate-800">
                  MOTX 峰值體驗
                </h1>
                <p className="text-[10px] leading-tight text-slate-400">
                  戰略設計畫布系統
                </p>
              </div>
            </div>
          </div>

          {/* Tab 切換 */}
          <nav className="flex gap-2 -mb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/60 text-indigo-600 shadow-sm'
                      : 'text-slate-500 hover:bg-white/30 hover:text-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  <span
                    className={`hidden text-[10px] sm:inline ${
                      isActive ? 'text-indigo-400' : 'text-slate-400'
                    }`}
                  >
                    {tab.sublabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* 主內容區 */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {activeTab === 'strategy' && <StrategySetup />}
        {activeTab === 'mot' && <MOTDesign />}
        {activeTab === 'viz' && <Visualization />}
      </main>

      {/* 頁尾 */}
      <footer className="py-4 text-center text-xs text-slate-400/70">
        基於《峰值體驗 2》汪志謙 — 選對人．做對事．說對話
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
