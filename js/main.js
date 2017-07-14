
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
	task: "Go for a walk",
	deadline: "5.30 am",
    date: "14072017"
};

$("#submitBtn").click(function() {
    var taskValue = $("#taskInput").val();
    var deadlineValue = $("#deadlineInput").val();
    var dateValue = $("#dateInput").val();
    
    var taskObject = {
        task: taskValue,
        deadline: deadlineValue,
        date: moment(dateValue).format("DDMMYYYY")
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/tasks",
        data: JSON.stringify(taskObject),
        contentType: "application/json",
        dataType: "json"
    });

    $("form").trigger("reset");
    showFormBtn();
    hideForm();
});

$("#showFormBtn").click(function() {
    showForm();
    hideFormBtn();
})
$("#cancelBtn").click(function() {
    hideForm();
    showFormBtn();
})

function showForm() {
    $("form").css("visibility", "visible");
}
function hideForm() {
    $("form").css("visibility", "hidden");
}
function showFormBtn() {
    $("#showFormBtn").css("visibility", "visible");
}
function hideFormBtn() {
    $("#showFormBtn").css("visibility", "hidden");
}