console.log("Hello World");
$.getJSON("http://localhost:3000/api/tasks/10072017", tasks => {
    $(".task").each(function(index) {
        $(this).html("<h4>" + tasks[index].task + "</h4>");
    });
    $(".dl").each(function(index) {
        $(this).html("<h4>" + tasks[index].date + "</h4>");
    });
});