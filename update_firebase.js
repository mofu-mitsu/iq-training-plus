const fs = require('fs');
let code = fs.readFileSync('lib/firebase.ts', 'utf8');
code = code.replace(
  /const firebaseConfig = \{[\s\S]*?\};/,
  `import config from "../firebase-applet-config.json";\n\nconst firebaseConfig = {\n  apiKey: config.apiKey,\n  authDomain: config.authDomain,\n  projectId: config.projectId,\n  storageBucket: config.storageBucket,\n  messagingSenderId: config.messagingSenderId,\n  appId: config.appId,\n};`
);
fs.writeFileSync('lib/firebase.ts', code);
