const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

if (!code.includes('import { vocabularyQuestions')) {
  code = code.replace(
    /import \{ useStore \} from "\.\.\/lib\/store";/,
    `import { useStore } from "../lib/store";
import { audio } from "../lib/audio";
import { vocabularyQuestions, similaritiesQuestions, comprehensionQuestions, logicQuestions, mathQuestions, puzzleQuestions, matrixReasoningQuestions, informationQuestions, patternQuestions } from '../lib/questions';
import { visualPuzzleQuestions, spatialQuestions } from '../lib/spatialQuestions';
import VisualPuzzle from './VisualPuzzle';`
  );
  fs.writeFileSync('components/TrainingModule.tsx', code);
}
