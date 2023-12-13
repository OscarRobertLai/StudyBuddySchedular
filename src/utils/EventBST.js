class EventNode 
{
    constructor(event) 
    {
        this.events = [event];
        this.left = null;
        this.right = null;
    }
}

class EventBST 
{
    constructor() 
    {
        this.root = null;
    }

    insert(event) 
    {
        const newNode = new EventNode(event);

        if (!this.root) 
        {
            this.root = newNode;
        } 
        else 
        {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) 
    {
        if (newNode.events[0].start.getTime() === node.events[0].start.getTime()) 
        {
            node.events.push(...newNode.events);
        } 
        else if (newNode.events[0].start < node.events[0].start) 
        {
            if (node.left === null) 
            {
                node.left = newNode;
            }
            else 
            {
                this.insertNode(node.left, newNode);
            }
        } 
        else 
        {
            if (node.right === null) 
            {
                node.right = newNode;
            } 
            else 
            {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // In-order traversal to display the tree
    inOrder(node = this.root) 
    {
        if (node !== null) 
        {
            this.inOrder(node.left);
            console.log(node.events);
            this.inOrder(node.right);
        }
    }
    findInRange(start, end) 
    {
        let result = [];
        this.findInRangeHelper(this.root, start, end, result);
        return result;
    }

    findInRangeHelper(node, start, end, result) 
    {
        if (node === null) 
        {
            return;
        }

        let nodeStart = node.events[0].start;
        let nodeEnd = node.events[0].end;

        // Check if any event at the node overlaps with the given range
        if ((nodeStart >= start && nodeStart <= end) || (nodeEnd >= start && nodeEnd <= end)) 
        {
            for (let event of node.events) 
            {
                if ((event.start >= start && event.start <= end) || (event.end >= start && event.end <= end)) 
                {
                    result.push(event);
                }
            }
        }

        // Traverse left if there's a possibility of overlap
        if (start < nodeStart) 
        {
            this.findInRangeHelper(node.left, start, end, result);
        }

        // Traverse right if there's a possibility of overlap
        if (end > nodeStart) 
        {
            this.findInRangeHelper(node.right, start, end, result);
        }
    }
}

export default EventBST;
