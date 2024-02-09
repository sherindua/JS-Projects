let ticketData = localStorage.getItem("ticketData")
  ? JSON.parse(localStorage.getItem("ticketData"))
  : [];
let idcnt = localStorage.getItem("id")
  ? JSON.parse(localStorage.getItem("id"))
  : 0;

let title = "";
let desc = "";
let dueDate = "";
let priority = "None";
let taskStatus = "Todo";

let createBtn = document.querySelector(".create-btn");
let formEle = document.querySelector(".form-container");
let titleEle = document.querySelector("#title");
let descEle = document.querySelector("#description");
let dueDateEle = document.querySelector("#duedate");
let priorityEle = document.querySelector("#priority");
let taskStatusEle = document.querySelector("#status");
let form_TicketIDEle = document.querySelector(".task-id");
let ticketsContainerEle = document.querySelector(".tickets-container");

let editflag = false;

displayTickets();
createBtn.addEventListener("click", createTicket);

function createTicket(e) {
  let id = idcnt++;
  localStorage.setItem("id", JSON.stringify(idcnt));

  let ticketItem = {
    id: id,
    title: title,
    desc: desc,
    dueDate: dueDate,
    priority: priority,
    taskStatus: taskStatus,
  };

  ticketData.push(ticketItem);
  localStorage.setItem("ticketData", JSON.stringify(ticketData));
  displayTickets();
  hideForm();
}

function showForm() {
  formEle.style.display = "block";

  form_TicketIDEle.innerText = "TicketID:" + idcnt;

  titleEle.addEventListener("change", function (e) {
    title = e.currentTarget.value;
  });

  descEle.addEventListener("change", function (e) {
    desc = e.currentTarget.value;
  });

  dueDateEle.addEventListener("change", function (e) {
    dueDate = e.currentTarget.value;
  });

  priorityEle.addEventListener("change", function (e) {
    priority = e.currentTarget.value;
  });

  taskStatusEle.addEventListener("change", function (e) {
    taskStatus = e.currentTarget.value;
  });
}

function hideForm() {
  let formEle = document.querySelector(".form-container");
  formEle.style.display = "none";
  // reset current data and UI after creating ticket

  formEle.style.display = "none";
  titleEle.value = "";
  title = "";
  descEle.value = "";
  desc = "";
  dueDateEle.value = "";
  dueDate = "";
  priorityEle.value = "None";
  priority = "None";
  taskStatusEle.value = "Todo";
  taskStatus = "Todo";
}

