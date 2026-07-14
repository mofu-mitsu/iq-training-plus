import fs from 'fs';

const content = fs.readFileSync('components/TrainingModule.tsx', 'utf-8');

// I'll try to find the malformed part and restore it.
// The original code was:
/*
              {!currentGameId.startsWith("digit-span") &&
                currentGameId !== "arithmetic" &&
                currentGameId !== "symbol-search" &&
                questionData && (
                  <div className="flex flex-col gap-8 animate-in fade-in items-center w-full">
                    <div className="text-xl md:text-2xl text-white font-bold whitespace-pre-wrap break-words text-center w-full max-w-lg px-4">
                      {questionData.text}
                    </div>
                    {currentGameId === "pattern" && questionData.grid && (
                      <div className="grid grid-cols-3 gap-2 bg-white/10 p-4 rounded-xl w-64 h-64 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                        {questionData.grid.map((cell: string, idx: number) => (
                          <div
                            key={idx}
                            className={`flex items-center justify-center text-4xl font-bold rounded-lg ${
                              cell === "?" || cell === "？" ? "text-pink-400 bg-black/40 animate-pulse" : "text-cyan-400 bg-black/40"
                            }`}
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
*/

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
                        {questionData.grid.map((cell: string, idx: number) => (
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
                    ) : questionData.options && currentGameId !== 'block-design' ? (`

// I'll extract from `              {!currentGameId.startsWith("digit-span") &&` down to `                    ) : questionData.options && currentGameId !== 'block-design' ? (` and replace with goodContent.

// First find the broken start index
const brokenStart = content.indexOf(`              {!currentGameId.startsWith("digit-span") &&\n                         {currentGameId === 'block-design' ? null`);
// Wait, looking at the previous output:
/*
              {!currentGameId.startsWith("digit-span") &&
                         {currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (
                      <div className="w-full flex flex-col items-center gap-4">
*/
const searchPattern = `              {!currentGameId.startsWith("digit-span") &&`;
const brokenStartIdx = content.indexOf(searchPattern);

// And we want to replace up to the LAST `                    ) : questionData.options && currentGameId !== 'block-design' ? (`
// Because I accidentally duplicated `questionData.options && currentGameId !== 'block-design' ? (` or maybe there's the old one.

let searchStr = `                    ) : questionData.options && currentGameId !== 'block-design' ? (`
let oldVisualPuzzleEndIdx = content.indexOf(searchStr, brokenStartIdx);

let replaced = content.substring(0, brokenStartIdx) + goodContent + content.substring(oldVisualPuzzleEndIdx + searchStr.length);

// Wait, I also need to remove the old visual-puzzle block that might be further down, if it's there.
// Let's check the previous `cat components/TrainingModule.tsx | grep -B 10 -A 30 "currentGameId === 'visual-puzzle' ?"` output
/*
                    {currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (
                      <div className="w-full flex flex-col items-center gap-4">
...
                    ) : questionData.options && currentGameId !== 'block-design' ? (
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
...
                    {currentGameId === 'block-design' ? null : currentGameId === 'visual-puzzle' ? (
                      <div className="w-full flex flex-col items-center">
                        <VisualPuzzle 
                          pieces={questionData.pieces}
                          correctOrder={questionData.correctOrder}
                          cols={questionData.cols}
                          onComplete={(isCorrect) => {
                            if (isCorrect) setPuzzleSolved(true);
                          }}
                        />
                        {puzzleSolved && (
*/
// It's definitely there! I need to replace from brokenStartIdx all the way down to `                      <div className="w-full flex flex-col items-center">` and the old visual puzzle.
// It's easier if I just fetch the file content, fix it with JS string manipulation.
fs.writeFileSync('fix-it.js', `
import fs from 'fs';
let content = fs.readFileSync('components/TrainingModule.tsx', 'utf-8');

const brokenStart = content.indexOf('              {!currentGameId.startsWith("digit-span") &&\\n                         {currentGameId === \\'block-design\\' ? null');

const oldEnd = content.indexOf('                            </button>\\n                          </div>\\n                      )}\\n                      </div>\\n                    ) : questionData.options && currentGameId !== \\'block-design\\' ? (');

const targetEndStr = '                            </button>\\n                          </div>\\n                      )}\\n                      </div>\\n                    ) : questionData.options && currentGameId !== \\'block-design\\' ? (';

if (brokenStart > -1 && oldEnd > -1) {
  const finalContent = content.substring(0, brokenStart) + ` + JSON.stringify(goodContent) + ` + content.substring(oldEnd + targetEndStr.length);
  fs.writeFileSync('components/TrainingModule.tsx', finalContent);
  console.log("Fixed!");
} else {
  console.log("Could not find bounds", brokenStart, oldEnd);
}
`);
