const fs = require('fs');
let code1 = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code1 = code1.replace(
  `                        </div>\n                      )}`,
  `                        </div>\n                      ) : null}`
);

fs.writeFileSync('components/TrainingModule.tsx', code1);

let code2 = fs.readFileSync('app/api/rakuten/route.ts', 'utf8');
if (!code2.trim().endsWith('}')) {
   code2 += '\\n}';
   fs.writeFileSync('app/api/rakuten/route.ts', code2);
}

