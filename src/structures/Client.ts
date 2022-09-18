import fs from 'node:fs';

import { EventEmitter } from 'node:events';

import {
  
    access as checkAccess,
    mkdir  as createDirectory
} from 'node:fs/promises';

import { resolve as createPath } from 'node:path';

import BSON from 'bson';

import { ClientOptions } from '../types/Client.js';

export default class extends EventEmitter {

    options: Required<ClientOptions>;

    directories: {

        pointers:   string
        containers: string
    };

    constructor (options: ClientOptions) {

        super();

        this.options = {

            database: options.database,

            directory: options.directory ?? createPath(process.cwd(), 'databases', 'ajax')
        };

        this.directories = {

            pointers:   createPath(this.options.directory, options.database, 'pointers'),
            containers: createPath(this.options.directory, options.database, 'containers')
        };

        this.emit('start');
    }
  
    async checkDirectories () {

        await checkAccess(this.directories.pointers)
            .catch((err) => {

                if (err.code === 'ENOENT') createDirectory(this.directories.pointers, { recursive: true });
            });


        await checkAccess(this.directories.containers)
            .catch((err) => {

                if (err.code === 'ENOENT') createDirectory(this.directories.containers, { recursive: true });
            });
    };

    async createPointer (key: string, containerName: string) {

        const pointersFilePath  = createPath(this.directories.pointers, `${containerName}.bson`);
        const containerFilePath = createPath(this.directories.containers, `${key}.bson`);

        if (fs.existsSync(pointersFilePath)
        ||  fs.existsSync(containerFilePath)) return;

        const pointerData = BSON.serialize({ key, containerName });
  
        const containerData = BSON.serialize({

            pointer: key,

            containers: [] 
        });

        await this.checkDirectories();
    
        fs.promises.writeFile(pointersFilePath, pointerData);
        fs.promises.writeFile(containerFilePath, containerData);
    };
};
