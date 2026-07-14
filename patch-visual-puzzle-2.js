import fs from 'fs';

const content = fs.readFileSync('lib/spatialQuestions.ts', 'utf-8');

const regex = /visualPuzzleQuestions\.length = 0;[\s\S]*?\]\s*\);\s*/;
const modifiedContent = content.replace(regex, '');

fs.writeFileSync('lib/spatialQuestions.ts', modifiedContent);
