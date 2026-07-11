const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('import html2canvas')) {
  code = code.replace(
    /import VisualPuzzle from '.\/VisualPuzzle';/,
    `import VisualPuzzle from './VisualPuzzle';
import html2canvas from 'html2canvas';
import { Share2, Download } from 'lucide-react';`
  );
}

// Add a ref for the result container
if (!code.includes('handleSaveImage')) {
  code = code.replace(
    /const \[gameState, setGameState\] = useState<\n    "ready" \| "playing" \| "feedback" \| "finished"\n  >\("ready"\);/,
    `const [gameState, setGameState] = useState<
      "ready" | "playing" | "feedback" | "finished"
    >("ready");
    const resultRef = useRef<HTMLDivElement>(null);
  
    const handleSaveImage = async () => {
      if (!resultRef.current) return;
      try {
        const canvas = await html2canvas(resultRef.current, { backgroundColor: '#0f172a' });
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = image;
        a.download = \`wais-training-result-\${Date.now()}.png\`;
        a.click();
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleShare = async () => {
      const text = \`脳トレで \${score}/\${questionCount} 点を獲得しました！ #脳トレ #WAISトレーニング\`;
      if (navigator.share) {
        try {
          await navigator.share({
            title: '脳トレ結果',
            text: text,
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        navigator.clipboard.writeText(text);
        alert('結果をクリップボードにコピーしました！');
      }
    };`
  );
}

if (!code.includes('ref={resultRef}')) {
  code = code.replace(
    /<div className="animate-in slide-in-from-bottom-10 duration-500 w-full">/,
    `<div className="animate-in slide-in-from-bottom-10 duration-500 w-full flex flex-col items-center">
      <div ref={resultRef} className="w-full bg-slate-900/80 p-8 rounded-3xl border border-cyan-500/30 mb-8 flex flex-col items-center">`
  );
  
  code = code.replace(
    /<\/button>\n            <\/div>\n          \)}\n        <\/div>/,
    `          <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
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
              </div>
              <button
                  onClick={onComplete}
                  className="px-10 py-5 rounded-full bg-[rgba(0,255,255,0.1)] hover:bg-[rgba(0,255,255,0.2)] border-2 border-cyan-400 transition-all text-xl font-bold text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] mt-4"
                >
                  ホームへ戻る
                </button>
              </div>
            )}
          </div>`
  );
}

fs.writeFileSync('components/TrainingModule.tsx', code);
