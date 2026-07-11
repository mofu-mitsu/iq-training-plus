const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const loginRegex = /<button onClick=\{loginWithGoogle\} className="text-sm font-bold text-white bg-blue-500\/80 px-4 py-2 rounded-xl hover:bg-blue-500 transition-colors border border-blue-400">ログイン \(成績保存\)<\/button>/;
const loginReplacement = `<button onClick={loginWithGoogle} className="flex items-center gap-2 text-sm font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(0,243,255,0.6)] transition-all shadow-[0_0_10px_rgba(0,243,255,0.3)]">ログイン (記録保存)</button>`;
code = code.replace(loginRegex, loginReplacement);

const selectRegex = /<div className="absolute top-4 right-4 z-50 flex items-center gap-4">\s*<\/div>/;
const selectReplacement = `<div className="absolute top-4 right-4 z-50 flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full border border-cyan-500/30">
            <span className="text-xs text-cyan-400 font-bold">問題数</span>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="bg-transparent text-white text-sm outline-none cursor-pointer"
            >
              <option value={5} className="bg-slate-900">5問</option>
              <option value={10} className="bg-slate-900">10問</option>
              <option value={15} className="bg-slate-900">15問</option>
            </select>
          </div>
        </div>`;
code = code.replace(selectRegex, selectReplacement);

// setQuestionCount が useStore にあるか確認するために、とりあえずインポートに追加しておく必要があるか。
// const { level, xp, streak, questionCount, setQuestionCount } = useStore(); のように取得しているか確認。

fs.writeFileSync('app/page.tsx', code);
