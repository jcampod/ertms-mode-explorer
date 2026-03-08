import { useRef, useMemo, useCallback, useEffect } from 'react';
import { useDiagramState } from '../../hooks/useDiagramState';
import { usePanZoom } from '../../hooks/usePanZoom';
import { useTheme } from '../../hooks/useTheme';
import { useTranslatedModes, useTranslatedTransitions } from '../../i18n/useTranslatedData';
import { useErtmsLevel } from '../../hooks/useErtmsLevel';
import { nodePositions } from '../../data/layout';
import { modeColors } from '../../utils/colors';
import { needsBidirectionalOffset } from '../../utils/edge-routing';
import GridBackground from './GridBackground';
import ModeNode from './ModeNode';
import TransitionEdge from './TransitionEdge';
import DiagramControls from './DiagramControls';
import DiagramLegend from './DiagramLegend';
import DetailPanel from './DetailPanel';
import type { ModeId } from '../../data/types';

const StateDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    hoveredNode,
    selectedNode,
    hoveredEdge,
    activeFilters,
    showCommonOnly,
    directionFilter,
    selectedEdge,
    connectedModes,
    connectedEdges,
    toggleFilter,
    toggleCommonOnly,
    setDirection,
    handleSelectEdge,
    handleHoverNode,
    handleHoverNodeEnd,
    handleSelectNode,
    handleHoverEdge,
    handleHoverEdgeEnd,
    clearSelection,
  } = useDiagramState();

  const {
    transform,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    resetView,
    zoomIn,
    zoomOut,
  } = usePanZoom();

  const { theme } = useTheme();
  const { ertmsLevel } = useErtmsLevel();
  const modes = useTranslatedModes();
  const transitions = useTranslatedTransitions();

  // Build a position lookup map
  const positionMap = useMemo(() => {
    const map = new Map<ModeId, { x: number; y: number }>();
    for (const pos of nodePositions) {
      map.set(pos.modeId, { x: pos.x, y: pos.y });
    }
    return map;
  }, []);

  // Filter modes by active category filters and ERTMS level
  const filteredModes = useMemo(() => {
    return modes.filter((m) =>
      activeFilters.has(m.category) &&
      m.etcsLevel.includes(ertmsLevel)
    );
  }, [activeFilters, modes, ertmsLevel]);

  const filteredModeIds = useMemo(() => {
    return new Set(filteredModes.map((m) => m.id));
  }, [filteredModes]);

  // Filter transitions
  const filteredTransitions = useMemo(() => {
    return transitions.filter((t) => {
      if (t.isUniversal) return false; // Universal transitions rendered as rings
      if (showCommonOnly && !t.isCommon) return false;
      // Self-transitions (like FS-FS-MA-UPDATE) shown only if mode is visible
      if (t.from === t.to) return filteredModeIds.has(t.from);
      return filteredModeIds.has(t.from) && filteredModeIds.has(t.to);
    });
  }, [filteredModeIds, showCommonOnly, transitions]);

  // Universal transitions (rendered as dashed rings around targets)
  const universalTransitions = useMemo(() => {
    return transitions.filter((t) => t.isUniversal);
  }, [transitions]);

  // Clear selection when ERTMS level changes
  useEffect(() => { clearSelection(); }, [ertmsLevel, clearSelection]);

  // Get the selected mode object
  const selectedMode = useMemo(() => {
    if (!selectedNode) return null;
    return modes.find((m) => m.id === selectedNode) ?? null;
  }, [selectedNode, modes]);

  // Get the selected transition object
  const selectedTransition = useMemo(() => {
    if (!selectedEdge) return null;
    return transitions.find((t) => t.id === selectedEdge) ?? null;
  }, [selectedEdge, transitions]);


  // Determine node state
  const getNodeState = useCallback(
    (modeId: ModeId): 'idle' | 'hovered' | 'dimmed' | 'selected' | 'connected' => {
      if (selectedNode === modeId) return 'selected';
      if (hoveredNode === modeId) return 'hovered';
      if (hoveredNode && connectedModes) {
        return connectedModes.has(modeId) ? 'connected' : 'dimmed';
      }
      return 'idle';
    },
    [hoveredNode, selectedNode, connectedModes]
  );

  // Determine edge state
  const getEdgeState = useCallback(
    (edgeId: string): 'idle' | 'highlighted' | 'dimmed' | 'hovered' => {
      if (hoveredEdge === edgeId) return 'hovered';
      if (hoveredNode && connectedEdges) {
        return connectedEdges.has(edgeId) ? 'highlighted' : 'dimmed';
      }
      return 'idle';
    },
    [hoveredNode, hoveredEdge, connectedEdges]
  );

  // Determine edge direction relative to hovered node
  const getEdgeDirection = useCallback(
    (from: ModeId, to: ModeId): 'none' | 'outgoing' | 'incoming' => {
      if (!hoveredNode) return 'none';
      if (from === hoveredNode) return 'outgoing';
      if (to === hoveredNode) return 'incoming';
      return 'none';
    },
    [hoveredNode]
  );

  // Escape key to close detail panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);

  // Navigate to a mode from the detail panel
  const handleNavigate = useCallback(
    (id: ModeId) => {
      handleSelectNode(id);
    },
    [handleSelectNode]
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* SVG Diagram */}
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        className="w-full h-full"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <defs>
          {/* Arrowhead marker - normal */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#475569" />
          </marker>

          {/* Arrowhead marker - active outgoing (blue) */}
          <marker
            id="arrowhead-active"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#60a5fa" />
          </marker>

          {/* Arrowhead marker - normal (light theme) */}
          <marker
            id="arrowhead-light"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#94a3b8" />
          </marker>

          {/* Arrowhead marker - incoming (emerald) */}
          <marker
            id="arrowhead-incoming"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#34d399" />
          </marker>

          {/* Glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid background (behind the transform group) */}
        <GridBackground />

        {/* Pan/zoom transform group */}
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Edges (rendered before nodes so nodes are on top) */}
          {filteredTransitions.map((t) => {
            // Skip self-transitions in edge rendering
            if (t.from === t.to) return null;
            const fromPos = positionMap.get(t.from);
            const toPos = positionMap.get(t.to);
            if (!fromPos || !toPos) return null;

            const hasBidir = needsBidirectionalOffset(t.from, t.to, transitions);
            const offset = hasBidir ? 8 : 0;

            return (
              <TransitionEdge
                key={t.id}
                transition={t}
                fromPos={fromPos}
                toPos={toPos}
                state={getEdgeState(t.id)}
                direction={getEdgeDirection(t.from, t.to)}
                offset={offset}
                onHoverStart={handleHoverEdge}
                onHoverEnd={handleHoverEdgeEnd}
                onClick={handleSelectEdge}
              />
            );
          })}

          {/* Universal transition rings (dashed rings around target nodes) */}
          {universalTransitions.map((t) => {
            const toPos = positionMap.get(t.to);
            if (!toPos) return null;
            if (!filteredModeIds.has(t.to)) return null;
            return (
              <circle
                key={`universal-${t.id}`}
                cx={toPos.x}
                cy={toPos.y}
                r={54}
                fill="none"
                stroke={modeColors[t.to].stroke}
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.35}
              />
            );
          })}

          {/* Nodes */}
          {filteredModes.map((mode) => {
            const pos = nodePositions.find((p) => p.modeId === mode.id);
            if (!pos) return null;
            return (
              <ModeNode
                key={mode.id}
                mode={mode}
                position={pos}
                state={getNodeState(mode.id)}
                onHoverStart={handleHoverNode}
                onHoverEnd={handleHoverNodeEnd}
                onClick={handleSelectNode}
              />
            );
          })}
        </g>
      </svg>

      {/* Zoom controls */}
      <DiagramControls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetView={resetView}
      />

      {/* Legend + Filters (combined, bottom-left) */}
      <DiagramLegend
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
        showCommonOnly={showCommonOnly}
        onToggleCommonOnly={toggleCommonOnly}
        directionFilter={directionFilter}
        onSetDirection={setDirection}
      />

      {/* Detail panel */}
      <DetailPanel
        mode={selectedMode}
        transition={selectedTransition}
        onClose={clearSelection}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default StateDiagram;
