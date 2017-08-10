System.register(["aurelia-fetch-client"], function (_export, _context) {
    "use strict";

    var HttpClient, json, client, Signin;

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

            _export("Signin", Signin = function () {
                function Signin() {
                    _classCallCheck(this, Signin);

                    this.userLoggedIn = false;
                    this.username = "";
                    this.password = "";
                }

                Signin.prototype.signin = function signin() {
                    var _this = this;

                    var credentials = {
                        username: this.username,
                        password: this.password
                    };

                    client.fetch("/login", {
                        method: 'post',
                        body: json(credentials)
                    }).then(function (response) {
                        return response.json();
                    }).then(function (result) {
                        if (result.message == "success") {
                            _this.loginError = false;
                            _this.userLoggedIn = true;
                        } else if (result.message == "failed") _this.loginError = true;
                    });
                };

                return Signin;
            }());

            _export("Signin", Signin);
        }
    };
});
//# sourceMappingURL=signin.js.map
