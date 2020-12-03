import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/adminAction';


class User extends Component {

    componentDidMount() {
        this.props.fetchUsers();
    }
    render() {
        const { users } = this.props
        return (
            <div>
                {users && (
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th>
                                    ID
        </th>
                                <th>
                                    First Name
        </th>
                                <th>
                                    Last Name
        </th>
                                <th>
                                    Email
        </th>
                                <th>
                                    createdAt
        </th>
                                <th>
                                    updatedAt
        </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailAddress}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.updatedAt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }
}

export default connect((state) => ({
    users: state.admin.users
}),
    {
        fetchUsers,
    })(User)
