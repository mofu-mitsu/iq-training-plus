const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetIndex = code.indexOf('          {gameState === "finished" && (');
if (targetIndex !== -1) {
  code = code.substring(0, targetIndex);
  code += `          {gameState === "finished" && (
            <div className="animate-in slide-in-from-bottom-10 duration-500 w-full flex flex-col items-center">
              <div ref={resultRef} className="w-full bg-slate-900/80 p-8 rounded-3xl border border-cyan-500/30 mb-8 flex flex-col items-center">
                <h2 className="text-4xl font-bold mb-6 neon-text-cyan">
                  トレーニング終了！
                </h2>
                <div className="text-7xl font-black neon-text-pink mb-10">
                  {score} <span className="text-3xl text-slate-400">/ {questionCount}</span>
                </div>
                
                {history.length > 0 && (
                  <div className="w-full max-w-2xl text-left bg-black/40 p-6 rounded-2xl border border-white/10 mb-8 max-h-[40vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6 text-cyan-400 text-center sticky top-0 bg-black/80 py-2 backdrop-blur-sm">結果の詳細</h3>
                    {history.map((h, i) => (
                      <div key={i} className="mb-6 pb-6 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
                        <div className="font-bold text-lg mb-3">Q{i + 1}. {h.question}</div>
                        <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <span className="text-slate-400">あなたの回答:</span>
                            <span className="font-bold flex items-center">
                              {h.userAnswer || "未回答"} 
                              <span className="ml-2">{h.isCorrect ? "⭕️" : "❌"}</span>
                            </span>
                          </div>
                          {!h.isCorrect && (
                            <div className="flex justify-between items-center bg-pink-500/10 p-3 rounded-lg border border-pink-500/20">
                              <span className="text-pink-400">正解例:</span>
                              <span className="text-cyan-400 font-bold">{h.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                        {h.explanation && (
                          <div className="text-sm text-slate-300 bg-white/5 p-4 rounded-xl mt-3 border border-white/10 leading-relaxed">
                            <span className="mr-2">💡</span>
                            {h.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
                  <button
                    onClick={handleSaveImage}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors text-white font-bold"
                  >
                    <Download className="w-5 h-5" />
                    画像を保存
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/40 border border-[#1DA1F2] transition-colors text-white font-bold"
                  >
                    <Share2 className="w-5 h-5 text-[#1DA1F2]" />
                    結果を共有
                  </button>
                </div>
              </div>
              <button
                onClick={onComplete}
                className="px-10 py-5 rounded-full bg-[rgba(0,255,255,0.1)] hover:bg-[rgba(0,255,255,0.2)] border-2 border-cyan-400 transition-all text-xl font-bold text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] mt-4"
              >
                ホームへ戻る
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;
  fs.writeFileSync('components/TrainingModule.tsx', code);
}
