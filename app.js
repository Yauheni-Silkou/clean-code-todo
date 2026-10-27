const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

const createCheckbox = function () {
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  return checkBox;
};

const createEditInput = function () {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";
  return editInput;
};

const createTaskButton = function (className, textContent, imgIconSrc = null) {
  const button = document.createElement("button");
  button.className = className;

  if (imgIconSrc) {
    const iconImg = document.createElement("img");
    iconImg.src = imgIconSrc;
    button.appendChild(iconImg);
  } else {
    button.innerText = textContent;
  }

  return button;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = createCheckbox();
  const label = document.createElement("label");
  const editInput = createEditInput();
  const editButton = createTaskButton("edit", "Edit");
  const deleteButton = createTaskButton("delete", "", "./remove.svg");

  label.innerText = taskString;
  label.className = "task";

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, toggleTaskState);

  taskInput.value = "";
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
};

const toggleTaskState = function () {
  const listItem = this.parentNode;
  const checkBox = this;

  const targetHolder = checkBox.checked ? completedTasksHolder : incompleteTaskHolder;

  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskState);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, onStatusChange) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = onStatusChange;
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], toggleTaskState);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], toggleTaskState);
}
