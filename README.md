# RestSQL datasource for Grafana

This datasource displays metric data from any SQL databases using RestSQL (http://www.restsql.org).
RestSQL enables CRUD operations using REST methods.

# Installation

## RestSQL

* Install Tomcat application server
* Download RestSQL war file from http://restsql.org/download/restsql-war.html and place the war file to webapps directory
* Configure your datasources in RestSQL

Database configuration is done in restsql.properties (set at least sqlresources.dir and the database.* properties );

Sample resource configuration:

```xml
<rs:sqlResource xmlns:rs="http://restsql.org/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://restsql.org/schema SqlResource.xsd ">
  <query>select metric, timestamp from mytable</query>
  <metadata>
  <database default="mydb"/>
  <table name="mytable" role="Parent"/>
  </metadata>
</rs:sqlResource>
```


## Grafana plugin

* Copy datasource files to Grafana's plugins/datasources directory.
* Restart Grafana
* Configure your datasource. URL is your RestSQL base URL (typically http://localhost:8080/restsql )
