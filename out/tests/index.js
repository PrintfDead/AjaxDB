"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const AjaxDB = new index_1.Client({ database: "DatabaseName", path: __dirname + "/../.." }); // Important! do not put / at the end of the path
AjaxDB.CreatePointer('Pointer', 'Container');
//AjaxDB.push('Pointer', { "content": { "name": "Printf", "lastname": "Dead" } }, true); // Use to sotre new data without affecting the others - output: boolean
//AjaxDB.deleteByKey('Pointer', 'lastname'); // delete key - output: boolean
//console.log(AjaxDB.findPointer('Pointer')); // output: pointer data
//console.log(AjaxDB.findContainer('Pointer')); // output: container data
//console.log(AjaxDB.get("Pointer", { "name": "Printf" })); // OUTPUT: key data
//AjaxDB.size() // OUTPUT: number
//# sourceMappingURL=index.js.map