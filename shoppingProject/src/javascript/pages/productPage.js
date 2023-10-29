import { ProductCard } from "../components/ProductCard/index.js";
import Component from "../core/Component.js";
import createComponent from "../core/createComponent.js";
import { LinkToCart } from "../components/Button/index.js";

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: [],
    };
    this.getProductData();
  }

  // 전체 상품 정보 가져오기
  async getProductData() {
    const response = await fetch("https://test.api.weniv.co.kr/mall");
    const data = await response.json();

    this.setState({ product: data });
  }

  // // 상품 리스트 세팅하기
  // async setProductList() {
  //   await this.getProductData();
  //   console.log(this.product);
  // }

  render() {
    this.mainElement = document.createElement("main");

    // this.setProductList();

    this.mainElement.classList.add("product");

    const productPageHeader = document.createElement("h1");
    productPageHeader.setAttribute("class", "ir");
    productPageHeader.innerText = "상품목록 페이지";
    this.mainElement.appendChild(productPageHeader);

    const productList = document.createElement("ul");
    productList.setAttribute("class", "product-list");

    this.state.product.forEach((item) => {
      const productItem = document.createElement("li");
      productItem.setAttribute("class", "product-item");
      if (item.stockCount < 1) {
        productItem.classList.add("sold-out");
      }
      const productCard = new ProductCard({ item: item });
      productItem.appendChild(productCard.render());
      productList.appendChild(productItem);
    });

    const linkToCart = createComponent(LinkToCart, {});

    this.mainElement.append(productList, linkToCart);

    return this.mainElement;
  }
}

export default ProductPage;
