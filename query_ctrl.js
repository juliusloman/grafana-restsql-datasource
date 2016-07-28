System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var RestSQLQueryCtrl;
    return {
        setters:[],
        execute: function() {
            RestSQLQueryCtrl = (function () {
                function RestSQLQueryCtrl($scope, $injector, uiSegmentSrv, templateSrv) {
                    this.uiSegmentSrv = uiSegmentSrv;
                    this.templateSrv = templateSrv;
                    this.panel = this.panelCtrl.panel;
                    this.segmentSrv = uiSegmentSrv;
                    this.refreshResources();
                }
                RestSQLQueryCtrl.prototype.refreshResources = function () {
                    var t = this.target;
                    this.datasource.getResources().then(function (result) {
                        t.resourceList = result;
                    });
                };
                RestSQLQueryCtrl.prototype.switchResource = function (newResource) {
                    var t = this.target;
                    console.log("Switching resource to " + newResource);
                    this.datasource.getResourceColumns(newResource).then(function (result) {
                        t.columnList = result;
                    });
                };
                RestSQLQueryCtrl.prototype.onChangeInternal = function () {
                    console.log("onChangeInternal");
                };
                RestSQLQueryCtrl.prototype.refresh = function () {
                    this.panelCtrl.refresh();
                };
                RestSQLQueryCtrl.templateUrl = 'partials/query.editor.html';
                return RestSQLQueryCtrl;
            }());
            exports_1("RestSQLQueryCtrl", RestSQLQueryCtrl);
        }
    }
});
