"use client";
import { useEffect } from "react";
import { polyfill } from "mobile-drag-drop";
import { scrollBehaviourDragImageTranslateOverride } from "mobile-drag-drop/scroll-behaviour";
import "mobile-drag-drop/default.css";

export default function DragDropPolyfill() {
  useEffect(() => {
    polyfill({
      dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
    });
    
    // mobile-drag-drop also recommends this for iOS Safari:
    const handleTouchMove = (e: TouchEvent) => {};
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return null;
}
