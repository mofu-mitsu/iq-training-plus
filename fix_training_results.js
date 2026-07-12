const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// Add copy function
const copyCode = `
  const copyResults = () => {
    let text = \`IQトレーニング+ 結果\\nスコア: \${score} / \${localQuestionCount}\\n\\n\`;
    history.forEach((h, i) => {
      text += \`Q\${i + 1}: \${h.question}\\n\`;
      text += \`あなたの回答: \${h.userAnswer} \${h.isCorrect ? '✅' : '❌'}\\n\`;
      if (!h.isCorrect) text += \`正解: \${h.correctAnswer}\\n\`;
      if (h.explanation) text += \`解説: \${h.explanation}\\n\`;
      text += \`\\n\`;
    });
    navigator.clipboard.writeText(text).then(() => {
      alert('結果をコピーしました！');
    });
  };
`;
code = code.replace(
  'const handleSaveImage = async () => {',
  copyCode + '\n  const handleSaveImage = async () => {'
);

// Add Rakuten rendering and Copy button
const targetRender = `                  </div>
                )}

                <div className="mt-10 flex gap-4">`;
const replaceRender = `                  </div>
                )}
                
                <div className="mt-4 flex justify-center w-full">
                  <button onClick={copyResults} className="text-sm px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 border border-slate-600 transition-colors">
                    📋 結果詳細をコピー
                  </button>
                </div>

                {rakutenItem && (
                  <div className="mt-8 w-full max-w-md bg-white/5 border border-cyan-500/20 rounded-xl p-4 hover:bg-white/10 transition-colors">
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

                <div className="mt-10 flex gap-4">`;

code = code.replace(targetRender, replaceRender);

fs.writeFileSync('components/TrainingModule.tsx', code);
