var jinst = require('jdbc/lib/jinst');

exports.startJvm = function () {
  if (!jinst.isJvmCreated()) {
    console.log('Starting JVM');
    jinst.addOption("-Xrs");
    //jinst.addOption("-Djavax.security.auth.spi=com.sun.security.auth.module.Krb5LoginModule");
    jinst.addOption("-Dsun.security.krb5.debug=true");
    jinst.addOption("-Djava.security.auth.login.config=C:\\Users\\611102582\\Documents\\nodeimpala\\config\\gss-jaas.conf");
    //.addOption("-Dsun.security.krb5.debug=C://Users//Public//Documents//Work//workspace//FTTPDashboard//krb5.ini");

    jinst.setupClasspath([
      './drivers/hive_metastore-2.5.30.jar',
      './drivers/hive_service-2.5.30.jar',
      './drivers/ImpalaJDBC41-2.5.30.jar',
      './drivers/ql-2.5.30.jar',
      './drivers/TCLIServiceClient-2.5.30.jar',
      './drivers/libfb303-0.9.0.jar',
      './drivers/libthrift-0.9.0.jar',
      './drivers/httpclient-4.1.3.jar',
      './drivers/httpcore-4.1.3.jar',
      './drivers/hive-jdbc-0.9.0.jar',
      './drivers/hive-common-0.9.0.jar',
      './drivers/slf4j-log4j12-1.5.11.jar',
      './drivers/slf4j-api-1.5.11.jar',
      './drivers/log4j-1.2.14.jar'
    ]);
  } else {
    console.log("JVM already running.");
  }
};
