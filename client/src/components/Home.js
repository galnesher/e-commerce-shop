import React, { Component } from 'react'
import Products from './Products';
import Cart from './Cart';
import { checkRole } from '../actions/adminAction';
import { connect } from 'react-redux';
import '../index.css';
import homeImg from '../Images/homeImg.jpg';
import { Link } from 'react-router-dom';




class Home extends Component {

    componentDidMount() {
        this.props.checkRole();
    }

    render() {
        return (

            <div className="container-fluid">
                <div className="containerImg">
                    <img className="img-fluid homeImg" src={homeImg} alt="HomeImage">
                    </img>
                    <Link to="/about"><button className="btn border">About</button></Link>
                </div>
                <div className="float-right">

                </div>
                <div className="row">
                    <div className="col-md-9 mt-4 " >
                        <Products></Products>
                    </div>
                    <div className="col">
                        <Cart ></Cart>
                    </div>
                </div>
            </div >
        )
    }
}


export default connect(
    (state) =>
        ({ isAdmin: state.admin.isAdmin, }),
    { checkRole }
)(Home);
