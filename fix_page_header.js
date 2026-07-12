const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const targetHeader = `      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="absolute top-4 left-4 z-50 flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.photoURL || ''} alt="avatar" className="w-8 h-8 rounded-full border border-cyan-400" />
              <button onClick={logout} className="text-xs text-white bg-red-500/80 px-2 py-1 rounded hover:bg-red-500 transition-colors">ログアウト</button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className="flex items-center gap-2 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)]">ログイン (記録保存)</button>
          )}
        </div>
        <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-cyan-500/30">
            <span className="text-xs text-cyan-400 font-bold">問題数</span>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="bg-transparent text-white text-sm outline-none cursor-pointer"
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
            className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-cyan-400 flex items-center justify-center"
            title={soundEnabled ? "音声をオフにする" : "音声をオンにする"}
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </button>
        </div>`;

const replaceHeader = `      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div>
          {user ? (
            <div className="flex items-center gap-2">
              <img src={user.photoURL || ''} alt="avatar" className="w-10 h-10 rounded-full border border-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.3)]" />
              <button onClick={logout} className="text-xs text-white bg-red-500/80 px-3 py-1.5 rounded-full hover:bg-red-500 transition-colors font-bold">ログアウト</button>
            </div>
          ) : (
            <button onClick={loginWithGoogle} className="flex items-center gap-2 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)]">ログイン (記録保存)</button>
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
        </div>`;

code = code.replace(targetHeader, replaceHeader);

// Title size adjustments
code = code.replace(
  '<h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">',
  '<h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 whitespace-nowrap">'
);

fs.writeFileSync('app/page.tsx', code);
