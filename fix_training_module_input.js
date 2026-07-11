const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const regex = /                    \) : \(\n                      questionData\.options && \([\s\S]*?<\/div>\n                      \)\n                    \)\}/;

const replacement = `                    ) : questionData.options ? (
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                          {questionData.options.map((opt: string, i: number) => (
                            <button
                              key={i}
                              onClick={() => handleAnswer(opt)}
                              className="px-8 py-4 text-xl bg-white/5 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-2xl transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
                          <input
                            type="text"
                            autoFocus
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && (handleAnswer(userInput), setUserInput(""))}
                            className="bg-black/50 border-2 border-cyan-500 rounded-2xl p-4 text-2xl text-center outline-none text-white focus:shadow-[0_0_20px_#0ff]"
                            placeholder="回答を入力..."
                          />
                          <button
                            onClick={() => { handleAnswer(userInput); setUserInput(""); }}
                            className="px-8 py-4 rounded-xl bg-pink-500 text-white font-bold hover:bg-pink-400 shadow-[0_0_15px_#f0f] transition-all text-xl"
                          >
                            決定
                          </button>
                        </div>
                      )}`;

code = code.replace(regex, replacement);
fs.writeFileSync('components/TrainingModule.tsx', code);
