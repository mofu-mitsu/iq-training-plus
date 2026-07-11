const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('const prevLevel = useRef(useStore.getState().level);')) {
  code = code.replace(
    /const resultRef = useRef<HTMLDivElement>\(null\);/,
    `const resultRef = useRef<HTMLDivElement>(null);\n  const prevLevel = useRef(useStore.getState().level);`
  );
}

if (!code.includes('const { level } = useStore();')) {
  code = code.replace(
    /const \[history, setHistory\] = useState<any\[\]>\(\[\]\);/,
    `const { level } = useStore();\n  const [history, setHistory] = useState<any[]>([]);\n  const [leveledUp, setLeveledUp] = useState(false);`
  );
}

if (!code.includes('if (level > prevLevel.current)')) {
  code = code.replace(
    /setTimeout\(finishGame, 1000\);/,
    `setTimeout(() => {\n        finishGame();\n        if (useStore.getState().level > prevLevel.current) {\n          setLeveledUp(true);\n          fireConfetti();\n        }\n      }, 1000);`
  );
}

const levelUpUI = `
                {leveledUp && (
                  <div className="my-4 animate-bounce bg-pink-500/20 p-4 rounded-2xl border border-pink-500 shadow-[0_0_20px_#f0f]">
                    <div className="text-3xl font-black text-white drop-shadow-[0_0_10px_#f0f]">
                      🎉 LEVEL UP! (Lv.{level}) 🎉
                    </div>
                  </div>
                )}
`;

if (!code.includes('🎉 LEVEL UP!')) {
  code = code.replace(
    /<div className="text-7xl font-black neon-text-pink mb-10">/,
    `${levelUpUI}\n                <div className="text-7xl font-black neon-text-pink mb-10">`
  );
}

fs.writeFileSync('components/TrainingModule.tsx', code);
