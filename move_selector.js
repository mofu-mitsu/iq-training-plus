const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const selectBox = `<div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl">
                <span className="text-sm text-slate-400">問題数:</span>
                <select 
                  value={questionCount} 
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="bg-transparent text-white font-bold outline-none cursor-pointer"
                >
                  <option value={5} className="text-black">5問</option>
                  <option value={10} className="text-black">10問</option>
                  <option value={15} className="text-black">15問</option>
                  <option value={20} className="text-black">20問</option>
                </select>
              </div>`;

code = code.replace(selectBox, '');

code = code.replace(
  /<button \n            onClick=\{toggleSound\}/,
  `${selectBox}\n          <button 
            onClick={toggleSound}`
);

fs.writeFileSync('app/page.tsx', code);
