System.register(['lodash', 'jquery', 'moment', 'aurelia-fetch-client'], function (_export, _context) {
    "use strict";

    var _, $, moment, HttpClient, json, client, App;

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

            _export('App', App = function () {
                function App() {
                    _classCallCheck(this, App);

                    this.currentDate = moment().format("DDMMYYYY");
                    this.formVisible = false;
                }

                App.prototype.activate = function activate() {
                    this.getAndDisplayTasks();
                };

                App.prototype.showForm = function showForm() {
                    this.formVisible = true;
                };

                App.prototype.hideForm = function hideForm() {
                    this.formVisible = false;
                    this.isEditing = false;
                };

                App.prototype.saveTask = function saveTask() {
                    var _this = this;

                    var task = {
                        task: $("#taskInput").val(),
                        deadline: $("#deadlineInput").val(),
                        date: moment($("#dateInput").val()).format("DDMMYYYY")
                    };

                    client.fetch('http://localhost:3000/api/tasks/', {
                        method: 'post',
                        body: json(task)
                    }).then(function () {
                        _this.getAndDisplayTasks();
                    }).catch(function (error) {
                        alert('Error saving comment!');
                    });
                    this.hideForm();
                };

                App.prototype.updateTask = function updateTask(task) {
                    client.fetch('http://localhost:3000/api/tasks/' + task.task_id, {
                        method: 'put',
                        body: json(task)
                    }).catch(function (error) {
                        alert('Error saving comment!');
                    });
                };

                App.prototype.prevDate = function prevDate() {
                    this.currentDate = moment(this.currentDate, "DDMMYYYY").subtract(1, 'day').format("DDMMYYYY");
                    this.getAndDisplayTasks();
                };

                App.prototype.nextDate = function nextDate() {
                    this.currentDate = moment(this.currentDate, "DDMMYYYY").add(1, 'day').format("DDMMYYYY");
                    this.getAndDisplayTasks();
                };

                App.prototype.getAndDisplayTasks = function getAndDisplayTasks() {
                    var _this2 = this;

                    this.formattedDate = moment(this.currentDate, "DDMMYYYY").format("MMMM DD, YYYY");
                    client.fetch('http://localhost:3000/api/tasks/' + this.currentDate).then(function (response) {
                        return response.json();
                    }).then(function (tasks) {
                        _this2.tasks = tasks;
                    });
                };

                App.prototype.deleteTask = function deleteTask(task) {
                    var _this3 = this;

                    client.fetch('http://localhost:3000/api/tasks/' + task.task_id, {
                        method: 'delete',
                        body: json(task)
                    }).then(function () {
                        _this3.getAndDisplayTasks();
                    }).catch(function (error) {
                        alert('Error saving comment!');
                    });
                };

                App.prototype.editTask = function editTask(task) {
                    this.isEditing = true;
                    this.editing_id = task.task_id;
                    this.showForm();
                };

                App.prototype.modifyTask = function modifyTask() {
                    var _this4 = this;

                    var task = {
                        task_id: this.editing_id,
                        task: $("#taskInput").val(),
                        deadline: $("#deadlineInput").val(),
                        date: moment($("#dateInput").val()).format("DDMMYYYY"),
                        completed: false
                    };

                    client.fetch('http://localhost:3000/api/tasks/' + task.task_id, {
                        method: 'put',
                        body: json(task)
                    }).then(function () {
                        _this4.getAndDisplayTasks();
                    }).catch(function (error) {
                        alert('Error saving comment!');
                    });
                    this.hideForm();
                };

                return App;
            }());

            _export('App', App);
        }
    };
});
//# sourceMappingURL=app.js.map
