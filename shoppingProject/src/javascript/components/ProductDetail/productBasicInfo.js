import { Component, createComponent } from "../../core/index.js";
import { SectionHeading } from "./index.js";
import { ProductImage, ProductName, ProductPrice } from "../Product/index.js";
import { OrderForm } from "../ProductOrder/index.js";

class ProductBasicInfo extends Component {
  render() {
    const basicInfoSection = document.createElement("section");
    basicInfoSection.setAttribute("class", "product-basic-info");

    // const sectionHeading = document.createElement("h2");
    // sectionHeading.setAttribute("class", "ir");
    // sectionHeading.innerText = "상품 상세 정보";

    const sectionHeading = createComponent(SectionHeading, {
      text: "기본 정보 및 상품 옵션",
    });
    const productImage = createComponent(ProductImage, {
      src: this.props.product.thumbnailImg,
    });

    const productInfoContainer = document.createElement("div");
    productInfoContainer.setAttribute("class", "product-info");

    const productNamePriceContainer = document.createElement("div");
    productNamePriceContainer.setAttribute("class", "product-name-price");

    // 상품 이름
    const productName = createComponent(ProductName, {
      name: this.props.product.productName,
    });
    // 상품 가격
    const productPrice = createComponent(ProductPrice, {
      price: this.props.product.price,
      discountRate: this.props.product.discountRate,
    });
    productNamePriceContainer.append(productName, productPrice);

    const orderForm = createComponent(OrderForm, {
      product: this.props.product,
    });

    productInfoContainer.append(productNamePriceContainer, orderForm);

    basicInfoSection.append(sectionHeading, productImage, productInfoContainer);

    return basicInfoSection;
  }
}

export default ProductBasicInfo;
