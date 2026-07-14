import fs from 'fs';
let content = fs.readFileSync('components/TrainingModule.tsx', 'utf-8');

const brokenStart = content.indexOf(`              {!currentGameId.startsWith("digit-span") &&\n                         {currentGameId === 'block-design' ? null`);

const targetEndStr = `                            </button>\n                          </div>\n                      )}\n                      </div>\n                    ) : questionData.options && currentGameId !== 'block-design' ? (`;
const oldEnd = content.indexOf(targetEndStr);

const goodContent = `              {!currentGameId.startsWith("digit-span") &&
                currentGameId !== "arithmetic" &&
                currentGameId !== "symbol-search" &&
                questionData && (
                  <div className="flex flex-col gap-8 animate-in fade-in items-center w-full">
                    <div className="text-xl md:text-2xl text-white font-bold whitespace-pre-wrap break-words text-center w-full max-w-lg px-4">
                      {questionData.text}
                    </div>
                    {currentGameId === "pattern" && questionData.grid && (
                      <div className="grid grid-cols-3 gap-2 bg-white/10 p-4 rounded-xl w-64 h-64 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                        {questionData.grid.map((cell, idx) => (
                          <div
                            key={idx}
                            className={\`flex items-center justify-center text-4xl font-bold rounded-lg \${
                              cell === "?" || cell === "？" ? "text-pink-400 bg-black/40 animate-pulse" : "text-cyan-400 bg-black/40"
                            }\`}
                          >
                            {cell}
                          </div>
                        ))}
                      </div>
                      )}
                    {currentGameId === "figure-weights" &&
                      questionData.left && (
                        <div className="flex flex-col items-center gap-6 my-4 w-full">
                          <div className="flex items-center justify-center gap-6 bg-white/5 p-6 rounded-2xl w-full max-w-md border border-white/10 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                            <div className="text-4xl">{questionData.left}</div>
                            <div className="text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                              ⚖️
                            </div>
                            <div className="text-4xl">{questionData.right}</div>
                          </div>
                          <div className="text-4xl font-bold bg-black/40 px-8 py-4 rounded-xl border border-cyan-500/30">
                            {questionData.target} ={" "}
                            <span className="text-pink-400 animate-pulse">
                              ❓
                            </span>
                          </div>
                        </div>
                      )}
                    {questionData.svg && (
                      <div
                        className="w-48 h-48 text-cyan-400 my-4"
                        dangerouslySetInnerHTML={{ __html: questionData.svg }}
                      />
                    )}
                    
                    {currentGameId === "block-design" &&
                      questionData.target && (
                        <div className="text-4xl text-cyan-400 whitespace-pre font-mono leading-none tracking-widest my-4 border-2 border-cyan-500/50 p-6 rounded-2xl bg-black/30 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                          {questionData.target}
                        </div>
                      )}
                    
                    {currentGameId === 'block-design' && questionData.target && (
                      <BlockDesign
                        target={questionData.target}
                        onComplete={(isCorrect) => handleAnswer(isCorrect ? questionData.target : "incorrect")}
                      />
                    )}
                    {currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (
                      <div className="w-full flex flex-col items-center gap-4">
                        <div className="text-xl md:text-2xl text-cyan-400 font-bold mb-4">
                          {questionData.targetName ? \`「\${questionData.targetName}」を完成させてください\` : questionData.text}
                        </div>
                        <VisualPuzzle 
                          pieces={questionData.pieces}
                          correctOrder={questionData.correctOrder}
                          cols={questionData.cols}
                          onComplete={(isCorrect) => handleAnswer(isCorrect ? "true" : "false")}
                        />
                      </div>
                    ) : questionData.options && currentGameId !== 'block-design' ? (`;

if (brokenStart > -1 && oldEnd > -1) {
  const finalContent = content.substring(0, brokenStart) + goodContent + content.substring(oldEnd + targetEndStr.length);
  fs.writeFileSync('components/TrainingModule.tsx', finalContent);
  console.log("Fixed!");
} else {
  console.log("Could not find bounds", brokenStart, oldEnd);
}
