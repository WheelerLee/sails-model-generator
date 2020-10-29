import { Enteity } from "./concats";
import path from 'path';
import fs from 'fs-extra';

const generate = function(entity: Enteity) {
  const controllerRoot = path.resolve(process.cwd(), `/api/controllers/${entity.moduleName}`);
  const entityRoot = path.resolve(process.cwd(), `/api/entities/${entity.moduleName}`);
  const viewRoot = path.resolve(process.cwd(), `/views/${entity.moduleName}/${entity.name.toLowerCase()}`);
  if (fs.existsSync(path.resolve(controllerRoot, `${entity.name}Controller.ts`))) {
    return;
  }
}

/**
 * 按照表名生成增删改查方法
 * @param entities 
 * @param table 表名
 */
const generateModel = function(entities: Enteity[] = [], table: string) {
  for (const entity of entities) {
    if (entity.tableName === table) {
      generate(entity);
      break;
    }
  }
};

export default generateModel;
