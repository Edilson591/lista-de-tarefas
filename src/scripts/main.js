$(document).ready(() => {
  let allTask = [];
  let usuarios = [];

  $("#formTaks").on("submit", (e) => {
    e.preventDefault();

    let newUser = $("#NameUser").val() || "Anônimo";
    const newTask = $("#taskAdd").val();
    const tasks = $(".list-task ul");

    if (allTask.includes(newTask)) {
      alert("Tarefa já incluída");
      return;
    }

    usuarios.push(newUser);
    allTask.push(newTask);

    $(`
        <li class="taskslist">
            <div class="tasksUser" data-visible="true">
              <div class="userConteiner">
                <h3 id="selectUser">${newUser}</h3>
                <input type="text" class="editUser" placeholder="pressiona enter para confirma">
              </div>
              <div class="tasksContainer">
                <p id="selectTask">${newTask}</p>
                <input type="text" class="editTask" placeholder="pressiona enter para confirma" maxlength="40" required>
              </div>
              <div class="btn-option">
                <button class="btn-Editar">Editar</button>
                <button class="btn-remove">Remover</button>
              </div>
            </div>
        </li>
    `).appendTo(tasks);

    $(".list-task ul li .tasksUser:even").addClass("toggle-background");

    $("#NameUser").val("");
    $("#taskAdd").val("");
    $("#NameUser").focus();

    let lineOn = true;
    
    $(".list-task ul li p").each(function (_, e) {
      $(e).click(() => {
        const removeLine = $(e).closest(".tasksUser").find(".editTask").css('display') === 'none';    
          if(lineOn && removeLine) {
            $(e).addClass("line-on");
            lineOn = !lineOn;
          }else {
            $(e).removeClass("line-on");
            lineOn = true;
          }
      });
    });

    $(".btn-remove").each((_, e) => {
      $(e).on("click", () => {
        const selectTask = $(e).closest(".tasksUser").find("p").text();
        const indexTask = allTask.indexOf(selectTask);
        if (indexTask > -1) {
          allTask.splice(indexTask, 1);
        }
        $(e).closest(".taskslist").remove();
      });
    });

 

    $(".btn-Editar").each((_, e) => {
      $(e).on("click", () => {
        const taskUser = $(e).closest(".tasksUser");
        const editUser = taskUser.find(".editUser");
        const editTask = taskUser.find(".editTask");
        const selectTask = taskUser.find("#selectTask");
        const visible = taskUser.data("visible") === "true";
        
        if (visible) {
          editUser.show().focus();
          editTask.show();
          taskUser.data("visible", "false");
          $(selectTask).removeClass("line-on");
        } else {
          taskUser.data("visible", "true");
        }
      });
    });

    function removeTasksRepeat(users,tasks,editUser,editTask) {
      const setUser = users.text();
      const setTasks= tasks.text();
      const textUser = editUser.val();
      const textTask = editTask.val();
      const setIndexUser = usuarios.indexOf(setUser);
      const setIndexTask = usuarios.indexOf(setTasks);
      usuarios.splice(setIndexUser,1,textUser);
      allTask.splice(setIndexTask,1,textTask);
    }


    $(".editUser,.editTask").on("keydown", function (e) {

      if (e.keyCode === 13) {
        
        const taskUser = $(this).closest(".tasksUser");
        const editUser = taskUser.find(".editUser");
        const editTask = $(this);
        const users = taskUser.find("h3");
        const tasks = taskUser.find("p");

        if(editTask.val() === "") {return}
        users.text(editUser.val() || "Anônimo");
        tasks.text(editTask.val());
        removeTasksRepeat(users,tasks,editUser,editTask);
        editUser.hide();
        editTask.hide();
        taskUser.data("visible", "true");
      }
    });

  });

  $("#resetButton").on("click", () => {
    allTask.length = 0;
    usuarios.length = 0;
    $(".list-task ul").empty();
    $("#NameUser").val("");
    $("#taskAdd").val("");
    $("#NameUser").focus();
  });
});
