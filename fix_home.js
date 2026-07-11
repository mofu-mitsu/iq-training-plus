const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');
code = code.replace(
  /const \[questionCount, setQuestionCount\] = useState\(10\);/,
  `const { questionCount, setQuestionCount } = useStore();`
);
code = code.replace(
  /absolute top-4 right-4 z-50/,
  `absolute top-4 left-4 z-50`
);
code = code.replace(
  /text-sm font-bold text-cyan-400 bg-cyan-500\/10 px-4 py-2 rounded-xl hover:bg-cyan-500\/20 transition-colors border border-cyan-500\/30/,
  `text-sm font-bold text-[#1DA1F2] bg-[#1DA1F2]/10 px-4 py-2 rounded-xl hover:bg-[#1DA1F2]/20 transition-colors border border-[#1DA1F2]/30 shadow-[0_0_10px_rgba(29,161,242,0.2)]`
);
fs.writeFileSync('app/page.tsx', code);
