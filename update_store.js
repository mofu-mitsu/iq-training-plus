const fs = require('fs');
let code = fs.readFileSync('lib/store.ts', 'utf8');
code = code.replace(
  /dailyStreak: number;/,
  `dailyStreak: number;\n  questionCount: number;`
);
code = code.replace(
  /recordPlaySession: \(\) => void;/,
  `recordPlaySession: () => void;\n  setQuestionCount: (count: number) => void;`
);
code = code.replace(
  /dailyStreak: 0,/,
  `dailyStreak: 0,\n      questionCount: 10,`
);
code = code.replace(
  /recordPlaySession: \(\) => set\(\(state\) => \{/,
  `setQuestionCount: (count) => set({ questionCount: count }),\n      recordPlaySession: () => set((state) => {`
);
fs.writeFileSync('lib/store.ts', code);
