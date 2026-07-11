const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// letter-number-sequence の文字数を増やす
code = code.replace(
  /const charCount = 2 \+ Math\.floor\(currentQIndex \/ 2\);/,
  `const charCount = 3 + currentQIndex;`
);

// displayIndex が -2 のときの準備中メッセージを追加
code = code.replace(
  /\{displayIndex >= 0 \? \(/,
  `{displayIndex === -2 ? (
                    <div className="h-40 flex items-center justify-center">
                      <div className="text-2xl text-slate-400 animate-pulse">
                        数字を覚える準備をしてください...
                      </div>
                    </div>
                  ) : displayIndex >= 0 ? (`
);

fs.writeFileSync('components/TrainingModule.tsx', code);
