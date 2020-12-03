import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { checkRole } from '../actions/adminAction';
import logo from '../Images/logo.png';




class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        }
    }
    logoutUser = (e) => {
        this.props.logoutUser();
        this.setState({ redirect: "/" });
        this.refreshPage();
    }

    refreshPage = () => {
        window.location.reload();
    }


    render() {
        const user = this.props;
        const isAdmin = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                            <Link className="navbar-brand" to="/"><img className="navLogo" src={logo} alt="LogoImg" /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto ">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/">Home</Link>
                                    </li>
                                    {!user.isLogged ? (
                                        <div className="row">
                                            <li className="nav-item col">
                                                <Link className="nav-link" to="/login">Login</Link>
                                            </li>
                                            <li className="nav-item ">
                                                <Link className="nav-link" to="/signup">SignUp</Link>
                                            </li>

                                        </div>
                                    ) : (
                                            <div className="row">
                                                <div className="col">
                                                    <Link className="nav-link" onClick={this.logoutUser} to="/">Logout</Link>

                                                </div>
                                                {isAdmin.isAdmin === true && (
                                                    <div className="row">
                                                        <div className="col">
                                                            <Link className="nav-link" to="/adminorder" >Orders</Link>
                                                        </div>

                                                        <div className="col">
                                                            <Link className="nav-link" to="/adminuser" >Users</Link>
                                                        </div>
                                                        <div className="col">
                                                            <Link className="nav-link" to="/adminproduct" >Products</Link>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>

                                        )}
                                </ul>
                            </div>
                            {user.isLogged && (
                                <p className="bold mt-3"> Hello {localStorage.getItem('userName')}</p>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect((state) => ({
    user: state.user.user,
    isLogged: state.user.isLogged,
    isAdmin: state.admin.isAdmin,
}),
    { logoutUser, checkRole }
)(Nav);