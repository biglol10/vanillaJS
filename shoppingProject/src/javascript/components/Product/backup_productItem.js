class ProductItem {
  constructor(item) {
    this.item = item;
  }
  render() {
    const productItem = document.createElement("li");
    // productItem.innerHTML = `<a href="/detail/${this.item.id}" class="product-item">
    //     <div class="product-img">
    //       <img src="http://test.api.weniv.co.kr/${this.item.thumbnailImg}" alt="">
    //     </div>

    //     <strong class="product-name">${this.item.productName}</strong>
    //     <div class="product-price">
    //       <strong class="price m-price">${this.item.price}<span>원</span></strong>
    //     </div>

    //   </a>`;

    const productCard = document.createElement("a");
    productCard.setAttribute("href", `/detail/${this.item.id}`);
    productCard.setAttribute("class", "product-item");

    const productImageContainer = document.createElement("div");
    productImageContainer.setAttribute("class", "product-img");

    const productImage = document.createElement("img");
    productImage.setAttribute(
      "src",
      `http://test.api.weniv.co.kr/${this.item.thumbnailImg}`
    );
    productImage.setAttribute("alt", `상품이미지`);
    productImageContainer.appendChild(productImage);

    const productName = document.createElement("strong");
    productName.setAttribute("class", "product-name");
    productName.innerText = this.item.productName;

    const productPriceContainer = document.createElement("div");
    productPriceContainer.setAttribute("class", "product-price");

    const productPrice = document.createElement("strong");
    productPrice.setAttribute("class", "price m-price");
    productPrice.innerText = this.item.price;

    const priceType = document.createElement("span");
    priceType.innerText = "원";

    productPrice.appendChild(priceType);

    productPriceContainer.appendChild(productPrice);

    productCard.appendChild(productImageContainer);
    productCard.appendChild(productName);
    productCard.appendChild(productPriceContainer);

    productItem.appendChild(productCard);

    return productItem;
  }
}

export default ProductItem;
