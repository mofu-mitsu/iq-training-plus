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

type VisualPuzzleProps = {
  cols?: number;
  pieces: string[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
};

function DraggablePiece({ id, piece, className }: { id: string, piece: string, className?: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { piece }
  });
  
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
    >
      <div 
        className="w-full h-full p-2 pointer-events-none flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[100%] [&>svg]:max-h-[100%]" 
        dangerouslySetInnerHTML={{ __html: piece.replace('<svg ', '<svg class="w-full h-full" ') }} 
      />
    </div>
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

export default function VisualPuzzle({ pieces, correctOrder, onComplete, cols = 2 }: VisualPuzzleProps) {
  const [slots, setSlots] = useState<(string | null)[]>(Array(pieces.length).fill(null));
  const [availablePieces, setAvailablePieces] = useState<string[]>([]);
  
  useEffect(() => {
    setAvailablePieces([...pieces].sort(() => Math.random() - 0.5));
    setSlots(Array(pieces.length).fill(null));
  }, [pieces]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceId = active.id as string;
    const targetId = over.id as string;
    const draggedPiece = active.data.current?.piece as string;

    const newSlots = [...slots];
    const newAvailable = [...availablePieces];

    // Remove from source
    if (sourceId.startsWith('avail-')) {
      const idx = parseInt(sourceId.split('-')[1]);
      newAvailable.splice(idx, 1);
    } else if (sourceId.startsWith('slot-')) {
      const idx = parseInt(sourceId.split('-')[1]);
      newSlots[idx] = null;
    }

    // Add to target
    if (targetId.startsWith('slot-')) {
      const idx = parseInt(targetId.split('-')[1]);
      const existingPiece = newSlots[idx];
      newSlots[idx] = draggedPiece;
      if (existingPiece) {
        if (sourceId.startsWith('slot-')) {
            const srcIdx = parseInt(sourceId.split('-')[1]);
            newSlots[srcIdx] = existingPiece;
        } else {
            newAvailable.push(existingPiece);
        }
      }
    } else if (targetId === 'available-zone') {
      newAvailable.push(draggedPiece);
    }

    setSlots(newSlots);
    setAvailablePieces(newAvailable);
  };

  const handleDecide = () => {
    const validSlots = slots.filter(s => s !== null);
    const isCorrect = validSlots.length === correctOrder.length && validSlots.every((s, i) => s === correctOrder[i]);
    onComplete(isCorrect);
  };

  const isFull = slots.filter(s => s !== null).length === pieces.length;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
        <div className="text-lg md:text-xl text-slate-300 font-bold mb-4">
          下のピースをドラッグして、枠にはめ込んで絵を完成させてください。
        </div>
        
        {/* Grid */}
        <div className={`grid gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 ${cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {slots.map((piece, i) => (
            <DroppableSlot 
              key={`drop-slot-${i}`} 
              id={`slot-${i}`} 
              className="w-32 h-32 bg-black/40 border-2 border-dashed border-cyan-500/30 rounded-lg flex items-center justify-center transition-all"
            >
              {piece && (
                <DraggablePiece 
                  id={`slot-${i}-piece`} 
                  piece={piece} 
                  className="w-full h-full text-cyan-400 cursor-grab active:cursor-grabbing text-4xl font-bold flex items-center justify-center" 
                />
              )}
            </DroppableSlot>
          ))}
        </div>

        {/* Available pieces */}
        <DroppableSlot 
          id="available-zone"
          className="flex flex-wrap gap-4 min-h-32 p-4 bg-white/5 rounded-xl border border-white/10 w-full justify-center transition-colors"
        >
          {availablePieces.map((piece, i) => (
            <DraggablePiece 
              key={`avail-${i}`}
              id={`avail-${i}`}
              piece={piece}
              className="w-24 h-24 bg-black/40 border border-pink-500/50 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-pink-500/20 transition-all shadow-[0_0_10px_rgba(255,0,255,0.2)] text-pink-400 text-4xl font-bold"
            />
          ))}
          {availablePieces.length === 0 && (
            <div className="w-full text-center text-slate-500 flex items-center justify-center font-bold">
              ピースは全て配置されています
            </div>
          )}
        </DroppableSlot>

        <button 
          onClick={handleDecide}
          disabled={!isFull}
          className={`px-10 py-4 rounded-xl text-white font-bold text-xl transition-all shadow-[0_0_15px_#f0f] ${isFull ? 'bg-pink-500 hover:bg-pink-400' : 'bg-slate-700 opacity-50 cursor-not-allowed shadow-none'}`}
        >
          決定
        </button>
      </div>
    </DndContext>
  );
}
