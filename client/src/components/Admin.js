import React, { Component } from 'react'
import Orders from './Orders';
import { connect } from 'react-redux';
import { checkRole } from '../actions/adminAction';


class Admin extends Component {
    render() {
        const isAdmin = this.props;

        return (
            <div>
                {isAdmin.isAdmin ? (
                    <Orders />
                ) : (
                        <h1>Admin access needed...</h1>
                    )}
            </div>
        )
    }
}
export default connect((state) => ({
    isAdmin: state.isAdmin.isAdmin,
}),
    { checkRole }
)(Admin);