function displayTickets() {
  let dragged = null; //to get e.current target while drag n drop
  let currentTicketRef = null; //to get current ticket data while drag n drop

  if (ticketData.length == 0) {
    ticketsContainerEle.innerHTML = `<div class="nowork-text">STOP MESSING AROUND AND DO SOME WORK</div>`;
  } else {
    ticketsContainerEle.innerHTML = "";

    //creating Todo category flexbox
    let ticketsContainerTodoEle = document.createElement("div");
    ticketsContainerTodoEle.classList.add("tickets-todo-container");
    let todoHeading = document.createElement("div");
    todoHeading.classList.add("todo-heading");
    todoHeading.innerText = "TODO";
    ticketsContainerTodoEle.appendChild(todoHeading);
    ticketsContainerEle.appendChild(ticketsContainerTodoEle);

    ticketsContainerTodoEle.addEventListener("dragenter", function (e) {
      console.log("Drag Enter has been triggered");
    });
    ticketsContainerTodoEle.addEventListener("dragover", function (e) {
      e.preventDefault();
      console.log("Drag Over has been triggered");
    });
    ticketsContainerTodoEle.addEventListener("drop", function (e) {
      e.preventDefault();
      if (e.target.className === "tickets-todo-container") {
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
        console.log("dragged ticket", dragged);
        currentTicketRef.taskStatus = "Todo";
        localStorage.setItem("ticketData", JSON.stringify(ticketData));
      }
    });

    //creating InProgress category flexbox
    let ticketsContainerInProgressEle = document.createElement("div");
    ticketsContainerInProgressEle.classList.add("tickets-inprogress-container");
    let inProgressHeading = document.createElement("div");
    inProgressHeading.classList.add("inprogress-heading");
    inProgressHeading.innerText = "IN-PROGRESS";
    ticketsContainerInProgressEle.appendChild(inProgressHeading);
    ticketsContainerEle.appendChild(ticketsContainerInProgressEle);
          //----------------drag and drop-----------------------------//
    ticketsContainerInProgressEle.addEventListener("dragenter", function (e) {
      console.log("Drag Enter has been triggered");
    });
    ticketsContainerInProgressEle.addEventListener("dragover", function (e) {
      e.preventDefault();
      console.log("Drag Over has been triggered");
    });
    ticketsContainerInProgressEle.addEventListener("drop", function (e) {
      e.preventDefault();
      console.log("Drop has been triggered");
      console.log("drop target:", e.target);
      console.log("drop currentTarget:", e.currentTarget);
      if (e.target.className === "tickets-inprogress-container") {
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
        currentTicketRef.taskStatus = "In-Progress";
        localStorage.setItem("ticketData", JSON.stringify(ticketData));
      }
    });
          //----------------end of drag and drop-----------------------------//
    //creating Done category flexbox
    let ticketsContainerDoneEle = document.createElement("div");
    ticketsContainerDoneEle.classList.add("tickets-done-container");
    let doneHeading = document.createElement("div");
    doneHeading.classList.add("done-heading");
    doneHeading.innerText = "DONE";
    ticketsContainerDoneEle.appendChild(doneHeading);
    ticketsContainerEle.appendChild(ticketsContainerDoneEle);
            //----------------drag and drop-----------------------------//
    ticketsContainerDoneEle.addEventListener("dragenter", function (e) {
      console.log("Drag Enter has been triggered");
    });
    ticketsContainerDoneEle.addEventListener("dragover", function (e) {
      e.preventDefault();
      console.log("Drag Over has been triggered");
    });
    ticketsContainerDoneEle.addEventListener("drop", function (e) {
      e.preventDefault();
      if (e.target.className === "tickets-done-container") {
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
        console.log(currentTicketRef);
        currentTicketRef.taskStatus = "Done";
        localStorage.setItem("ticketData", JSON.stringify(ticketData));
      }
      //----------------end of drag and drop-----------------------------//
    });
    for (let i = 0; i < ticketData.length; i++) {
      // ticketsContainerEle.innerHTML+=`<div class="ticket-container">
      //     <div class="ticket">
      //       <div class="ticket-priority-color"></div>
      //       <div class="icon"><i id="${i}" class="fa-solid fa-lock lock-icon"></i></div>
      //       <h6>TicketID:${ticketData[i].id}</h6>
      //       <input type="text" class="ticket-title" value="${ticketData[i].title}"></h4>
      //       <textarea class="ticket-desc">${ticketData[i].desc}</textarea>
      //       <img class="ticket-editBtn" src="./images/edit-pencil-icon-16.jpg" onclick="showEditForm(ticketData[${i}]);">
      //     </div>
      //   </div>`;
      // console.log("i is:",i,ticketData[i]);
      let ticketContainer = document.createElement("div");
      ticketContainer.setAttribute("class", "ticket-container");
      ticketContainer.setAttribute("draggable", true);
      ticketContainer.innerHTML = `<div class="ticket">
        <div class="ticket-priority-color"></div>
        <i class="fa-solid fa-lock lock-icon"></i>
        <h6>TicketID:${ticketData[i].id}</h6>
        <input type="text" class="ticket-title" value="${ticketData[i].title}" readonly></h4>
        <textarea class="ticket-desc" readonly>${ticketData[i].desc}</textarea>
        <img class="ticket-editBtn" src="./images/edit-pencil-icon-16.jpg" onclick="showEditForm(ticketData[${i}]);">
        <i class="fa-solid fa-trash delete-icon"></i> 
      </div>`;

      //----------------drag and drop-----------------------------//
      ticketContainer.addEventListener("dragstart", function (e) {
        console.log("dragstart triggered");
        dragged = e.currentTarget;
        currentTicketRef = ticketData[i];
        console.log("dragged target:", dragged);
        console.log("currentTarget:", e.currentTarget);
      });
      ticketContainer.addEventListener("dragend", function (e) {
        console.log("dragend triggered");
        console.log("dragged target:", e.target);
        console.log("currentTarget:", e.currentTarget);
      });
      //----------------end of drag and drop-----------------------------//

      if (ticketData[i].taskStatus == "Todo") {
        ticketsContainerTodoEle.appendChild(ticketContainer);
      } else if (ticketData[i].taskStatus == "In-Progress") {
        ticketsContainerInProgressEle.appendChild(ticketContainer);
      } else if (ticketData[i].taskStatus == "Done") {
        ticketsContainerDoneEle.appendChild(ticketContainer);
      }

      handleLockandEdit(ticketContainer, ticketData[i]);
      handleRemove(ticketContainer, ticketData[i]);
      handleColor(ticketContainer, ticketData[i]);
    }
  }
}
function handleColor(ticketContainer, ticket) {
  let colorEle = ticketContainer.querySelector(".ticket-priority-color");
  if (ticket.priority === "High") {
    colorEle.classList.add("ticket-priority-color-red");
    colorEle.classList.remove("ticket-priority-color-orange");
    colorEle.classList.remove("ticket-priority-color-yellow");
  } else if (ticket.priority === "Medium") {
    colorEle.classList.remove("ticket-priority-color-red");
    colorEle.classList.add("ticket-priority-color-orange");
    colorEle.classList.remove("ticket-priority-color-yellow");
  } else if (ticket.priority === "Low") {
    colorEle.classList.remove("ticket-priority-color-red");
    colorEle.classList.remove("ticket-priority-color-orange");
    colorEle.classList.add("ticket-priority-color-yellow");
  } else {
    colorEle.classList.remove("ticket-priority-color-red");
    colorEle.classList.remove("ticket-priority-color-orange");
    colorEle.classList.remove("ticket-priority-color-yellow");
  }
}

