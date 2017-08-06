System.register(["aurelia-fetch-client"], function (_export, _context) {
    "use strict";

    var HttpClient, json, client, AddTask;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_aureliaFetchClient) {
            HttpClient = _aureliaFetchClient.HttpClient;
            json = _aureliaFetchClient.json;
        }],
        execute: function () {
            client = new HttpClient();

            _export("AddTask", AddTask = function () {
                function AddTask() {
                    _classCallCheck(this, AddTask);

                    this.taskName = "";
                    this.deadline = "";
                }

                AddTask.prototype.saveTask = function saveTask() {
                    var task = {
                        task: this.taskName,
                        deadline: this.deadline
                    };
                    client.fetch("http://localhost:3000/api/tasks/", {
                        method: 'post',
                        body: json(task)
                    });
                };

                return AddTask;
            }());

            _export("AddTask", AddTask);
        }
    };
});
//# sourceMappingURL=addTask.js.map
