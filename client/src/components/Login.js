import React, { Component } from 'react';
import { loginUser } from '../actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailAddress: "",
            password: "",
            redirect: null
        };
    }
    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    loginUser = (e) => {
        e.preventDefault();
        const userDetails = {
            emailAddress: this.state.emailAddress,
            password: this.state.password
        }
        this.props.loginUser(userDetails);
        this.setState({ redirect: "/" });

    }

    render() {
        const user = this.props;
        if (user.isLogged) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-5">
                            <div className="row">
                                <div className="col text-center">
                                    <h1>Login</h1>
                                    <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
                                </div>
                            </div>
                            {user.isLogged ? (
                                <div>
                                    <h1>Login Successs</h1>
                                </div>
                            ) : (
                                    <div className="alert-danger" >
                                        {user.user !== true && (
                                            user.user
                                        )}
                                    </div>
                                )
                            }

                            <form onSubmit={this.loginUser}>
                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="email" name="emailAddress" className="form-control" placeholder="Email" onChange={this.handleInputs} required />
                                    </div>
                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleInputs} required />
                                    </div>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <button type="submit" className="btn btn-success col-4 mb-4">Go</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}








export default connect((state) => ({
    user: state.user.user,
    isLogged: state.user.isLogged,
}),

    { loginUser }


)(Login);


