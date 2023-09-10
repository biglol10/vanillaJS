import Breadcrumb from "./Breadcrumb.js";
import Finder from "./Finder.js";
import ImageViewer from "../ImageViewer/index.js";
import Loading from "../Loading/index.js";
import { fetchObjects } from "../../api/index.js";

class Album {
  constructor() {
    this.breadcrumb = null;
    this.finder = null;
    this.imageViewer = null;
    this.loading = null;
    this.renderElement = null;
  }

  async init(elementQuery) {
    this.renderElement = document.querySelector(elementQuery);
    this.breadcrumb = new Breadcrumb({ parentElement: this.renderElement });
    this.finder = new Finder({ parentElement: this.renderElement });
    this.imageViewer = new ImageViewer({ parentElement: this.renderElement });
    this.loading = new Loading();
    this.bindEvents();

    await this.fetchFinder();
  }

  bindEvents() {
    this.finder.on("onNextDirectory", (nodeId) => this.next(nodeId));
    this.finder.on("onOpenImageViewer", (nodeId) =>
      this.openImageViewer(nodeId)
    );
    this.breadcrumb.on("back", () => this.back());
  }

  // 디랙토리를 눌렀을 때 다음 디랙토리로 넘어가는 함수 (이때 데이터 요청)
  async next(nodeId) {
    const targetNode = this.finder.nodes.find((node) => node.id === nodeId);
    this.breadcrumb.forward(targetNode);
    await this.fetchFinder(nodeId);
  }

  async back() {
    // 하나만 있는 것은 루트일때므로 얼리리턴 처리합니다.
    if (this.breadcrumb.routes.length <= 1) {
      return;
    }
    this.breadcrumb.back();
    // 브레드크럼에서 현재 최상위 부모 데이터를 받아옵니다.
    const parentNode = this.breadcrumb.getParentNode();
    const nodeId = parentNode?.id;
    await this.fetchFinder(nodeId);
  }

  openImageViewer(nodeId) {
    const targetNode = this.finder.nodes.find((node) => node.id === nodeId);
    this.imageViewer.open(targetNode.filePath);
  }

  async fetchFinder(nodeId = "") {
    this.loading.on();
    const responseBody = await fetchObjects(nodeId);
    this.finder.set(responseBody);
    this.render();
    setTimeout(() => {
      this.loading.off();
    }, 200);
  }

  render() {
    this.finder.render();
    this.breadcrumb.render();
  }
}

export default Album;
