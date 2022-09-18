import {

    access as checkAccess,
    mkdir  as createDirectory
} from 'node:fs/promises';

export default function (directory: string) {

    return checkAccess(directory)
        .catch((err) => {

            if (err.code === 'ENOENT') createDirectory(directory, { recursive: true });
        });
};
