import { Enteity } from "./concats";
import path from 'path';
import fs from 'fs-extra';
import colors from 'colors';
import ejs from 'ejs';
import FSUtils from "./FSUtils";

const generate = async function(entity: Enteity) {
  const controllerRoot = path.resolve(process.cwd(), `api/controllers/${entity.moduleName}`);
  // const entityRoot = path.resolve(process.cwd(), `api/entities/${entity.moduleName}`);
  const viewRoot = path.resolve(process.cwd(), `views/${entity.moduleName}/${entity.name.toLowerCase()}`);
  const controllerFile = path.resolve(controllerRoot, `${entity.name}Controller.ts`);
  const indexViewFile = path.resolve(viewRoot, `index.ejs`);
  const modifyViewFile = path.resolve(viewRoot, `modify.ejs`);
  // if (fs.existsSync(controllerFile) || fs.existsSync(indexViewFile) || fs.existsSync(modifyViewFile)) {
  //   console.log(colors.red.bold(`请检查项目，已经存在相应文件`));
  //   return;
  // }
  console.log(entity.columns);
  fs.ensureDirSync(controllerRoot);
  fs.ensureDirSync(viewRoot);
  FSUtils.translate(path.resolve(__dirname, '../../templates/to/entity/Controller.ejs'), controllerFile, entity);
  FSUtils.translate(path.resolve(__dirname, '../../templates/to/entity/index.ejs'), indexViewFile, entity);
  FSUtils.translate(path.resolve(__dirname, '../../templates/to/entity/modify.ejs'), modifyViewFile, entity);
}

/**
 * 按照表名生成增删改查方法
 * @param entities 
 * @param table 表名
 */
const generateModel = async function(entities: Enteity[] = [], table: string) {
  for (const entity of entities) {
    if (entity.tableName === table) {
      await generate(entity);
      break;
    }
  }
};

export default generateModel;
