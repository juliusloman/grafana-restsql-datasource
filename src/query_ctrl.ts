///<reference path="./common.d.ts" />

import angular from 'angular';
import _ from 'lodash';

export class RestSQLQueryCtrl {

  static templateUrl = 'partials/query.editor.html';

  private testFilter;
  target: any;
  datasource: any;
  panelCtrl: any;
  panel: any;
  segmentSrv: any;

  constructor($scope, $injector, private uiSegmentSrv, private templateSrv) {
    this.panel = this.panelCtrl.panel;
    this.segmentSrv = uiSegmentSrv;

    this.refreshResources();
  }

  refreshResources() {
    var t = this.target;
    this.datasource.getResources().then(function(result) {
      t.resourceList = result;
    });
  }

  switchResource(newResource: string) {
    var t = this.target;
    console.log("Switching resource to "+newResource);
    this.datasource.getResourceColumns(newResource).then(function (result) {
      t.columnList = result;
    });
  }

  onChangeInternal() {
    console.log("onChangeInternal")
  }

  refresh() {
    this.panelCtrl.refresh();
  }


}
