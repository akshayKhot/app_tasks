import * as _ from 'lodash';
import $ from 'jquery';
import moment from 'moment';
import {HttpClient, json} from 'aurelia-fetch-client';

let client = new HttpClient();

export class App {
    
    constructor() {
        this.greeting = "Hello World, how are you?";
        this.friendName = "";
    }

    activate() {
        this.getMovies();
    }

    addFriend() {
        client
            .fetch(`http://localhost:3000/addFriend`, {
                method: 'post',
                body: json({friend: this.friendName})
            }).then(() => {
                this.getFriends();
            })
            .catch(error => {
                alert('Error saving comment!');
            });
    }

    getMovies() {
        client.fetch(`http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb`)
            .then(response => response.json())
            .then(data => {
                this.movies = data.Search;
            });
    }
    
    

}


