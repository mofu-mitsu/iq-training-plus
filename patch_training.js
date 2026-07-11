const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('import { User } from "firebase/auth";')) {
  code = code.replace(
    /import \{ useStore \} from '..\/lib\/store';/,
    `import { useStore } from '../lib/store';\nimport { User } from "firebase/auth";\nimport { saveScore } from '../lib/firebase';`
  );

  code = code.replace(
    /soundEnabled: boolean;\n\}/,
    `soundEnabled: boolean;\n  user?: User | null;\n}`
  );

  code = code.replace(
    /export default function TrainingModule\(\{ gameId, questionCount, onComplete, onQuit, soundEnabled \}: TrainingModuleProps\) \{/,
    `export default function TrainingModule({ gameId, questionCount, onComplete, onQuit, soundEnabled, user }: TrainingModuleProps) {`
  );

  // In finish game function
  code = code.replace(
    /setGameState\("finished"\);\n    setEndTime\(Date.now\(\)\);/,
    `setGameState("finished");
    const end = Date.now();
    setEndTime(end);
    if (user) {
      const timeSpent = Math.floor((end - (startTime || end)) / 1000);
      saveScore(user.uid, s, questionCount, timeSpent).catch(console.error);
    }`
  );

  fs.writeFileSync('components/TrainingModule.tsx', code);
}
