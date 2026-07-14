import { useState, useEffect } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  DragEndEvent,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

type BlockDesignProps = {
  target: string;
  onComplete: (isCorrect: boolean) => void;
};

function DraggableBlock({ id, className }: { id: string, className?: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 50,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`touch-none ${isDragging ? 'opacity-50 scale-105' : ''} ${className}`}
    />
  );
}

function DroppableSlot({ id, children, className }: { id: string, children?: React.ReactNode, className?: string }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${className} ${isOver ? 'bg-cyan-500/20 scale-105' : ''}`}>
      {children}
    </div>
  );
}

export default function BlockDesign({ target, onComplete }: BlockDesignProps) {
  const targetArray = target.replace(/\n/g, '').split('');
  const totalBlocks = targetArray.filter(b => b === '■').length;
  
  const [slots, setSlots] = useState<(string | null)[]>(Array(9).fill(null));
  const [availableBlocks, setAvailableBlocks] = useState<number>(totalBlocks);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlots(Array(9).fill(null));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAvailableBlocks(totalBlocks);
  }, [target, totalBlocks]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceId = active.id as string;
    const targetId = over.id as string;

    const newSlots = [...slots];
    let newAvailable = availableBlocks;

    // Remove from source
    if (sourceId.startsWith('avail-')) {
      newAvailable -= 1;
    } else if (sourceId.startsWith('slot-')) {
      const idx = parseInt(sourceId.split('-')[1]);
      newSlots[idx] = null;
    }

    // Add to target
    if (targetId.startsWith('slot-')) {
      const idx = parseInt(targetId.split('-')[1]);
      const existingBlock = newSlots[idx];
      newSlots[idx] = '■';
      if (existingBlock) {
        if (sourceId.startsWith('slot-')) {
            const srcIdx = parseInt(sourceId.split('-')[1]);
            newSlots[srcIdx] = existingBlock;
        } else {
            newAvailable += 1;
        }
      }
    } else if (targetId === 'available-zone') {
      newAvailable += 1;
    }

    setSlots(newSlots);
    setAvailableBlocks(newAvailable);
  };

  const handleDecide = () => {
    const currentPattern = slots.map(s => s === '■' ? '■' : '□').join('');
    const targetPattern = targetArray.join('');
    onComplete(currentPattern === targetPattern);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto mt-4">
        <div className="text-sm md:text-base text-slate-300 font-bold mb-2">
          見本と同じになるように、下のブロックをドラッグして配置してください。
        </div>
        
        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 w-64 h-64">
          {slots.map((piece, i) => (
            <DroppableSlot 
              key={`drop-slot-${i}`} 
              id={`slot-${i}`} 
              className="w-full h-full bg-black/40 border border-dashed border-cyan-500/30 flex items-center justify-center transition-all"
            >
              {piece === '■' && (
                <DraggableBlock 
                  id={`slot-${i}-piece`} 
                  className="w-[90%] h-[90%] bg-cyan-400 rounded cursor-grab active:cursor-grabbing shadow-[0_0_10px_#00f3ff]" 
                />
              )}
            </DroppableSlot>
          ))}
        </div>

        {/* Available blocks */}
        <DroppableSlot 
          id="available-zone"
          className="flex flex-wrap gap-3 min-h-24 p-4 bg-white/5 rounded-xl border border-white/10 w-full justify-center transition-colors"
        >
          {Array.from({ length: availableBlocks }).map((_, i) => (
            <DraggableBlock 
              key={`avail-${i}`}
              id={`avail-${i}`}
              className="w-12 h-12 bg-cyan-400 rounded cursor-grab active:cursor-grabbing shadow-[0_0_10px_#00f3ff]"
            />
          ))}
          {availableBlocks === 0 && (
            <div className="w-full text-center text-slate-500 flex items-center justify-center font-bold">
              全てのブロックを配置しました
            </div>
          )}
        </DroppableSlot>

        <button 
          onClick={handleDecide}
          disabled={availableBlocks > 0}
          className={`px-10 py-4 rounded-xl text-white font-bold text-xl transition-all shadow-[0_0_15px_#f0f] ${availableBlocks === 0 ? 'bg-pink-500 hover:bg-pink-400' : 'bg-slate-700 opacity-50 cursor-not-allowed shadow-none'}`}
        >
          完成！
        </button>
      </div>
    </DndContext>
  );
}
