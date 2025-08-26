$(document).ready(function () {
 
  $(".sortable-column").sortable({
    connectWith: ".sortable-column",
    placeholder: "ui-sortable-placeholder",
    revert: true
  }).disableSelection();

  function createTaskElement(text) {
    const li = $("<li>").addClass("task");
    const span = $("<span>").text(text).addClass("task-text");
    const editBtn = $("<button>").addClass("edit-btn").text("Edit");
    const deleteBtn = $("<button>").addClass("delete-btn").text("Delete");

    li.append(span, editBtn, deleteBtn);


    deleteBtn.click(function () {
      li.remove();
    });


    editBtn.click(function () {
      const currentText = span.text().trim();
      const input = $("<input>").val(currentText).addClass("edit-input");
      const saveBtn = $("<button>").text("Save");

      li.empty().append(input, saveBtn, deleteBtn);

      saveBtn.click(function () {
        const updatedText = input.val().trim();
        if (updatedText !== "") {
          const updatedTask = createTaskElement(updatedText);
          li.replaceWith(updatedTask);
        } else {
          li.remove(); 
        }
      });
    });

    return li;
  }

  
  $("#add-task").click(function () {
    const taskText = $("#new-task").val().trim();
    if (taskText !== "") {
      const newTask = createTaskElement(taskText);
      $("#todo").append(newTask);
      $("#new-task").val("");
    }
  });


  $("#new-task").keypress(function (e) {
    if (e.which === 13) {
      $("#add-task").click();
    }
  });

  $(".task").each(function () {
    const originalText = $(this).clone().children().remove().end().text().trim();
    const newTask = createTaskElement(originalText);
    $(this).replaceWith(newTask);
  });
});
