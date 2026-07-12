const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

// replace icons mapping
const iconStart = code.indexOf('icons: {');
if (iconStart !== -1) {
  const iconEnd = code.indexOf('},', iconStart) + 2;
  code = code.substring(0, iconStart) + code.substring(iconEnd);
}

// remove old openGraph images setting as opengraph-image.tsx handles it
const ogImagesStart = code.indexOf('images: [');
if (ogImagesStart !== -1) {
  const ogImagesEnd = code.indexOf('],', ogImagesStart) + 2;
  code = code.substring(0, ogImagesStart) + code.substring(ogImagesEnd);
}

const twImagesStart = code.indexOf('images: [\'/ogp.png\'],');
if (twImagesStart !== -1) {
  code = code.substring(0, twImagesStart) + code.substring(twImagesStart + 'images: [\'/ogp.png\'],'.length);
}

fs.writeFileSync('app/layout.tsx', code);
