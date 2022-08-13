import { Node } from "./Node.js";

export class Folder extends Node {
    constructor(name, parent) {
        super(name, 'folder');
        this.parent = parent;
    }
}