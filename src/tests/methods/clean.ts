import test from 'node:test';

import Database from '../../structures/Client.js';

test('createPointer', async () => {

    await Database.createPointer("Pointer", "Container"); 
});
