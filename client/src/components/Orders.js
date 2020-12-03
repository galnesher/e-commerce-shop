import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchOrders } from '../actions/orderAction';
import { formatCurrency } from '../util';



class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }
    render() {
        const { orders } = this.props;

        return (
            <div>

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
        ({ orders: state.order.orders }),
    {
        fetchOrders
    }
)(Orders);
