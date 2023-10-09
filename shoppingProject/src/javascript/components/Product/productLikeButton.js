import Component from "../../core/Component.js";

class ProductLikeButton extends Component {
  constructor(props) {
    super(props);
    this.liked = this.checkLikeList();
  }
  checkLikeList() {
    if (!localStorage.getItem("likeList")) {
      localStorage.setItem("likeList", JSON.stringify([]));
    }
    const likeList = JSON.parse(localStorage.getItem("likeList"));
    return likeList.includes(this.props.productId);
  }
  addClickEvent(likeButton) {
    likeButton.addEventListener("click", (e) => {
      e.preventDefault(); // html의 기본동작(새로고침,submit 등)을 막는다.
      e.stopPropagation(); // 버블링 중단하기, 클릭했을 때 url이 이동되지 않도록 함
      //   this.liked = !this.liked;

      //   this.liked
      //     ? e.target.classList.add("on")
      //     : e.target.classList.remove("on");
      const likeList = JSON.parse(localStorage.getItem("likeList"));
      this.liked = !this.liked;
      this.liked && likeList.push(this.props.productId);
      const newLikeList = this.liked
        ? likeList
        : likeList.filter((id) => id != this.props.productId);
      localStorage.setItem("likeList", JSON.stringify(newLikeList));

      this.liked
        ? e.target.classList.add("on")
        : e.target.classList.remove("on");
    });
  }
  render() {
    const likeButton = document.createElement("button");
    likeButton.setAttribute("class", "like-btn");
    this.liked && likeButton.classList.add("on");

    const likeButtonIr = document.createElement("span");
    likeButtonIr.setAttribute("class", "ir");
    likeButtonIr.innerText = "좋아요 버튼";

    likeButton.appendChild(likeButtonIr);
    this.addClickEvent(likeButton);

    return likeButton;
  }
}

export default ProductLikeButton;
