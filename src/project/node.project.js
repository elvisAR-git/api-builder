
import { Project } from "./project.js";

export class NodeProject extends Project {
    constructor(name, type, nodeApiTemplate) {
        super(name, type, nodeApiTemplate);
    }
}