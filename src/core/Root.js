import { Node } from "./Node.js";

export class Root extends Node {
    constructor(name, path) {
        super(name, 'root', path);
        this.name = name;
    }
}