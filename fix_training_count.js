const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// 1. Add state for localQuestionCount
code = code.replace(
  'const [rakutenItem, setRakutenItem]',
  'const [localQuestionCount, setLocalQuestionCount] = useState(questionCount);\n  const [rakutenItem, setRakutenItem]'
);

// 2. Replace questionCount with localQuestionCount in currentQIndex >= questionCount
code = code.replace(
  'if (currentQIndex >= questionCount) {',
  'if (currentQIndex >= localQuestionCount) {'
);

code = code.replace(
  '問題 {currentQIndex + 1} / {questionCount}',
  '問題 {currentQIndex + 1} / {localQuestionCount}'
);

// 3. Render select in "ready"
const readyText = `              <p className="text-gray-300 mb-8 text-lg">\n                準備ができたらスタートボタンを押してください。\n              </p>`;
const replacementText = `              <p className="text-gray-300 mb-6 text-lg">\n                準備ができたらスタートボタンを押してください。\n              </p>\n              <div className="flex items-center justify-center gap-4 mb-8">\n                <span className="text-sm text-cyan-400 font-bold">問題数</span>\n                <select\n                  value={localQuestionCount}\n                  onChange={(e) => setLocalQuestionCount(Number(e.target.value))}\n                  className="bg-black/50 text-white px-4 py-2 rounded-xl outline-none border border-cyan-500/30"\n                >\n                  <option value={5}>5問</option>\n                  <option value={10}>10問</option>\n                  <option value={15}>15問</option>\n                  <option value={20}>20問</option>\n                  <option value={30}>30問</option>\n                </select>\n              </div>`;

code = code.replace(readyText, replacementText);

fs.writeFileSync('components/TrainingModule.tsx', code);
