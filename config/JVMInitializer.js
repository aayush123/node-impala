var jinst = require('jdbc/lib/jinst');
var path = require('path');
var appConfig = require('./configuration').appConfig;
exports.startJvm = function () {
  if (!jinst.isJvmCreated()) {
    console.log('Starting JVM');
    jinst.addOption("-Xrs");
    jinst.addOption("-Dsun.security.krb5.debug=true");
    jinst.addOption("-Djava.security.auth.login.config=" + path.resolve(appConfig.pathToGssJaasConfig));

    jinst.setupClasspath(appConfig.impalaDriversArray);
  } else {
    console.log("JVM already running.");
  }
};
