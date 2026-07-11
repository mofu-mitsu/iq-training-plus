const fs = require('fs');
let code = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');

// Add `cols?: number;` to VisualPuzzleProps
code = code.replace(
  /type VisualPuzzleProps = \{/,
  'type VisualPuzzleProps = {\n  cols?: number;'
);

// Add cols = 2 to params
code = code.replace(
  /export default function VisualPuzzle\(\{ pieces, correctOrder, onComplete \}: VisualPuzzleProps\) \{/,
  'export default function VisualPuzzle({ pieces, correctOrder, onComplete, cols = 2 }: VisualPuzzleProps) {'
);

// Change `slots` initialization
code = code.replace(
  /const \[slots, setSlots\] = useState<\(string \| null\)\[\]>\(\[null, null, null, null\]\);/,
  'const [slots, setSlots] = useState<(string | null)[]>(Array(pieces.length).fill(null));'
);

code = code.replace(
  /setSlots\(\[null, null, null, null\]\);/,
  'setSlots(Array(pieces.length).fill(null));'
);

// Fix the grid layout mapping
code = code.replace(
  /<div className="grid grid-cols-2 gap-1 bg-white\/10 p-2 rounded-xl border border-cyan-500\/30">/,
  '<div className={`grid gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 ${cols === 1 ? \'grid-cols-1\' : cols === 3 ? \'grid-cols-3\' : \'grid-cols-2\'}`}>'
);

fs.writeFileSync('components/VisualPuzzle.tsx', code);
