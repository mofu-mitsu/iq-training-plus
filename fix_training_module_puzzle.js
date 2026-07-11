const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// useState を追加
code = code.replace(
  'const [questionData, setQuestionData] = useState<any>(null);',
  'const [questionData, setQuestionData] = useState<any>(null);\n  const [puzzleSolved, setPuzzleSolved] = useState(false);'
);

// 新しい問題をセットする時に puzzleSolved を false にリセット
code = code.replace(
  'const generateQuestion = () => {',
  'const generateQuestion = () => {\n    setPuzzleSolved(false);'
);

// visual-puzzle の表示部分を変更
const puzzleRegex = /\{currentGameId === 'visual-puzzle' \? \([\s\S]*?\) : questionData\.options \? \(/;
const puzzleReplacement = `{currentGameId === 'visual-puzzle' ? (
                      <div className="w-full flex flex-col items-center">
                        <VisualPuzzle 
                          pieces={questionData.pieces}
                          correctOrder={questionData.correctOrder}
                          onComplete={(isCorrect) => {
                            if (isCorrect) setPuzzleSolved(true);
                          }}
                        />
                        {puzzleSolved && (
                          <div className="flex flex-col gap-4 mt-8 w-full max-w-md animate-in fade-in zoom-in duration-300">
                            <div className="text-xl text-cyan-400 font-bold">この絵は何ですか？</div>
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
                        )}
                      </div>
                    ) : questionData.options ? (`;

code = code.replace(puzzleRegex, puzzleReplacement);

// 判定ロジックの修正
// } else if (currentGameId === 'visual-puzzle' && questionData) {
//   isCorrect = answer === "true";
//   correctAnswerStr = "正解の絵";
//   questionText = "絵を完成させてください";

const puzzleLogicRegex = /\} else if \(currentGameId === 'visual-puzzle' && questionData\) \{[\s\S]*?questionText = "絵を完成させてください";/;
const puzzleLogicReplacement = `} else if (currentGameId === 'visual-puzzle' && questionData) {
      if (questionData.keywords) {
        isCorrect = questionData.keywords.some((kw: string) => answer.includes(kw));
        correctAnswerStr = questionData.keywords.join(" または ");
      } else {
        isCorrect = answer === "true";
        correctAnswerStr = "正解の絵";
      }
      questionText = "絵を完成させてください";`;

code = code.replace(puzzleLogicRegex, puzzleLogicReplacement);

// 履歴に SVG を保存する対応
// h.svg というプロパティを追加し、結果詳細で表示する
const historyPushRegex = /setHistory\(\(prev\) => \[\n\s*\.\.\.prev,\n\s*\{\n\s*question: questionText,\n\s*userAnswer: answer,\n\s*correctAnswer: correctAnswerStr,\n\s*isCorrect,\n\s*explanation: questionData\?.explanation \|\| "",\n\s*\},\n\s*\]\);/;

const historyPushReplacement = `setHistory((prev) => [
        ...prev,
        {
          question: questionText,
          userAnswer: answer,
          correctAnswer: correctAnswerStr,
          isCorrect,
          explanation: questionData?.explanation || "",
          svg: currentGameId === 'visual-puzzle' && questionData ? questionData.pieces.join('') : null
        },
      ]);`;
code = code.replace(historyPushRegex, historyPushReplacement);

const historyRenderRegex = /\{h\.explanation && \(\n\s*<div className="text-sm/;
const historyRenderReplacement = `{h.svg && (
                          <div className="w-full flex justify-center my-4 bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="w-32 h-32 text-cyan-400" dangerouslySetInnerHTML={{ __html: h.svg }} />
                          </div>
                        )}
                        {h.explanation && (
                          <div className="text-sm`;
code = code.replace(historyRenderRegex, historyRenderReplacement);

fs.writeFileSync('components/TrainingModule.tsx', code);
