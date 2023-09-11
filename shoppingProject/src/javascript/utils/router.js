class Router {
  constructor(routes) {
    if (!routes) {
      console.error("Cannot initialize routes, need routes");
    }
    this.routes = routes;
  }

  init(rootElementId) {
    if (!rootElementId) {
      console.error("Cannot initialize Route, rootElementId not defined");
      return null;
    }
    this.rootElementId = rootElementId;

    debugger;

    // about:black의 window.location.pathname은 blank
    // http://paullab.co.kr/abc의 window.location.pathname은 /abc
    // http://www.paullab.co.kr/about.html 의 경우 about.html
    this.routing(window.location.pathname);

    window.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "a") {
        e.preventDefault();
        this.routePush(e.target.href);
      }
    });

    // 뒤로가기 버튼눌렀을 때
    window.onpopstate = () => this.routing(window.location.pathname);
  }

  routePush(pathname) {
    window.history.pushState({}, null, pathname);
    this.routing(window.location.pathname);
  }

  routing(pathname) {
    const [_, routeName, ...param] = pathname.split("/");
    let page = "";

    debugger;

    if (this.routes[pathname]) {
      const component = new this.routes[pathname]();
      page = component.render();
    }

    if (page) {
      this.render(page);
    }
  }

  render(page) {
    const rootElement = document.querySelector(this.rootElementId);
    rootElement.innerHTML = "";
    rootElement.appendChild(page);
  }
}

export default Router;
