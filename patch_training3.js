const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(
  /interface TrainingModuleProps \{[\s\S]*?\}/,
  `interface TrainingModuleProps {
  gameId: string;
  questionCount?: number;
  soundEnabled?: boolean;
  onComplete: () => void;
  onQuit: () => void;
  user?: any;
}`
);

code = code.replace(
  /export default function TrainingModule\(\{\n  gameId,\n  questionCount = 5,\n  soundEnabled = true,\n  onComplete,\n  onQuit,\n\}\: TrainingModuleProps\) \{/,
  `export default function TrainingModule({
  gameId,
  questionCount = 5,
  soundEnabled = true,
  onComplete,
  onQuit,
  user,
}: TrainingModuleProps) {`
);

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
