import { useState, useMemo, useCallback } from 'react';
import type { ModeId, ModeCategory } from '../data/types';
import { transitions } from '../data/transitions';

export type DirectionFilter = 'outgoing' | 'incoming' | 'both';

const allCategories: ModeCategory[] = [
  'operational',
  'supervised',
  'standby',
  'degraded',
  'failure',
  'inactive',
];

export function useDiagramState() {
  const [hoveredNode, setHoveredNode] = useState<ModeId | null>(null);
  const [selectedNode, setSelectedNode] = useState<ModeId | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<ModeCategory>>(
    () => new Set(allCategories)
  );
  const [showCommonOnly, setShowCommonOnly] = useState(false);
  const [directionFilter, setDirectionFilter] = useState<DirectionFilter>('outgoing');
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);

  const connectedModes = useMemo<Set<ModeId> | null>(() => {
    if (!hoveredNode) return null;
    const connected = new Set<ModeId>();
    for (const t of transitions) {
      if (directionFilter === 'outgoing' || directionFilter === 'both') {
        if (t.from === hoveredNode) connected.add(t.to);
      }
      if (directionFilter === 'incoming' || directionFilter === 'both') {
        if (t.to === hoveredNode) connected.add(t.from);
      }
    }
    return connected;
  }, [hoveredNode, directionFilter]);

  const connectedEdges = useMemo<Set<string> | null>(() => {
    if (!hoveredNode) return null;
    const edges = new Set<string>();
    for (const t of transitions) {
      if (directionFilter === 'outgoing' || directionFilter === 'both') {
        if (t.from === hoveredNode) edges.add(t.id);
      }
      if (directionFilter === 'incoming' || directionFilter === 'both') {
        if (t.to === hoveredNode) edges.add(t.id);
      }
    }
    return edges;
  }, [hoveredNode, directionFilter]);

  const toggleFilter = useCallback((category: ModeCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const toggleCommonOnly = useCallback(() => {
    setShowCommonOnly((prev) => !prev);
  }, []);

  const handleHoverNode = useCallback((id: ModeId) => {
    setHoveredNode(id);
  }, []);

  const handleHoverNodeEnd = useCallback(() => {
    setHoveredNode(null);
  }, []);

  const handleSelectNode = useCallback((id: ModeId) => {
    setSelectedNode((prev) => (prev === id ? null : id));
    setSelectedEdge(null); // clear edge selection when node selected
  }, []);

  const handleHoverEdge = useCallback((id: string) => {
    setHoveredEdge(id);
  }, []);

  const handleHoverEdgeEnd = useCallback(() => {
    setHoveredEdge(null);
  }, []);

  const handleSelectEdge = useCallback((id: string) => {
    setSelectedEdge((prev) => (prev === id ? null : id));
    setSelectedNode(null); // clear node selection when edge selected
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  const setDirection = useCallback((dir: DirectionFilter) => {
    setDirectionFilter(dir);
  }, []);

  return {
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
  };
}
