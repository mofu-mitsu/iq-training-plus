const fs = require('fs');
let code = fs.readFileSync('app/page.tsx', 'utf8');

const loginBtnStr = `onClick={loginWithGoogle}`;
const newLoginBtnStr = `onClick={() => loginWithGoogle().catch(e => {
              if (e.code === 'auth/unauthorized-domain') {
                alert('Firebaseの「Authorized domains」にこのドメイン (iq-training-plus.vercel.app) を追加してください！');
              } else {
                console.error(e);
              }
            })}`;

code = code.replace(loginBtnStr, newLoginBtnStr);

fs.writeFileSync('app/page.tsx', code);
