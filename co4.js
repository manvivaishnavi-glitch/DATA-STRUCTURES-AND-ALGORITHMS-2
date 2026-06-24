import java.util.*;

class DsaCaseStudy4 {
    static class Edge {
        int u, v, weight;
        Edge(int u, int v, int w) { this.u = u; this.v = v; this.weight = w; }
    }

    public static void main(String[] args) {
        // Example graph (no negative cycle reachable from source 0)
        int n = 5;
        List<Edge> edges = new ArrayList<>();
        edges.add(new Edge(0, 1, 6));
        edges.add(new Edge(0, 2, 7));
        edges.add(new Edge(1, 2, 8));
        edges.add(new Edge(1, 3, 4));
        edges.add(new Edge(1, 4, 5));
        edges.add(new Edge(2, 3, 9));
        edges.add(new Edge(2, 4, -3));
        edges.add(new Edge(3, 1, 2));
        edges.add(new Edge(4, 3, 7));

        int[] dist = bellmanFord(n, edges, 0);
        System.out.println(Arrays.toString(dist));
    }

    static int[] bellmanFord(int n, List<Edge> edges, int source) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[source] = 0;

        // V-1 iterations of relaxation.
        for (int iter = 0; iter < n - 1; iter++) {
            for (Edge e : edges) {
                if (dist[e.u] != Integer.MAX_VALUE &&
                    dist[e.u] + e.weight < dist[e.v]) {
                    dist[e.v] = dist[e.u] + e.weight;
                }
            }
        }

        // One more pass: any relaxation now indicates a negative cycle.
        for (Edge e : edges) {
            if (dist[e.u] != Integer.MAX_VALUE &&
                dist[e.u] + e.weight < dist[e.v]) {
                throw new RuntimeException("negative cycle reachable from source");
            }
        }
        return dist;
    }

    @Override
    public String toString() {
        return "DsaCaseStudy4 []";
    }
}

