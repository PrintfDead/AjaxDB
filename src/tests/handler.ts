import { readdir as readDirectory } from 'node:fs/promises';
import { resolve as createPath    } from 'node:path';

const testsPath = createPath(process.cwd(), 'src', 'tests', 'methods');

const directoryFiles = await readDirectory(testsPath);

for (const file of directoryFiles) {

    const filePath = createPath(testsPath, file);

    await import(`file:///${filePath}`);
};
