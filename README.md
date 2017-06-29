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

### Tests

The tests folder contains the various unit tests and would help in understanding the implementation of the code.

*Note: An error might be encountered while npm tries to run node-gyp command during jdbc install.
If that is the case, run:
```bash
npm install --global --production windows-build-tools
npm install --global node-gyp
```*

*Note: node-java-bridge module must be able to find the javac.exe executable. JDK1.8 is recommended, 1.7 might work too. Point JAVA_HOME to JDK folder.
Also, the module checks the registry for java development kit. HKEY_LOCAL_MACHINE must have a JavaSoft key under SOFTWARES under which Java development Kit key must be present, which itself should contain a key with name similar to the version of JDK installed.
So, for eg. the registry should look something like this:

HKEY_LOCAL_MACHINE
|-- JavaSoft
    |-- Java Development Kit
        |-- 1.8
            |-- JavaHome: <Path to JDK> (This is string value)
            |-- MicroVersion: 0 (String Value)
        |-- 1.8.0_91
            |-- INSTALLDIR: <Path to JDK> (String Value)*

Happy Hacking!
