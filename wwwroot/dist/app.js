System.register([], function (_export, _context) {
  "use strict";

  var App;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _export('App', App = function () {
        function App() {
          _classCallCheck(this, App);
        }

        App.prototype.configureRouter = function configureRouter(config, router) {
          this.router = router;
          config.title = 'Aurelia';
          config.map([{ route: ['', 'home', 'welcome'], name: 'home', moduleId: 'pages/home', nav: true, title: 'Home' }, { route: 'tasks', name: 'tasks', moduleId: 'pages/tasks', nav: true, title: 'Tasks' }, { route: 'addTask', name: 'addtask', moduleId: 'pages/addTask', nav: true, title: 'Add' }]);
        };

        return App;
      }());

      _export('App', App);
    }
  };
});
//# sourceMappingURL=app.js.map
