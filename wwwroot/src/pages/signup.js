import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class Signup {
    constructor() {
        this.name = "";
        this.username = "";
        this.email = "";
        this.password = "";
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
        });
    }
    
}