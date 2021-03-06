var dao = require('./DbOperations');
var logger = require('./Logs/Logger');
var app = require('express')();
var appConfig = require('./config/configuration').appConfig;

var sql = 'select * from ag_test';

app.get('/', function(req, res){
  dao.executeQuery(sql, function(err, results){
    if (err) {
      res.send(err);
    } else {
      res.send(results);
    }
  })
})

dao.initializeDB(function(err, success){
  if (err) {
    logger.error(err);
    logger.error('Database initialiation failed');
  } else {
    logger.info('Database initialized');
    app.listen(appConfig.port, function (err) {
      if (!err) {
        logger.debug('Server listening on port ' + appConfig.port);
      }
    });
  }
})
