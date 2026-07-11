const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// カスタムスクロールバークラスを追加
code = code.replace(
  'max-h-[40vh] overflow-y-auto"',
  'max-h-[40vh] overflow-y-auto custom-scrollbar"'
);

// 保存・共有ボタンを resultRef の div の外に出す
const buttonsCode = `                <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
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
`;

code = code.replace(buttonsCode, '');

code = code.replace(
  '              <button\n                onClick={onComplete}',
  buttonsCode + '              <button\n                onClick={onComplete}'
);

fs.writeFileSync('components/TrainingModule.tsx', code);
