import { Template } from "./template.js";

export class NodeApiModuleTemplate extends Template {
    constructor(root, name, models = []) {
        super([], root);

        this.models = models;
        this.name = name;

        this.buildNode();

    }


    createModelFile(model) {
        return [
            {
                name: `${model}`,
                type: 'folder',
                children: [{
                    name: `${model}.interface.js`,
                    type: 'file',
                }, {
                    name: `create.${model}.js`,
                    type: 'file',
                }, {
                    name: `update.${model}.js`,
                    type: 'file',
                }, {
                    name: `delete.${model}.js`,
                    type: 'file',
                }, {
                    name: `get.${model}.js`,
                    type: 'file',
                }, {
                    name: `shared.${model}.js`,
                    type: 'file',
                }, {
                    name: `index.js`,
                    type: 'file',
                }]
            }
        ];
    }


    buildNode() {
        let topNode = {
            name: this.name,
            type: 'folder',
            children: []
        }

        this.models.forEach(model => {
            topNode.children.push(...this.createModelFile(model));
        });

        topNode.children.push(
            {
                name: `index.js`,
                type: 'file',
            },
            {
                name: `module.json`,
                type: 'file',
            }
        )


        this.rootNodes = [topNode];

        this.generate();

        this.addContentToFile(`module.json`, JSON.stringify({
            module: this.name,
            version: '1.0.0',
            description: `${this.name} module`,
            author: '',
            email: '',
            license: '',
            models: this.models,
            allowed_roles: [],
        },
            null,
            2
        ), this.name)

    }

}