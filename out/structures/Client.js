"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const fs_1 = __importDefault(require("fs"));
const Database_1 = require("./Database");
const bson_1 = __importDefault(require("bson"));
class Client extends Database_1.Database {
    constructor(options) {
        super({ database: options.database, path: options.path });
        if (this.path.endsWith("/"))
            this.path = this.path.slice(0, -1);
        this.options = options;
        this.shortPath = this.path + "/ajax_databases/" + options.database;
        this.database = options.database;
        if (!fs_1.default.existsSync(this.path)) {
            throw new Error("Path is not exists");
        }
        if (!fs_1.default.existsSync(this.path + "/ajax_databases/")) {
            fs_1.default.promises.mkdir(this.path + "/ajax_databases/", { recursive: true }).catch((err) => {
                if (err)
                    this.emit("error", err);
            });
        }
        if (!fs_1.default.existsSync(this.shortPath)) {
            fs_1.default.promises.mkdir(this.shortPath, { recursive: true }).catch((e) => this.emit("error", e));
        }
        if (!fs_1.default.existsSync(this.path + "/ajax_databases/" + this.database + "/pointers")) {
            this.CreatePointers();
        }
        if (!fs_1.default.existsSync(this.shortPath + "/containers")) {
            this.CreateContainers();
        }
        this.emit('start', { options: this.options, database: this.database, shortPath: this.shortPath });
    }
    CreatePointer(key, containerName) {
        if (fs_1.default.existsSync(`${this.path}/ajax_databases/${this.database}/pointers/${key}.bson`))
            throw new Error("Pointer is exist");
        if (fs_1.default.existsSync(`${this.path}/ajax_databases/${this.database}/containers/${containerName}.bson`))
            throw new Error("Container is exist");
        const pointerData = {
            "key": key,
            "container": `${containerName}`
        };
        const containerData = {
            "pointer": key,
            "containers": []
        };
        fs_1.default.promises.mkdir(`${this.path}/ajax_databases/${this.database}/pointers`, { recursive: true })
            .then((x) => {
            fs_1.default.promises.writeFile(`${this.shortPath}/pointers/${key}.bson`, bson_1.default.serialize(pointerData));
        }).catch((err) => this.emit("error", err));
        fs_1.default.promises.mkdir(`${this.path}/ajax_databases/${this.database}/containers`, { recursive: true })
            .then((x) => {
            fs_1.default.promises.writeFile(`${this.shortPath}/containers/${containerName}.bson`, bson_1.default.serialize(containerData));
        }).catch((err) => this.emit("error", err));
        return;
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map