/**
 * 数据库相关操作
 * Created at 2020-10-15 17:28
 *
 * @author Wheeler https://github.com/WheelerLee
 * @copyright 2020 Activatortube, INC.
 *
 */

import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { DBInfo } from "./getDBInfo";
import { pascalCase, camelCase } from 'change-case';
import { Column, Enteity } from "./concats";
import path from 'path';
import fs from "fs-extra";
import ejs from 'ejs';
import FSUtils from "./FSUtils";

/**
 * 类型的映射关系，主要是mysql数据类型和typescript的映射关系
 */
const VAR_MAPPER = [
  {
    varType: 'string',
    dbType: ['char', 'varchar', 'tinytext', 'text', 'mediumtext', 'longtext'],
  },
  {
    varType: 'number',
    dbType: ['tinyint', 'smallint', 'mediumint', 'int', 'integer', 'bigint', 'float', 'double'],
  }
];

/**
 * 应该忽略的公共字段
 */
const IGNORE_COLUMN = ['id', 'deleted', 'createdAt', 'updatedAt', 'sortedNum', 'creater'];

export default class SqlUtils {
  /**
   * 连接数据库，返回连接实例
   * @param info 数据库连接信息
   */
  static async connect(info: ConnectionOptions): Promise<Connection> {
    let connection = createConnection(info);
    return connection;
  }

  /**
   * 通过数据库的数据类型获取ts的数据类型
   * @param dbType 数据库数据类型
   */
  static getVarTypeByDBType(dbType: string): string | undefined {
    for (const item of VAR_MAPPER) {
      if (item.dbType.indexOf(dbType) >= 0) {
        return item.varType;
      }
    }
    return undefined;
  }

  /**
   * 获取单表的唯一约束，如果是联合约束，将会用逗号将多个字段分开
   */
  static async getUniqueIndexs(connection: Connection, database: string, tableName: string): Promise<Array<Array<string>>> {
    const uniqueIndexs: Array<Array<string>> = [[], []];
    const allIndexs = await connection.manager.query(`SHOW INDEX FROM ${database}.${tableName}`);
    const uniqueMap: any = {};
    for (const index of allIndexs) {
      if (index.Non_unique === '0') { // 表示有唯一约束
        // uniqueIndexs.push(index.Column_name);
        if (uniqueMap[index.Key_name]) {
          uniqueMap[index.Key_name].push(index.Column_name);
        } else {
          uniqueMap[index.Key_name] = [index.Column_name];
        }
      }
    }
    for (const key of Object.keys(uniqueMap)) {
      if (uniqueMap[key].length === 1) {
        uniqueIndexs[0].push(uniqueMap[key][0]);
      } else {
        uniqueIndexs[1].push(uniqueMap[key].map((a: any) => `'${a}'`).join(', '));
      }
    }
    return uniqueIndexs;
  }

  static async getForeignKey(connection: Connection, database: string, tableName: string) {
    const columUsages = await connection.manager
      .query('SELECT * FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA=? AND TABLE_NAME=?',
        [database, tableName]);
    const foreignKeys: any = {};
    for (const columUsage of columUsages) {
      if (columUsage.REFERENCED_TABLE_NAME) { // 关联的表
        foreignKeys[columUsage.COLUMN_NAME] = columUsage.REFERENCED_TABLE_NAME;
      }
    }
    return foreignKeys;
  }

