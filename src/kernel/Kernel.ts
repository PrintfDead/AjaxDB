import fs from 'fs';
// @ts-ignore
import bson from 'bson';

export interface AjaxDB {
  options: _options;
  path_db: string;
  database: string | null;
  pointer: string | null;
  cache: Map<string, _cache>;
}

type _options = {
  path_db: string;
}

type _select = {
  name: string;
}

type _add_data<T> = string | number | object | T[]

type _add<T extends _add_data<T>> = {
  name_db: string,
  pointer_name: string,
  container_name: string,
  data: T,
}

type _pointer = {
  name: string
}

type _cache = {
  info_db: object,
  pointers: _pointer[],
  containers: object[]
}

export class AjaxDB {
  constructor(opts: _options) {
    this.options = opts;
    this.cache = new Map();

    // Reset Data
    this.database = null;
    this.pointer = null;

    // Checking files
    this._CheckDirectories().catch((reason) => { throw new Error(reason); });
  }

  private async _CheckDirectories(database?: string) {
    if ( !fs.existsSync(`${this.path_db}/ajax_database`) )
      await fs.promises.mkdir(`${this.path_db}/ajax_database`, {recursive: true});

    if ( database ) {
      const ID = await this._GetDatabaseID({ name: database })
        .catch((reason) => { throw new Error("database not found ", reason); });

      if ( !fs.existsSync(`${this.path_db}/ajax_database/${ID}/pointers`) )
        await fs.promises.mkdir(`${this.path_db}/ajax_database`, {recursive: true});

      if ( !fs.existsSync(`${this.path_db}/ajax_database/${ID}/containers`) )
        await fs.promises.mkdir(`${this.path_db}/ajax_database`, {recursive: true});
    }
  }

  private async _CheckDatabase(options: _select) {
    let _database = false;
    if(!fs.existsSync(`${this.options.path_db}/ajax_database`)) {
      await fs.promises.mkdir(`${this.options.path_db}/ajax_database`, {recursive: true})
        .catch((reason) => { throw new Error(reason); });

      return false;
    }

    for (const content of fs.readdirSync(`${this.options.path_db}/ajax_database`)) {
      if (!fs.existsSync(`${this.options.path_db}/ajax_database/${content}/info.json`)) return false;

      const info_database = await fs.promises.readFile(`${this.options.path_db}/ajax_database/${content}/info.json`, { encoding: "utf-8" })
        .catch((reason) => { throw new Error(reason); });

      const json_data = JSON.parse(info_database);
      if (json_data.result == false) throw new Error("unexpected error");

      if (json_data.database_name == options.name) {
        _database = true;
      }
    }

    return _database;
  }

  private async _GetDatabaseID(options: _select) {
    let _database = null;
    if(!fs.existsSync(`${this.options.path_db}/ajax_database`)) {
      await fs.promises.mkdir(`${this.options.path_db}/ajax_database`, {recursive: true})
        .catch((reason) => { throw new Error(reason); });

      return false;
    }

    for (const content of fs.readdirSync(`${this.options.path_db}/ajax_database`)) {
      if (!fs.existsSync(`${this.options.path_db}/ajax_database/${content}/info.json`)) return;

      const info_database = await fs.promises.readFile(`${this.options.path_db}/ajax_database/${content}/info.json`, { encoding: "utf-8" })
        .catch((reason) => { throw new Error(reason); });

      const json_data = JSON.parse(info_database);
      if (json_data.result == false) throw new Error("unexpected error");

      if (json_data.database_name == options.name) {
        _database = content;
      }
    }

    if ( _database === null )
      throw new Error("not found database");

    return _database;
  }

