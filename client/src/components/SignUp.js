import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createUser, clearRegister } from '../actions/userActions';
import { Redirect } from "react-router-dom";




class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            emailAddress: "",
            password: "",
            confirmPassword: "",
            redirect: null
        };
    }

    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    createUser = (e) => {
        e.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            emailAddress: this.state.emailAddress,
            password: this.state.password,
            role: 'User',
        }
        this.props.createUser(user);
        this.setState({ redirect: "/" });

    }



    validateConfirmPassword = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            return false;
        } else
            return true;
    }

    closeModal = () => {
        this.props.clearRegister();
    }

    render() {
        const user = this.props;
        const validateConfirmPassword = this.validateConfirmPassword
        if (user.user === true) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                            <div className="row">
                                <div className="col text-center">
                                    <h1>Register</h1>
                                    <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
                                    {user.user && (
                                        <div className="">
                                            {user.user === true ? (
                                                <div>
                                                    <h5 className="col alert-success">{user.user}</h5>
                                                </div>
                                            ) :
                                                <div>
                                                    <h5 className="col alert-danger">{user.user}</h5>
                                                </div>
                                            }
                                        </div>
                                    )}
                                </div>
                            </div>

                            <form onSubmit={this.createUser}>
                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="text" name="firstName" className="form-control" placeholder="First Name" onChange={this.handleInputs} required />
                                    </div>
                                    <div className="col">
                                        <input type="text" name="lastName" className="form-control" placeholder="Last Name" onChange={this.handleInputs} required />
                                    </div>
                                </div>

                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="email" name="emailAddress" className="form-control" placeholder="Email" onChange={this.handleInputs} required />
                                    </div>
                                </div>
                                <div className="row align-items-center mt-4">
                                    <div className="col">
                                        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleInputs} required />
                                    </div>
                                    <div className="col">
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" onChange={this.handleInputs} required />
                                    </div>
                                    <div className="">
                                        {!validateConfirmPassword(this.state.password, this.state.confirmPassword) && (
                                            <div>
                                                <p className="text-danger bold">The passwords are not the samed </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="row justify-content-start mt-4">
                                    <div className="col">
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input" />
                                              I Read and Accept <a href="https://www.froala.com">Terms and Conditions</a>
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
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
}),

    { createUser, clearRegister }


)(SignUp);


