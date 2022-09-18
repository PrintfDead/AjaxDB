# @AjaxDB

> This library was inspired by [BeeDB](https://github.com/theMarzon/BeeDB)

# Information:

- :wrench: Efficient and fast database using BSON.
- :butterfly: Simple and easy to use.
- :smile: Version 2.0.

# Installation

```sh
npm i ajax.db --save
```

# Examples:

- `Create Database & Start Client Instance:`
```ts
import { Client } from 'ajax.db';

/**
 * @param {object} options - Put database name and path
 * @deprecated Client({ path: string});
 * @new Client({ database: string, path: string });
 * @description Instance new Client for create new database or use a database.
 */
const AjaxDB = new Client({ database: "DatabaseName", path: "path/to/databases" });

/** 
 * @param {string} event - Event name
 * @param {function} callback - Callback function
 * @description The event is emitted when the Client class is instantiated.
*/
AjaxDB.on('start', () => {

  console.log("AjaxDB start!");
});

/** 
 * @param {string} event- Event name
 * @param {function} callback - Callback error.
 * @type {error} ErrorClient interface
 * @description The event is emitted on some conditions of the Database class.
*/
AjaxDB.on('error', (error) => {

  console.error(error);  
});

// Other conditions instantiate the Error clas and stop the database
```
- `CreatePointer`
```ts

/** 
 * @param {string} pointer - pointer name
 * @param {string} container - container name
 * @async
 * @description It is recommended to put everything together
*/
await AjaxDB.CreatePointer("PointerName", "ContainerName");
```

- `push`

```ts
/** 
 * @param {string} pointer - pointer name
 * @param {object} data - data to push
 * @param {object} AUTO_INCREMENT auto increment id
 * @async
 * @description If AUTO_INCREMENT is true it is not necessary to declare the id, content is required 
*/
await AjaxDB.push("PointerName", { "id": number | string, "content": object }, AUTO_INCREMENT: boolean); 
```

- `deleteByKey`

```ts
/** 
 * @param {string} pointer - pointer name
 * @param {string} key - key name
 * @async
 * @description Deletes the data of the specified key and delete key.
*/
await AjaxDB.deleteByKey("PointerName", "KeyName"); // void
```
- `deleteSeveralByKey`
```ts
/** 
 * @param {array} pointers - pointers name
 * @param {array} keys - keys name
 * @async
 * @description Delete all keys specified in the array
*/
await AjaxDB.deleteSeveralByKey(["Pointers"...], ["Keys"...]); // void
```

- `get`

```ts
/**
 * @param {string} pointer - pointer name
 * @param {object} data - find by key
 * @async
 * @description get data of the containers
 * @returns {object}
 * @output { id: number, content: object }
*/
await AjaxDB.get("PointerName", { "KeyName": "KeyValue" });
```
- `size`
```ts
/** 
 * @description number of pointers
 * @returns {number}
*/
AjaxDB.size() // OUTPUT: number
```

- `edit`

```ts
/** 
 * @param {string} pointer - pointer name
 * @param {object} findKey - key name and key value
 * @param {object} valueKey - key name and key value
 * @async
 * @description edit the data of a key - It is important that in "key" it is declared like this, do not put the name of the key that you want to edit, just leave "key"
 * @deprecated edit("Pointer", "key", value: any);
 * @new edit("Pointer", {"FindKeyName": "ValueKey"}, {"key": "KeyName", "value": "ValueForKey"});
*/

await AjaxDB.edit("PointerName", { "FindKey": "ValueKey" }, { "key": "KeyName", "value": "ValueForKey" }); // void
```

## Development notes

- The database is in the testing phase, report any errors.
- Thank you for reading!
