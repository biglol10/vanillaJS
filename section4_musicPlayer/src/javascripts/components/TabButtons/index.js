import { findIndexListElement, getClosestElement } from "../../utils/index.js";
import EventEmitter from "../common/EventEmitter.js";

export default class TabButtons extends EventEmitter {
  constructor() {
    super();
    this.renderElement = TabButtons.createRenderElement();
    this.bindEvents();
  }

  static createRenderElement() {
    const tabsContainer = document.createElement("ul");
    tabsContainer.classList.add("app-controller");

    const tabs = [
      { title: "Top5", iconName: "icon-top5" },
      { title: "Playlist", iconName: "icon-playlist" },
      { title: "Search", iconName: "icon-search" },
    ];

    tabsContainer.innerHTML = tabs
      .map((tab) => {
        return `
                <li>
                    <button class="button-app-controller">
                        <i class="tab-icon ${tab.iconName}"></i>
                        ${tab.title}
                    </button>
                </li>
            `;
      })
      .join(""); //배열의 요소를 연결해 하나의 문자열로 반환

    return tabsContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", (event) => {
      const element = getClosestElement(event.target, "li");
      const currentIndex = findIndexListElement(element);

      this.emit("clickTab", { currentIndex });
    });
  }

  render() {
    return this.renderElement;
  }
}
