import fs from 'fs';
import path from 'path';

// List of icons to generate puzzles for
const iconsToUse = [
  { id: 'car', label: '車', keywords: ['車', 'くるま', '自動車', 'カー', 'car'] },
  { id: 'apple', label: 'リンゴ', keywords: ['リンゴ', 'りんご', '林檎', 'apple'] },
  { id: 'house', label: '家', keywords: ['家', 'いえ', 'ハウス', 'house'] },
  { id: 'plane', label: '飛行機', keywords: ['飛行機', 'ひこうき', 'プレーン', 'plane'] },
  { id: 'cat', label: '猫', keywords: ['猫', 'ねこ', 'ネコ', 'cat'] },
  { id: 'dog', label: '犬', keywords: ['犬', 'いぬ', 'イヌ', 'dog'] },
  { id: 'bicycle', label: '自転車', keywords: ['自転車', 'じてんしゃ'] },
  { id: 'camera', label: 'カメラ', keywords: ['カメラ', 'かめら'] },
  { id: 'umbrella', label: '傘', keywords: ['傘', 'かさ', 'アンブレラ'] },
  { id: 'star', label: '星', keywords: ['星', 'ほし', 'スター'] },
];

let questions = [];

for (const icon of iconsToUse) {
  try {
    const iconFile = fs.readFileSync(`./node_modules/lucide-react/dist/esm/icons/${icon.id}.js`, 'utf-8');
    const nodesMatch = iconFile.match(/const __iconNode = (\[.*?\]);/s);
    if (!nodesMatch) continue;
    
    // We can evaluate the array, or just parse it. It's a JS array.
    const nodesData = eval(nodesMatch[1]);
    
    // Convert to SVG inner HTML
    let svgInner = '';
    for (const [tag, attrs] of nodesData) {
      let attrStr = '';
      for (const [k, v] of Object.entries(attrs)) {
        if (k !== 'key') {
          attrStr += ` ${k}="${v}"`;
        }
      }
      if (tag === 'path' || tag === 'circle' || tag === 'rect' || tag === 'line' || tag === 'polygon' || tag === 'polyline') {
        svgInner += `<${tag}${attrStr} />`;
      }
    }

    const pieces = [
      `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><g transform="translate(0, 0)">${svgInner}</g></svg>`,
      `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><g transform="translate(-12, 0)">${svgInner}</g></svg>`,
      `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><g transform="translate(0, -12)">${svgInner}</g></svg>`,
      `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full"><g transform="translate(-12, -12)">${svgInner}</g></svg>`
    ];

    questions.push(`  {
    text: '絵を完成させてください',
    targetName: '${icon.label}',
    cols: 2,
    pieces: [
      '${pieces[0]}',
      '${pieces[1]}',
      '${pieces[2]}',
      '${pieces[3]}'
    ],
    correctOrder: [
      '${pieces[0]}',
      '${pieces[1]}',
      '${pieces[2]}',
      '${pieces[3]}'
    ],
    keywords: ${JSON.stringify(icon.keywords)},
    explanation: '${icon.label}の絵が完成します。'
  }`);

  } catch (err) {
    console.error(`Error processing ${icon.id}:`, err);
  }
}

console.log(`export const visualPuzzleQuestions = [\n${questions.join(',\n')}\n];`);
