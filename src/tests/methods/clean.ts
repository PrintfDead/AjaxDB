import test from 'node:test';

import Database from '../../structures/Instance.js';

export default test('createPointer', async () => {

    const database = new Database({ database: 'DATABASE_TEST_NAME' });

    await database.createPointer('POINTER_TEST_NAME', 'CONTAINER_TEST_NAME');

    console.log(database);
});
