var JDBC = require('jdbc');
var configurations = require('./config/configuration');
var JVMInitializer = require('./config/JVMInitializer');
var stringHelpers = require('./utility/StringHelpers');
var logger = require('./Logs/Logger');

// Start JVM if not already running
JVMInitializer.startJvm();

// Initialize databaseInitialized flag and database
var databaseInitialized = null;
var database = new JDBC(configurations);

exports.initializeDB = function (callback) {
  database.initialize(function(err) {
    if (err) {
      databaseInitialized = false;
      callback(err);
    } else {
      databaseInitialized = true;
      callback(null, true);
    }
  });
};

exports.getDbInitStatus = function () {
  return databaseInitialized;
};

// Reserve a connection from the connection pool.
// This also Initializes DB if not already initialized. May create issue if reqeust is sent immediately after running server. Unless we wait for db to initialize, then start listening for requests.
function reserve(db, callback) {
  db.reserve(function(err, connobj) {
    if (err) {
      return callback(err);
    } else {
      // console.log(connobj);
      return callback(null, connobj, connobj.conn);
    }
  });
};

// Release connection back to connection pool. Send either err or results to callback.
function release(db, connobj, err, result, callback) {
  db.release(connobj, function(err) {
    if (err) {
      return callback(err);
    } else {
      return callback(null, result);
    }
  });
};

// Initialize and return database instance with the configurations if not already initialized. Else, return already initialized DB.
function getDatabase(callback) {
  if (!databaseInitialized) {
    database.initialize(function(err) {
      if (err) {
        return callback(err);
      } else {
        databaseInitialized = true;
        return callback(null, database);
      }
    });
  } else {
    // logger.debug('Database either already initialized or being initialized.');
    return callback(null, database);
  }
};

// Returns an array of objects, each object containing all the selected columns as keys and each row's corresponding value as a key's value.
// Sql is a simple Impala string.
function executeQuery(sql, callback) {
  logger.debug('FETCHING');
  getDatabase(function(err, db){
    if (err) {
      callback(err);
    } else {
      reserve(db, function(err, connobj, conn) {
        if (err) {
          callback(err);
        } else {
          conn.createStatement(function(err, statement) {
            if (err) {
              release(db, connobj, err, null, callback);
            } else {
              statement.executeQuery(sql, function(err, resultset) {
                if (err) {
                  release(db, connobj, err, null, callback);
                } else {
                  resultset.toObjArray(function(err, results) {
                    if (err) {
                      release(db, connobj, err, null, callback);
                    } else {
                      release(db, connobj, null, results, callback);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};

// Sql is a string with placeholders for the values of parameters. (eg. ':foo:', ':bar:')
// Parameters should be an object with the placeholders in query as keys and the value to be replaced as the value.
// NOTE: all occurences of same parameter will be replaced with same value.
// NOTE: Parameters must start and end with a delimiter such as ':'. Replacement happens using regex and does not check for complete words. Thus, if :foo = val, 'this is :foo :foobar' => 'this is val valbar'.
// NOTE: Avoid this kind of Replacement using ':foo:' instead of ':foo' as parameter.
function executeParameterizedQuery(sql, parameters, callback) {
  sql = stringHelpers.replaceAllParameters(sql, parameters);
  executeQuery(sql, callback);
}

exports.executeQuery = executeQuery;
exports.executeParameterizedQuery = executeParameterizedQuery;
