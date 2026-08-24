const addTaskButton = document.querySelector("#add-task-btn");
const modalOverlay = document.querySelector("#modal-overlay");
const closeModalButton = document.querySelector("#close-modal-btn");
const cancelModalButton = document.querySelector("#cancel-btn");
const submitTaskButton = document.querySelector("#submit-btn");
const submitButtonText = document.querySelector("#submit-btn-text");
const modalTitle = document.querySelector("#modal-title");
const tasksTodoContainer = document.querySelector("#tasks-todo");
const tasksInProgressContainer = document.querySelector("#tasks-in-progress");
const tasksCompletedContainer = document.querySelector("#tasks-completed");
const taskTitleInput = document.querySelector("#task-title");
const taskPrioritySelect = document.querySelector("#task-priority");
const taskDueDateInput = document.querySelector("#task-due-date");
const taskDescriptionTextarea = document.querySelector("#task-description");
const characterCountDisplay = document.querySelector("#char-count");
const titleErrorMessage = document.querySelector("#title-error");
const dateErrorMessage = document.querySelector("#date-error");
let tasks = [];
let currentlyEditingTaskId = null;
const STORAGE_KEY = "kanban-tasks";
// Local Storage
function saveTasksToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks)
        return;
    try {
        const parsedTasks = JSON.parse(storedTasks);
        tasks = parsedTasks.map((task) => ({
            ...task,
            dueDate: new Date(task.dueDate),
            createdAt: new Date(task.createdAt),
        }));
    }
    catch (error) {
        tasks = [];
    }
}
// Toast Notification
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `kanban-toast fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl text-white font-medium shadow-lg
                     transform transition-all duration-300 translate-y-[-20px] opacity-0
                     ${type === "success" ? "bg-emerald-500" : "bg-red-500"}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.classList.remove("translate-y-[-20px]", "opacity-0");
        toast.classList.add("translate-y-0", "opacity-100");
    });
    setTimeout(() => {
        toast.classList.add("translate-y-[-20px]", "opacity-0");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
function getNextTaskId() {
    if (tasks.length === 0)
        return 1;
    return Math.max(...tasks.map((task) => task.id)) + 1;
}
function calculateDueDateStatus(dueDate, status) {
    if (status === "Completed")
        return "Done";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateOnly = new Date(dueDate);
    dueDateOnly.setHours(0, 0, 0, 0);
    const differenceInDays = Math.ceil((dueDateOnly.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (differenceInDays < 0)
        return "Overdue";
    if (differenceInDays <= 2)
        return "Due Soon";
    return "On Track";
}
function getRelativeTime(date) {
    const now = new Date();
    const differenceInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    if (differenceInMinutes < 1)
        return "Just now";
    if (differenceInMinutes < 60)
        return `${differenceInMinutes}m ago`;
    if (differenceInHours < 24)
        return `${differenceInHours}h ago`;
    if (differenceInDays === 1)
        return "1d ago";
    if (differenceInDays < 7)
        return `${differenceInDays}d ago`;
    if (differenceInDays < 30)
        return `${Math.floor(differenceInDays / 7)}w ago`;
    return date.toLocaleDateString();
}
function formatFullCreatedDate(date) {
    return `Created ${date.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })}`;
}
function capitalizePriority(value) {
    const priorityMap = {
        low: "Low",
        medium: "Medium",
        high: "High",
    };
    return priorityMap[value.toLowerCase()] || "Medium";
}
function isTitleValid(title) {
    return /^(\s*\S){3,}.*$/.test(title);
}
function isDueDateValid(dueDateString) {
    if (!dueDateString)
        return true;
    const dueDate = new Date(dueDateString);
    dueDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate >= today;
}
function setInputError(input, hasError) {
    if (hasError) {
        input.style.borderColor = '#ef4444';
        input.style.borderWidth = '2px';
        input.style.outline = 'none';
    }
    else {
        input.style.borderColor = '';
        input.style.borderWidth = '';
        input.style.outline = '';
    }
}
function showTitleError(message) {
    if (!titleErrorMessage)
        return;
    titleErrorMessage.textContent = message;
    titleErrorMessage.classList.remove("hidden");
    if (taskTitleInput)
        setInputError(taskTitleInput, true);
}
function hideTitleError() {
    if (!titleErrorMessage)
        return;
    titleErrorMessage.textContent = "";
    titleErrorMessage.classList.add("hidden");
    if (taskTitleInput)
        setInputError(taskTitleInput, false);
}
function showDateError(message) {
    if (!dateErrorMessage)
        return;
    dateErrorMessage.textContent = message;
    dateErrorMessage.classList.remove("hidden");
    if (taskDueDateInput)
        setInputError(taskDueDateInput, true);
}
function hideDateError() {
    if (!dateErrorMessage)
        return;
    dateErrorMessage.textContent = "";
    dateErrorMessage.classList.add("hidden");
    if (taskDueDateInput)
        setInputError(taskDueDateInput, false);
}
function clearTaskForm() {
    if (taskTitleInput) {
        taskTitleInput.value = "";
        setInputError(taskTitleInput, false);
    }
    if (taskPrioritySelect)
        taskPrioritySelect.value = "medium";
    if (taskDueDateInput) {
        taskDueDateInput.value = "";
        setInputError(taskDueDateInput, false);
    }
    if (taskDescriptionTextarea)
        taskDescriptionTextarea.value = "";
    if (characterCountDisplay)
        characterCountDisplay.textContent = "0/500";
    hideTitleError();
    hideDateError();
    currentlyEditingTaskId = null;
    if (modalTitle)
        modalTitle.textContent = "Create New Task";
    if (submitButtonText)
        submitButtonText.textContent = "Add Task";
    if (submitTaskButton) {
        const icon = submitTaskButton.querySelector("i");
        if (icon)
            icon.className = "fa-solid fa-plus";
    }
}
// Add Task Modal
function openTaskModal(taskToEdit) {
    if (!modalOverlay)
        return;
    if (taskToEdit) {
        currentlyEditingTaskId = taskToEdit.id;
        if (taskTitleInput) {
            taskTitleInput.value = taskToEdit.title;
            setInputError(taskTitleInput, false);
        }
        if (taskPrioritySelect)
            taskPrioritySelect.value = taskToEdit.priority.toLowerCase();
        if (taskDueDateInput && taskToEdit.dueDate) {
            taskDueDateInput.value = taskToEdit.dueDate.toISOString().split("T")[0];
            setInputError(taskDueDateInput, false);
        }
        if (taskDescriptionTextarea)
            taskDescriptionTextarea.value = taskToEdit.description;
        if (characterCountDisplay) {
            characterCountDisplay.textContent = `${taskToEdit.description.length}/500`;
        }
        hideTitleError();
        hideDateError();
        if (modalTitle)
            modalTitle.textContent = "Edit Task";
        if (submitButtonText)
            submitButtonText.textContent = "Save Changes";
        if (submitTaskButton) {
            const icon = submitTaskButton.querySelector("i");
            if (icon)
                icon.className = "fa-solid fa-save";
        }
    }
    else {
        clearTaskForm();
    }
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
}
function closeTaskModal() {
    if (!modalOverlay)
        return;
    modalOverlay.classList.add("hidden");
    modalOverlay.classList.remove("flex");
    clearTaskForm();
}
// Task Card Template
function createTaskCard(task) {
    const priorityBadgeClasses = {
        Low: "bg-blue-50 text-blue-600",
        Medium: "bg-amber-50 text-amber-600",
        High: "bg-red-50 text-red-600",
    };
    const priorityDotClasses = {
        Low: "bg-blue-500",
        Medium: "bg-amber-500",
        High: "bg-red-500",
    };
    const dueDateBadgeClasses = {
        "On Track": "bg-slate-100 text-slate-600",
        "Due Soon": "bg-orange-100 text-orange-600",
        Overdue: "bg-red-100 text-red-600",
        Done: "bg-emerald-100 text-emerald-600",
    };
    const dueDateIconClasses = {
        "On Track": "fa-regular fa-clock",
        "Due Soon": "",
        Overdue: "fa-solid fa-triangle-exclamation",
        Done: "fa-solid fa-check",
    };
    let cardExtraClasses = "border-slate-100";
    if (task.dueDateStatus === "Overdue") {
        cardExtraClasses = "border-red-200 ring-2 ring-red-100";
    }
    else if (task.dueDateStatus === "Due Soon") {
        cardExtraClasses = "border-orange-100";
    }
    if (task.status === "Completed") {
        cardExtraClasses += " opacity-75";
    }
    let actionButtonsHtml = "";
    if (task.status === "To Do") {
        actionButtonsHtml = `
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200"
              data-task-id="${task.id}" data-status="In Progress">
        <i class="fa-solid fa-play pointer-events-none"></i>
        <span class="pointer-events-none">Start</span>
      </button>
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              data-task-id="${task.id}" data-status="Completed">
        <i class="fa-solid fa-check pointer-events-none"></i>
        <span class="pointer-events-none">Complete</span>
      </button>
    `;
    }
    else if (task.status === "In Progress") {
        actionButtonsHtml = `
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200"
              data-task-id="${task.id}" data-status="To Do">
        <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i>
        <span class="pointer-events-none">To Do</span>
      </button>
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
              data-task-id="${task.id}" data-status="Completed">
        <i class="fa-solid fa-check pointer-events-none"></i>
        <span class="pointer-events-none">Complete</span>
      </button>
    `;
    }
    else {
        actionButtonsHtml = `
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200"
              data-task-id="${task.id}" data-status="To Do">
        <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i>
        <span class="pointer-events-none">To Do</span>
      </button>
      <button class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200"
              data-task-id="${task.id}" data-status="In Progress">
        <i class="fa-solid fa-play pointer-events-none"></i>
        <span class="pointer-events-none">Start</span>
      </button>
    `;
    }
    const priorityLabel = task.priority === "High" ? "High Priority" : task.priority;
    const createdTooltip = formatFullCreatedDate(task.createdAt);
    const titleClass = task.status === "Completed" ? "line-through" : "";
    let dueSoonBadge = "";
    if (task.dueDateStatus === "Due Soon") {
        dueSoonBadge = `<span class="${dueDateBadgeClasses[task.dueDateStatus]} text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide">${task.dueDateStatus}</span>`;
    }
    else if (task.dueDateStatus !== "On Track") {
        dueSoonBadge = `<span class="${dueDateBadgeClasses[task.dueDateStatus]} text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
      <i class="${dueDateIconClasses[task.dueDateStatus]}"></i>${task.dueDateStatus}</span>`;
    }
    const statusDotClass = task.status === "To Do" ? "bg-slate-300" :
        task.status === "In Progress" ? "bg-amber-400" : "bg-emerald-500";
    const dueDateTextColor = task.dueDateStatus === "Overdue" ? "text-red-500" :
        task.dueDateStatus === "Due Soon" ? "text-orange-500" : "";
    const descriptionHtml = task.description ?
        `<p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">${task.description}</p>` :
        `<div class="mb-4"></div>`;
    return `
    <div class="group bg-white rounded-xl p-4 shadow-sm border ${cardExtraClasses} hover:shadow-md hover:border-slate-200 transition-all duration-200"
         data-task-id="${task.id}">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${statusDotClass}"></span>
          <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${String(task.id).padStart(3, "0")}</span>
        </div>
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  data-task-id="${task.id}" title="Edit task">
            <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
          </button>
          <button class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                  data-task-id="${task.id}" title="Delete task">
            <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
          </button>
        </div>
      </div>
      <h3 class="font-semibold text-slate-800 mb-2 leading-snug ${titleClass}">${task.title}</h3>
      ${descriptionHtml}
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="${priorityBadgeClasses[task.priority]} text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
          <span class="w-1.5 h-1.5 rounded-full ${priorityDotClasses[task.priority]}"></span>
          ${priorityLabel}
        </span>
        ${dueSoonBadge}
      </div>
      <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
        <div class="flex items-center gap-1.5 ${dueDateTextColor}">
          <i class="fa-regular fa-calendar"></i>
          <span>${task.dueDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
        </div>
        <div class="flex items-center gap-1.5" title="${createdTooltip}">
          <i class="fa-regular fa-clock"></i>
          <span>${getRelativeTime(task.createdAt)}</span>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">${actionButtonsHtml}</div>
    </div>
  `;
}
function createEmptyState() {
    return `
    <div class="flex flex-col items-center justify-center py-12 text-slate-400">
      <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
      <p class="text-sm">No tasks yet</p>
      <p class="text-xs mt-1">Click + to add one</p>
    </div>
  `;
}
function updateColumnCounters(todoCount, inProgressCount, completedCount) {
    const columns = [
        { id: "toDo", count: todoCount, label: "To Do" },
        { id: "inProgress", count: inProgressCount, label: "In Progress" },
        { id: "completed", count: completedCount, label: "Completed" },
    ];
    columns.forEach(({ id, count }) => {
        const column = document.getElementById(id);
        if (!column)
            return;
        const counterParagraph = column.querySelector("p.text-xs.text-slate-400");
        if (counterParagraph) {
            counterParagraph.textContent = `${count} task${count !== 1 ? "s" : ""}`;
        }
    });
}
function renderAllTasks() {
    if (!tasksTodoContainer || !tasksInProgressContainer || !tasksCompletedContainer)
        return;
    tasks.forEach((task) => {
        task.dueDateStatus = calculateDueDateStatus(task.dueDate, task.status);
    });
    const todoTasks = tasks.filter((task) => task.status === "To Do");
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
    const completedTasks = tasks.filter((task) => task.status === "Completed");
    tasksTodoContainer.innerHTML = "";
    tasksInProgressContainer.innerHTML = "";
    tasksCompletedContainer.innerHTML = "";
    const renderTasks = (container, taskList) => {
        if (taskList.length === 0) {
            container.innerHTML = createEmptyState();
        }
        else {
            taskList.forEach((task) => {
                container.insertAdjacentHTML("beforeend", createTaskCard(task));
            });
        }
    };
    renderTasks(tasksTodoContainer, todoTasks);
    renderTasks(tasksInProgressContainer, inProgressTasks);
    renderTasks(tasksCompletedContainer, completedTasks);
    updateColumnCounters(todoTasks.length, inProgressTasks.length, completedTasks.length);
}
function validateForm() {
    if (!taskTitleInput || !taskDueDateInput)
        return false;
    const title = taskTitleInput.value.trim();
    const dueDateString = taskDueDateInput.value;
    hideTitleError();
    hideDateError();
    let hasError = false;
    if (title === "") {
        showTitleError("Task title is required");
        hasError = true;
    }
    else if (!isTitleValid(title)) {
        showTitleError("Title must be at least 3 characters");
        hasError = true;
    }
    if (dueDateString && !isDueDateValid(dueDateString)) {
        showDateError("Due date cannot be in the past");
        hasError = true;
    }
    return !hasError;
}
function addOrUpdateTask() {
    if (!taskTitleInput || !taskPrioritySelect || !taskDueDateInput || !taskDescriptionTextarea)
        return;
    if (!validateForm())
        return;
    const title = taskTitleInput.value.trim();
    const priority = capitalizePriority(taskPrioritySelect.value);
    const dueDateString = taskDueDateInput.value;
    const description = taskDescriptionTextarea.value.trim();
    const dueDate = dueDateString ? new Date(dueDateString) : new Date();
    const isEditing = currentlyEditingTaskId !== null;
    if (isEditing) {
        const taskToUpdate = tasks.find((task) => task.id === currentlyEditingTaskId);
        if (taskToUpdate) {
            taskToUpdate.title = title;
            taskToUpdate.description = description;
            taskToUpdate.priority = priority;
            taskToUpdate.dueDate = dueDate;
            taskToUpdate.dueDateStatus = calculateDueDateStatus(dueDate, taskToUpdate.status);
        }
    }
    else {
        tasks.push({
            id: getNextTaskId(),
            title,
            description,
            priority,
            status: "To Do",
            dueDate,
            dueDateStatus: calculateDueDateStatus(dueDate, "To Do"),
            createdAt: new Date(),
        });
    }
    renderAllTasks();
    saveTasksToLocalStorage();
    closeTaskModal();
    showToast(isEditing ? "Task updated successfully!" : "Task added successfully!");
}
function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderAllTasks();
    saveTasksToLocalStorage();
}
function changeTaskStatus(taskId, newStatus) {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate)
        return;
    taskToUpdate.status = newStatus;
    taskToUpdate.dueDateStatus = calculateDueDateStatus(taskToUpdate.dueDate, newStatus);
    renderAllTasks();
    saveTasksToLocalStorage();
}
function setupEventListeners() {
    if (addTaskButton) {
        addTaskButton.addEventListener("click", () => openTaskModal());
    }
    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeTaskModal);
    }
    if (cancelModalButton) {
        cancelModalButton.addEventListener("click", closeTaskModal);
    }
    const taskForm = document.querySelector("#task-form");
    if (taskForm) {
        taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            addOrUpdateTask();
        });
    }
    if (submitTaskButton) {
        submitTaskButton.addEventListener("click", (e) => {
            e.preventDefault();
            addOrUpdateTask();
        });
    }
    if (taskDescriptionTextarea) {
        taskDescriptionTextarea.addEventListener("input", () => {
            if (characterCountDisplay && taskDescriptionTextarea) {
                characterCountDisplay.textContent = `${taskDescriptionTextarea.value.length}/500`;
            }
        });
    }
    document.addEventListener("click", (e) => {
        const target = e.target;
        const editButton = target.closest(".edit-btn");
        if (editButton) {
            const taskId = Number(editButton.dataset.taskId);
            const taskToEdit = tasks.find((task) => task.id === taskId);
            if (taskToEdit)
                openTaskModal(taskToEdit);
            return;
        }
        const deleteButton = target.closest(".delete-btn");
        if (deleteButton) {
            deleteTask(Number(deleteButton.dataset.taskId));
            return;
        }
        const statusButton = target.closest(".status-btn");
        if (statusButton) {
            const taskId = Number(statusButton.dataset.taskId);
            const newStatus = statusButton.dataset.status;
            if (taskId && newStatus) {
                changeTaskStatus(taskId, newStatus);
            }
        }
    });
}
loadTasksFromLocalStorage();
setupEventListeners();
renderAllTasks();
export {};
//# sourceMappingURL=index.js.map