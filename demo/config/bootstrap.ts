/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
import {
  createConnection,
  // DefaultNamingStrategy,
} from 'typeorm';
// import { snakeCase } from 'change-case';

// class MyNamingStrategy extends DefaultNamingStrategy {
//   // eslint-disable-next-line class-methods-use-this
//   public columnName(
//     propertyName: string,
//     customName: string,
//   ): string {
//     // if (embeddedPrefixes.length) {
//     //   return (pascalCase(embeddedPrefixes.join('_')) + (customName ? titleCase(customName) :
//     // titleCase(propertyName)));
//     // }
//     return customName || snakeCase(propertyName);
//   }
// }

export async function bootstrap() {
  createConnection()
    .then(() => {
      sails.log.debug('数据库连接成功');
    })
    .catch((err) => sails.log.error(err));
}
