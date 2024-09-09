export default class ImagesList {
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
        this.result = new Promise((resolve) => {
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
