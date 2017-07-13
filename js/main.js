
var currentDate = moment().format("DDMMYYYY");

$.getJSON(`http://localhost:3000/api/tasks/${currentDate}`, tasks => {

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
	task: "Be stable",
	deadline: "5 am"
};
console.log(JSON.stringify(task));

$.post("http://localhost:3000/api/tasks", JSON.stringify(task), (data) => {
    console.log(data);
})
