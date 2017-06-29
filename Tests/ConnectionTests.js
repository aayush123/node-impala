var dao = require('../DbOperations');
var logger = require('../Logs/Logger');
var app = require('express')();

dao.initializeDB(function(err, success){
  if (err) {
    logger.error(err);
    logger.error('Database initialiation failed');
  } else {
    logger.info('Database initialized');
    // SingleQueryTest();
    // timedQueryTest(30);
    // ParameterizedQueryTest();
    createTableTest();
  }
})

function createTableTest() {
  var sql = "Create table Node_test(test string)";
  dao.executeStatement(sql, function(err, updateCount) {
    if (err) {
      logger.error(err);
    } else {
      logger.debug(updateCount);
    }
  })
}

function timedQueryTest(intervalDurationInMinutes) {
  var sql = 'select * from ag_test';
  setInterval(
    function(){
      dao.executeQuery(sql, function(err, resultset) {
        if (err) {
          logger.error('Query Execution Failed at: '+Date());
          logger.error(err);
        } else {
          logger.info('Query exection succeeded at: '+ Date());
          logger.debug(resultset);
        }
      });
    }, 1000*60*intervalDurationInMinutes
  )
}

function SingleQueryTest() {
  var sql = 'select 1 as test';
  dao.executeOneResultQuery(sql, function(err, resultset) {
    if (err) {
      logger.error('Query Execution Failed at: '+Date());
      logger.error(err);
    } else {
      logger.info('Query exection succeeded at: '+ Date());
      logger.debug(resultset);
      console.log(resultset);
    }
  });
}

function ParameterizedQueryTest() {
  var sql = 'Select :col: from :table:';
  var parameters = {
    ':col:': 'id',
    ':table:': 'ag_test'
  }
  dao.executeParameterizedQuery(sql, parameters, function(err, resultset) {
    if (err) {
      logger.error(err);
    } else {
      logger.debug(resultset);
    }
  })
}
