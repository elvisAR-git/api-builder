import { Node } from "./Node.js";

export class File extends Node {
    constructor(name, folder) {
        super(name, 'file');
        this.parent = folder;
        this.content = '';
    }
}