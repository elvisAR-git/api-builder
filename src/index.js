import { Root } from './core/Root.js';
import { NodeProject } from './project/node.project.js';
import { NodeApiTemplate } from './template/node.api.template.js';
import { NodeApiModuleTemplate } from './template/node.module.template.js';



let project = new NodeProject('test', 'javascript', new NodeApiTemplate(new Root('commerce', process.cwd())));


project.template.addModule(new NodeApiModuleTemplate(project.template.findNodeInTree('modules', project.template.tree), 'user', ['userInformation', 'company']));

// add security module
project.template.addModule(new NodeApiModuleTemplate(project.template.findNodeInTree('modules', project.template.tree), 'security', ['role', 'permission']));


project.template.printTree()

project.template.makeTree(project.template.tree);


console.info(`COMPLEXITY: ${project.template.getComplexity()}`);


