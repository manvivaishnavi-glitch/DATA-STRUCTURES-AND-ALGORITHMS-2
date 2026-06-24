class Delivery {
    constructor(over, ball) {
        this.over = over;
        this.ball = ball;
    }
}

// Stable Counting Sort by Ball
function countingSortByBall(arr, maxBall) {
    let count = new Array(maxBall + 1).fill(0);
    let output = new Array(arr.length);

    // Count occurrences
    for (let d of arr) {
        count[d.ball]++;
    }

    // Prefix sum
    for (let i = 1; i <= maxBall; i++) {
        count[i] += count[i - 1];
    }

    // Reverse traversal for stability
    for (let i = arr.length - 1; i >= 0; i--) {
        let d = arr[i];
        output[--count[d.ball]] = d;
    }

    return output;
}

// Stable Counting Sort by Over
function countingSortByOver(arr, maxOver) {
    let count = new Array(maxOver + 1).fill(0);
    let output = new Array(arr.length);

    // Count occurrences
    for (let d of arr) {
        count[d.over]++;
    }

    // Prefix sum
    for (let i = 1; i <= maxOver; i++) {
        count[i] += count[i - 1];
    }

    // Reverse traversal for stability
    for (let i = arr.length - 1; i >= 0; i--) {
        let d = arr[i];
        output[--count[d.over]] = d;
    }

    return output;
}

// Main sorting function
function sortDeliveries(deliveries) {
    deliveries = countingSortByBall(deliveries, 12); // ball range
    deliveries = countingSortByOver(deliveries, 50); // over range
    return deliveries;
}

// Input
let deliveries = [
    new Delivery(2, 4),
    new Delivery(1, 1),
    new Delivery(3, 6),
    new Delivery(1, 5),
    new Delivery(2, 2),
    new Delivery(3, 1),
    new Delivery(1, 3),
    new Delivery(2, 6),
    new Delivery(3, 4),
    new Delivery(1, 2)
];

// Sort
let sorted = sortDeliveries(deliveries);

// Print
console.log("Sorted Deliveries:");
sorted.forEach(d => {
    console.log(`(${d.over}, ${d.ball})`);
});