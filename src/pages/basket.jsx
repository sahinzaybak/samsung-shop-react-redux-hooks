import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { Modal } from 'antd';
import {Link} from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import basketImg from "../assets/images/shopping-cart.svg";
import '../assets/scss/basket.scss'

//Components
import BasketList from '../components/basket-page/basketList'
import BasketSummary from '../components/basket-page/basketSummary'
import CouponCode from '../components/basket-page/couponCode'

const { confirm } = Modal;
class basket extends PureComponent {
  orderComplete(){
    const vm = this.props;
    confirm({
      title: 'Siparişi tamamlamak istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      centered:true,
      okText: 'Evet',
      okType: 'success',
      cancelText: 'Hayır',
      confirmLoading:true,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 1000 ? resolve  : reject, 1000);
          setTimeout(() => {
            vm.history.push("/payment")
          }, 1000);
        }).catch(() =>false);
      },
    });
  }
  render() {
    return (
      <div className="basket-page">
        {this.props.basketList.length == 0 && 
          <div className="d-flex justify-content-between align-items-center no-product flex-column flex-md-row mt-4 mt-md-0">
            <div className="d-flex mb-4 mb-md-0">
              <img className="mr-4" src={basketImg} alt="" />
              <h5>Sepetinizde ürün bulunmamaktadır.</h5>
            </div>
           <div>
            <Link to="/">
             <button className="button green">Hemen Alışverişe Başla</button>
            </Link>
           </div>
          </div>      
        }
        {this.props.basketList.length != 0 && 
          <div className="basket">
            <h4 className="basket-title mt-4 mt-md-0">Sepetim ({this.props.basketList.length} Ürün)</h4>
            <div className="row">
              <div className="col-12 col-lg-8">
                {this.props.basketList.map((basketList,index) => (
                  <BasketList basket={basketList} basketProductIndex={index} key={index}/>
                ))}
              </div>
              <div className="col-12 col-lg-4">
                <div className="basket-summary">
                  <h5 className="basket-title mb-3">Sipariş Özeti</h5>
                  <BasketSummary basket={this.props.basketList}/>
                </div>
                <div className="basket-summary coupon mt-3">
                  <CouponCode />
                </div>
                <a className="button w-100 text-center mt-4 green" onClick={this.orderComplete.bind(this)}>Siparişi Tamamla</a>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    basketList: state.basket.basketList
  };
};

export default connect(mapStateToProps)(basket);
