const fs = require('fs');
let code = fs.readFileSync('app/layout.tsx', 'utf8');

const headTag = `    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GNTX973GET"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GNTX973GET');
            \`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>`;

code = code.replace(
  `<html lang="en">\n      <body suppressHydrationWarning>{children}</body>\n    </html>`,
  headTag
);

fs.writeFileSync('app/layout.tsx', code);
