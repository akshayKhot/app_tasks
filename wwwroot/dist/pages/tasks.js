System.register(['lodash', 'jquery', 'moment', 'aurelia-fetch-client'], function (_export, _context) {
    "use strict";

    var _, $, moment, HttpClient, json, client, Tasks;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_lodash) {
            _ = _lodash;
        }, function (_jquery) {
            $ = _jquery.default;
        }, function (_moment) {
            moment = _moment.default;
        }, function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
            json = _aureliaFetchClient.json;
        }],
        execute: function () {
            client = new HttpClient();

            _export('Tasks', Tasks = function () {
                function Tasks() {
                    _classCallCheck(this, Tasks);

                    this.greeting = "Hello World";
                }

                Tasks.prototype.activate = function activate() {
                    var _this = this;

                    client.fetch('http://localhost:3000/api/tasks/').then(function (response) {
                        return response.json();
                    }).then(function (tasks) {
                        _this.tasks = tasks;
                    });
                };

                return Tasks;
            }());

            _export('Tasks', Tasks);
        }
    };
});
//# sourceMappingURL=tasks.js.map
