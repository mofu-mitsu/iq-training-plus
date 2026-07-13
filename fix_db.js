const fs = require('fs');
let code = fs.readFileSync('lib/firebase.ts', 'utf8');
code = code.replace('const db = getFirestore(app);', 'const db = getFirestore(app, config.firestoreDatabaseId || "(default)");');
fs.writeFileSync('lib/firebase.ts', code);
