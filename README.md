# @AjaxDB
### [BeeDB](https://github.com/theMarzon/BeeDB) inspired package
# Information:
- :wrench: Efficient and fast database using BSON.
- :butterfly: Simple and easy to use
- :smile: Version 2.0

# Installation
```sh
npm i ajax.db
```

# Examples:
- `Create Database & Start Client Instance:`
```ts
import { Client } from 'ajax.db';

const AjaxDB = new Client({ database: "DatabaseName", path: "path/to/databases" });

// Instance new Client for create new database or use a database.

// Data is optional

AjaxDB.on('start', (data) => {
  console.log("AjaxDB start!");
});

// error: ErrorClient = string | object | number | undefined
AjaxDB.on('error', (error) => {
  console.error(error);  
});
```
- `CreatePointer`
```ts
AjaxDB.CreatePointer("PointerName", "ContainerName"); //It is recommended to put everything together
```
- `push`
```ts
AjaxDB.push("PointerName", { "id": number | string, "content": object }, AUTO_INCREMENT: boolean); // If AUTO_INCREMENT is true it is not necessary to declare the id, content is required 
```
- `deleteByKey`
```ts
AjaxDB.deleteByKey("PointerName", "KeyName"); // void
```
- `deleteSeveralByKey`
```ts
AjaxDB.deleteSeveralByKey(["Pointers"...], ["Keys"...]); // void
```
- `findPointer`
```ts
console.log(AjaxDB.findPointer("PointerName")); // OUTPUT: Pointer data
```
- `findContainer`
```ts
console.log(AjaxDB.findContainer("PointerName")); // OUTPUT: Container data
```
- `get`
```ts
console.log(AjaxDB.get("PointerName", { "KeyName": "KeyValue" }); // OUTPUT: object / complete container data

```
> OUTPUT EXAMPLE:
```js
{
  id: number | string,
  content: {
    ...
  }
}
```
- `size`
```ts
AjaxDB.size() // OUTPUT: number
```
- `edit`
```ts
AjaxDB.edit("PointerName", { "FindKey": "ValueKey" }, { "key": "KeyName", "value": "ValueForKey" }); // void
```

## Development notes
- The database is in the testing phase, report any errors.
- Thank you for reading!
