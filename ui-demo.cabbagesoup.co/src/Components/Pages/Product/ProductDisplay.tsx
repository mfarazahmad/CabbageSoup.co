import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';

import banner from '../../../images/productdisplayimage.webp'
import { Pagination, Slider, Rate } from 'antd';
import { Product as product } from '../../../models/cart';

const Product = lazy(() => import('./Product'));

const ProductDisplay = (props: any) => {

    let location = useLocation();
    const searchInput = location.state.searchInput || '';

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({price:100, rating: 1});
    const [currentProducts, setCurrentProducts] = useState<product[]>([]);
    const [totalProducts, setTotalProducts] = useState<any>([]);


    useEffect(() => {
        setSearchTerm(searchInput);
    }, [searchInput])

    useEffect(() => {
        const endpoint = `${process.env.REACT_APP_ANALYTICS_ENGINE}/search/?term=${searchTerm}&searchType=products&filter=price:${filters.price},rating:${filters.rating}`;
        const headers = {headers: { "withCredentials": "true" }};
        axios.get(endpoint, headers)
        .then(response => {
            var data = response['data']['data'];
            console.log(data);
            setCurrentProducts(data.slice(0,9));

            const n = 9 //tweak this to add more items per page

            const result = new Array(Math.ceil(data.length / n))
            .map(_ => data.splice(0, n));
            console.log(result);
            setTotalProducts(result);
        })
        .catch(err => {
            console.log(err);
        });
    }, [searchTerm, filters])

    const handleOnChange = (type: string, value: number) => {
        console.log(value);
        console.log(type);
        if (type === 'price') {
            setFilters(filters => ({ ...filters, price: value }));
        } else if (type === 'rating') {
            setFilters(filters => ({ ...filters, rating: value }));
        }
    }

    const changePage = (page: number) => {
        console.log(page);
        let currentPageProducts = totalProducts[page];
        setCurrentProducts(currentPageProducts);
    }

    return (
        <main className="page" id="productDisplay">
            <img src={banner} className="productdisplaybanner"/>
            <div className="productdisplayfilter">
                <div className="productDisplayContainer">
                    <div className="productdisplayTitle">Filter by</div>
                    <div className="productdisplayfiltertitles">Price</div>
                    <Slider value={filters.price} className="sliderproductdisplay" onChange={(val) => handleOnChange('price', val)}/>
                    <div>$0 - ${filters.price}</div>
                    <br />
                    <div className="productdisplayfiltertitles"> Customer Reviews </div>
                    <div className="priceDisplayCustomerRatings">
                        <Rate allowClear={false} value={filters.rating} className="rating" onChange={(val) => handleOnChange('rating', val)}/>    
                        <div className="pricedisplayratingstext">&#38; up </div>
                    </div>
                </div>
            </div>
            <h2>Results for <span className="searchInput">{searchTerm}</span></h2>
            <div className="line"></div>
            <div className="productShowcase">
                {currentProducts && currentProducts.map(
                    (product, key) => { return <Suspense fallback={<div>Loading...</div>}><Product key={key} product={product} handleCart={props.handleCart} handleDetailPage={props.handleDetailPage} /> </Suspense> }
                )}
            </div>
            <div className="pagination">
                <Pagination defaultCurrent={1} total={50} onChange={changePage} />
            </div>
        </main>
    );
}


export default ProductDisplay;

