/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/createBoxWithGoblin.js
function createBoxWithGonlin() {
  const box = document.createElement("div");
  box.classList.add("goblin");
  return box;
}
;// CONCATENATED MODULE: ./src/js/GoblinGame.js

class GoblinGame {
  constructor() {
    this.allowedIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    this.board = document.getElementById("container");
    this.score = document.getElementById("score");
    this.boxWithGoblin = createBoxWithGonlin();
    this.boardListeners = [];
    this.misses = 0;
  }
  init() {
    this.goblinInRandomBox();
    this.boardListeners.push(this.addscore);
    this.board.addEventListener("click", this.addscore.bind(this));
  }
  addscore(e) {
    if (e.target.classList.contains("goblin")) {
      this.score.innerText = Number(this.score.innerText) + 1;
      this.boxWithGoblin.remove();
      this.misses = 0;
    }
    if (!e.target.classList.contains("goblin") && e.target.classList.contains("box") && Number(this.score.innerText) > 0) {
      this.score.innerText = Number(this.score.innerText) - 1;
    }
    if (!e.target.classList.contains("goblin") && e.target.classList.contains("box")) {
      this.misses += 1;
      if (this.misses === 5) {
        this.endGame();
      }
    }
  }
  goblinInRandomBox() {
    this.game = setInterval(() => {
      const randomNum = max => Math.floor(Math.random() * max);
      const randomIndex = randomNum(this.allowedIndex.length);
      const randomItem = this.allowedIndex[randomIndex];
      const index = this.allowedIndex.findIndex(item => item === randomItem);
      this.board.children[randomItem].append(this.boxWithGoblin);
      this.previousNum = randomItem;
      this.allowedIndex.splice(index, 1);
      if (this.previousNum) this.allowedIndex.push(this.previousNum);
    }, 1000);
  }
  endGame() {
    clearInterval(this.game);
    document.querySelector(".goblin").remove();
    this.boardListeners.forEach(item => this.board.removeEventListener("click", item));
  }
}
;// CONCATENATED MODULE: ./src/js/task2/list.js
class List {
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
    this.search.addEventListener("input", e => {
      const allTasksListener = document.querySelectorAll(".task-all");
      allTasksListener.forEach(item => {
        if (!item.children[0].innerText.toUpperCase().startsWith(e.target.value.toUpperCase())) {
          item.classList.add("hidden");
        }
        if (item.children[0].innerText.toUpperCase().startsWith(e.target.value.toUpperCase()) && item.classList.contains("hidden")) {
          item.classList.remove("hidden");
        }
      });
      const index = [...allTasksListener].findIndex(item => !item.classList.contains("hidden"));
      if (index === -1) {
        this.noTask.classList.remove("hidden");
      } else {
        this.noTask.classList.add("hidden");
      }
    });
    this.search.addEventListener("keyup", e => {
      if (e.key === "Enter") {
        if (e.target.value.length > 0) {
          if (!this.noTask.classList.contains("hidden")) this.noTask.classList.add("hidden");
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
    this.task2.addEventListener("click", e => {
      if (e.target.children[0] && e.target.children[0].classList.contains("allow") && e.target.children[0].innerText === "") {
        const taskPinned = document.createElement("div");
        taskPinned.classList.add("task-pinned");
        const innerTask = document.createElement("p");
        innerTask.classList.add("task-pinned-task");
        innerTask.innerText = e.target.closest(".task-all").children[0].innerText;
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
        const index = [...allTasksListener].findIndex(item => !item.classList.contains("hidden"));
        if (index === -1) {
          this.noTask.classList.remove("hidden");
        } else {
          this.noTask.classList.add("hidden");
        }
        const allPinnedTasks = document.querySelectorAll(".task-pinned");
        const idx = [...allPinnedTasks].findIndex(item => !item.classList.contains("hidden"));
        if (idx === -1) {
          this.noPinnedTask.classList.remove("hidden");
        } else {
          this.noPinnedTask.classList.add("hidden");
        }
      }
      if (e.target && e.target.classList.contains("allow") && e.target.innerText === "V") {
        const allTask = document.createElement("div");
        allTask.classList.add("task-all");
        const innerTask = document.createElement("p");
        innerTask.classList.add("task-all-task");
        innerTask.innerText = e.target.closest(".task-pinned").children[0].innerText;
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
        const index = [...allTasksListener].findIndex(item => !item.classList.contains("hidden"));
        if (index === -1) {
          this.noTask.classList.remove("hidden");
        } else {
          this.noTask.classList.add("hidden");
        }
        const allPinnedTasks = document.querySelectorAll(".task-pinned");
        const idx = [...allPinnedTasks].findIndex(item => !item.classList.contains("hidden"));
        if (idx === -1) {
          this.noPinnedTask.classList.remove("hidden");
        } else {
          this.noPinnedTask.classList.add("hidden");
        }
      }
    });
  }
}
;// CONCATENATED MODULE: ./src/js/task3/ImagesList.js
class ImagesList {
  constructor() {
    this.imageContainer = document.querySelector(".image-container");
    this.btn = document.querySelector(".search-image-btn");
    this.searchUrlInput = document.querySelector(".url");
    this.images = document.querySelector(".images");
    this.name = document.querySelector(".name");
    this.canAdd = true;
  }
  init() {
    this.addImageListeners();
  }
  addImageListeners() {
    this.btn.addEventListener("click", () => {
      const newImageContainer = document.createElement("div");
      const newImageText = document.createElement("p");
      newImageText.innerText = this.name.value;
      const newImageInContainer = document.createElement("div");
      const newImage = document.createElement("img");
      newImage.src = this.searchUrlInput.value;
      newImage.addEventListener("error", () => {
        this.result = new Promise(resolve => {
          this.canAdd = false;
          const uncorrectUrl = document.querySelector(".uncorrect-url");
          uncorrectUrl.classList.remove("hidden");
          setTimeout(() => {
            uncorrectUrl.classList.add("hidden");
          }, 1500);
          resolve(this.canAdd);
        });
      });
      setTimeout(() => {
        if (this.canAdd) {
          newImageInContainer.append(newImage);
          newImageContainer.append(newImageText, newImageInContainer);
          this.images.append(newImageContainer);
          this.name.value = "";
          this.searchUrlInput.value = "";
        }
      }, 500);
      this.canAdd = true;
    });
  }
}
;// CONCATENATED MODULE: ./src/js/app.js



const goblinGame = new GoblinGame();
goblinGame.init();
const list = new List();
list.init();
const imageList = new ImagesList();
imageList.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;