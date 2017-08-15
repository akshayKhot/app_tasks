import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class AddTask {
    
    constructor() {
        this.taskName = "";
        this.deadline = "";
    }

    saveTask() {
        var task = {
            task: this.taskName,
            deadline: this.deadline
        };
        client
            .fetch(`http://localhost:3000/api/tasks/`, {
                method: 'post',
                body: json(task)
            });
        this.taskName = "";
        this.deadline = "";
    }
}