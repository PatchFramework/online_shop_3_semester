import { Component } from 'react';

import './CartInformation.css'
export default class CartInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {toggleItems: false};
        this.arrowCss = "arrow down";
        this.totalCartItems = null;
        this.totalPrice = null;
    }

    calcPrice(array) {
        if(this.totalPrice) {
            return this.totalPrice;
        } else {
          let price = 0;
          array.forEach((item) => {
            price += item.amount * item.price;
          });
          return price;
        }
    }

    calcTotalCartItems(array) {
        if (this.totalCartItems) {
            return this.totalCartItems;
        } else {
            let totalAmount = 0;
          array.forEach((item) => {
            totalAmount += item.amount;
          });
          return totalAmount;
        }
    }

    handleToggle() {
        this.arrowCss = `arrow ${!this.state.toggleItems ? 'up' : 'down'}`
        let toggleList = document.getElementById("cartItemsList");
        console.log(toggleList.style);
        
        // toggle visibility of items list: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_accordion_animate
        if(toggleList.style.height){
            toggleList.style.height = null;
        } else {
            toggleList.style.height = toggleList.scrollHeight + "px";
        }
        
        this.setState({toggleItems: !this.state.toggleItems})
    }

    render() {
        return (
          <div className="cartInformationLayout">
            <div className="cartPriceLayout">
              <div className="cartDescriber">Cart Value</div>

              <button
                className="collapseToggleCartItems"
                onClick={() => this.handleToggle()}
              >
                <div className="cartItemsDescriber">Details</div>
                <i className={this.arrowCss} />
              </button>

              <div className="cartPrice">
                {this.calcPrice(this.props.cartList)} €
              </div>
            </div>

            <div id="cartItemsList">
              <div className="cartItemsLegend">
                <div>Amount</div>
                <div>Description</div>
                <div>Total Price</div>
              </div>
              <hr />

              {this.props.cartList.map((item) => {
                return (
                  <div className="cartListItem" key={item.id}>
                    <div className="cartItemsAmount">{item.amount} x </div>
                    <div className="cartItemsDescription">
                      {item.title}
                      <div className="cartItemsPrice">{item.price} €</div>
                    </div>
                    <div className="cartItemsTotalPrice">
                      {item.amount * item.price} €
                    </div>
                  </div>
                );
              })}

              <hr />
              <div className="cartItemsResult">
                <div>{this.calcTotalCartItems(this.props.cartList)} Item(s)</div>
                <div>{this.calcPrice(this.props.cartList)} €</div>
              </div>
            </div>
          </div>
        );
    }
}