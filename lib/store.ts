import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
  xp: number;
  level: number;
  dailyStreak: number;
  questionCount: number;
  lastPlayed: string | null;
  highScores: Record<string, number>;
  addXp: (amount: number) => void;
  updateHighScore: (gameId: string, score: number) => void;
  recordPlaySession: () => void;
  setQuestionCount: (count: number) => void;
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      dailyStreak: 0,
      questionCount: 10,
      lastPlayed: null,
      highScores: {},
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 100) + 1;
        return { xp: newXp, level: newLevel };
      }),
      updateHighScore: (gameId, score) => set((state) => {
        const currentHighScore = state.highScores[gameId] || 0;
        if (score > currentHighScore) {
          return { highScores: { ...state.highScores, [gameId]: score } };
        }
        return state;
      }),
      setQuestionCount: (count) => set({ questionCount: count }),
      recordPlaySession: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        if (state.lastPlayed === today) return state; // Already played today
        
        let newStreak = state.dailyStreak;
        if (state.lastPlayed) {
          const last = new Date(state.lastPlayed);
          const current = new Date(today);
          const diffDays = Math.floor((current.getTime() - last.getTime()) / (1000 * 3600 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }
        
        return { lastPlayed: today, dailyStreak: newStreak };
      }),
    }),
    {
      name: 'iq-training-storage',
    }
  )
);
