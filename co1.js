class AVLNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.size = 1; // subtree size
    }
}

class OrderStatisticAVL {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    size(node) {
        return node ? node.size : 0;
    }

    update(node) {
        if (node) {
            node.height =
                1 + Math.max(this.height(node.left), this.height(node.right));

            node.size =
                1 + this.size(node.left) + this.size(node.right);
        }
    }

    getBalance(node) {
        return node
            ? this.height(node.left) - this.height(node.right)
            : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const t2 = x.right;

        x.right = y;
        y.left = t2;

        this.update(y);
        this.update(x);

        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const t2 = y.left;

        y.left = x;
        x.right = t2;

        this.update(x);
        this.update(y);

        return y;
    }

    insert(key) {
        this.root = this._insert(this.root, key);
    }

    _insert(node, key) {
        if (!node) return new AVLNode(key);

        if (key < node.key)
            node.left = this._insert(node.left, key);
        else if (key > node.key)
            node.right = this._insert(node.right, key);
        else
            return node; // no duplicates

        this.update(node);

        const balance = this.getBalance(node);

        // LL
        if (balance > 1 && key < node.left.key)
            return this.rightRotate(node);

        // RR
        if (balance < -1 && key > node.right.key)
            return this.leftRotate(node);

        // LR
        if (balance > 1 && key > node.left.key) {
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // RL
        if (balance < -1 && key < node.right.key) {
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    rank(value) {
        return this._rank(this.root, value);
    }

    _rank(node, value) {
        if (!node) return 0;

        if (value < node.key)
            return this._rank(node.left, value);

        return (
            this.size(node.left) +
            1 +
            this._rank(node.right, value)
        );
    }

    totalSubmissions() {
        return this.size(this.root);
    }

    percentile(value) {
        const rank = this.rank(value);
        const total = this.totalSubmissions();

        return ((rank / total) * 100).toFixed(2);
    }

    inorder(node = this.root) {
        if (!node) return;

        this.inorder(node.left);
        process.stdout.write(node.key + " ");
        this.inorder(node.right);
    }
}

// ------------------- DRIVER CODE -------------------

const tree = new OrderStatisticAVL();

const submissions = [
    120, 85, 200, 65, 150,
    95, 180, 75, 110, 240, 90
];

submissions.forEach(time => tree.insert(time));

console.log("Sorted Execution Times:");
tree.inorder();

const query = 110;

console.log("\n\nExecution Time =", query, "ms");
console.log("Submissions <= ", query, ":", tree.rank(query));
console.log("Total Submissions:", tree.totalSubmissions());
console.log("Percentile:", tree.percentile(query) + "%");