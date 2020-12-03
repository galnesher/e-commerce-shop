import React, { Component } from 'react'
import { connect } from 'react-redux';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { formatCurrency } from '../util';
import { createOrder, clearOrder } from '../actions/orderAction';
import logo from '../Images/logo.png';




class Checkout extends Component {
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
            redirect: null

        }
    }
    componentDidMount() {
        Modal.setAppElement('body');
    }

    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    refreshPage = () => {
        window.location.href = "/";
    }

    closeOrderModal = async () => {
        this.props.clearOrder();
        this.refreshPage();
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
        const { order, isLogged } = this.props;
        const date = Date().toLocaleString();
        return (
            <div>
                {isLogged ? (
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="card">
                                <form onSubmit={this.createOrder}>
                                    <div className=" align-items-center mt-4">
                                        <div className="col">
                                            <input type="text" name="phoneNumber" className="form-control" placeholder="Phone Number" onChange={this.handleInputs} required />
                                        </div>
                                        <div className="col mt-2">
                                            <input type="text" name="country" className="form-control" placeholder="Country" onChange={this.handleInputs} required />
                                        </div>
                                        <div className="col mt-2">
                                            <input type="text" name="city" className="form-control" placeholder="City" onChange={this.handleInputs} required />
                                        </div>
                                        <div className="col mt-2">
                                            <input type="text" name="postalcode" className="form-control" placeholder="Postalcode" onChange={this.handleInputs} required />
                                        </div>
                                        <div className="col mt-2">
                                            <input type="text" name="address" className="form-control" placeholder="Address" onChange={this.handleInputs} required />
                                        </div>
                                    </div>
                                    <div >
                                        <div className="col mt-2">
                                            <button type="submit" className="btn btn-primary mb-2" >Create Order</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            {
                                order && (
                                    <Modal isOpen={true}
                                        onRequestClose={this.closeOrderModal}>
                                        <Zoom>
                                            <button className="btn btn-danger" onClick={this.closeOrderModal}>x</button>
                                            <div className="container pt-2 pt-md-4 px-md-5">
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td className="border-0">
                                                                <div className="row">
                                                                    <div className="col-md text-center text-md-left mb-3 mb-md-0">

                                                                        <img className="logo Logo img-fluid mb-3"
                                                                            src={logo} alt="LOGO"
                                                                        />
                                                                        <h2 className="mb-1">Whatches for you</h2>
                                                                        <p> 787 Brunswick, Los Angeles, CA 50028</p>
                                                                        <p> support@360wfy.co / 4444 555 555</p>
                                                                        <strong>wfy.co</strong>
                                                                    </div>
                                                                    <div className="col text-center text-md-right">
                                                                        <span className="d-none d-md-block">
                                                                            <h1>Billed To</h1>
                                                                        </span>
                                                                        <h4 className="mb-0">{order.name}</h4>
                                                                        <h6>  {order.address},{order.city}</h6>
                                                                        <h6> {order.country},{order.postalcode}</h6>
                                                                        <h6>{order.email}</h6>
                                                                        <h6>{order.phoneNumber}</h6>
                                                                        <h5 className="mb-0 mt-3">{date}</h5>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Summary</th>
                                                            <th className="text-right">Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order.cartItems.map((x) => (
                                                            <tr key={x._id}>
                                                                <td>
                                                                    {x.count} {"*"} {x.title}
                                                                </td>
                                                                <td className="font-weight-bold align-middle text-right text-nowrap">{formatCurrency(x.price * x.count)}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td className="text-right border-0 pt-4 colspan-2">
                                                                <h5>Total: {formatCurrency(order.totalPrice)}</h5>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>




                                            {/* <div>
                                                <h3 className="text-success">Order has been placed :)</h3>
                                                            <h2>Order ID : {order._id}</h2>

                                                            <ul>
                                                                <li>
                                                                    <div>Name</div>
                                                                    <div>{order.name}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Email</div>
                                                                    <div>{order.email}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Phone Number</div>
                                                                    <div>{order.phoneNumber}</div>
                                                                </li>
                                                                <li>
                                                                    <div>City</div>
                                                                    <div>{order.city}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Address</div>
                                                                    <div>{order.address}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Postalcode</div>
                                                                    <div>{order.a}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Total</div>
                                                                    <div>{formatCurrency(order.totalPrice)}</div>
                                                                </li>
                                                                <li>
                                                                    <div>Cart Items:</div>
                                                                    <div>{order.cartItems.map((x) => (
                                                                        <div>
                                                                            {x.count} {"*"} {x.title}
                                                                        </div>
                                                                    ))}</div>
                                                                </li>
                                                            </ul>
                                            </div> */}
                                        </Zoom>
                                    </Modal>
                                )
                            }
                        </div>
                    </div>
                ) : (
                        <div>
                            <h1>Ops... You must log in to purchase  </h1>
                        </div>
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
    { createOrder, clearOrder }
)(Checkout);