function knapsack(weights, values, capacity) {
    let n = weights.length;

    // Step 1: Create DP table
    let dp = Array.from({ length: n + 1 }, () =>
        Array(capacity + 1).fill(0)
    );

    // Step 2: Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w], // Skip item
                    dp[i - 1][w - weights[i - 1]] + values[i - 1] // Take item
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Step 3: Trace selected consignments
    let selected = [];
    let w = capacity;

    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selected.push(i); // consignment number
            w -= weights[i - 1];
        }
    }

    selected.reverse();

    // Output
    console.log("Maximum Payment:", dp[n][capacity]);
    console.log("Selected Consignments:", selected);
}

// Consignment data
let weights = [5, 8, 3, 10, 4, 6, 7, 2];
let values = [40, 50, 20, 70, 30, 35, 45, 15];
let capacity = 24;

// Run algorithm
knapsack(weights, values, capacity);