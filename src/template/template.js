import { File } from "../core/File.js";
import { Folder } from "../core/Folder.js";
import fs from 'fs';
import path from 'path';


export class Template {

    constructor(rootNodes, root) {
        this.rootNodes = rootNodes;
        this.tree = [];
        this.top_dir = root.path;
        this.root = root;
        this.complexity = 0;
        this.generate();
    }

    generate() {
        this.rootNodes.forEach(node => {
            if (node.type === 'folder')
            {
                console.log('\n[*] Adding TOP level', node.name, 'to', this.root.name);


                // add children
                if (node.children.length > 0)
                {
                    let x = this.generateFolder(node, this.root);
                    console.log("[√] Done generating children of", x.name, x.children.length);

                } else
                {

                    // create folder

                    this.root.addChild(this.createNode(node.name, node.type, this.root));
                }

                this.complexity += 1;


                console.log('[√] Done generating', node.name);


            } else if (node.type === 'file')
            {

                this.complexity += 1;
                // create file
                const f = this.createNode(node.name, node.type, this.root)
                this.root.addChild(f);
                console.log('[+] Added TOP level', node.name, 'to', this.root.name);
            }

        });


        this.tree.push(this.root);


        console.info(`[√] generated tree for ${this.root.name}`);
    }


    generateFolder(folder, root) {

        let currentNode = this.createNode(folder.name, folder.type, root);
        root.addChild(currentNode);
        folder.children.forEach(node => {
            this.complexity += 1;
            if (node.type === 'folder')
            {

                // add children
                this.generateFolder(node, currentNode);


            } else if (node.type === 'file')
            {
                // create file
                currentNode.addChild(this.createNode(node.name, node.type, currentNode));

            }

        });



        return root

    }


    getNode(name) {
        name = name.name
        // search for node and return it

        for (const node of this.tree)
        {
            if (node.name === name)
            {
                return node;
            }
        }

    }

    createNode(name, type, root) {

        if (type === 'folder')
        {
            return new Folder(name, root);
        }
        if (type === 'file')
        {
            return new File(name, root);
        }
    }

    printTree() {
        // pretify the tree

        let tree = this.tree;
        let str = '';
        let indent = 0;

        for (const node of tree)
        {

            str += this.printNode(node, indent);
            indent += 1;

        }

        console.log(str);


    }

    printNode(node, indent) {
        let str = '';

        for (let i = 0; i < indent; i++)
        {
            str += '.......'
        }

        str += node.type == "folder" || node.type == "root" ? "[ " + node.name + ' ]\n' : "> " + node.name + '\n';

        if (node.children)
        {
            for (const child of node.children)
            {
                str += this.printNode(child, indent + 1);
            }
        }

        return str;
    }


    findNodeInTree(name, tree) {
        // search recursively for node and return it

        for (const node of tree)
        {

            if (node.name === name)
            {
                return node;
            }
            if (node.children)
            {
                let x = this.findNodeInTree(name, node.children);
                if (x)
                {
                    return x;
                }
            }
        }
    }





    makeTree(tree) {

        for (const node of tree)
        {
            if (node.type === 'root')
            {
                node.path = node.path + '/' + node.name;
                // create root
                this.createNodeEntity(node, node.path);
            }

            if (node.type != 'root')
            {
                node.path = this.makePath(node, node.parent);

                this.createNodeEntity(node, node.path);

            }
            if (node.children)
            {
                this.makeTree(node.children);
            }



        }
    }

    createNodeEntity(node, dir) {
        if (node.type === 'folder' || node.type === 'root')
        {
            try
            {
                fs.mkdirSync(path.resolve(dir));
            } catch (error)
            {
            }
        } else if (node.type === 'file')
        {
            try
            {
                if (node.name === 'config.json')
                {

                    fs.writeFileSync(path.resolve(dir), JSON.stringify(this.rootNodes, null, 2));
                    return;
                }

                fs.writeFileSync(path.resolve(dir), node.content);
            } catch (error)
            {
            }
        }
    }


    makePath(node, parent) {

        return parent.path + '/' + node.name;
    }

    findNodeinNodes(name, nodes) {
        // search recursively for node and return it

        for (const node of nodes)
        {

            if (node.name === name)
            {
                return node;
            }
            if (node.children)
            {
                let x = this.findNodeinNodes(name, node.children);
                if (x)
                {
                    return x;
                }
            }
        }
    }

    addContentToFile(file, content, root) {

        console.info(root)

        // find root node
        let rootNode = this.findNodeInTree(root, this.tree);

        // find file node

        let fileNode = this.findNodeInTree(file, rootNode.children);

        // add content to file
        fileNode.content = content;
    }
}