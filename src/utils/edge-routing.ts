const NODE_RADIUS = 40;

export function calculateEdgePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  curvature: number = 0.2,
  offset: number = 0
): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return '';

  // Unit direction vector
  const ux = dx / dist;
  const uy = dy / dist;

  // Normal vector (perpendicular)
  const nx = -uy;
  const ny = ux;

  // Start and end points clipped to node boundary
  const sx = from.x + ux * NODE_RADIUS + nx * offset;
  const sy = from.y + uy * NODE_RADIUS + ny * offset;
  const ex = to.x - ux * NODE_RADIUS + nx * offset;
  const ey = to.y - uy * NODE_RADIUS + ny * offset;

  // Control point at midpoint, offset perpendicular
  const mx = (sx + ex) / 2 + nx * (dist * curvature);
  const my = (sy + ey) / 2 + ny * (dist * curvature);

  return `M ${sx} ${sy} Q ${mx} ${my} ${ex} ${ey}`;
}

export function getEdgeMidpoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  curvature: number = 0.2,
  offset: number = 0
): { x: number; y: number } {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return from;

  const nx = -dy / dist;
  const ny = dx / dist;

  return {
    x: (from.x + to.x) / 2 + nx * (dist * curvature) * 0.5 + nx * offset,
    y: (from.y + to.y) / 2 + ny * (dist * curvature) * 0.5 + ny * offset,
  };
}

// Check if a reverse edge exists to apply offset
export function needsBidirectionalOffset(
  fromId: string,
  toId: string,
  allTransitions: { from: string; to: string }[]
): boolean {
  return allTransitions.some(t => t.from === toId && t.to === fromId);
}
