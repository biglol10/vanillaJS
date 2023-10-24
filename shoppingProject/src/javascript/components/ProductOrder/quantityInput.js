import { Component } from "../../core/index.js";

class QuantityInput extends Component {
  constructor(props) {
    super(props);
  }

  increaseQuantity() {
    // console.log(this); // <button type="button" class="quantity-plus"><span class="ir">수량 추가</span></button>
    // this가 button인 이유는 이 메소드가 실행되는 곳이 이 클래스 내에서 NewQuantityInput으로 만들어낸 그 객체에서 나오는 게 아니라 버튼이라는 요소가 실행시키는 주체가 되어서
    // increaseQuantity라는 메소드를 실행하는 시점에 this는 quantityIncreaseButton 요소가 됨
    // 그래서 this.increaseQuantity.bind(this) [render가 실행되는 시점에서의 this]
    const newQuantity = this.props.quantity + 1;
    this.props.setQuantity(newQuantity);
  }
  decreaseQuantity() {
    const newQuantity = this.props.quantity - 1;
    this.props.setQuantity(newQuantity);
  }
  onChangeQuantityInput(e) {
    const newQuantity = Number(e.target.value);
    this.props.setQuantity(newQuantity);
  }

  render() {
    console.log(this.props);
    const quantityOption = document.createElement("div");
    quantityOption.setAttribute("class", "quantity-option");

    const quantityIncreaseButton = document.createElement("button");
    quantityIncreaseButton.type = "button";
    quantityIncreaseButton.setAttribute("class", "quantity-plus");
    quantityIncreaseButton.addEventListener(
      "click",
      this.increaseQuantity.bind(this)
    );

    const increaseButtonIr = document.createElement("span");
    increaseButtonIr.setAttribute("class", "ir");
    increaseButtonIr.innerText = "수량 추가";

    quantityIncreaseButton.append(increaseButtonIr);

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.setAttribute("class", "quantity-input");
    quantityInput.setAttribute("id", `quantityInput${this.props.product.id}`);
    quantityInput.value = this.props.quantity;
    quantityInput.addEventListener(
      "change",
      this.onChangeQuantityInput.bind(this)
    );

    const quantityLabel = document.createElement("label");
    quantityLabel.setAttribute("class", "ir");
    quantityLabel.setAttribute("for", `quantityInput${this.props.product.id}`);
    quantityLabel.innerText = "수량";

    const decreaseButtonIr = document.createElement("span");
    decreaseButtonIr.setAttribute("class", "ir");
    decreaseButtonIr.innerText = "수량 감소";

    const quantityDecreaseButton = document.createElement("button");
    quantityDecreaseButton.type = "button";
    quantityDecreaseButton.setAttribute("class", "quantity-minus");
    quantityDecreaseButton.addEventListener(
      "click",
      this.decreaseQuantity.bind(this)
    );

    quantityDecreaseButton.append(decreaseButtonIr);

    quantityOption.append(
      quantityDecreaseButton,
      quantityInput,
      quantityIncreaseButton,
      quantityLabel
    );

    return quantityOption;
  }
}

export default QuantityInput;
