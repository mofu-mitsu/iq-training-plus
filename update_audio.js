const fs = require('fs');
let code = fs.readFileSync('lib/audio.ts', 'utf8');

code = code.replace(/linearRampToValueAtTime\(0\.15/g, 'linearRampToValueAtTime(0.3');
code = code.replace(/linearRampToValueAtTime\(0\.1/g, 'linearRampToValueAtTime(0.3');

fs.writeFileSync('lib/audio.ts', code);
