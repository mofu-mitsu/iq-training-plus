import fs from 'fs';

const content = fs.readFileSync('lib/spatialQuestions.ts', 'utf-8');
const newPuzzles = fs.readFileSync('temp-puzzles.ts', 'utf-8');

const regex = /export const visualPuzzleQuestions = \[\s*\{[\s\S]*?\];/;
const modifiedContent = content.replace(regex, newPuzzles);

fs.writeFileSync('lib/spatialQuestions.ts', modifiedContent);
