import Component from "../../core/Component.js";

class ProductLikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.checkLikeList(),
    };
  }
  checkLikeList() {
    if (!localStorage.getItem("likeList")) {
      localStorage.setItem("likeList", JSON.stringify([]));
    }
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    return likeList.includes(this.props.id);
  }

  changeLiked() {
    const likeList = JSON.parse(localStorage.getItem("likeList"));

    if (this.checkLikeList()) {
      const newLikeList = likeList.filter((id) => id !== this.props.id);
      localStorage.setItem("likeList", JSON.stringify(newLikeList));
    } else {
      likeList.push(this.props.id);
      localStorage.setItem("likeList", JSON.stringify(likeList));
    }

    this.setState({ liked: this.checkLikeList() });
    // this.state.liked = this.checkLikeList();
  }

  // 클릭을 하면 좋아요 목록에 추한ㅏ
  // 좋아요 목록에 추되ㅆ다면 "on"zmffotmfmf qjxmsdp cnrkgksek
  // 좋아요 목록은 로컬스토리지를 호라용하여 클라에서 저장하도록 한다
  // 문제점 -> Component에서는 render에서 요소를 만들고 컴포넌트를 생성한다
  // 해당 부분에서 요소를 직접 조작하는 것은 규칙에 맞지 않음
  // state로 관리
  // 클릭을 햇을 때 this.liked만 바꿔주자
  // ! addClickEvent(likeButton) {
  //   likeButton.addEventListener("click", (e) => {
  //     e.preventDefault(); // html의 기본동작(새로고침,submit 등)을 막는다.
  //     e.stopPropagation(); // 버블링 중단하기, 클릭했을 때 url이 이동되지 않도록 함

  //     // const likeList = JSON.parse(localStorage.getItem("likeList"));
  //     // this.liked = !this.liked;
  //     // this.liked && likeList.push(this.props.id);
  //     // const newLikeList = this.liked
  //     //   ? likeList
  //     //   : likeList.filter((id) => id != this.props.id);
  //     // localStorage.setItem("likeList", JSON.stringify(newLikeList));

  //     // this.liked
  //     //   ? e.target.classList.add("on")
  //     //   : e.target.classList.remove("on");

  //     this.changeLiked();
  //     console.log(this.liked);
  //   });
  // }
  render() {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    this.state.liked && likeButton.classList.add("on");

    const likeButtonIr = document.createElement("span");
    likeButtonIr.setAttribute("class", "ir");
    likeButtonIr.innerText = "좋아요 버튼";

    likeButton.appendChild(likeButtonIr);
    // this.addClickEvent(likeButton);
    likeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.changeLiked();
      console.log(this.state.liked);
    });

    return likeButton;
  }
  // 최초 초화 -> 내부적으로 render가 실행됨 -> 마지막 랜더링 결과 -> state가 바뀌면 새로운 state에 맞춰서 새로 render
}

export default ProductLikeButton;
