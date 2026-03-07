import { useState, useCallback, useRef } from 'react';

interface Transform {
  x: number;
  y: number;
  scale: number;
}

const MIN_SCALE = 0.3;
const MAX_SCALE = 3;
const ZOOM_STEP = 0.15;

export function usePanZoom() {
  const [transform, setTransform] = useState<Transform>({ x: 0, y: 0, scale: 1 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const transformRef = useRef(transform);
  transformRef.current = transform;

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setTransform((prev) => {
      const newScale = clampScale(prev.scale + delta);
      return { ...prev, scale: newScale };
    });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    isPanningRef.current = true;
    panStartRef.current = { x: e.clientX - transformRef.current.x, y: e.clientY - transformRef.current.y };
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanningRef.current) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - panStartRef.current.x,
      y: e.clientY - panStartRef.current.y,
    }));
  }, []);

  const onMouseUp = useCallback(() => {
    isPanningRef.current = false;
  }, []);

  const resetView = useCallback(() => {
    setTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const zoomIn = useCallback(() => {
    setTransform((prev) => ({
      ...prev,
      scale: clampScale(prev.scale + ZOOM_STEP),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setTransform((prev) => ({
      ...prev,
      scale: clampScale(prev.scale - ZOOM_STEP),
    }));
  }, []);

  return {
    transform,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    resetView,
    zoomIn,
    zoomOut,
  };
}
