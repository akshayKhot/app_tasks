import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class App {
    
    constructor() {
        this.greeting = "Hello World";
    }

    activate() {
        client.fetch(`http://localhost:3000/api/tasks/`)
        .then(response => response.json())
        .then(tasks => {
            this.tasks = tasks;
        });
    }

}


