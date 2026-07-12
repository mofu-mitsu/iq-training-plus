const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

code = code.replace(/<\/div>\s*\)\}/g, '</div>\n                      ) : null}');
fs.writeFileSync('components/TrainingModule.tsx', code);
