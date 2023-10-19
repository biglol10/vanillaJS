import Component from "../../core/Component.js";

class ProductBasicInfo extends Component {
  render() {
    const basicInfoSection = document.createElement("section");
    basicInfoSection.setAttribute("class", "product-basic-info");

    return basicInfoSection;
  }
}

export default ProductBasicInfo;
