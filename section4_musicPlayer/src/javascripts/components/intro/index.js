export default class Intro {
  constructor() {
    this.parentElement = document.querySelector("body");
    this.renderElement = Intro.createRenderElement();
  }

  // static -> 클래스의 인스턴스화없이 호출이 가능함, 클래스가 인스턴스화되면 호출할 수 없음, 이 클래스 안에서만 사용
  static createRenderElement() {
    const introContainer = document.createElement("div");
    introContainer.classList.add("intro");
    const introImage = document.createElement("img");
    introImage.src = "assets/images/intro-logo.png";

    introContainer.append(introImage);
    return introContainer;
  }

  show() {
    this.parentElement.append(this.renderElement);
  }

  hide() {
    this.renderElement.style.opacity = 0;
    setTimeout(() => {
      this.parentElement.removeChild(this.renderElement);
    }, 1000);
  }
}
