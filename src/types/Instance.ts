export interface InstanceOptions {

    database:   string
    directory?: string
};

export type PropertyContent = Record<ContentType, string>;

export const enum ContentType {

    'string',
    'number',
    'symbol',
    'bigint',
    'boolean',
    'undefined'
};
