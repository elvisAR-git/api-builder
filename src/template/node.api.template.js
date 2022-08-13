import { Template } from "./template.js";


export class NodeApiTemplate extends Template {


    constructor(root) {

        super([
            {
                name: 'app',
                type: 'folder',
                children: [
                    {
                        name: 'api',
                        type: 'folder',
                        children: [
                            {
                                name: 'middleware',
                                type: 'folder',
                                children: [
                                    {
                                        name: 'auth',
                                        type: 'folder',
                                        children: [
                                            {
                                                name: 'auth.middleware.js',
                                                type: 'file',
                                            }, {
                                                name: 'index.js',
                                                type: 'file',
                                            }
                                        ]
                                    }, {
                                        name: 'logger',
                                        type: 'folder',
                                        children: [
                                            {
                                                name: 'logger.middleware.js',
                                                type: 'file',
                                            }, {

                                                name: 'index.js',
                                                type: 'file',
                                            }
                                        ]
                                    }
                                ]
                            }, {
                                name: 'v1',
                                type: 'folder',
                                children: [
                                    {
                                        name: 'auth',
                                        type: 'folder',
                                        children: [
                                            {
                                                name: 'auth.js',
                                                type: 'file',
                                            }, {
                                                name: 'auth.test.js',
                                                type: 'file',
                                            }, {
                                                name: 'index.js',
                                                type: 'file',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, {
                        name: 'common',
                        type: 'folder',
                        children: []
                    }, {
                        name: 'config',
                        type: 'folder',
                        children: []
                    }, {
                        name: 'cron',
                        type: 'folder',
                        children: []
                    }, {
                        name: 'models',
                        type: 'folder',
                        children: []
                    },
                    {
                        name: 'modules',
                        type: 'folder',
                        children: []
                    },
                    {
                        name: 'services',
                        type: 'folder',
                        children: [
                            {
                                name: 'external',
                                type: 'folder',
                                children: []
                            }
                        ]
                    }, {
                        name: 'utils',
                        type: 'folder',
                        children: [
                            {
                                name: 'db.js',
                                type: 'file',
                            }
                        ]
                    }, {
                        name: 'app.js',
                        type: 'file',
                    }, {
                        name: 'routes.js',
                        type: 'file',
                    }
                ]
            }, {
                name: 'dist',
                type: 'folder',
                children: []
            }, {
                name: 'public',
                type: 'folder',
                children: []
            }, {
                name: 'config.json',
                type: 'file',
            }
        ], root);

        this.name = 'node-express-api-project-structure';
        this.modules = [];
    }


    addModule(module) {
        this.modules.push(module);

        let rootNode = this.findNodeinNodes(module.root.name, this.rootNodes);
        rootNode.children.push(module.rootNodes);
    }

    getComplexity() {
        let complexity = this.complexity;

        // Add complexity for each module
        this.modules.forEach(module => {
            complexity += module.complexity;
        })

        return complexity;
    }
}