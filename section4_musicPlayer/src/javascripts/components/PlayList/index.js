import { findIndexListElement, getClosestElement } from "../../utils/index.js";
import EventEmitter from "../common/EventEmitter.js";

export default class PlayList extends EventEmitter {
  constructor() {
    super();
    this.rootElement = PlayList.createRootElement();
    this.musicList = [];
    this.loadStorage();
    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-playlist");

    return rootElement;
  }

  bindEvents() {
    this.rootElement.addEventListener("click", (event) => {
      const { target } = event;
      const isControllerButton = target.tagName === "BUTTON";

      if (!isControllerButton) {
        return this.playMusicItem(target);
      }
      this.removeMusicItem(target);
    });
  }

  playNext(payload) {
    // 현재 연주중인 음악을 찾음
    let currentIndex = this.musicList.findIndex((music) => music.playing);
    const isMusicIndexEnd = currentIndex >= this.musicList.length - 1;
    if (isMusicIndexEnd) {
      currentIndex = -1;
    }

    if (payload) {
      const { repeat, random } = payload;
      // 반복도 랜덤도 없고 리스트 끝 음악이 종료된 것이면 그대로 음악 재생은 더이상 하지 않음
      if (!random && !repeat && isMusicIndexEnd) {
        return;
      }

      // 랜덤인 경우에는 다른 랜덤 재생할 음악을 찾음
      if (random) {
        currentIndex = Math.random() & (this.musicList.length - 2);
      }
    }

    const nextIndex = currentIndex + 1;
    this.playMusicItem(nextIndex);
  }

  playPrev() {
    // 현재 연주중인 음악을 찾음
    let currentIndex = this.musicList.findIndex((music) => music.playing);
    // 첫번째 음악인 경우에는 뒤로가기 하면 리스트의 마지막 곡을 재생해야 하기 때문에 마지막보다 +1인 음악 리스트의 length로 초기화 (나중에 -1 해줄 것이기 때문에)
    if (currentIndex <= 0) {
      currentIndex = this.musicList.length;
    }
    const prevIndex = currentIndex - 1;
    this.playMusicItem(prevIndex);
  }

  playMusicItem(target) {
    const listItemElement =
      typeof target === "number"
        ? this.rootElement.querySelectorAll("li")[target]
        : getClosestElement(target, "li");

    const musicIndex = findIndexListElement(listItemElement);
    const requestPlay = this.musicList[musicIndex].playing;

    this.musicList.forEach((musicInfo) => {
      musicInfo.playing = false;
    });

    this.rootElement
      .querySelectorAll("li")
      .forEach((element) => element.classList.remove("on"));

    if (!requestPlay) {
      listItemElement.classList.add("on");
      this.musicList[musicIndex].playing = true;
      this.emit("play", { musics: this.musicList, musicIndex });
    } else {
      listItemElement.classList.remove("on");
      this.emit("pause");
    }
  }

  removeMusicItem(target) {
    const listItemElement = getClosestElement(target, "li");
    const musicIndex = findIndexListElement(listItemElement);
    this.remove(Number(musicIndex));
    listItemElement.parentElement.removeChild(listItemElement);
  }

  add(music) {
    this.musicList.push(music);
    this.saveStorage();
  }

  remove(index) {
    this.musicList.splice(index, 1);
    this.saveStorage();
  }

  loadStorage() {
    const stringfiedPlaylist = localStorage.getItem("playList");
    try {
      const playList = JSON.parse(stringfiedPlaylist);
      this.musicList = playList instanceof Array ? playList : [];
    } catch (error) {
      console.error(error);
    }
  }

  saveStorage() {
    const musicList = this.musicList.map(
      ({ artists, cover, source, title }) => ({ artists, cover, source, title })
    );

    try {
      localStorage.setItem("playList", JSON.stringify(musicList));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const playListTitle = `<h2 class="playlist-title">MY PLAYLIST</h2>`;
    const musicsList = this.musicList
      .map((music, index) => {
        const { cover, title, artists } = music;
        return `
                <li>
                    <div class="music-content">
                        <div class="music-data">
                            <div class="music-cover">
                                <img src="${cover}" />
                            </div>
                            <div class="music-info">
                                <strong class="music-title">${title}</strong>
                                <em class="music-artist">${artists[0]}</em>
                            </div>
                        </div>
                        <div class="music-simple-controller">
                            <button class="icon icon-minus">
                                <span class="invisible-text">제거</span>
                            </button>
                        </div>
                    </div>
                </li>
            `;
      })
      .join("");
    this.rootElement.innerHTML =
      playListTitle + '<ul class="music-list">' + musicsList + "</ul>";
    return this.rootElement;
  }
}
