import React, { Component } from 'react'

import './ThankYou.css'

export default class ThankYou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.customer.firstname,
        }
    }

    componentWillMount() {
        // Hide the NavBar initially
        this.props.setNavbarIsVisible(false);

        /* Delete session data and redirect to home page.

        Also check if it wasn't deleted already, 
        because every state change also causes this component to remount.
        That means if the cartList has no item in it, it was reset already 
        and the code doesn't need to be executed again */
        if (this.props.cartList[0]) {
          // Delete Session data if it wasn't reset already
          this.props.setCartList([]);
          this.props.setProdIdsInCartList([]);
          this.props.setCustomerData({});

          // After a few seconds redirect to homepage
          setTimeout(() => {
            this.props.history.push("/");
          }, 6000);
        } 
    }

    componentWillUnmount() {
        // Display the navbar again, if it isn't already 
        if (this.props.navbarIsVisible === false) {
            this.props.setNavbarIsVisible(true);  
        }
    }
    
    includeCustomerName() {
        if (this.state.name) {
            return `, ${this.state.name}`
        } else {
            return null
        }
    }

    render() {
        return (
            <div className="thanksLayout">
                <h1 className="thanksTitle">Thank you for your purchase at Rounderful{this.includeCustomerName()} 😀</h1>
                <h2 className="thanksDelivery">Your delivery will arrive within the next 2 - 3 workdays 🚚</h2>
                <h3 className="thanksLogout">You will be logged out automatically.</h3>
            </div>
        )
    }
}
