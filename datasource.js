System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RestSQLDatasource;
    return {
        setters:[],
        execute: function() {
            RestSQLDatasource = (function () {
                function RestSQLDatasource(instanceSettings, $q, backendSrv, templateSrv) {
                    this.$q = $q;
                    this.backendSrv = backendSrv;
                    this.templateSrv = templateSrv;
                    this.URI_RESOURCE = "/res/";
                    this.URI_METADATA = "/conf/metadata/";
                    this.type = instanceSettings.type;
                    this.url = instanceSettings.url;
                    this.name = instanceSettings.name;
                    this.q = $q;
                }
                RestSQLDatasource.prototype.testDatasource = function () {
                    return this.restSQLRequest('URI_RESOURCE').then(function (response) {
                        if (response.status === 200) {
                            return {
                                status: "success",
                                message: "OK: RestSQL datasource seems to be available",
                                title: "Success"
                            };
                        }
                        else {
                            return {
                                status: "failure",
                                message: "Could not connect to datasource. HTTP status code: " + response.status,
                                title: "Success"
                            };
                        }
                    }, function (response) {
                        return {
                            status: "failure",
                            message: "Could not connect to datasource" + response.status,
                            title: "Failure"
                        };
                    });
                };
                RestSQLDatasource.prototype.restSQLRequest = function (uri) {
                    console.log("Doing RestSQL request : " + uri);
                    return this.backendSrv.datasourceRequest({
                        url: this.url + uri,
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    }).then(function (result) {
                        return result;
                    }, function (err) {
                        if (err.status !== 0 || err.status >= 300) {
                            throw { message: 'RestSQL Error: ' + err.data };
                        }
                    });
                };
                RestSQLDatasource.prototype.buildRestSQLURL = function (resource, timeColumn, range) {
                    return this.URI_RESOURCE + resource + "?" + timeColumn + "=>=" + range.from.local().format('YYYY-MM-DDTHH:mm:ss.SSS') + "&" + timeColumn + "=<=" + range.to.local().format('YYYY-MM-DDTHH:mm:ss.SSS');
                };
                RestSQLDatasource.prototype.getResources = function () {
                    return this.restSQLRequest(this.URI_RESOURCE).then(function (response) {
                        if (response.status === 200) {
                            var regex = /<tr><td>(.*?)<\/td>/g, resources = [], matches;
                            while (matches = regex.exec(response.data)) {
                                resources.push(matches[1]);
                            }
                            return resources;
                        }
                        else {
                            return null;
                        }
                    });
                };
                RestSQLDatasource.prototype.getResourceColumns = function (resource) {
                    return this.restSQLRequest(this.URI_METADATA + resource).then(function (response) {
                        if (response.status === 200) {
                            var regex = /columnLabel="(.*?)"/g, columns = [], matches;
                            while (matches = regex.exec(response.data)) {
                                columns.push(matches[1]);
                            }
                            return columns;
                        }
                    });
                };
                RestSQLDatasource.prototype.query = function (options) {
                    var ds = this;
                    var theQueryResult;
                    var theRequests = options.targets.map(function (eachTarget) {
                        return ds.restSQLRequest(ds.buildRestSQLURL(eachTarget.resource, eachTarget.timeColumn, options.range)).then(function (response) {
                            var datapoints = [];
                            if (response.data[eachTarget.resource + '_datas'] != undefined) {
                                datapoints = response.data[eachTarget.resource + '_datas'].map(function (eachItem) {
                                    return [eachItem[eachTarget.dataColumn], new Date(eachItem[eachTarget.timeColumn]).getTime()];
                                });
                            }
                            return {
                                "target": eachTarget.refId,
                                "datapoints": datapoints
                            };
                        });
                    });
                    theQueryResult = this.q.all(theRequests).then(function (response) {
                        return {
                            "data": response.map(function (eachRequestResult) {
                                var theDataPoints = [];
                                eachRequestResult.datapoints.map(function (eachItem) {
                                    if ((typeof eachItem[0] !== 'undefined') &&
                                        (typeof eachItem[1] !== 'undefined')) {
                                        theDataPoints.push([eachItem[0], eachItem[1]]);
                                    }
                                });
                                theDataPoints.sort(function (a, b) {
                                    return a[1] - b[1];
                                });
                                return {
                                    "target": eachRequestResult.target,
                                    "datapoints": theDataPoints
                                };
                            })
                        };
                    });
                    return theQueryResult;
                };
                return RestSQLDatasource;
            }());
            exports_1("RestSQLDatasource", RestSQLDatasource);
        }
    }
});
