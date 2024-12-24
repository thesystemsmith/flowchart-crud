exports.validateGraph = (nodes, edges) => {
    const nodeIds = new Set(nodes.map(node => node.id));
    for (const edge of edges) {
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) return false;
    }
    return true; // Return false if any edge connects to invalid nodes
};
