export class Node {
    constructor(name, type, path = "") {
        this.name = name;
        this.type = type;
        this.children = [];
        this.tree = null;
        this.path = path;
    }

    addChild(child) {
        if (child instanceof Node && this.type !== 'file')
        {
            this.children.push(child);
        } else
        {
            throw new Error('Invalid child type', child);
        }
    }

    getChild(name) {

        for (const element of this.children)
        {
            if (element.name === name)
            {
                return element;
            }
        }
        return null;
    }

    removeChild(name) {
        for (const element of this.children)
        {
            if (element.name === name)
            {
                this.children.splice(this.children.indexOf(element), 1);
                return true;
            }
        }
        return false;
    }



}