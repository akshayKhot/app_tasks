import * as _ from 'lodash';
import moment from 'moment';
import {HttpClient} from 'aurelia-fetch-client';

let client = new HttpClient();

export class App {
    
    constructor() {
        this.currentDate = moment().format("DDMMYYYY");
        this.formattedDate = moment().format("MMMM DD, YYYY");
        this.formVisible = false;
    }
    
    activate() {
        client.fetch(`http://localhost:3000/api/tasks/${this.currentDate}`)
            .then(response => response.json())
            .then(tasks => {
                this.tasks = tasks;
            });
    }

    showForm() {
        this.formVisible = true;
    }
    hideForm() {
        this.formVisible = false;
    }
    saveTask() {
        //make db call
        this.hideForm();

    }
}
