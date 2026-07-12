const fs = require('fs');
let code = fs.readFileSync('app/api/rakuten/route.ts', 'utf8');

code = code.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('app/api/rakuten/route.ts', code);
