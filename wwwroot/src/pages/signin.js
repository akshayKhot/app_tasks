import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class Signin {
    
    constructor() {
        this.userLoggedIn = false;
        this.username = "";
        this.password = "";
    }

    signin() {
        var credentials = {
            username: this.username,
            password: this.password,
        };

        client.fetch(`/login`, {
            method: 'post',
            body: json(credentials)
        }).then(response => response.json())
        .then(result => {
            if(result.message == "success")
                this.userLoggedIn = true;
        });
    }
}