class Edge {
    constructor(src, dest, weight) {
        this.src = src;
        this.dest = dest;
        this.weight = weight;
    }
}

class BoruvkaMST {
    constructor(vertices) {
        this.V = vertices;
        this.edges = [];
    }

    addEdge(src, dest, weight) {
        this.edges.push(new Edge(src, dest, weight));
    }

    find(parent, i) {
        if (parent[i] === i)
            return i;

        return parent[i] = this.find(parent, parent[i]);
    }

    union(parent, rank, x, y) {
        let xroot = this.find(parent, x);
        let yroot = this.find(parent, y);

        if (rank[xroot] < rank[yroot]) {
            parent[xroot] = yroot;
        } else if (rank[xroot] > rank[yroot]) {
            parent[yroot] = xroot;
        } else {
            parent[yroot] = xroot;
            rank[xroot]++;
        }
    }

    boruvkaMST() {

        let parent = [];
        let rank = [];

        for (let i = 0; i < this.V; i++) {
            parent[i] = i;
            rank[i] = 0;
        }

        let numTrees = this.V;
        let mstWeight = 0;

        console.log("Edges in MST:\n");

        while (numTrees > 1) {

            let cheapest = new Array(this.V).fill(-1);

            for (let i = 0; i < this.edges.length; i++) {

                let edge = this.edges[i];

                let set1 = this.find(parent, edge.src);
                let set2 = this.find(parent, edge.dest);

                if (set1 === set2)
                    continue;

                if (
                    cheapest[set1] === -1 ||
                    this.edges[cheapest[set1]].weight > edge.weight
                ) {
                    cheapest[set1] = i;
                }

                if (
                    cheapest[set2] === -1 ||
                    this.edges[cheapest[set2]].weight > edge.weight
                ) {
                    cheapest[set2] = i;
                }
            }

            for (let i = 0; i < this.V; i++) {

                if (cheapest[i] !== -1) {

                    let edge = this.edges[cheapest[i]];

                    let set1 = this.find(parent, edge.src);
                    let set2 = this.find(parent, edge.dest);

                    if (set1 === set2)
                        continue;

                    mstWeight += edge.weight;

                    console.log(
                        `${edge.src} - ${edge.dest} : $${edge.weight}M`
                    );

                    this.union(parent, rank, set1, set2);
                    numTrees--;
                }
            }
        }

        console.log("\nTotal MST Cost = $" + mstWeight + "M");
    }
}

// ---------------- DRIVER ----------------

const graph = new BoruvkaMST(8);

graph.addEdge(0, 1, 4);   // NYC-LON
graph.addEdge(0, 2, 7);   // NYC-FRA
graph.addEdge(0, 7, 5);   // NYC-SAO
graph.addEdge(1, 2, 2);   // LON-FRA
graph.addEdge(1, 6, 9);   // LON-MUM
graph.addEdge(2, 6, 6);   // FRA-MUM
graph.addEdge(2, 4, 11);  // FRA-TOK
graph.addEdge(3, 4, 3);   // SIN-TOK
graph.addEdge(3, 6, 4);   // SIN-MUM
graph.addEdge(4, 5, 5);   // TOK-SYD
graph.addEdge(5, 3, 6);   // SYD-SIN
graph.addEdge(6, 7, 13);  // MUM-SAO

graph.boruvkaMST();