  /**
   * 获取实体的具体信息
   * @param connection 数据库连接
   * @param database 数据库
   * @param tableName 表名
   */
  static async getEntitieInfo(connection: Connection, database: string, tableName: string): Promise<Enteity> {
    const cases = tableName.split('_');
    let modelName: string; // 生产的model名
    let moduleName: string; // 模块名，会按照模块生成不同的文件夹
    if (cases.length === 1) { // 不带_的表名，推断为不带前缀没有模块的
      modelName = pascalCase(tableName);
      moduleName = '';
    } else {
      moduleName = cases[0];
      modelName = pascalCase(cases.splice(1).join(' '));
    }
    const uniqueIndexs: Array<Array<string>> = await this.getUniqueIndexs(connection, database, tableName);
    const foreignKeys = await this.getForeignKey(connection, database, tableName);
    const dbColumns = await connection.manager.query('SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE '
      + '(`TABLE_SCHEMA` =? AND `TABLE_NAME`=?)', [database, tableName]);
    const columns: Column[] = [];
    for (const dbColumn of dbColumns) {
      // 忽略的字段
      if (IGNORE_COLUMN.indexOf(dbColumn.COLUMN_NAME) >= 0) {
        continue;
      }
      // console.log(dbColumn);
      const varType = this.getVarTypeByDBType(dbColumn.DATA_TYPE);
      let columnType = dbColumn.COLUMN_TYPE;
      columnType = columnType.replace(/[^0-9]/ig, '');
      const length = parseInt(columnType);
      const column: Column = {
        entityName: foreignKeys[dbColumn.COLUMN_NAME] ? 
          camelCase(foreignKeys[dbColumn.COLUMN_NAME].split('_').splice(1).join(' '))
          :
          camelCase(dbColumn.COLUMN_NAME),
        name: dbColumn.COLUMN_NAME,
        dataType: dbColumn.DATA_TYPE,
        type: dbColumn.COLUMN_TYPE,
        varType: varType,
        comment: dbColumn.COLUMN_COMMENT,
        nullable: dbColumn.IS_NULLABLE === 'YES',
        unique: uniqueIndexs[0].indexOf(dbColumn.COLUMN_NAME) >= 0,
        foreignKey: foreignKeys[dbColumn.COLUMN_NAME] ? 
          {
            moduleName: foreignKeys[dbColumn.COLUMN_NAME].split('_')[0],
            name: pascalCase(foreignKeys[dbColumn.COLUMN_NAME].split('_').splice(1).join(' ')),
            columns: [],
            tableName: foreignKeys[dbColumn.COLUMN_NAME]
          }
          :
          undefined
      };
      console.log(column);
      if (length) {
        if (varType === 'string') {
          column.length = length;
        } else if (varType === 'number') {
          column.width = length;
        }
      }
      if (dbColumn.COLUMN_DEFAULT) {
        column.default = dbColumn.COLUMN_DEFAULT;
      }
      columns.push(column);
    }
    return {
      name: modelName,
      tableName: tableName,
      columns: columns,
      moduleName: moduleName,
      varName: camelCase(modelName),
      compositeUnique: uniqueIndexs[1],
      hasManyToOne: Object.keys(foreignKeys).length > 0,
      hasColumn: columns.length > Object.keys(foreignKeys).length
    };
  }

  /**
   * 获取所有的实体类
   * @param connection 数据库连接
   * @param database 数据库
   */
  static async getEntities(connection: Connection, database: string): Promise<Enteity[]> {
    const tables = await connection.manager.query('SELECT * FROM `INFORMATION_SCHEMA`.'
      + '`TABLES` WHERE `TABLE_SCHEMA`=?', [database]);
    
    let es: Enteity[] = [];
    for (const table of tables) {
      es.push(await this.getEntitieInfo(connection, database, table.TABLE_NAME));
    }
    return es;
  }

  static async genaterEntity(entitiesPath: string, entity: Enteity) {
    let entityPath = entitiesPath;
    if (entity.moduleName) {
      entityPath = path.resolve(entitiesPath, entity.moduleName);
    }
    await fs.ensureDir(entityPath);
    FSUtils.translate(path.resolve(__dirname, '../../templates/to/entity/Entity.ejs'),
      `${entityPath}/${entity.name}.ts`, entity);
    // const template = await fs.readFile(path.resolve(__dirname, '../../templates/to/entity/Entity.ejs'));
    // const model = ejs.render(template.toString(), entity);
    // await fs.writeFile(`${entityPath}/${entity.name}.ts`, Buffer.from(model), { flag: 'w', encoding: 'utf8' });
  }

  /**
   * 根据实体信息生成所有的实体类文件
   * @param entities 所有的实体集合
   */
  static async genaterEntities(entities: Enteity[]) {
    let entitiesPath = path.resolve(process.cwd(), 'api/entities_bak');
    await fs.ensureDir(entitiesPath);
    for (const entity of entities) {
      await this.genaterEntity(entitiesPath, entity);
    }
    fs.copy(path.resolve(__dirname, '../../templates/to/entity/BaseModel.tmpl'),
      path.resolve(entitiesPath, 'BaseModel.ts'));
  }
}
