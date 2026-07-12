import { useState, useEffect } from 'react';

type BlockDesignProps = {
  target: string;
  onComplete: (isCorrect: boolean) => void;
};

export default function BlockDesign({ target, onComplete }: BlockDesignProps) {
  // target is something like "■□■\n□■□\n■□■"
  // Convert target string to an array of 9 elements
  const targetArray = target.replace(/\n/g, '').split('');
  const totalBlocks = targetArray.filter(b => b === '■').length;
  
  const [slots, setSlots] = useState<(string | null)[]>(Array(9).fill(null));
  const [availableBlocks, setAvailableBlocks] = useState<number>(totalBlocks);

  useEffect(() => {
    setSlots(Array(9).fill(null));
    setAvailableBlocks(totalBlocks);
  }, [target, totalBlocks]);

  const handleSlotClick = (index: number) => {
    if (slots[index] === '■') {
      // Remove block
      const newSlots = [...slots];
      newSlots[index] = null;
      setSlots(newSlots);
      setAvailableBlocks(prev => prev + 1);
    } else if (slots[index] === null && availableBlocks > 0) {
      // Place block
      const newSlots = [...slots];
      newSlots[index] = '■';
      setSlots(newSlots);
      setAvailableBlocks(prev => prev - 1);
    }
  };

  const handleDragStart = (e: React.DragEvent, source: 'available' | 'slot', index?: number) => {
    e.dataTransfer.setData('source', source);
    if (index !== undefined) {
      e.dataTransfer.setData('index', index.toString());
    }
  };

  const handleDropToSlot = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');
    
    if (source === 'available' && availableBlocks > 0 && slots[targetIndex] === null) {
      const newSlots = [...slots];
      newSlots[targetIndex] = '■';
      setSlots(newSlots);
      setAvailableBlocks(prev => prev - 1);
    } else if (source === 'slot') {
      const sourceIndex = parseInt(e.dataTransfer.getData('index'), 10);
      if (sourceIndex !== targetIndex && slots[sourceIndex] === '■') {
        const newSlots = [...slots];
        newSlots[sourceIndex] = slots[targetIndex]; // null or '■'
        newSlots[targetIndex] = '■';
        setSlots(newSlots);
      }
    }
  };

  const handleDropToAvailable = (e: React.DragEvent) => {
    e.preventDefault();
    const source = e.dataTransfer.getData('source');
    if (source === 'slot') {
      const index = parseInt(e.dataTransfer.getData('index'), 10);
      if (slots[index] === '■') {
        const newSlots = [...slots];
        newSlots[index] = null;
        setSlots(newSlots);
        setAvailableBlocks(prev => prev + 1);
      }
    }
  };

  const handleDecide = () => {
    // Check if the current slots match the target
    const currentPattern = slots.map(s => s === '■' ? '■' : '□').join('');
    const targetPattern = targetArray.join('');
    onComplete(currentPattern === targetPattern);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto mt-4">
      <div className="text-sm md:text-base text-slate-300 font-bold mb-2">
        見本と同じになるように、下のブロックを配置してください。<br/>
        （マスをタップするか、ブロックをドラッグしてください）
      </div>
      
      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 w-64 h-64">
        {slots.map((piece, i) => (
          <div 
            key={i}
            onClick={() => handleSlotClick(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDropToSlot(e, i)}
            className="w-full h-full bg-black/40 border border-dashed border-cyan-500/30 flex items-center justify-center cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            {piece === '■' && (
              <div 
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(e, 'slot', i);
                }}
                className="w-[90%] h-[90%] bg-cyan-400 rounded cursor-grab active:cursor-grabbing shadow-[0_0_10px_#00f3ff]"
              />
            )}
          </div>
        ))}
      </div>

      {/* Available blocks */}
      <div 
        className="flex flex-wrap gap-3 min-h-24 p-4 bg-white/5 rounded-xl border border-white/10 w-full justify-center"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropToAvailable}
      >
        {Array.from({ length: availableBlocks }).map((_, i) => (
          <div 
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, 'available')}
            className="w-12 h-12 bg-cyan-400 rounded cursor-grab active:cursor-grabbing shadow-[0_0_10px_#00f3ff] hover:scale-110 transition-transform"
          />
        ))}
        {availableBlocks === 0 && (
          <div className="w-full text-center text-slate-500 flex items-center justify-center font-bold">
            全てのブロックを配置しました
          </div>
        )}
      </div>

      <button 
        onClick={handleDecide}
        disabled={availableBlocks > 0}
        className={`px-10 py-4 rounded-xl text-white font-bold text-xl transition-all shadow-[0_0_15px_#f0f] ${availableBlocks === 0 ? 'bg-pink-500 hover:bg-pink-400' : 'bg-slate-700 opacity-50 cursor-not-allowed shadow-none'}`}
      >
        完成！
      </button>
    </div>
  );
}
