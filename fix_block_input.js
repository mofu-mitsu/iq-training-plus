const fs = require('fs');
let code = fs.readFileSync('components/TrainingModule.tsx', 'utf8');

const targetCode = `                      ) : (
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
                          <input`;

const replacementCode = `                      ) : currentGameId !== 'block-design' ? (
                        <div className="flex flex-col gap-4 mt-8 w-full max-w-md">
                          <input`;

code = code.replace(targetCode, replacementCode);

// Need to also close the new ternary correctly if needed.
// Actually, it's better to just hide the input container if it's block-design.
// Let's replace the whole input container.

const blockDesignHideInput = `                        <div className={\`flex flex-col gap-4 mt-8 w-full max-w-md \${currentGameId === 'block-design' ? 'hidden' : ''}\`}>`;

code = code.replace(`<div className="flex flex-col gap-4 mt-8 w-full max-w-md">`, blockDesignHideInput);

fs.writeFileSync('components/TrainingModule.tsx', code);
