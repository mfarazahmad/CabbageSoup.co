
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { Rate, Button } from 'antd';

import Product from './Product';

function ProductDetail(props) {

    const [product, setProduct] = useState([]);
    const [inventoryData, setInventoryData] = useState([]);


    useEffect(() => {


        console.log(props);
        const endpoint = `${process.env.REACT_APP_ANALYTICS_ENGINE}/query/product?id=${props.location.state.product.product_id}`;
        const headers = { "withCredentials": "true" };
        axios.get(endpoint, headers)
            .then(response => {
                let data = response['data']['data'][0];
                updateProduct(data);
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            })

        const endpointproductdata = process.env.REACT_APP_ANALYTICS_ENGINE + '/query/product?limit=5';
        // const endpoint = process.env.REACT_APP_ANALYTICS_ENGINE + '/analytics/bestSelling;
        axios.get(endpointproductdata)
            .then(response => {
                console.log(response);
                var productdata = response['data']['data'];
                setInventoryData(productdata);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const updateProduct = (e) => {
        setProduct(e);
    }

    return (
        <main className="page" id="productDetail">
            <div className="mainDisplay">
                <div className="fullcontainer">
                    <LazyLoadImage src={'https://www.cabbagesoup.co/images/' + product.img} className="productdisplayimage" />
                    <div className="productDetailContainer">
                        <div className="productDetailProductName">{product.product_name}</div>
                        <Rate allowClear={false} defaultValue={product.rating} className="rating" />
                        <div className="productstatscontainer">
                            <div className="productStats">
                                <div className="productDetailCategory">Availability</div>
                                <div className="productDetailCategory">Product Catagory</div>
                                <div className="productDetailCategory">Brand</div>
                                <div className="productDetailCategory">Product ID</div>
                            </div>
                            <div className="productStats">
                                {product.quantity === 0 ? (
                                    <div className="productDetailValues">Unavailable</div>
                                ) : (
                                    <div className="productDetailValues">Available</div>
                                )}
                                <div className="productDetailValues">{product.product_category}</div>
                                <div className="productDetailValues">{product.product_brand}</div>
                                <div className="productDetailValues">{product.product_id}</div>
                            </div>
                        </div>
                        <div className="productprice">${product.price}</div>
                        <div className="productButtonContainer">
                            <Button onClick={() => props.handleCart(product)} id="productDetailbutton" type="primary">Add to Cart</Button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="descriptionsection">
                <div className="descriptiontitle">Description</div>
                <div className="productdescription">{product.description}</div>
                <div className="relatedproductscontainer">
                    <div className="relatedproductstitle">Related Products</div>
                    <div className="productShowcase">
                        {inventoryData && inventoryData.map(
                            (product, count) => { return <Product key={count} product={product} handleCart={props.handleCart} handleDetailPage={props.handleDetailPage} /> }
                        )}
                    </div>

                </div>
            </div>

        </main>
    );
}


export default withRouter(ProductDetail);