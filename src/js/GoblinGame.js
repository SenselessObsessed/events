import createBoxWithGonlin from "./createBoxWithGoblin";

export default class GoblinGame {
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

    if (
      !e.target.classList.contains("goblin") &&
      e.target.classList.contains("box") &&
      Number(this.score.innerText) > 0
    ) {
      this.score.innerText = Number(this.score.innerText) - 1;
    }
    if (
      !e.target.classList.contains("goblin") &&
      e.target.classList.contains("box")
    ) {
      this.misses += 1;
      if (this.misses === 5) {
        this.endGame();
      }
    }
  }
  goblinInRandomBox() {
    this.game = setInterval(() => {
      const randomNum = (max) => Math.floor(Math.random() * max);
      const randomIndex = randomNum(this.allowedIndex.length);
      const randomItem = this.allowedIndex[randomIndex];
      const index = this.allowedIndex.findIndex((item) => item === randomItem);
      this.board.children[randomItem].append(this.boxWithGoblin);
      this.previousNum = randomItem;
      this.allowedIndex.splice(index, 1);
      if (this.previousNum) this.allowedIndex.push(this.previousNum);
    }, 1000);
  }

  endGame() {
    clearInterval(this.game);
    document.querySelector(".goblin").remove();
    this.boardListeners.forEach((item) =>
      this.board.removeEventListener("click", item),
    );
  }
}
