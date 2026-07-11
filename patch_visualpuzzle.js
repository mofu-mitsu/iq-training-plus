const fs = require('fs');
let code = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');

code = code.replace(
  /className="w-full h-full p-2 text-cyan-400 cursor-grab active:cursor-grabbing" \n                dangerouslySetInnerHTML=\{\{ __html: piece \}\}/g,
  `className="w-full h-full p-2 text-cyan-400 cursor-grab active:cursor-grabbing text-4xl font-bold flex items-center justify-center"\n                dangerouslySetInnerHTML={{ __html: piece }}`
);

code = code.replace(
  /className="w-full h-full p-2 text-pink-400 pointer-events-none" dangerouslySetInnerHTML=\{\{ __html: piece \}\} \/>/g,
  `className="w-full h-full p-2 text-pink-400 pointer-events-none text-4xl font-bold flex items-center justify-center" dangerouslySetInnerHTML={{ __html: piece }} />`
);

fs.writeFileSync('components/VisualPuzzle.tsx', code);
