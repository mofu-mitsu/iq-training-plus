const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// savingImage stateを追加
code = code.replace(
  'const [leveledUp, setLeveledUp] = useState(false);',
  'const [leveledUp, setLeveledUp] = useState(false);\n  const [isSaving, setIsSaving] = useState(false);'
);

// handleSaveImageを修正
const saveImageRegex = /const handleSaveImage = async \(\) => \{[\s\S]*?try \{[\s\S]*?const image = await toPng\(resultRef\.current, \{ backgroundColor: '#0f172a' \}\);[\s\S]*?a\.click\(\);[\s\S]*?\} catch \(err\) \{[\s\S]*?console\.error\(err\);[\s\S]*?\}[\s\S]*?\};/;
const saveImageReplacement = `const handleSaveImage = async () => {
    if (!resultRef.current) return;
    try {
      setIsSaving(true);
      // Wait for React to re-render without the scrollbar
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      const image = await toPng(resultRef.current, { backgroundColor: '#0f172a', cacheBust: true });
      const a = document.createElement("a");
      a.href = image;
      a.download = \`wais-training-result-\${Date.now()}.png\`;
      a.click();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };`;
code = code.replace(saveImageRegex, saveImageReplacement);

// スクロール領域のクラスを動的に変更
const scrollClassRegex = /className="w-full max-w-2xl text-left bg-black\/40 p-6 rounded-2xl border border-white\/10 mb-8 max-h-\[40vh\] overflow-y-auto custom-scrollbar"/;
const scrollClassReplacement = `className={\`w-full max-w-2xl text-left bg-black/40 p-6 rounded-2xl border border-white/10 mb-8 \${isSaving ? '' : 'max-h-[40vh] overflow-y-auto'} custom-scrollbar\`}`;
code = code.replace(scrollClassRegex, scrollClassReplacement);

fs.writeFileSync('components/TrainingModule.tsx', code);
