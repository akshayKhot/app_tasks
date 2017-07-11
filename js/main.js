console.log("Hello World");
$.getJSON("http://localhost:3000/api/tasks/10072017", tasks => {

    var dateString = tasks[0].date;
    var formattedDate = moment(dateString, "DDMMYYYY").format("MMMM Do YYYY");
    $("#date").html(formattedDate);

    $(".task").each(function(index) {
        $(this).html("<h4>" + tasks[index].task + "</h4>");
    });
    $(".dl").each(function(index) {    
        $(this).html("<h4>" + tasks[index].deadline + "</h4>");
    });
});