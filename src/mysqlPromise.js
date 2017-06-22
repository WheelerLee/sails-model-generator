/**
 * Created by liwei on 2017/5/31.
 */
var async = require('asyncawait/async');
var await = require('asyncawait/await');

/**
 *
 * @param pool
 * @param sql
 * @param data
 */
module.exports  = function(pool, sql, data) {
  var promise = new Promise(function (resolve, reject) {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, data, function (err, rows) {
        if (!err) {
          resolve(rows);
        } else {
          reject(err);
        }
        connection.release();
      });
    });
  });
  return promise;
}

// module.exports = async(function (connection, sql, data) {
//   var a = null;
//   try {
//    var a = await(aPromise(connection, sql, data));
//    console.log(a);
//    console.log('----');
//   } catch (e) {
//     console.log(e.message);
//   }
//   console.log('111111111');
//   return a;
// });

