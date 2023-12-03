class Node {
    constructor(value) {
        this.values = [value]; // List of values with the same start time
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value.start < node.values[0].start) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else if (newNode.value.start > node.values[0].start) {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        } else {
            // If the start time is the same, add to the existing node's list
            node.values.push(newNode.value);
        }
    }
    

    findClosestLargerStart(start) {
        let current = this.root;
        let closestLargerNode = null;

        while (current !== null) {
            if (current.value.start > start) {
                closestLargerNode = current;
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return closestLargerNode ? closestLargerNode.values : null;
    }

    findClosestSmallerStart(start) {
        let current = this.root;
        let closestSmallerNode = null;
    
        while (current !== null) {
            if (current.value.start <= start) {
                // If current node's start is smaller, update closest smaller node
                // and move to the right subtree to find a closer match
                closestSmallerNode = current;
                current = current.right;
            } else {
                // If current node's start is larger or equal, move to the left subtree
                current = current.left;
            }
        }
    
        return closestSmallerNode ? closestSmallerNode.values : null;
    }
    
    

    // Other methods like traverse (in-order, pre-order, post-order), remove, etc., can be added as needed
}


export default BinarySearchTree;