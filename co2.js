class SkipNode {
    constructor(score, name, level) {
        this.score = score;
        this.name = name;
        this.forward = new Array(level + 1).fill(null);
    }
}

class SkipList {
    constructor(maxLevel = 4) {
        this.MAX_LEVEL = maxLevel;
        this.level = 0;
        this.header = new SkipNode(-Infinity, "HEAD", this.MAX_LEVEL);
    }

    // Random level generator
    randomLevel() {
        let lvl = 0;

        while (Math.random() < 0.5 && lvl < this.MAX_LEVEL) {
            lvl++;
        }

        return lvl;
    }

    insert(score, name) {
        let update = new Array(this.MAX_LEVEL + 1);
        let current = this.header;

        // Find insertion position
        for (let i = this.level; i >= 0; i--) {
            while (
                current.forward[i] !== null &&
                current.forward[i].score < score
            ) {
                current = current.forward[i];
            }
            update[i] = current;
        }

        let newLevel = this.randomLevel();

        if (newLevel > this.level) {
            for (let i = this.level + 1; i <= newLevel; i++) {
                update[i] = this.header;
            }
            this.level = newLevel;
        }

        let newNode = new SkipNode(score, name, newLevel);

        for (let i = 0; i <= newLevel; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }

    search(score) {
        let current = this.header;

        for (let i = this.level; i >= 0; i--) {
            while (
                current.forward[i] &&
                current.forward[i].score < score
            ) {
                current = current.forward[i];
            }
        }

        current = current.forward[0];

        if (current && current.score === score) {
            return current;
        }

        return null;
    }

    display() {
        console.log("Leaderboard (Ascending Score):\n");

        let current = this.header.forward[0];

        while (current) {
            console.log(`${current.name} : ${current.score}`);
            current = current.forward[0];
        }
    }
}

// ---------------- DRIVER CODE ----------------

const leaderboard = new SkipList();

leaderboard.insert(1200, "Alice");
leaderboard.insert(980, "Bob");
leaderboard.insert(1450, "Carol");
leaderboard.insert(870, "Dave");
leaderboard.insert(1100, "Eve");
leaderboard.insert(1300, "Frank");
leaderboard.insert(950, "Grace");
leaderboard.insert(1380, "Henry");

leaderboard.display();

// Search Example
const result = leaderboard.search(1300);

if (result) {
    console.log("\nFound:");
    console.log(result.name + " : " + result.score);
}