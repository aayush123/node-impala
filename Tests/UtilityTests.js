var logger = require('../Logs/logger');
var stringHelpers = require('../utility/StringHelpers');

function parameterReplacementTest(){
  var sql = 'Testing :foo: :bar: :foofoo: :bar:';
  var parameters = {
    ':foo:': 'foo',
    ':bar:': 'bar',
    ':foofoo:': 'foo2'
  }

  sql = stringHelpers.replaceAllParameters(sql, parameters);
  logger.debug(sql);
}

parameterReplacementTest();
