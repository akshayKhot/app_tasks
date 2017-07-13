
var currentDate = moment().format("DDMMYYYY");

$.getJSON(`http://localhost:3000/api/tasks/10072017`, tasks => {

    var dateString = tasks[0].date;
    var formattedDate = moment(dateString, "DDMMYYYY").format("MMMM DD, YYYY");
    $("#date").html(formattedDate);

    _.forEach(tasks, t => {
        $("tbody").append(`<tr>
                                <td class='text-center'> ${t.task} </td>
                                <td class='text-center'> ${t.deadline} </td>
                                <td class='text-center'> 
                                    <input type="checkbox" ${t.completed ? checked : ''}> 
                                </td>
                            </tr>`);
    })
});

var task = {
	task: "Do something",
	deadline: "5 am"
};

$.post("http://localhost:3000/api/tasks", task, (data) => {
    console.log(data);
}, "json")

$.ajax({
  type: "POST",
  url: "http://localhost:3000/api/tasks",
  data: JSON.stringify(task),
  contentType: "application/json",
  success: (data) => {
    console.log(data);
  },
  dataType: "json"
});