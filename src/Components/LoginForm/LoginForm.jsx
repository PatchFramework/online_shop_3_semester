import React, { Component } from 'react';
import CartInformation from './CartInformation';

import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: {
                ...props.customerData
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // ######### Functions ##########
    handleSubmit(){
        // Set customer data in super state
        this.props.setCustomerData(this.state.customer);

        if (this.props.isCheckout) {
            // redirect to thank you page
            this.props.history.push("/thankyou")
        } else {
            // redirect to products page
            this.props.history.push("/");
        }
    }

    handleCancel(){
      this.props.history.push("/cart");
    }

    handleChange(e){
        let field = e.target.name; // name of the input field
        let value = e.target.value; // value entered into that field

        // Modify the customer data in state by adding new user input
        this.setState({
          customer: {
            ...this.state.customer,
            [field]: value,
          },
        });
    }


    // ########## Main ##########
    
    render() {
        return (
          <div className="loginFormContainer">
            {/* Only render information about the cart if we are about to checkout */}
            {this.props.isCheckout && <CartInformation {...this.props} />}

            <form onSubmit={() => this.handleSubmit()}>
              <div className="loginFormLayout">
                <div className="formHeadlineLayout">
                  <h4 className="formHeadline">General Information</h4>
                  <hr className="formSection" />
                </div>

                <label>
                  First Name
                  <input
                    type="text"
                    className="fName"
                    name="firstname"
                    defaultValue={this.state.customer.firstname}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    className="lName"
                    name="lastname"
                    defaultValue={this.state.customer.lastname}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  E-Mail
                  <input
                    type="email"
                    className="email"
                    name="email"
                    defaultValue={this.state.customer.email}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Address
                  <input
                    type="text"
                    className="address"
                    name="address"
                    defaultValue={this.state.customer.address}
                    onChange={this.handleChange}
                    required
                  />
                </label>
                <label>
                  Zip Code
                  <input
                    type="text"
                    className="zip"
                    name="zip"
                    defaultValue={this.state.customer.zip}
                    onChange={this.handleChange}
                    required
                  />
                </label>

                { /* Show payment form only if the customer checks out */
                this.props.isCheckout && (
                  <>
                    <div className="formHeadlineLayout">
                      <h4 className="formHeadline">
                        Payment (please don't enter real bank information)
                      </h4>
                      <hr className="formSection" />
                    </div>
                    <label>
                      IBAN
                      <input
                        type="text"
                        className="iban"
                        name="iban"
                        defaultValue={this.state.customer.iban}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                    <label>
                      BIC (Swift Code)
                      <input
                        type="text"
                        className="bic"
                        name="bic"
                        defaultValue={this.state.customer.bic}
                        onChange={this.handleChange}
                        required
                      />
                    </label>
                  </>
                )}
              </div>
              <div className="buttonLayout">
                <button className="button cancel" type="button" onClick={() => this.handleCancel()}>Cancel</button>
                <button type="submit" className="button submit">
                  {this.props.isCheckout ? "Confirm & Checkout" : "Login"}
                </button>
              </div>
            </form>
          </div>
        );
    }
}