  private _CheckPointer(name: string, db_id: string) {
    if ( !fs.existsSync(`${this.path_db}/ajax_database/${db_id}`) )
      throw new Error("database not found");

    for (const content of fs.readdirSync(`${this.options.path_db}/ajax_database/${db_id}/pointers`)) {
      if ( content.endsWith('.bson') ) return;

      const _pointer = fs.readFileSync(`${this.options.path_db}/ajax_database/${db_id}/pointers/${content}.bson`, { encoding: "utf-8" });
      const _data = JSON.parse(_pointer);

      if ( _data.name === name ) return true;

      const _db = this.cache.get(db_id);

      if ( !_db )
        throw new Error("database not found");

      _db.pointers.forEach((x) => {
        if ( x.name === name)
          return true;
      });
    }

    return false;
  }

  private _CheckContainer(name: string, db_id: string) {
    if ( !fs.existsSync(`${this.path_db}/ajax_database/${db_id}`) )
      throw new Error("database not found");

    for (const content of fs.readdirSync(`${this.options.path_db}/ajax_database/${db_id}/containers`)) {
      if ( content.endsWith('.bson') ) return;

      const _container = fs.readFileSync(`${this.options.path_db}/ajax_database/${db_id}/containers/${content}.bson`, { encoding: "utf-8" });
      const _data = JSON.parse(_container);

      if ( _data.name === name ) return true;

    }

    return false;
  }

  public async SelectDatabase(options: _select) {
    if ( !(await this._CheckDatabase(options)) ) throw new Error("not found database");

    const ID_database = await this._GetDatabaseID(options)
      .catch((reason) => {throw new Error(reason);});

    if( !ID_database ) return;

    const pointers: object[] = [];
    const containers: object[] = [];
    let info_db: object = {};

    for (const content of fs.readdirSync(`${this.options.path_db}/ajax_database`)) {
      const db = await fs.promises.readFile(`${this.options.path_db}/ajax_database/${content}/info.json`, { encoding: "utf-8" })
        .catch((reason) => { throw new Error(reason); });

      const data = JSON.parse(db);
      if (data.result == false) throw new Error("unexpected error");

      if (data.database_name == options.name) return;

      info_db = data;

      for (const file of fs.readdirSync(`${this.options.path_db}ajax_database/${content}/pointers`)) {
        if ( !fs.existsSync(`${this.path_db}/ajax_database/${content}/pointers`) )
          await fs.promises.mkdir(`${this.path_db}/ajax_database/${content}/pointers`, {recursive: true});

        const info_database = await fs.promises.readFile(`${this.options.path_db}/ajax_database/${content}/pointers/${file}`, { encoding: "utf-8" })
          .catch((reason) => { throw new Error(reason); });
        const json_data = JSON.parse(info_database);

        pointers.push(json_data);
      }

      for (const file of fs.readdirSync(`${this.options.path_db}ajax_database/${content}/containers`)) {
        if ( !fs.existsSync(`${this.path_db}/ajax_database/${content}/containers`) )
          await fs.promises.mkdir(`${this.path_db}/ajax_database/${content}/containers`, {recursive: true});

        const info_database = await fs.promises.readFile(`${this.options.path_db}/ajax_database/${content}/containers/${file}`, { encoding: "utf-8" })
          .catch((reason) => { throw new Error(reason); });
        const json_data = JSON.parse(info_database);

        containers.push(json_data);
      }
    }

    const _data = {
      info_db,
      pointers,
      containers
    };

    this.cache.set(ID_database, _data);

    this.database = options.name;

    return _data;
  }

  public async Add<Type extends _add_data<Type>>(options: _add<Type>) {
    if ( this.database === null )
      throw new Error("database not select");

    const ID = await this._GetDatabaseID({ name: options.name_db })
      .catch((reason) => { throw new Error(reason); });

    if ( ID === null )
      throw new Error("database not found");

    await this._CheckDirectories(options.name_db);

    // @ts-ignore
    if ( this._CheckPointer(options.pointer_name, ID) )
      throw new Error("pointer exists");
    // @ts-ignore
    if ( this._CheckContainer(options.pointer_name, ID ) )
      throw new Error("container exists");

    const _pointer = {
      name: options.pointer_name,

    };

    const _container = {
      name: options.container_name
    };


  }


}