import React from 'react';
import { useStore } from '../lib/store';
import NeonBackground from './NeonBackground';

const TITLES = [
  { id: 'novice', name: '駆け出しの知能', reqDays: 1, icon: '🌱', desc: 'IQトレーニングの第一歩を踏み出した。' },
  { id: 'apprentice', name: '見習いメンタリスト', reqDays: 3, icon: '🥉', desc: '三日坊主を乗り越えた証。' },
  { id: 'adept', name: '熟練の思考者', reqDays: 7, icon: '🥈', desc: '1週間継続した熱心なトレーニー。' },
  { id: 'expert', name: 'IQエキスパート', reqDays: 14, icon: '🥇', desc: '2週間の努力が知能を開花させた。' },
  { id: 'master', name: '知の探求者', reqDays: 30, icon: '👑', desc: '1ヶ月間鍛え抜いた真の探究者。' },
];

export default function Pokedex({ onBack }: { onBack: () => void }) {
  const { dailyStreak } = useStore();

  return (
    <div className="min-h-screen relative font-sans flex flex-col items-center justify-center p-4">
      <NeonBackground />
      <div className="relative z-10 w-full max-w-2xl bg-slate-900/80 p-8 rounded-3xl border border-pink-500/30 backdrop-blur-md shadow-[0_0_30px_rgba(255,0,255,0.1)]">
        <h2 className="text-3xl font-bold text-center text-pink-400 mb-8 tracking-wider shadow-pink-500/50 drop-shadow-md">称号図鑑</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TITLES.map((t) => {
            const unlocked = dailyStreak >= t.reqDays;
            return (
              <div 
                key={t.id} 
                className={`p-4 rounded-xl border flex flex-col gap-2 transition-all duration-500 ${
                  unlocked 
                  ? 'bg-pink-500/10 border-pink-500/50 shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:bg-pink-500/20' 
                  : 'bg-white/5 border-white/10 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{unlocked ? t.icon : '❓'}</div>
                  <div>
                    <div className="font-bold text-white text-lg">{unlocked ? t.name : '未開放'}</div>
                    <div className="text-xs text-slate-400">継続 {t.reqDays}日 達成</div>
                  </div>
                </div>
                {unlocked && (
                  <div className="text-sm text-pink-200/80 mt-2 border-t border-pink-500/20 pt-2">
                    {t.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={onBack}
            className="px-10 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-600 shadow-lg hover:shadow-xl"
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
