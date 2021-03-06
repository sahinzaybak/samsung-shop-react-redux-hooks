import React, { PureComponent } from "react";
import { connect } from "react-redux";
import '../assets/scss/product-detail.scss'

//Actions
import {getProductDetail,productDetailClear} from '../actions/products'
import {holdChoosenProductInfo} from '../actions/productStorage'

//Components
import ProductInfo from '../components/productDetailInfo'
import ProductDetailLoader from '../components/content-loader/product-detail-loader'

class productDetail extends PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug; 
    this.props.getProductDetail(slug)
    let isSelectedProductInfo = JSON.parse(localStorage.getItem("selectedProductInfo"))

    //Herhangi bir ürün detay(gb, renk) seçilmediğinde default gelecek bilgiler.
    if(isSelectedProductInfo == null) this.props.holdChoosenProductInfo(0,0,0) 
    else this.props.holdChoosenProductInfo(isSelectedProductInfo.colorId, isSelectedProductInfo.memoryId, isSelectedProductInfo.simId)
  }

  componentWillUnmount(){ //sayfadan çıkıldığı zaman product list'i temizle.
    this.props.productDetailClear()
  }

  render() {
    return (
      <div className="product-detail">
        {this.props.productDetail.length != 0 && <ProductInfo productInfo={this.props.productDetail} /> }
        {this.props.productDetail.length == 0 && <ProductDetailLoader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productDetail: state.products.productDetail
  };
};

const mapDispatchToProps = {
  getProductDetail,
  holdChoosenProductInfo,
  productDetailClear
};

export default connect(mapStateToProps, mapDispatchToProps)(productDetail);
