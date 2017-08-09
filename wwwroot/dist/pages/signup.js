System.register(["aurelia-fetch-client"], function (_export, _context) {
    "use strict";

    var HttpClient, json, client, Signup;

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

            _export("Signup", Signup = function () {
                Signup.prototype.attached = function attached() {
                    this.errorsOnPage = false;
                };

                function Signup() {
                    _classCallCheck(this, Signup);

                    this.name = "";
                    this.username = "";
                    this.email = "";
                    this.password = "";

                    this.isSignUp = true;
                    this.success = false;
                    this.errorsOnPage = false;
                }

                Signup.prototype.signup = function signup() {
                    var _this = this;

                    var user = {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: this.password
                    };

                    client.fetch("http://localhost:3000/api/user/new", {
                        method: 'post',
                        body: json(user)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        if (result.status == "Success") {
                            _this.isSignUp = false;
                            _this.errorsOnPage = false;
                            _this.username = result.username;
                        } else if (result.status == "Error") {
                            _this.errorsOnPage = true;
                        }
                    });
                };

                return Signup;
            }());

            _export("Signup", Signup);
        }
    };
});
//# sourceMappingURL=signup.js.map
