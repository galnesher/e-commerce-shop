import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchOrders } from '../../actions/adminAction';
import { formatCurrency } from '../../util';



class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID: "",
            orderByID: null,
        }
    }

    componentDidMount() {
        this.props.fetchOrders();
    }

    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    searchOrderByID = async (e) => {
        e.preventDefault();
        let orders = await this.props.orders;
        let order = await orders.filter(item => item._id === this.state.orderID);
        this.setState({ orderByID: order });
        return this.state.orderByID;
    }


    render() {
        const { orders } = this.props;
        const { orderByID } = this.state;
        return (
            <div>
                <div>
                    <form onSubmit={this.searchOrderByID} >
                        <label>Search Order By ID:</label>
                        <input type="text" name="orderID" onChange={this.handleInputs} placeholder="ID" />
                        <button type="submit">Search</button>
                    </form>
                    <div>
                        {orderByID && (
                            <div>
                                <table className="table table-striped table-dark">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>
                                                ID
                    </th>
                                            <th>
                                                Name
                    </th>
                                            <th>
                                                City
                    </th>
                                            <th>
                                                Address
                    </th>
                                            <th>
                                                Postalcode
                    </th>
                                            <th>
                                                Email
                    </th>
                                            <th>
                                                Date
                    </th>
                                            <th>
                                                Total
                    </th>
                                            <th>
                                                Items
                    </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderByID.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.name}</td>
                                                <td>{order.city}</td>
                                                <td>{order.address}</td>
                                                <td>{order.postalcode}</td>
                                                <td>{order.email}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{formatCurrency(order.totalPrice)}</td>
                                                <td>
                                                    {order.cartItems.map((item) => (
                                                        <div>
                                                            {item.count} {" X "} {item.title}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {order.cartItems.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    {!orders ? (
                        <div>Loading</div>
                    ) : (
                            <div>
                                <h2>Orders</h2>
                                <table className="table table-striped table-dark">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>
                                                ID
                    </th>
                                            <th>
                                                Name
                    </th>
                                            <th>
                                                City
                    </th>
                                            <th>
                                                Address
                    </th>
                                            <th>
                                                Postalcode
                    </th>
                                            <th>
                                                Email
                    </th>
                                            <th>
                                                Date
                    </th>
                                            <th>
                                                Total
                    </th>
                                            <th>
                                                Items
                    </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.name}</td>
                                                <td>{order.city}</td>
                                                <td>{order.address}</td>
                                                <td>{order.postalcode}</td>
                                                <td>{order.email}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{formatCurrency(order.totalPrice)}</td>
                                                <td >
                                                    {order.cartItems.map((item) => (
                                                        <div key={item._id}>
                                                            {item.count} {" X "} {item.title}
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {order.cartItems.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div >
                        )
                    }
                </div>
            </div>

        )
    }
}


export default connect(
    (state) =>
        ({ orders: state.admin.orders }),
    {
        fetchOrders
    }
)(Order);
