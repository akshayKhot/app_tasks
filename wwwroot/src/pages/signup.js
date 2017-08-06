import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class Signup {

    attached() {
        this.errorsOnPage = false;
    }

    constructor() {
        this.name = "";
        this.username = "";
        this.email = "";
        this.password = "";

        this.isSignUp = true;
        this.success = false;
        this.errorsOnPage = false;
    }

    
    signup() {
        var user = {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
        };

        client.fetch(`http://localhost:3000/api/user/new`, {
            method: 'post',
            body: json(user)
        }).then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.status == "Success") {
                this.isSignUp = false;
                this.errorsOnPage = false;
            } else if(result.status == "Error") {
                this.errorsOnPage = true;
            }
        });
    }
    
}