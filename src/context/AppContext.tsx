import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { AppState, MOT, BrandMessage, Dimension, TAType } from '../types';
import { MAX_MOTS, MAX_MESSAGES_PER_DIMENSION } from '../types';

const initialState: AppState = {
  brandName: '',
  targetAudience: {
    description: '',
    type: '小紅',
  },
  brandMessages: [],
  mots: [],
  x3Canvas: {},
  x3SelectedMotId: '',
};

interface AppContextValue {
  state: AppState;
  setBrandName: (name: string) => void;
  setTADescription: (desc: string) => void;
  setTAType: (type: TAType) => void;
  addBrandMessage: (dimension: Dimension) => boolean;
  updateBrandMessage: (id: string, text: string) => void;
  deleteBrandMessage: (id: string) => void;
  getMessagesForDimension: (dimension: Dimension) => BrandMessage[];
  addMOT: () => boolean;
  updateMOT: (id: string, updates: Partial<Omit<MOT, 'id'>>) => void;
  deleteMOT: (id: string) => void;
  setX3Cell: (cellNum: number, value: string) => void;
  setX3SelectedMotId: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setBrandName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, brandName: name }));
  }, []);

  const setTADescription = useCallback((desc: string) => {
    setState((prev) => ({
      ...prev,
      targetAudience: { ...prev.targetAudience, description: desc },
    }));
  }, []);

  const setTAType = useCallback((type: TAType) => {
    setState((prev) => ({
      ...prev,
      targetAudience: { ...prev.targetAudience, type },
    }));
  }, []);

  const addBrandMessage = useCallback((dimension: Dimension): boolean => {
    let added = false;
    setState((prev) => {
      const count = prev.brandMessages.filter((m) => m.dimension === dimension).length;
      if (count >= MAX_MESSAGES_PER_DIMENSION) return prev;
      added = true;
      const newMsg: BrandMessage = { id: uuidv4(), dimension, text: '' };
      return { ...prev, brandMessages: [...prev.brandMessages, newMsg] };
    });
    return added;
  }, []);

  const updateBrandMessage = useCallback((id: string, text: string) => {
    setState((prev) => ({
      ...prev,
      brandMessages: prev.brandMessages.map((m) =>
        m.id === id ? { ...m, text } : m
      ),
    }));
  }, []);

  const deleteBrandMessage = useCallback((id: string) => {
    setState((prev) => {
      // Also clear linkedMessageId on MOTs that referenced this message
      const updatedMots = prev.mots.map((mot) =>
        mot.linkedMessageId === id ? { ...mot, linkedMessageId: '' } : mot
      );
      return {
        ...prev,
        brandMessages: prev.brandMessages.filter((m) => m.id !== id),
        mots: updatedMots,
      };
    });
  }, []);

  const getMessagesForDimension = useCallback(
    (dimension: Dimension) =>
      state.brandMessages.filter((m) => m.dimension === dimension),
    [state.brandMessages]
  );

  const addMOT = useCallback((): boolean => {
    let added = false;
    setState((prev) => {
      if (prev.mots.length >= MAX_MOTS) return prev;
      added = true;
      const newMOT: MOT = {
        id: uuidv4(),
        dimension: '進店率',
        elementWho: '',
        elementContext: '',
        elementFeeling: '',
        peakEndTag: '一般',
        linkedMessageId: '',
        cognitiveSystem: '系統一',
        emotionalMotive: '五感刺激快樂',
        growthType: '增量',
      };
      return { ...prev, mots: [...prev.mots, newMOT] };
    });
    return added;
  }, []);

  const updateMOT = useCallback((id: string, updates: Partial<Omit<MOT, 'id'>>) => {
    setState((prev) => ({
      ...prev,
      mots: prev.mots.map((m) => {
        if (m.id !== id) return m;
        const updated = { ...m, ...updates };
        // If dimension changed, clear linked message (different pool)
        if (updates.dimension && updates.dimension !== m.dimension) {
          updated.linkedMessageId = '';
        }
        return updated;
      }),
    }));
  }, []);

  const deleteMOT = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      mots: prev.mots.filter((m) => m.id !== id),
    }));
  }, []);

  const setX3Cell = useCallback((cellNum: number, value: string) => {
    setState((prev) => ({
      ...prev,
      x3Canvas: { ...prev.x3Canvas, [cellNum]: value },
    }));
  }, []);

  const setX3SelectedMotId = useCallback((id: string) => {
    setState((prev) => ({ ...prev, x3SelectedMotId: id }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setBrandName,
        setTADescription,
        setTAType,
        addBrandMessage,
        updateBrandMessage,
        deleteBrandMessage,
        getMessagesForDimension,
        addMOT,
        updateMOT,
        deleteMOT,
        setX3Cell,
        setX3SelectedMotId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
