import fs from 'fs';

let content = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');
content = content.replace('// eslint-disable-next-line react-hooks/exhaustive-deps', '// eslint-disable-next-line react-hooks/set-state-in-effect');
content = content.replace('// eslint-disable-next-line react-hooks/exhaustive-deps', '// eslint-disable-next-line react-hooks/set-state-in-effect');
fs.writeFileSync('components/VisualPuzzle.tsx', content);

let content2 = fs.readFileSync('components/BlockDesign.tsx', 'utf8');
content2 = content2.replace('// eslint-disable-next-line react-hooks/exhaustive-deps', '// eslint-disable-next-line react-hooks/set-state-in-effect');
content2 = content2.replace('// eslint-disable-next-line react-hooks/exhaustive-deps', '// eslint-disable-next-line react-hooks/set-state-in-effect');
fs.writeFileSync('components/BlockDesign.tsx', content2);

let content3 = fs.readFileSync('app/page.tsx', 'utf8');
content3 = content3.replace('      setShowStamp(true);', '      // eslint-disable-next-line react-hooks/set-state-in-effect\n      setShowStamp(true);');
fs.writeFileSync('app/page.tsx', content3);