//--------------------Handle Lock and Edit -------------------------------------------------------------//
function handleLockandEdit(ticketContainer, ticket) {
  // [<i class="fa-solid fa-lock lock-icon"> <i class="fa-solid fa-lock lock-icon"> <i class="fa-solid fa-lock lock-icon"></i> ]
  let lockIconEle = ticketContainer.querySelector(".lock-icon");
  let titleEle = ticketContainer.querySelector(".ticket-title");
  let descEle = ticketContainer.querySelector(".ticket-desc");
  // console.log(i,lockIconEle);
  lockIconEle.addEventListener("click", function (e) {
    if (lockIconEle.classList.contains("fa-lock")) {
      lockIconEle.classList.remove("fa-lock");
      lockIconEle.classList.add("fa-unlock");
      titleEle.removeAttribute("readonly");
      descEle.removeAttribute("readonly");
    } else {
      lockIconEle.classList.remove("fa-unlock");
      lockIconEle.classList.add("fa-lock");
      titleEle.setAttribute("readonly", true);
      descEle.setAttribute("readonly", true);
    }
  });

  titleEle.addEventListener("keydown", function (e) {
    let updatedTitle = e.currentTarget.value;

    if (e.key == "Enter") {
      titleEle.blur();
      ticket.title = updatedTitle;
      localStorage.setItem("ticketData", JSON.stringify(ticketData));
    }
  });
  descEle.addEventListener("keydown", function (e) {
    let updatedDesc = e.currentTarget.value;

    if (e.key == "Enter") {
      descEle.blur();
      ticket.desc = updatedDesc;
      localStorage.setItem("ticketData", JSON.stringify(ticketData));
    }
  });
}

//-------------------End of Handle LockandEdit---------------------------------------------------//

//--------------------Delete Ticket-------------------------------------------------------------//
function handleRemove(ticketContainer, ticket) {
  let deleteEle = ticketContainer.querySelector(".delete-icon");

  deleteEle.addEventListener("click", function (e) {
    let index = ticketData.findIndex((item) => ticket.id === item.id);
    ticketData.splice(index, 1);
    localStorage.setItem("ticketData", JSON.stringify(ticketData));
    displayTickets();
  });
  //-------------------End of Handle Remove---------------------------------------------------//
}
// Edit form functionality
let edit_formEle = document.querySelector(".edit-form-container");
let edit_updateBtn = document.querySelector(".edit-update-btn");
let edit_titleEle = document.querySelector("#edit-title");
let edit_descEle = document.querySelector("#edit-description");
let edit_dueDateEle = document.querySelector("#edit-duedate");
let edit_priorityEle = document.querySelector("#edit-priority");
let edit_taskStatusEle = document.querySelector("#edit-status");
let edit_form_TicketIDEle = document.querySelector(".edit-task-id");

function showEditForm(ticket) {
  // console.log(edit_formEle);                                           //console.log

  let edit_title = ticket.title;
  let edit_desc = ticket.desc;
  let edit_dueDate = ticket.dueDate;
  let edit_priority = ticket.priority;
  let edit_taskStatus = ticket.taskStatus;

  edit_formEle.style.display = "block";

  // prefill info
  edit_titleEle.value = edit_title;
  edit_descEle.value = edit_desc;
  edit_dueDateEle.value = edit_dueDate;
  edit_priorityEle.value = edit_priority;
  edit_taskStatusEle.value = edit_taskStatus;

  edit_form_TicketIDEle.innerText = "TicketID:" + ticket.id;
  // ---

  // console.log(ticket.title);                                              //console log

  edit_titleEle.addEventListener("change", function (e) {
    edit_title = e.currentTarget.value;
    console.log("Event Triggered edit_title:");
  });
  edit_descEle.addEventListener("change", function (e) {
    edit_desc = e.currentTarget.value;
  });
  edit_dueDateEle.addEventListener("change", function (e) {
    edit_dueDate = e.currentTarget.value;
  });
  edit_priorityEle.addEventListener("change", function (e) {
    edit_priority = e.currentTarget.value;
  });
  edit_taskStatusEle.addEventListener("change", function (e) {
    edit_taskStatus = e.currentTarget.value;
  });

  edit_updateBtn.addEventListener("click", updateTicket, { once: true });

  function updateTicket() {
    console.log("event triggered");
    for (let i = 0; i < ticketData.length; i++) {
      if (ticketData[i].id === ticket.id) {
        ticketData[i].title = edit_title;
        ticketData[i].desc = edit_desc;
        ticketData[i].dueDate = edit_dueDate;
        ticketData[i].taskStatus = edit_taskStatus;
        ticketData[i].priority = edit_priority;
      }
    }
    // ticket.title=edit_titleEle.value;
    // ticket.desc=edit_descEle.value;
    // console.log("ticket",ticket);                                                   //console log

    // console.log(ticketData);                                    //consolelog
    // edit_updateBtn.removeEventListener('click',function(){});
    displayTickets();

    hideEditForm();
  }
}

function hideEditForm() {
  edit_formEle.style.display = "none";
}
