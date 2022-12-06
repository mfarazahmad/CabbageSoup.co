
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Button, Rate } from 'antd';

function Product(props: any) {

    return (
        <div className="productBox">
            <LazyLoadImage onClick={() => props.handleDetailPage(props.product)} src={`https://www.cabbagesoup.co/images/${props.product.img}`} id="productImg" />
            <div className="productTitle">{props.product.product_brand} {props.product.product_name}</div>
            <Rate allowClear={false} defaultValue={props.product.rating} />
            <div className="productInfo">
                <div className="productPrice">${props.product.price}</div>
            </div>
            <Button onClick={() => props.handleCart(props.product)} id="addToCart" type="primary">Add to Cart</Button>
        </div>
    );
}


export default withRouter(Product);