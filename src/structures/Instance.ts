import { writeFile } from 'node:fs/promises';

import { resolve as createPath } from 'node:path';

import BSON from 'bson';

import checkDirectory from '../utils/checkDirectory.js';

import {
    
    InstanceOptions,
    PropertyContent
} from '../types/Instance.js';

export default class {

    options: Required<InstanceOptions>;

    directories: {

        pointers:   string
        containers: string
    };

    constructor (options: InstanceOptions) {

        this.options = {

            database: options.database,

            directory: options.directory ?? createPath(process.cwd(), 'databases', 'ajax')
        };

        this.directories = {

            pointers:   createPath(this.options.directory, options.database, 'pointers'),
            containers: createPath(this.options.directory, options.database, 'containers')
        };
    };

    async createPointer (

        pointer:   string,
        container: string
    ) {

        const pointerPath = createPath(this.directories.pointers, pointer);

        const pointerData = BSON.serialize({ pointer, container });

        await checkDirectory(this.directories.pointers);
    
        writeFile(pointerPath, pointerData);
    };

    async createContainer (

        container: string,

        content: PropertyContent
    ) {

        const containerPath = createPath(this.directories.containers, container);

        const containerData = BSON.serialize({ container, content });

        await checkDirectory(this.directories.containers);
    
        writeFile(containerPath, containerData);
    };
};
