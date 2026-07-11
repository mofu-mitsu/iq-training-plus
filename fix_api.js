const fs = require('fs');
let code = fs.readFileSync('app/api/rakuten/route.ts', 'utf8');

code = code.replace(
  'fetch(`\\${apiUrl}?applicationId=\\${appId}&keyword=\\${encodeURIComponent(searchKeyword)}&hits=5&format=json`);',
  'fetch(`${apiUrl}?applicationId=${appId}&keyword=${encodeURIComponent(searchKeyword)}&hits=5&format=json`);'
);

code = code.replace(
  '`https://hb.afl.rakuten.co.jp/hgc/\\${affiliateId}/?pc=\\${encodeURIComponent(productUrl)}`;',
  '`https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(productUrl)}`;'
);

fs.writeFileSync('app/api/rakuten/route.ts', code);
