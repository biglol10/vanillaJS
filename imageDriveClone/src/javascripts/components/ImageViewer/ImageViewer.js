class ImageViewer {
  constructor(props) {
    const { parentElement } = props;
    this.parentElement = parentElement;
    this.renderElement = ImageViewer.createImageViewer();
    this.bindEvents();
  }

  static createImageViewer() {
    const imageViewerWrapper = document.createElement("section");
    const imageContent = document.createElement("div");
    const imageElement = document.createElement("img");

    imageViewerWrapper.classList.add("modal", "image-viewer");
    imageContent.classList.add("content");

    imageContent.appendChild(imageElement);
    imageViewerWrapper.appendChild(imageContent);

    return imageViewerWrapper;
  }

  bindEvents() {
    // 클릭했을 때 이 컴포넌트의 루트 엘리먼트를 클릭하는 경우에만 닫히도록 설정합니다. (이렇게 해두면 이미지를 클릭했을 때는 닫히지 않고 검은 배경 클릭 시에만 닫힙니다.)
    this.renderElement.addEventListener("click", (event) => {
      const currentTarget = event.target;
      if (this.renderElement === currentTarget) {
        this.close();
      }
    });
  }

  open(filePath = "") {
    this.renderElement.querySelector("img").src = filePath;
    this.parentElement.appendChild(this.renderElement);
  }

  close() {
    this.parentElement.removeChild(this.renderElement);
  }
}

export default ImageViewer;
