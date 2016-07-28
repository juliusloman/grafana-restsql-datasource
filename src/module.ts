import {RestSQLDatasource} from './datasource';
import {RestSQLQueryCtrl} from './query_ctrl';

class RestSQLConfigCtrl {
  static templateUrl = 'partials/config.html';
}

export {
  RestSQLDatasource as Datasource,
  RestSQLQueryCtrl as QueryCtrl,
  RestSQLConfigCtrl as ConfigCtrl
};
