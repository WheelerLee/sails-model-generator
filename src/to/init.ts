import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import FSUtils from './FSUtils';

/**
 * 初始化一个项目
 * @param name 项目名
 */
export async function init(name: string) {
  const proPath = path.resolve(process.cwd(), name);
  console.log(proPath);
  if (fs.existsSync(proPath)) {
    console.log(chalk.bgCyan(chalk.red(' 该文件夹已经存在 ')));
    return;
  }
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'templete',
    message: "选择项目的类型?",
    choices: [
      {
        key: 'e',
        name: '空项目',
        value: 'empty'
      },
      {
        key: 'a',
        name: '后台管理',
        value: 'admin'
      }
    ],
  });

  // 生成含后台的项目
  if (answer.templete === 'admin') {
    await fs.copy(path.resolve(__dirname, '../../templates/to/admin_templete'), proPath);
  } else {
    await fs.copy(path.resolve(__dirname, '../../templates/to/empty_templete'), proPath);
  }
}
