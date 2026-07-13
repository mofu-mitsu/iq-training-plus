"use client";
import { useState, useEffect } from 'react';
import { Brain, CalendarCheck, Trophy, LineChart, Play, Volume2, VolumeX, CheckCircle } from 'lucide-react';
import NeonBackground from '../components/NeonBackground';
import { useStore } from '../lib/store';
import TrainingModule from '../components/TrainingModule';
import { audio } from '../lib/audio';
import { auth, loginWithGoogle, logout, getUserData, saveUserData } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

import Pokedex from '../components/Pokedex';

export default function Home() {
  const { xp, level, dailyStreak } = useStore();
  const [activeScreen, setActiveScreen] = useState<'home' | 'training' | 'results' | 'pokedex'>('home');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const { questionCount, setQuestionCount } = useStore();
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showStamp, setShowStamp] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const data = await getUserData(currentUser.uid);
        if (data) {
          const localState = useStore.getState();
          
          // Merge high scores by taking the maximum for each game
          const mergedHighScores = { ...localState.highScores };
          if (data.highScores) {
            Object.keys(data.highScores).forEach(key => {
              if (!mergedHighScores[key] || data.highScores[key] > mergedHighScores[key]) {
                mergedHighScores[key] = data.highScores[key];
              }
            });
          }

          useStore.setState({
            xp: Math.max(data.xp || 0, localState.xp),
            level: Math.max(data.level || 1, localState.level),
            dailyStreak: Math.max(data.dailyStreak || 0, localState.dailyStreak),
            highScores: mergedHighScores,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Sync store changes to Firebase
    const unsubscribe = useStore.subscribe((state) => {
      if (user) {
        saveUserData(user.uid, {
          xp: state.xp,
          level: state.level,
          dailyStreak: state.dailyStreak,
          highScores: state.highScores,
        });
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    // 簡易的なログインスタンプ処理
    const lastLogin = localStorage.getItem('lastLoginDate');
    const today = new Date().toDateString();
    if (lastLogin !== today) {
      localStorage.setItem('lastLoginDate', today);
      setShowStamp(true);
      if (soundEnabled) audio?.playSuccess();
      // 3秒後にスタンプモーダルを消す
      setTimeout(() => setShowStamp(false), 3000);
    }
  }, []);

  useEffect(() => {
    if (soundEnabled) {
      audio?.startBGM();
    } else {
      audio?.stopBGM();
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    unlockTTS();
    if (!soundEnabled) {
      audio?.init();
    }
    setSoundEnabled(!soundEnabled);
  };

  const games = [
    { id: 'block-design', name: '積み木', desc: '模様をブロックで再現する', icon: Brain, color: 'cyan' },
    { id: 'vocabulary', name: '単語', desc: '言葉の意味を説明する', icon: Brain, color: 'pink' },
    { id: 'similarities', name: '共通点', desc: '2つの言葉の共通点を見つける', icon: Brain, color: 'cyan' },
    { id: 'comprehension', name: '理解', desc: '日常の状況やルールの理由を答える', icon: Brain, color: 'pink' },
    { id: 'arithmetic', name: '暗算', desc: '制限時間内に計算を解く', icon: Trophy, color: 'cyan' },
    { id: 'digit-span', name: '数字記憶', desc: '聞いた数字を記憶して指定の順で答える', icon: Brain, color: 'pink' },
    { id: 'matrix-reasoning', name: '行列推理', desc: 'パターンの規則性を見つける', icon: LineChart, color: 'cyan' },
    { id: 'information', name: '知識', desc: '一般的な知識問題に答える', icon: Brain, color: 'pink' },
    { id: 'symbol-search', name: '記号探し', desc: 'ターゲット記号を見つける', icon: LineChart, color: 'cyan' },
    { id: 'pattern', name: 'パターン', desc: '図形の規則性を見つける', icon: Brain, color: 'pink' },
    { id: 'puzzle', name: 'パズル', desc: 'バラバラのパーツを組み立てる', icon: Brain, color: 'cyan' },
    { id: 'coding', name: '符号', desc: '数字と記号のペアを対応させる', icon: LineChart, color: 'pink' },
    { id: 'cancellation', name: '絵の抹消', desc: '特定の絵だけを素早く見つける', icon: LineChart, color: 'cyan' },
    { id: 'letter-number-sequence', name: '語音整列', desc: '数字と文字をルールに従って並べ替える', icon: Brain, color: 'pink' },
    { id: 'figure-weights', name: 'バランス', desc: '天秤が釣り合うように図形を選ぶ', icon: Brain, color: 'cyan' },
    { id: 'picture-completion', name: '絵の完成', desc: '絵の欠けている部分を見つける', icon: Brain, color: 'pink' },
    { id: 'logic', name: '論理', desc: '文章から論理的な結論を導き出す', icon: Brain, color: 'cyan' },
    { id: 'math-word-problems', name: '数学文章題', desc: '文章を読んで数学的な問題を解く', icon: Brain, color: 'pink' },
    { id: 'visual-puzzle', name: '視覚パズル', desc: 'アナグラムなどの視覚的パズルを解く', icon: Brain, color: 'cyan' },
    { id: 'spatial-recognition', name: '空間認知', desc: '図形の回転や立体図形を推測する', icon: Brain, color: 'pink' },
  ];

  const unlockTTS = () => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance("");
      u.volume = 0;
      window.speechSynthesis.speak(u);
    }
  };

  const handleStartGame = (gameId: string) => {
    unlockTTS();
    setSelectedGame(gameId);
    setActiveScreen('training');
  };

  const handleStartMix = () => {
    unlockTTS();
    setSelectedGame('mix');
    setActiveScreen('training');
  };

  const handleGameComplete = () => {
    setActiveScreen('home');
  };

  if (activeScreen === 'pokedex') {
    return <Pokedex onBack={() => setActiveScreen('home')} />;
  }

  if (activeScreen === 'training' && selectedGame) {
    return <TrainingModule gameId={selectedGame} questionCount={questionCount} onComplete={handleGameComplete} onQuit={() => setActiveScreen('home')} soundEnabled={soundEnabled} user={user} />;
  }

  return (
    <main className="min-h-screen relative font-sans">
      <NeonBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl w-full flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.photoURL || ''} alt="avatar" className="w-10 h-10 rounded-full border border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.3)]" />
              <button onClick={logout} className="text-xs text-white bg-red-500/80 px-3 py-1.5 rounded-full hover:bg-red-500 transition-colors font-bold">ログアウト</button>
            </div>
          ) : (
            <button onClick={() => {
              const ua = navigator.userAgent.toLowerCase();
              if (ua.includes('line') || ua.includes('twitter') || ua.includes('x-web') || ua.includes('instagram') || ua.includes('fbav')) {
                alert('X（Twitter）やLINEなどのアプリ内ブラウザではGoogleログインができません。\n右上のメニュー等から「ブラウザで開く（Safari/Chrome等）」を選択してからお試しください。');
                return;
              }
              loginWithGoogle().catch(e => {
                if (e.code === 'auth/unauthorized-domain') {
                  alert('Firebaseの「Authorized domains」にこのドメイン (iq-training-plus.vercel.app) を追加してください！');
                } else {
                  console.error(e);
                  alert('ログインエラー: ' + e.message);
                }
              })
            }} className="flex items-center gap-2 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)]">ログイン (記録保存)</button>
          )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
              <span className="text-sm text-cyan-400 font-bold">問題数</span>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="bg-transparent text-white text-sm outline-none cursor-pointer font-bold"
              >
                <option value={5} className="bg-slate-900">5問</option>
                <option value={10} className="bg-slate-900">10問</option>
                <option value={15} className="bg-slate-900">15問</option>
                <option value={20} className="bg-slate-900">20問</option>
                <option value={30} className="bg-slate-900">30問</option>
              </select>
            </div>
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.1)]"
              title={soundEnabled ? "音声をオフにする" : "音声をオンにする"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>
        </div>
        {/* Daily Stamp Modal */}
        {showStamp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-in fade-in">
            <div className="bg-black/60 border-2 border-pink-500 p-10 rounded-3xl flex flex-col items-center animate-in zoom-in-50 duration-500 shadow-[0_0_50px_rgba(255,0,255,0.4)]">
              <CheckCircle className="w-24 h-24 text-pink-400 mb-6 drop-shadow-[0_0_15px_rgba(255,0,255,0.8)]" />
              <h2 className="text-4xl font-black text-white mb-2">ログインボーナス！</h2>
              <p className="text-xl text-pink-300 font-bold mb-4">今日も1日、脳を鍛えよう！</p>
              <div className="text-lg text-slate-300">連続ログイン: <span className="text-cyan-400 font-bold">{dailyStreak}日目</span></div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]">
               <span className="text-3xl font-bold text-black">IQ</span>
             </div>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 whitespace-nowrap">
               IQトレーニング+
             </h1>
          </div>
          <p className="text-slate-400 text-lg">WAISライク・ブレインワークアウト</p>
        </div>

        {/* Status Bar */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 w-full p-6 rounded-3xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4 px-8 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border border-cyan-400 flex items-center justify-center bg-cyan-500/10 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
              <span className="text-xl font-bold text-cyan-400">Lv.{level}</span>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-1">EXP: {xp} / {level * 100}</div>
              <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 shadow-[0_0_8px_#00f3ff]"
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-pink-400 font-bold">
            <CalendarCheck className="w-5 h-5 drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
            <span className="drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">{dailyStreak}日連続</span>
          </div>
          <button 
              onClick={() => setActiveScreen('pokedex')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 transition-colors text-pink-400 font-bold text-sm shadow-[0_0_10px_rgba(255,0,255,0.2)]"
            >
              🏆 称号図鑑
            </button>
        </div>

        {/* Mix Mode Action */}
        <div className="w-full mb-8">
          <div className="bg-black/60 backdrop-blur-xl border border-white/20 p-6 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                <Brain className="text-cyan-400" />
                ランダムミックス (ごちゃ混ぜモード)
              </h3>
              <p className="text-slate-300">すべてのトレーニングからランダムに出題されます。総合的なIQトレーニングに最適です。</p>
            </div>
            
            <div className="flex items-center gap-4">
              
              <button
                onClick={handleStartMix}
                className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-100 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                スタート
              </button>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => handleStartGame(game.id)}
              className={`bg-black/60 backdrop-blur-xl border p-6 rounded-3xl text-left transition-all hover:bg-black/80 relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.5)] ${
                game.color === 'cyan' ? 'border-cyan-500/30' : 'border-pink-500/30'
              }`}
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl transition-all ${
                game.color === 'cyan' ? 'bg-cyan-500/10 group-hover:bg-cyan-500/20' : 'bg-pink-500/10 group-hover:bg-pink-500/20'
              }`}></div>
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div className={`w-10 h-10 rounded flex items-center justify-center ${
                  game.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-pink-500/20 text-pink-400'
                }`}>
                  <game.icon className="w-5 h-5" />
                </div>
                <Play className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className={`text-xl font-bold mb-2 relative z-10 ${
                game.color === 'cyan' ? 'group-hover:text-cyan-400' : 'group-hover:text-pink-400'
              }`}>
                {game.name}
              </h3>
              <p className="text-slate-400 text-sm relative z-10">{game.desc}</p>
            </button>
          ))}
          
      </div>
      <div className="mt-12 text-center relative z-10 w-full pb-8">
        <a href="https://mofu-mitsu.github.io/index.html" className="text-cyan-500/50 hover:text-cyan-400 transition-colors text-sm">
          ホームへ戻る
        </a>
      </div>
    </div>
    </main>
  );
}
