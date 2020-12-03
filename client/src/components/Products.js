import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productAction'
import { formatCurrency } from '../util';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { addToCart } from '../actions/cartActions';


class Products extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: null
        };
    }


    componentDidMount() {
        this.props.fetchProduct();
        Modal.setAppElement('body');
    }


    openModal = (product) => {
        this.setState({ product });
    };

    colseModal = () => {
        this.setState({ product: null })
    }

    render() {
        const { product } = this.state
        return (
            <div className="container">
                <Fade bottom>
                    {(!this.props.products) ?
                        (<div className="offset-6 fa-5x">
                            <span> <i className="fa fa-spinner fa-spin"> </i> </span>
                        </div>
                        ) : (
                            <div className="row">
                                {this.props.products.map(product => (
                                    <div key={product._id} className="col py-2">
                                        <div className="card h-100 rounded bg-light shadow-lg">
                                            <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                                <img className="card-img-top" src={product.image} alt={product.title} />
                                            </a>
                                            <div className="card-body">
                                                <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                                    <h4 className="card-title text-dark">{product.title}</h4>
                                                </a>
                                                <p>In Stock : {product.availableQuantity}</p>
                                                <div className="buy d-flex justify-content-between align-items-center">
                                                    <div className="price text-success"><h5 className="mt-4">{formatCurrency(product.price)}</h5>
                                                    </div>
                                                    {product.availableQuantity > 0 ? (
                                                        < button onClick={() => {
                                                            this.props.addToCart(product);
                                                        }} className="btn-sm btn btnMyOrange mt-3"><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
                                                            {" "} Add to Cart
                                                        </button>
                                                    ) : (
                                                            <button className="btn-sm disable mt-3"><i className="fas fa-shopping-cart"></i> Out of stock
                                                            </button>
                                                        )}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                </Fade>
                {
                    product && (
                        <Modal isOpen={true}
                            onRequestClose={this.colseModal}
                        >
                            <Zoom>
                                <button onClick={this.colseModal}>
                                    x
                                </button>
                                <div className="row">
                                    <div className="col-md-4 ">
                                        <img className="h90" src={product.image} alt={product.title}></img>
                                    </div>
                                    <div className="offset-1 col-md-6">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>

                                        <div className="product-price">
                                            <div className="mb-5">
                                                {formatCurrency(product.price)}
                                            </div>
                                            {product.availableQuantity > 0 ? (
                                                <button onClick={() => {
                                                    this.props.addToCart(product);
                                                }} className="btn-sm btn-danger mt-3"><i className="fas fa-shopping-cart"></i> Add to Cart
                                                </button>
                                            ) : (
                                                    <button className="btn-sm disable mt-3"><i className="fas fa-shopping-cart"></i> Out of stock
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div >
        )
    }
}
export default connect((state) => ({
    products: state.products.items, cartItems: state.cart.cartItems,
}),
    {
        fetchProduct: fetchProducts,
        addToCart,
    })(Products)




