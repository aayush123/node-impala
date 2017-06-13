## node-impala POC

This project connects a Kerberized Impala cluster from Node.js application using JDBC (node-jdbc).

### Setup

You would need to generate a keytab file from the Kerberized environment to authenticate against Kerberos. If you are not using Kerberos, set AuthMech=NoSasl in the connection string.
Also, a 'gss-jaas.conf' file is required. It contains the login authentication configurations.
Once keytab has been generated, update the path in 'gss-jaas.conf' to point to the generated keytab.


Now run the following commands:
```bash
npm install
npm start
```

*Note: An error might be encountered while npm tries to run node-gyp command during jdbc install.
If that is the case, run:
```bash
npm install --global --production windows-build-tools
npm install --global node-gyp
```*

Happy Hacking!
