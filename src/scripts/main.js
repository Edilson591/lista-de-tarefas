$(document).ready(() => {
  $("#formTaks").on("submit", (e) => {
    e.preventDefault();

    const newUser = $("#NameUser").val();
    const newTask = $("#taskAdd").val();
    const tasks = $(".list-task ol")
    $(`
        <li>
            <h3>${newUser}</h3>
            <p>${newTask}</p>
        </li>
    `).appendTo(tasks);

    $("#NameUser").val("");
    $("#taskAdd").val("");
    $("#NameUser").focus();
    
    let lineOn = true; 

    $(".list-task ol li p").each(function (i,e) {
        $(e).click(() => {
            if(lineOn) {
                $(e).addClass("line-on")
                lineOn = false;
            }else {
                $(e).removeClass("line-on")
                lineOn = true;
            }
          
        })
    });
    
});

});

