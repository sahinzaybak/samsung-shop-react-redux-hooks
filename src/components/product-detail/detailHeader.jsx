import React, {useState} from 'react'
import { connect } from "react-redux";

//Actions
import {basket} from '../../actions/basket'

const DetailHeader = (product, addBasket) => {
  const [basketLoading, setBasketLoading] = useState(false)
  const [basketSuccess, setBasketSuccess] = useState(false)
  function addBasket(){
    setBasketLoading(true)
    setTimeout(() => {  
       product.basket(product.selectedColor, product.selectedMemory, product.selectedSim, product.name, product.id); //sepete ekle
       setBasketSuccess(true)
    },1200);
    setTimeout(() => {setBasketSuccess(false); setBasketLoading(false)}, 2500);
  }
  return (
    <div className="product-detail__header sticky-top flex-column flex-md-row">
    <h3 className="mb-4 mb-md-0">{product.name}</h3>
      <div className="d-flex align-items-center justify-content-center">
        <div className={`spinner mr-5 pr-2 ${!product.loading ? "d-none" : ""}`} >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
        <p className={`product-detail__price mr-4 ${product.loading ? "d-none" : ""}`}> {product.price} TL</p>
        <div className={`basket-button button pr-5 pl-5 cursor-pointer ${basketLoading ? "disable" : ""} , ${basketSuccess ? "success" : ""}`} onClick={addBasket}>
          <div className="basket-loading d-flex align-items-center">
            <div className="spinner mt-1 mr-3">
              <div className="spinner-border text-light" role="status"></div>
            </div>
            <p>Sepete Ekleniyor</p>
          </div>
          <p className="basket-add-text">Ürünü Sepete Ekle</p>
          <p className="basket-add-success">Sepete Eklendi</p>
          </div>
      </div>
  </div>
  );
};
const mapStateToProps = (state) => {
  return{
    loading: state.products.isLoading,
  }
};

const mapDispatchToProps = {
  basket
};

export default connect(mapStateToProps,mapDispatchToProps)(DetailHeader);