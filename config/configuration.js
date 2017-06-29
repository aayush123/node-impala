var impalaConfigurations = {
  url: 'jdbc:impala://tplhc01d049.iuser.iroot.adidom.com:21050/HAASBET0102_06635;AuthMech=1;KrbServiceName=impala;KrbHostFQDN=Tplhc01d049',
  drivername: 'com.cloudera.impala.jdbc41.Driver',
  minpoolsize: 1,
  // maxpoolsize: 20,
  maxidle: 60*60*1000
};

var appConfig = {
  pathToGssJaasConfig: '.\\config\\gss-jaas.conf',
  impalaDriversArray: [
    './drivers/ImpalaJDBC41-2.5.30.jar',
    './drivers/TCLIServiceClient-2.5.30.jar',
    './drivers/libthrift-0.9.0.jar',
    './drivers/slf4j-api-1.5.11.jar',
    './drivers/slf4j-log4j12-1.5.11.jar',
    './drivers/log4j-1.2.14.jar'
  ],
  pathToLogFile: './logs/node-impala-log.log',
  port: 3000
}

module.exports = {
  impalaConfigurations: impalaConfigurations,
  appConfig: appConfig
};
