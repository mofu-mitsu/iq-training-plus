const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetStr = `{rakutenItem && (
                  <div className="mt-8 w-full max-w-md bg-white/5 border border-cyan-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors mx-auto mb-4">
                    <p className="text-xs text-slate-400 mb-2 font-bold text-center">おすすめの脳トレグッズ</p>
                    <a href={rakutenItem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      {rakutenItem.image && <img src={rakutenItem.image} alt="product" className="w-16 h-16 object-cover rounded-lg" />}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-cyan-100 font-medium truncate">{rakutenItem.name}</p>
                        <p className="text-pink-400 font-bold mt-1">¥{rakutenItem.price.toLocaleString()}</p>
                      </div>
                    </a>
                  </div>
                )}

                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">`;

const replacement = `                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">`;

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replacement);
}

const buttonsStr = `                    結果を共有
                  </button>
                </div>`;

const newRakutenStr = `                    結果を共有
                  </button>
                </div>

                {rakutenItem && (
                  <div className="mt-12 w-full max-w-md bg-white/5 border border-pink-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors mx-auto shadow-[0_0_15px_rgba(255,0,255,0.1)]">
                    <p className="text-xs text-pink-400 mb-3 font-bold text-center">🏆 おすすめの脳トレグッズ</p>
                    <a href={rakutenItem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4">
                      {rakutenItem.image && <img src={rakutenItem.image} alt="product" className="w-20 h-20 object-cover rounded-lg border border-white/10" />}
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm text-white font-medium truncate">{rakutenItem.name}</p>
                        <p className="text-cyan-400 font-bold mt-2">¥{rakutenItem.price.toLocaleString()}</p>
                      </div>
                    </a>
                  </div>
                )}`;

if (code.includes(buttonsStr)) {
  code = code.replace(buttonsStr, newRakutenStr);
}

fs.writeFileSync('components/TrainingModule.tsx', code);
