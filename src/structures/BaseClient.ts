import { EventEmitter } from 'node:events';

import { EJSON } from 'bson';

type ErrorClient = string | number | object | undefined;

export interface BaseClient {

  EJSON: typeof EJSON;

  on(event: 'error', listener: (error: ErrorClient) => void): this;

  on(event: 'start', listener: () => void): this;
};

export class BaseClient extends EventEmitter {

    constructor() {

        super();

        this.EJSON = EJSON;
    };
};
