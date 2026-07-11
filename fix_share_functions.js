const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('const handleSaveImage = async')) {
  code = code.replace(
    /const \[history, setHistory\] = useState<any\[\]>\(\[\]\);/,
    `const [history, setHistory] = useState<any[]>([]);
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
  fs.writeFileSync('components/TrainingModule.tsx', code);
}
