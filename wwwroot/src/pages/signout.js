import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class Signout {
    activate() {
        client.fetch(`http://localhost:3000/signout`)
            .then(response => response.json())
            .then(out => {
                this.message = out.message;
            });
    }
}