import Component from "../../core/Component.js";

class ProductPrice extends Component {
  render() {
    const productPriceContainer = document.createElement("div");
    productPriceContainer.setAttribute("class", "product-price");

    const productPrice = document.createElement("strong");
    productPrice.setAttribute("class", "price m-price");
    const priceType = document.createElement("span");
    priceType.innerText = "원";
    productPriceContainer.appendChild(productPrice);

    if (this.props.discountRate > 0) {
      // 할인된 금액 계산
      // this.props.price = 뭔가 할인율이 계산된 금액
      // 할인과 관련된 elements를 추가한다
      const discountRateContainer = document.createElement("div");
      discountRateContainer.setAttribute("class", "price-discount");

      const originPrice = document.createElement("strong");
      originPrice.setAttribute("class", "price-strikethrough");
      originPrice.innerText =
        this.props.price.toLocaleString("ko-Kr") + priceType.innerText;
      originPrice.appendChild(priceType);

      const discountRateDisplay = document.createElement("strong");
      discountRateDisplay.setAttribute("class", "discount-rate");
      discountRateDisplay.innerText = this.props.discountRate + "%";

      this.props.price =
        this.props.price - this.props.price * (0.01 * this.props.discountRate);

      discountRateContainer.appendChild(originPrice);
      // discountRateContainer.appendChild(priceType.cloneNode(true)); // 여기에 priceType주고 아래에도 priceType을 주면 나중에 주어진것만 적용되어 cloneNode해줘야함. true로 하면 자식노드까지
      discountRateContainer.appendChild(discountRateDisplay);
      productPriceContainer.appendChild(discountRateContainer);
    }

    productPrice.innerText = this.props.price.toLocaleString("ko-Kr"); // 할인된 금액을 마지막에 적용

    // console.log(`producePrice is ${productPrice.innerText}`);

    productPrice.appendChild(priceType); // 이게 innerText보다 위에 있으면 innerText가 지워버리니 아래에 위치

    return productPriceContainer;
  }
}

export default ProductPrice;
