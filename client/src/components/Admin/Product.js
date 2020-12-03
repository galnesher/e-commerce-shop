import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createProduct, fetchAdminProducts, deleteProductById } from '../../actions/adminAction';


class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            title: "",
            description: "",
            availableQuantity: "",
            price: "",
            productId: "",

        };
    }


    componentDidUpdate() {
    }

    handleInputs = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createProduct = (e) => {
        e.preventDefault();
        const product = {
            image: this.state.image,
            title: this.state.title,
            description: this.state.description,
            availableQuantity: this.state.availableQuantity,
            price: this.state.price,
        }
        this.props.createProduct(product);

    }

    deleteProductById = (e) => {
        e.preventDefault();
        let productId = { _id: this.state.productId }
        this.props.deleteProductById(productId);
    }


    render() {
        const products = this.props;
        const product = this.props

        return (
            <div className="container-fluid">

                <h3 className="text-center">Create Product</h3>
                {product && (
                    <div className="text-center">
                        {product.productCreated && (
                            <div>
                                {product.productCreated.error ? (
                                    <h4 className="alert-danger">{product.productCreated.error}</h4>
                                ) : (
                                        <div>
                                            <h4 className="alert-success ">Create Success</h4>
                                        </div>

                                    )}
                            </div>
                        )}
                    </div>
                )}
                {product.product && (
                    <div>
                        {product.product._id && (
                            <div className="alert-success text-center">
                                <h4>Create Success</h4>
                            </div>
                        )}
                        {product.product === true && (
                            <div className="alert-success text-center">
                                <h4 className="text-danger">Product Deleted Success</h4>
                            </div>
                        )}
                    </div>
                )}

                <form onSubmit={this.createProduct}>
                    <div className="row align-items-center mt-4">
                        <div className="col">
                            <input type="text" name="title" className="form-control" placeholder="Title" onChange={this.handleInputs} required />
                        </div>
                        <div className="col">
                            <input type="text" name="description" className="form-control" placeholder="Description" onChange={this.handleInputs} required />
                        </div>
                    </div>

                    <div className="row align-items-center mt-4">
                        <div className="col">
                            <input type="number" name="availableQuantity" className="form-control" placeholder="available Quantity" onChange={this.handleInputs} required />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4">
                        <div className="col">
                            <input type="number" name="price" className="form-control" placeholder="price" onChange={this.handleInputs} required />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4">
                        <div className="col">
                            <input type="text" name="image" className="form-control" placeholder="image" onChange={this.handleInputs} required />
                        </div>
                    </div>
                    <div className="row align-items-center mt-4">
                        <div className="offset-lg-5 col">
                            <button type="submit" className="btn btn-success">Create</button>
                        </div>
                    </div>
                </form>

                <div className="mt-4 mb-4">
                    <form onSubmit={this.deleteProductById}>
                        <label>Delete Product By ID:</label>
                        <input type="text" name="productId" onChange={this.handleInputs} placeholder="ID" />
                        <button type="submit" className="btn btn-danger ml-1">Delete</button>
                    </form>
                </div>
                <button onClick={this.props.fetchAdminProducts
                }>Show All Products</button>
                <div className="row">
                    {products.products && (
                        <table className="table table-striped table-dark">
                            <thead className="thead-dark">
                                <tr>
                                    <th>
                                        ID
        </th>
                                    <th>
                                        Title        </th>
                                    <th>
                                        Description
        </th>
                                    <th>
                                        Price
        </th>
                                    <th>
                                        availableQuantity        </th>

                                </tr>
                            </thead>
                            <tbody>
                                {products.products.map((product) => (
                                    <tr>
                                        <td>{product._id}</td>
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.availableQuantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    products: state.admin.products, productCreated: state.admin.productCreated, productDeleted: state.admin.productDeleted
}),
    {
        fetchAdminProducts,
        createProduct,
        deleteProductById
    })(Product)