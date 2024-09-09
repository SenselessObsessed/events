export default class List {
  constructor() {
    this.search = document.getElementById("search");
    this.allTasks = document.querySelector(".all-tasks");
    this.noTask = document.getElementById("no-task");
    this.noPinnedTask = document.getElementById("no-task-pinned");
    this.task2 = document.getElementById("task2");
    this.allPinned = document.getElementById("tasks-pinned-container");
  }
  init() {
    this.addEventListeners();
  }
  addEventListeners() {
    this.search.addEventListener("input", (e) => {
      const allTasksListener = document.querySelectorAll(".task-all");
      allTasksListener.forEach((item) => {
        if (
          !item.children[0].innerText
            .toUpperCase()
            .startsWith(e.target.value.toUpperCase())
        ) {
          item.classList.add("hidden");
        }
        if (
          item.children[0].innerText
            .toUpperCase()
            .startsWith(e.target.value.toUpperCase()) &&
          item.classList.contains("hidden")
        ) {
          item.classList.remove("hidden");
        }
      });
      const index = [...allTasksListener].findIndex(
        (item) => !item.classList.contains("hidden"),
      );
      if (index === -1) {
        this.noTask.classList.remove("hidden");
      } else {
        this.noTask.classList.add("hidden");
      }
    });

    this.search.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          if (!this.noTask.classList.contains("hidden"))
            this.noTask.classList.add("hidden");
          const task = document.createElement("div");
          task.classList.add("task-all");

          const innerTask = document.createElement("p");
          innerTask.classList.add("task-all-task");
          innerTask.innerText = e.target.value;

          const circle = document.createElement("div");
          circle.classList.add("circle");

          const innerCircle = document.createElement("p");
          innerCircle.classList.add("task-pinned-task");
          innerCircle.classList.add("allow");

          circle.append(innerCircle);
          task.append(innerTask, circle);
          this.allTasks.append(task);
          e.target.value = "";
        } else {
          e.target.value = "Поле не должно быть пустым";
          e.target.classList.add("red-focus");
          e.target.setAttribute("disabled", "");
          setTimeout(() => {
            e.target.value = "";
            e.target.classList.remove("red-focus");
            e.target.removeAttribute("disabled");
            e.target.focus();
          }, 1000);
        }
      }
    });

    this.task2.addEventListener("click", (e) => {
      if (
        e.target.children[0] &&
        e.target.children[0].classList.contains("allow") &&
        e.target.children[0].innerText === ""
      ) {
        const taskPinned = document.createElement("div");
        taskPinned.classList.add("task-pinned");

        const innerTask = document.createElement("p");
        innerTask.classList.add("task-pinned-task");
        innerTask.innerText =
          e.target.closest(".task-all").children[0].innerText;

        const circle = document.createElement("div");
        circle.classList.add("circle");

        const innerCircle = document.createElement("p");
        innerCircle.classList.add("task-pinned-task");
        innerCircle.classList.add("allow");
        innerCircle.innerText = "V";

        circle.append(innerCircle);
        taskPinned.append(innerTask, circle);
        this.allPinned.append(taskPinned);
        e.target.closest(".task-all").remove();

        const allTasksListener = document.querySelectorAll(".task-all");
        const index = [...allTasksListener].findIndex(
          (item) => !item.classList.contains("hidden"),
        );
        if (index === -1) {
          this.noTask.classList.remove("hidden");
        } else {
          this.noTask.classList.add("hidden");
        }

        const allPinnedTasks = document.querySelectorAll(".task-pinned");
        const idx = [...allPinnedTasks].findIndex(
          (item) => !item.classList.contains("hidden"),
        );
        if (idx === -1) {
          this.noPinnedTask.classList.remove("hidden");
        } else {
          this.noPinnedTask.classList.add("hidden");
        }
      }

      if (
        e.target &&
        e.target.classList.contains("allow") &&
        e.target.innerText === "V"
      ) {
        const allTask = document.createElement("div");
        allTask.classList.add("task-all");

        const innerTask = document.createElement("p");
        innerTask.classList.add("task-all-task");
        innerTask.innerText =
          e.target.closest(".task-pinned").children[0].innerText;

        const circle = document.createElement("div");
        circle.classList.add("circle");

        const innerCircle = document.createElement("p");
        innerCircle.classList.add("task-pinned-task");
        innerCircle.classList.add("allow");
        innerCircle.innerText = "";

        circle.append(innerCircle);
        allTask.append(innerTask, circle);
        this.allTasks.append(allTask);
        e.target.closest(".task-pinned").remove();
        const allTasksListener = document.querySelectorAll(".task-all");
        const index = [...allTasksListener].findIndex(
          (item) => !item.classList.contains("hidden"),
        );
        if (index === -1) {
          this.noTask.classList.remove("hidden");
        } else {
          this.noTask.classList.add("hidden");
        }

        const allPinnedTasks = document.querySelectorAll(".task-pinned");
        const idx = [...allPinnedTasks].findIndex(
          (item) => !item.classList.contains("hidden"),
        );
        if (idx === -1) {
          this.noPinnedTask.classList.remove("hidden");
        } else {
          this.noPinnedTask.classList.add("hidden");
        }
      }
    });
  }
}
