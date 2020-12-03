import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { formatCurrency } from '../util';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import { createOrder, clearOrder } from '../actions/orderAction';


class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: "",
            phoneNumber: "",
            country: "",
            city: "",
            postalcode: "",
            userId: localStorage.getItem('userId'),
            name: localStorage.getItem('userName'),
            email: localStorage.getItem('userEmail'),

            showCheckout: false
        }
    }



    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    closeOrderModal = () => {
        this.props.clearOrder();
    }


    createOrder = (e) => {
        e.preventDefault();
        const order = {
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            country: this.state.country,
            city: this.state.city,
            postalcode: this.state.postalcode,
            userId: this.state.userId,
            name: this.state.name,
            email: this.state.email,
            cartItems: this.props.cartItems,
            totalPrice: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
        }
        this.props.createOrder(order);
    }



    render() {
        const { cartItems, isLogged } = this.props;
        return (

            <div className="container mt-2 bg-white rounded ">
                {cartItems.length === 0 ? (
                    <div className="title">Cart is empty</div>
                ) : (
                        <div className="card-header ">
                            <i className="fa fa-shopping-cart fa-lg " aria-hidden="true">
                                <span className="badge badge-light text-danger">
                                    {cartItems.reduce((a, c) => a + c.count, 0)}
                                </span>
                            </i>
                        </div>
                    )}
                <Fade left cascade>
                    <div>
                        {cartItems.map(item => (
                            <div className="container item bg-light shadow-lg" key={item._id}>
                                <div className="row offset-11">
                                    <button onClick={() => this.props.removeFromCart(item)} className="close btn-danger mt-2 rounded">x</button>
                                </div>

                                <div className="row ">
                                    <div className="image col-sm-5">
                                        <img className="cartImage" src={item.image} alt={item.title} />
                                    </div>
                                    <div className="title col">
                                        <h6>{item.title}</h6>
                                    </div>
                                </div>

                                <div className="quantity right">
                                    <p> Qty:  {item.count} x {formatCurrency(item.price)} {" "} </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Fade>
                {cartItems.length !== 0 && (
                    <div>
                        <div className="card-title">
                            <h5>
                                Total Price : {formatCurrency(
                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                            )}</h5>
                            {isLogged ? (
                                <div>
                                    <button className="btn-lg btn-success "><Link to="/checkout" className="text-white">Buy Now</Link></button>
                                </div>
                            ) : (
                                    <div>
                                        <button className="btn-lg btn-success">Buy Now</button>
                                        <h6 className="alert-warning">You must log in to purchase </h6>
                                    </div>
                                )}
                        </div>

                    </div >
                )
                }

            </div>

        )
    }
}

export default connect((state) => ({
    cartItems: state.cart.cartItems,
    order: state.order.order,
    isLogged: state.user.isLogged

}),
    { removeFromCart, createOrder, clearOrder }
)(Cart);


