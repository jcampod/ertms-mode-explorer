import { useState, useMemo, useCallback } from 'react';
import type { ATOStateId, ATOStateCategory } from '../data/ato-types';
import { atoTransitions } from '../data/ato-transitions';

const allCategories: ATOStateCategory[] = [
  'inactive',
  'standby',
  'operational',
  'transition',
];

export function useATODiagramState() {
  const [hoveredNode, setHoveredNode] = useState<ATOStateId | null>(null);
  const [selectedNode, setSelectedNode] = useState<ATOStateId | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<ATOStateCategory>>(
    () => new Set(allCategories)
  );
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);

  const connectedModes = useMemo<Set<ATOStateId> | null>(() => {
    if (!hoveredNode) return null;
    const connected = new Set<ATOStateId>();
    for (const t of atoTransitions) {
      if (t.from === hoveredNode) connected.add(t.to);
      if (t.to === hoveredNode) connected.add(t.from);
    }
    return connected;
  }, [hoveredNode]);

  const connectedEdges = useMemo<Set<string> | null>(() => {
    if (!hoveredNode) return null;
    const edges = new Set<string>();
    for (const t of atoTransitions) {
      if (t.from === hoveredNode || t.to === hoveredNode) {
        edges.add(t.id);
      }
    }
    return edges;
  }, [hoveredNode]);

  const toggleFilter = useCallback((category: ATOStateCategory) => {
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

  const handleHoverNode = useCallback((id: ATOStateId) => {
    setHoveredNode(id);
  }, []);

  const handleHoverNodeEnd = useCallback(() => {
    setHoveredNode(null);
  }, []);

  const handleSelectNode = useCallback((id: ATOStateId) => {
    setSelectedNode((prev) => (prev === id ? null : id));
    setSelectedEdge(null);
  }, []);

  const handleHoverEdge = useCallback((id: string) => {
    setHoveredEdge(id);
  }, []);

  const handleHoverEdgeEnd = useCallback(() => {
    setHoveredEdge(null);
  }, []);

  const handleSelectEdge = useCallback((id: string) => {
    setSelectedEdge((prev) => (prev === id ? null : id));
    setSelectedNode(null);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  return {
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
  };
}
