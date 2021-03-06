System.register(['./datasource', './query_ctrl'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var datasource_1, query_ctrl_1;
    var RestSQLConfigCtrl;
    return {
        setters:[
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            },
            function (query_ctrl_1_1) {
                query_ctrl_1 = query_ctrl_1_1;
            }],
        execute: function() {
            RestSQLConfigCtrl = (function () {
                function RestSQLConfigCtrl() {
                }
                RestSQLConfigCtrl.templateUrl = 'partials/config.html';
                return RestSQLConfigCtrl;
            }());
            exports_1("Datasource", datasource_1.RestSQLDatasource);
            exports_1("QueryCtrl", query_ctrl_1.RestSQLQueryCtrl);
            exports_1("ConfigCtrl", RestSQLConfigCtrl);
        }
    }
});
