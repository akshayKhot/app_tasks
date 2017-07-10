console.log("Hello World");
$.getJSON("http://localhost:3000/api/tasks/10072017", tasks => {
    // _.forEach(tasks, task => {
    //     $(".task").append("<h4>task</h4>");
    // })

    $(".task").each(index => {
        $(this).text("Hi");
    });
});