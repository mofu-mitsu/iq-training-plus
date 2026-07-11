const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const replacement = `                    {currentGameId === "block-design" &&
                      questionData.target && (
                        <div className="text-4xl text-cyan-400 whitespace-pre font-mono leading-none tracking-widest my-4 border-2 border-cyan-500/50 p-6 rounded-2xl bg-black/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                          {questionData.target}
                        </div>
                      )}
                    {currentGameId === 'visual-puzzle' ? (
                      <div className="w-full">
                        <VisualPuzzle 
                          pieces={questionData.pieces}
                          correctOrder={questionData.correctOrder}
                          onComplete={(isCorrect) => handleAnswer(isCorrect ? "true" : "false")}
                        />
                      </div>
                    ) : (
                      questionData.options && (
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
                      )
                    )}
                  </div>
                )}
`;

code = code.replace(
  /\{\s*currentGameId === "block-design" &&[\s\S]*?\{questionData\.target\}[\s\S]*?<\/div>[\s\S]*?\}\)[\s\S]*?<\/div>[\s\S]*?\)\}/,
  replacement
);

fs.writeFileSync('components/TrainingModule.tsx', code);
