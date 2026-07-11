const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetStr = '                <div className="text-7xl font-black neon-text-pink mb-10">';

const replacement = `          )}
          {gameState === "finished" && (
            <div className="animate-in slide-in-from-bottom-10 duration-500 w-full flex flex-col items-center">
              <div ref={resultRef} className="w-full bg-slate-900/80 p-8 rounded-3xl border border-cyan-500/30 mb-8 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6 neon-text-cyan">
                  トレーニング終了！
                </h2>
                {leveledUp && (
                  <div className="my-4 animate-bounce bg-pink-500/20 p-4 rounded-2xl border border-pink-500 shadow-[0_0_20px_#f0f]">
                    <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_#f0f]">
                      🎉 LEVEL UP! (Lv.{level}) 🎉
                    </div>
                  </div>
                )}
                <div className="text-7xl font-black neon-text-pink mb-10">`;

if (!code.includes('gameState === "finished"')) {
  code = code.replace(targetStr, replacement);
  fs.writeFileSync('components/TrainingModule.tsx', code);
}
