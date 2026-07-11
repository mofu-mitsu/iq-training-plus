import { useState, useEffect } from 'react';

type VisualPuzzleProps = {
  cols?: number;
  pieces: string[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
};

export default function VisualPuzzle({ pieces, correctOrder, onComplete, cols = 2 }: VisualPuzzleProps) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(pieces.length).fill(null));
  const [availablePieces, setAvailablePieces] = useState<string[]>([]);
  
  useEffect(() => {
    setAvailablePieces([...pieces].sort(() => Math.random() - 0.5));
    setSlots(Array(pieces.length).fill(null));
  }, [pieces]);

  // Click Fallback (Tap to move to first empty slot)
  const handlePieceClick = (piece: string, index: number) => {
    const emptySlotIndex = slots.findIndex(s => s === null);
    if (emptySlotIndex !== -1) {
      const newSlots = [...slots];
      newSlots[emptySlotIndex] = piece;
      setSlots(newSlots);
      
      const newAvailable = [...availablePieces];
      newAvailable.splice(index, 1);
      setAvailablePieces(newAvailable);
    }
  };

  const handleSlotClick = (piece: string | null, index: number) => {
    if (piece !== null) {
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      
      setAvailablePieces([...availablePieces, piece]);
    }
  };

  // Drag and Drop implementation
  const handleDragStart = (e: React.DragEvent, source: 'available' | 'slot', index: number) => {
    e.dataTransfer.setData('source', source);
    e.dataTransfer.setData('index', index.toString());
  };

  const handleDropToSlot = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');
    const index = parseInt(e.dataTransfer.getData('index'), 10);
    
    if (source === 'available') {
      const piece = availablePieces[index];
      const newSlots = [...slots];
      const targetPiece = newSlots[targetIndex];
      
      newSlots[targetIndex] = piece;
      setSlots(newSlots);
      
      const newAvailable = [...availablePieces];
      newAvailable.splice(index, 1);
      if (targetPiece) {
        newAvailable.push(targetPiece);
      }
      setAvailablePieces(newAvailable);
    } else if (source === 'slot') {
      // Swap slots
      const newSlots = [...slots];
      const temp = newSlots[targetIndex];
      newSlots[targetIndex] = newSlots[index];
      newSlots[index] = temp;
      setSlots(newSlots);
    }
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');
    const index = parseInt(e.dataTransfer.getData('index'), 10);
    
    if (source === 'slot') {
      const piece = slots[index];
      if (piece) {
        const newSlots = [...slots];
        newSlots[index] = null;
        setSlots(newSlots);
        setAvailablePieces([...availablePieces, piece]);
      }
    }
  };

  const handleDecide = () => {
    const validSlots = slots.filter(s => s !== null);
    const isCorrect = validSlots.length === correctOrder.length && validSlots.every((s, i) => s === correctOrder[i]);
    onComplete(isCorrect);
  };

  const isFull = slots.filter(s => s !== null).length === pieces.length;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
      <div className="text-lg md:text-xl text-slate-300 font-bold mb-4">
        下のピースをドラッグ（またはタップ）して、枠にはめ込んで絵を完成させてください。
      </div>
      
      {/* 2x2 Grid */}
      <div className={`grid gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 ${cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {slots.map((piece, i) => (
          <div 
            key={i}
            onClick={() => handleSlotClick(piece, i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDropToSlot(e, i)}
            className="w-32 h-32 bg-black/40 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center cursor-pointer hover:bg-cyan-500/10 transition-colors"
          >
            {piece && (
              <div 
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(e, 'slot', i);
                }}
                className="w-full h-full p-2 text-cyan-400 cursor-grab active:cursor-grabbing text-4xl font-bold flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: piece }} 
              />
            )}
          </div>
        ))}
      </div>

      {/* Available pieces */}
      <div 
        className="flex flex-wrap gap-4 min-h-32 p-4 bg-white/5 rounded-xl border border-white/10 w-full justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropToAvailable}
      >
        {availablePieces.map((piece, i) => (
          <div 
            key={i}
            draggable
            onClick={() => handlePieceClick(piece, i)}
            onDragStart={(e) => handleDragStart(e, 'available', i)}
            className="w-24 h-24 bg-black/40 border border-pink-500/50 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-pink-500/20 transition-colors shadow-[0_0_10px_rgba(255,0,255,0.2)]"
          >
            <div className="w-full h-full p-2 text-pink-400 pointer-events-none text-4xl font-bold flex items-center justify-center" dangerouslySetInnerHTML={{ __html: piece }} />
          </div>
        ))}
        {availablePieces.length === 0 && (
          <div className="w-full text-center text-slate-500 flex items-center justify-center font-bold">
            ピースは全て配置されています
          </div>
        )}
      </div>

      <button 
        onClick={handleDecide}
        disabled={!isFull}
        className={`px-10 py-4 rounded-xl text-white font-bold text-xl transition-all shadow-[0_0_15px_#f0f] ${isFull ? 'bg-pink-500 hover:bg-pink-400' : 'bg-slate-700 opacity-50 cursor-not-allowed shadow-none'}`}
      >
        決定
      </button>
    </div>
  );
}
