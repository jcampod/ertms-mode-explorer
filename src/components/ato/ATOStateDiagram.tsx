import { useRef, useMemo, useCallback, useEffect } from 'react';
import { useATODiagramState } from '../../hooks/useATODiagramState';
import { usePanZoom } from '../../hooks/usePanZoom';
import { useTheme } from '../../hooks/useTheme';
import { atoStates } from '../../data/ato-modes';
import { atoTransitions } from '../../data/ato-transitions';
import { atoNodePositions } from '../../data/ato-layout';
import { needsBidirectionalOffset } from '../../utils/edge-routing';
import GridBackground from '../diagram/GridBackground';
import ATOStateNode from './ATOStateNode';
import ATOTransitionEdge from './ATOTransitionEdge';
import DiagramControls from '../diagram/DiagramControls';
import ATODiagramLegend from './ATODiagramLegend';
import ATODetailPanel from './ATODetailPanel';
import type { ATOStateId } from '../../data/ato-types';

const ATOStateDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const {
    hoveredNode,
    selectedNode,
    hoveredEdge,
    activeFilters,
    selectedEdge,
    connectedModes,
    connectedEdges,
    toggleFilter,
    handleSelectEdge,
    handleHoverNode,
    handleHoverNodeEnd,
    handleSelectNode,
    handleHoverEdge,
    handleHoverEdgeEnd,
    clearSelection,
  } = useATODiagramState();

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

  // Build a position lookup map
  const positionMap = useMemo(() => {
    const map = new Map<ATOStateId, { x: number; y: number }>();
    for (const pos of atoNodePositions) {
      map.set(pos.stateId, { x: pos.x, y: pos.y });
    }
    return map;
  }, []);

  // Filter states by active category filters
  const filteredStates = useMemo(() => {
    return atoStates.filter((s) => activeFilters.has(s.category));
  }, [activeFilters]);

  const filteredStateIds = useMemo(() => {
    return new Set(filteredStates.map((s) => s.id));
  }, [filteredStates]);

  // Filter transitions
  const filteredTransitions = useMemo(() => {
    return atoTransitions.filter((t) => {
      if (t.isUniversal) return false;
      if (t.from === t.to) return filteredStateIds.has(t.from);
      return filteredStateIds.has(t.from) && filteredStateIds.has(t.to);
    });
  }, [filteredStateIds]);

  // Get the selected state object
  const selectedState = useMemo(() => {
    if (!selectedNode) return null;
    return atoStates.find((s) => s.id === selectedNode) ?? null;
  }, [selectedNode]);

  // Get the selected transition object
  const selectedTransition = useMemo(() => {
    if (!selectedEdge) return null;
    return atoTransitions.find((t) => t.id === selectedEdge) ?? null;
  }, [selectedEdge]);

  // Determine node state
  const getNodeState = useCallback(
    (stateId: ATOStateId): 'idle' | 'hovered' | 'dimmed' | 'selected' | 'connected' => {
      if (selectedNode === stateId) return 'selected';
      if (hoveredNode === stateId) return 'hovered';
      if (hoveredNode && connectedModes) {
        return connectedModes.has(stateId) ? 'connected' : 'dimmed';
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

  // Navigate to a state from the detail panel
  const handleNavigate = useCallback(
    (id: ATOStateId) => {
      handleSelectNode(id);
    },
    [handleSelectNode]
  );

  return (
    <div className={`relative w-full h-full overflow-hidden ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`}>
      {/* SVG Diagram */}
      <svg
        ref={svgRef}
        viewBox="0 0 1100 550"
        className="w-full h-full"
        onWheel={onWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <defs>
          {/* Arrowhead marker - normal (dark) */}
          <marker
            id="ato-arrowhead"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#475569" />
          </marker>

          {/* Arrowhead marker - active (blue) */}
          <marker
            id="ato-arrowhead-active"
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
            id="ato-arrowhead-light"
            markerWidth="10"
            markerHeight="8"
            refX="9"
            refY="4"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M 0 0 L 10 4 L 0 8 L 2 4 Z" fill="#94a3b8" />
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

        {/* Grid background */}
        <GridBackground />

        {/* Pan/zoom transform group */}
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Edges */}
          {filteredTransitions.map((t) => {
            if (t.from === t.to) return null;
            const fromPos = positionMap.get(t.from);
            const toPos = positionMap.get(t.to);
            if (!fromPos || !toPos) return null;

            const hasBidir = needsBidirectionalOffset(t.from, t.to, atoTransitions);
            const offset = hasBidir ? 8 : 0;

            return (
              <ATOTransitionEdge
                key={t.id}
                transition={t}
                fromPos={fromPos}
                toPos={toPos}
                state={getEdgeState(t.id)}
                offset={offset}
                onHoverStart={handleHoverEdge}
                onHoverEnd={handleHoverEdgeEnd}
                onClick={handleSelectEdge}
              />
            );
          })}

          {/* Nodes */}
          {filteredStates.map((state) => {
            const pos = atoNodePositions.find((p) => p.stateId === state.id);
            if (!pos) return null;
            return (
              <ATOStateNode
                key={state.id}
                state={state}
                position={pos}
                nodeState={getNodeState(state.id)}
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

      {/* Legend + Filters */}
      <ATODiagramLegend
        activeFilters={activeFilters}
        onToggleFilter={toggleFilter}
      />

      {/* Detail panel */}
      <ATODetailPanel
        state={selectedState}
        transition={selectedTransition}
        onClose={clearSelection}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default ATOStateDiagram;
