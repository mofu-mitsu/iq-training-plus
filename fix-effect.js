import fs from 'fs';

let content = fs.readFileSync('components/VisualPuzzle.tsx', 'utf8');
content = content.replace('  useEffect(() => {\n    setAvailablePieces([...pieces].sort(() => Math.random() - 0.5));\n    setSlots(Array(pieces.length).fill(null));\n  }, [pieces]);', '  useEffect(() => {\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    setAvailablePieces([...pieces].sort(() => Math.random() - 0.5));\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    setSlots(Array(pieces.length).fill(null));\n  }, [pieces]);');
fs.writeFileSync('components/VisualPuzzle.tsx', content);

let content2 = fs.readFileSync('components/BlockDesign.tsx', 'utf8');
content2 = content2.replace('  useEffect(() => {\n    setSlots(Array(9).fill(null));\n    setAvailableBlocks(totalBlocks);\n  }, [target, totalBlocks]);', '  useEffect(() => {\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    setSlots(Array(9).fill(null));\n    // eslint-disable-next-line react-hooks/exhaustive-deps\n    setAvailableBlocks(totalBlocks);\n  }, [target, totalBlocks]);');
fs.writeFileSync('components/BlockDesign.tsx', content2);
