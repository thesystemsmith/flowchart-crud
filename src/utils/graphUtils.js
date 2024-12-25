//is graph valid?
exports.validateGraph = (nodes, edges) => {
    const nodeIds = new Set(nodes.map(node => node.id));
    for (const edge of edges) {
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
            return false;
        }
    }
    return true; // Return false if any edge connects to invalid nodes
};

//find connected nodes to current node
exports.findConnectedNodes = (flowchart, nodeId) => {
    const visited = new Set();
    const traverse = (id) => {
        if (visited.has(id)) return; // Avoid revisiting nodes
        visited.add(id);
        flowchart.edges
            .filter(edge => edge.from === id)
            .forEach(edge => traverse(edge.to)); // Traverse edges
    };
    traverse(nodeId);
    return Array.from(visited); // Return all visited nodes (connected nodes)
};