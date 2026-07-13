import { useState, useEffect } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';

type VisualPuzzleProps = {
  cols?: number;
  pieces: string[];
  correctOrder: string[];
  onComplete: (isCorrect: boolean) => void;
};

type PieceData = {
  id: string;
  content: string;
};

// --- Draggable Component ---
function DraggablePiece({ piece, onClick }: { piece: PieceData; onClick?: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: piece.id,
    data: piece,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`w-24 h-24 bg-black/40 border border-pink-500/50 rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-pink-500/20 transition-colors shadow-[0_0_10px_rgba(255,0,255,0.2)] ${
        isDragging ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className="w-full h-full p-2 text-pink-400 pointer-events-none text-4xl font-bold flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[100%] [&>svg]:max-h-[100%]"
        dangerouslySetInnerHTML={{ __html: piece.content }}
      />
    </div>
  );
}

// --- Droppable Slot Component ---
function DroppableSlot({
  id,
  piece,
  onPieceClick,
}: {
  id: string;
  piece: PieceData | null;
  onPieceClick: (piece: PieceData) => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`w-32 h-32 bg-black/40 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors ${
        isOver ? 'border-pink-500 bg-pink-500/20' : 'border-cyan-500/30 hover:bg-cyan-500/10'
      }`}
    >
      {piece && (
        <div
          onClick={() => onPieceClick(piece)}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          {/* スロット内に入ったピースはDraggableにせず、タップで戻すか、DragOverlay側で処理する */}
          <DraggablePiece piece={piece} />
        </div>
      )}
    </div>
  );
}

// --- Main Component ---
export default function VisualPuzzle({ pieces, correctOrder, onComplete, cols = 2 }: VisualPuzzleProps) {
  // 一意なIDを持たせたデータ構造に変換
  const [slots, setSlots] = useState<(PieceData | null)[]>(Array(pieces.length).fill(null));
  const [availablePieces, setAvailablePieces] = useState<PieceData[]>([]);
  const [activePiece, setActivePiece] = useState<PieceData | null>(null);

  // センサーの設定（スマホのタッチ対応のキモ！）
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }) // スクロールと誤爆しないように
  );

  useEffect(() => {
    const initializedPieces = [...pieces]
      .sort(() => Math.random() - 0.5)
      .map((p, i) => ({ id: `piece-${i}`, content: p }));
    setAvailablePieces(initializedPieces);
    setSlots(Array(pieces.length).fill(null));
  }, [pieces]);

  // Tap: 待機エリア -> スロット
  const handlePieceClick = (piece: PieceData) => {
    const emptySlotIndex = slots.findIndex((s) => s === null);
    if (emptySlotIndex !== -1) {
      const newSlots = [...slots];
      newSlots[emptySlotIndex] = piece;
      setSlots(newSlots);
      setAvailablePieces((prev) => prev.filter((p) => p.id !== piece.id));
    }
  };

  // Tap: スロット -> 待機エリア
  const handleSlotClick = (piece: PieceData) => {
    const slotIndex = slots.findIndex((s) => s?.id === piece.id);
    if (slotIndex !== -1) {
      const newSlots = [...slots];
      newSlots[slotIndex] = null;
      setSlots(newSlots);
      setAvailablePieces((prev) => [...prev, piece]);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const piece = availablePieces.find((p) => p.id === active.id) || slots.find((s) => s?.id === active.id);
    if (piece) setActivePiece(piece);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActivePiece(null);

    if (!over) return; // ドロップ先がない場合は何もしない

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceSlotIndex = slots.findIndex((s) => s?.id === activeId);
    const targetSlotIndex = overId.startsWith('slot-') ? parseInt(overId.split('-')[1], 10) : -1;

    // 1. 待機エリア -> スロットへのドロップ
    if (sourceSlotIndex === -1 && targetSlotIndex !== -1) {
      const piece = availablePieces.find((p) => p.id === activeId);
      if (piece) {
        const newSlots = [...slots];
        const targetPiece = newSlots[targetSlotIndex];

        newSlots[targetSlotIndex] = piece;
        setSlots(newSlots);

        const newAvailable = availablePieces.filter((p) => p.id !== activeId);
        if (targetPiece) newAvailable.push(targetPiece); // すでにスロットにピースがあれば押し出す
        setAvailablePieces(newAvailable);
      }
    }
    // 2. スロット -> 別のスロットへの移動（スワップ）
    else if (sourceSlotIndex !== -1 && targetSlotIndex !== -1) {
      if (sourceSlotIndex === targetSlotIndex) return;
      const newSlots = [...slots];
      const temp = newSlots[targetSlotIndex];
      newSlots[targetSlotIndex] = newSlots[sourceSlotIndex];
      newSlots[sourceSlotIndex] = temp;
      setSlots(newSlots);
    }
    // 3. スロット -> 待機エリアへのドロップ
    else if (sourceSlotIndex !== -1 && overId === 'available-area') {
      const piece = slots[sourceSlotIndex];
      if (piece) {
        const newSlots = [...slots];
        newSlots[sourceSlotIndex] = null;
        setSlots(newSlots);
        setAvailablePieces([...availablePieces, piece]);
      }
    }
  };

  const handleDecide = () => {
    const validSlots = slots.filter((s) => s !== null);
    const isCorrect =
      validSlots.length === correctOrder.length &&
      validSlots.every((s, i) => s?.content === correctOrder[i]);
    onComplete(isCorrect);
  };

  const isFull = slots.filter((s) => s !== null).length === pieces.length;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto">
        <div className="text-lg md:text-xl text-slate-300 font-bold mb-4">
          下のピースをドラッグ（またはタップ）して、枠にはめ込んで絵を完成させてください。
        </div>

        {/* Grid Area */}
        <div
          className={`grid gap-1 bg-white/10 p-2 rounded-xl border border-cyan-500/30 ${
            cols === 1 ? 'grid-cols-1' : cols === 3 ? 'grid-cols-3' : 'grid-cols-2'
          }`}
        >
          {slots.map((piece, i) => (
            <DroppableSlot
              key={`slot-${i}`}
              id={`slot-${i}`}
              piece={piece}
              onPieceClick={handleSlotClick}
            />
          ))}
        </div>

        {/* Available Area (Droppable) */}
        <DroppableArea id="available-area">
          {availablePieces.map((piece) => (
            <DraggablePiece key={piece.id} piece={piece} onClick={() => handlePieceClick(piece)} />
          ))}
          {availablePieces.length === 0 && (
            <div className="w-full text-center text-slate-500 flex items-center justify-center font-bold">
              ピースは全て配置されています
            </div>
          )}
        </DroppableArea>

        <button
          onClick={handleDecide}
          disabled={!isFull}
          className={`px-10 py-4 rounded-xl text-white font-bold text-xl transition-all shadow-[0_0_15px_#f0f] ${
            isFull ? 'bg-pink-500 hover:bg-pink-400' : 'bg-slate-700 opacity-50 cursor-not-allowed shadow-none'
          }`}
        >
          決定
        </button>
      </div>

      {/* ドラッグ中に指/カーソルに追従するオーバーレイ */}
      <DragOverlay dropAnimation={null}>
        {activePiece ? (
          <div className="w-24 h-24 bg-black/80 border-2 border-pink-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,0,255,0.6)] rotate-3 scale-110">
            <div
              className="w-full h-full p-2 text-pink-400 text-4xl font-bold flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[100%] [&>svg]:max-h-[100%]"
              dangerouslySetInnerHTML={{ __html: activePiece.content }}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

// --- Droppable Area (for available pieces) ---
function DroppableArea({ id, children }: { id: string; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-wrap gap-4 min-h-[8rem] p-4 rounded-xl border w-full justify-center transition-colors ${
        isOver ? 'bg-white/10 border-pink-500' : 'bg-white/5 border-white/10'
      }`}
    >
      {children}
    </div>
  );
}
