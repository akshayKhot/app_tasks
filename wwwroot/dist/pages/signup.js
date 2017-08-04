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
                function Signup() {
                    _classCallCheck(this, Signup);

                    this.name = "";
                    this.username = "";
                    this.email = "";
                    this.password = "";
                }

                Signup.prototype.signup = function signup() {
                    var user = {
                        name: this.name,
                        username: this.username,
                        email: this.email,
                        password: this.password
                    };

                    client.fetch("http://localhost:3000/api/user/new", {
                        method: 'post',
                        body: json(user)
                    });
                };

                return Signup;
            }());

            _export("Signup", Signup);
        }
    };
});
//# sourceMappingURL=signup.js.map
