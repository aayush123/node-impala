var config = {
  url: 'jdbc:impala://tplhc01d049.iuser.iroot.adidom.com:21050/HAASBET0102_06635;AuthMech=1;KrbServiceName=impala;KrbHostFQDN=Tplhc01d049',
  drivername: 'com.cloudera.impala.jdbc41.Driver',
  minpoolsize: 1,
  maxidle: 60*60*1000
  // maxpoolsize: 20,
  // keepalive: {
  //   interval: 30*1000,
  //   query: 'select 1',
  //   enabled: true
  // }
};

module.exports = config;
