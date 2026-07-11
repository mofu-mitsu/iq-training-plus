const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

// For spatial-recognition text overflowing, we should add 'break-words whitespace-pre-wrap text-lg' or similar
code = code.replace(
  /<div className="text-2xl text-white font-bold whitespace-pre-line text-center">/g,
  '<div className="text-xl md:text-2xl text-white font-bold whitespace-pre-wrap break-words text-center w-full max-w-lg px-4">'
);

fs.writeFileSync('components/TrainingModule.tsx', code);
