export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  // App.js에서 TabButton객체로 뭔가 이벤트를 줄 때 사용할 수 있는 함수
  // on은 통신을 받는 함수
  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  // App.js와 통신할 수 있게끔 하는 함수
  // emit은 통신을 건내주거나 실행하는 함수
  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
