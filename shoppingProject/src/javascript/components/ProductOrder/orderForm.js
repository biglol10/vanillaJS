import { Component, createComponent } from "../../core/index.js";
import { QuantityInput, OptionSelector } from "./index.js";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }
  increaseQuantity() {
    // console.log(this); // <button type="button" class="quantity-plus"><span class="ir">수량 추가</span></button>
    // this가 button인 이유는 이 메소드가 실행되는 곳이 이 클래스 내에서 NewQuantityInput으로 만들어낸 그 객체에서 나오는 게 아니라 버튼이라는 요소가 실행시키는 주체가 되어서
    // increaseQuantity라는 메소드를 실행하는 시점에 this는 quantityIncreaseButton 요소가 됨
    // 그래서 this.increaseQuantity.bind(this) [render가 실행되는 시점에서의 this]
    const newQuantity = this.state.quantity + 1;
    if (newQuantity > this.props.product.stockCount) return;
    this.setState({ quantity: newQuantity });
  }
  decreaseQuantity() {
    const newQuantity = this.state.quantity - 1;
    if (newQuantity < 1) return;
    this.setState({ quantity: newQuantity });
  }
  onChangeQuantityInput(e) {
    const maxQuantity = this.props.product.stockCount;
    const newQuantity = Number(e.target.value);
    if (newQuantity > maxQuantity)
      this.setState({ quantity: this.props.product.stockCount });
    else if (newQuantity < 1) this.setState({ quantity: 1 });
    else this.setState({ quantity: newQuantity });
  }
  render() {
    const orderForm = document.createElement("form");
    orderForm.setAttribute("class", "product-order-form");

    const productOptionContainer = document.createElement("div");
    productOptionContainer.setAttribute("class", "product-option");

    const deliveryTitle = document.createElement("span");
    deliveryTitle.setAttribute("class", "delivery-title");
    deliveryTitle.innerText = `택배 배송 / ${
      this.props.product.shippingFee > 0
        ? this.props.product.shippingFee.toLocaleString("ko-Kr") + "원"
        : "무료 배송"
    }`;

    const selectedProductContainer = document.createElement("div");
    selectedProductContainer.setAttribute("class", "selected-product");
    console.log(this.props.product.option.length, "옵션 개수");

    if (this.props.product.option.length > 0) {
      // 옵션이 있을 때
      const optionSelector = createComponent(OptionSelector, {
        option: this.props.product.option,
      });

      selectedProductContainer.append(optionSelector);
    } else {
      // 옵션이 없을 때
      const quantityInput = createComponent(QuantityInput, {
        ...this.props,
        quantity: this.state.quantity,
        increaseQuantity: this.increaseQuantity.bind(this),
        decreaseQuantity: this.decreaseQuantity.bind(this),
        onChangeQuantityInput: this.onChangeQuantityInput.bind(this),
      });
      selectedProductContainer.append(quantityInput);
    }

    const totalPriceContainer = document.createElement("div");
    totalPriceContainer.setAttribute("class", "total-price");

    const totalPriceTitle = document.createElement("span");
    totalPriceTitle.setAttribute("class", "title");
    totalPriceTitle.innerText = "총 상품금액";

    const totalOrderInfo = document.createElement("div");
    totalOrderInfo.setAttribute("class", "total-order-info");

    const productQuantity = document.createElement("strong");
    productQuantity.setAttribute("class", "quantity");

    const productQuantityNum = document.createElement("span");
    // quantityInput기능 구현되면서 같이 반영하기
    productQuantityNum.innerText = this.state.quantity.toLocaleString("ko-Kr");

    productQuantity.append("총 수량", productQuantityNum, "개");

    const totalPrice = document.createElement("strong");
    totalPrice.setAttribute("class", "price l-price");
    totalPrice.innerText = (
      this.props.product.price * this.state.quantity
    ).toLocaleString("ko-Kr");

    const priceType = document.createElement("span");
    priceType.innerText = "원";
    totalPrice.append(priceType);

    totalOrderInfo.append(productQuantity, totalPrice);

    totalPriceContainer.append(totalPriceTitle, totalOrderInfo);

    productOptionContainer.append(deliveryTitle, selectedProductContainer);
    orderForm.append(productOptionContainer, totalPriceContainer);

    return orderForm;
  }
}

export default OrderForm;
