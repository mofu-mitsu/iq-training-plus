const fs = require('fs');
let code = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');

code = code.replace(
  /const handleDecide = \(\) => \{\n    const isCorrect = slots.every\(\(s, i\) => s === correctOrder\[i\]\);\n    onComplete\(isCorrect\);\n  \};/,
  `const handleDecide = () => {
    const validSlots = slots.filter(s => s !== null);
    const isCorrect = validSlots.length === correctOrder.length && validSlots.every((s, i) => s === correctOrder[i]);
    onComplete(isCorrect);
  };`
);

fs.writeFileSync('components/VisualPuzzle.tsx', code);
