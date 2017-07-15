import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class App {
    
    constructor() {
        this.currentDate = moment().format("DDMMYYYY");
        this.formVisible = false;
    }
    
    activate() {
        this.getAndDisplayTasks();
    }

    showForm() {
        this.formVisible = true;
    }
    hideForm() {
        this.formVisible = false;
    }
    saveTask() {

        var task = {
            task: $("#taskInput").val(),
            deadline: $("#deadlineInput").val(),
            date: moment($("#dateInput").val()).format("DDMMYYYY")
        }

        client
            .fetch(`http://localhost:3000/api/tasks/`, {
                method: 'post',
                body: json(task)
            })
            .catch(error => {
                alert('Error saving comment!');
            });
        this.hideForm();
    }
    updateTask(task) {
        client
            .fetch(`http://localhost:3000/api/tasks/${task.task_id}`, {
                method: 'put',
                body: json(task)
            })
            .catch(error => {
                alert('Error saving comment!');
            });
    }

    prevDate() {
        this.currentDate = moment(this.currentDate, "DDMMYYYY").subtract(1, 'day').format("DDMMYYYY");
        this.getAndDisplayTasks();
    }
    nextDate() {
        this.currentDate = moment(this.currentDate, "DDMMYYYY").add(1, 'day').format("DDMMYYYY");
        this.getAndDisplayTasks();
    }
    
    getAndDisplayTasks() {
        this.formattedDate = moment(this.currentDate, "DDMMYYYY").format("MMMM DD, YYYY");
        client.fetch(`http://localhost:3000/api/tasks/${this.currentDate}`)
            .then(response => response.json())
            .then(tasks => {
                this.tasks = tasks;
            });
    }

}


