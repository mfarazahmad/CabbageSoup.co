import React, {lazy, Suspense, useState, useEffect} from 'react';

import { Button, Rate, Menu } from 'antd';

import ecommercestats from '../../../images/ecommercestats.webp'
import line from '../../../images/line.webp'
import truck from '../../../images/truck.webp'
import twentyfourhr from '../../../images/24hr.webp'
import box from '../../../images/box.webp'
import splash from '../../../images/splash.webp'
import bannerproduct1 from '../../../images/bannerproduct1.webp'
import bannerproduct2 from '../../../images/bannerproduct2.webp'

import { UserOutlined } from '@ant-design/icons';
import { getTopProducts } from '../../../service/product';

const Product = lazy(() => import('../Product/Product'));


function Home(props: any ) {

    const [inventoryData, setInventoryData] = useState([]);
    const [backgrounds, setbackground] = useState('top_selling');
    const [showreview, setreview] = useState('Sally Ride');

    useEffect(() => {
        getHomeProducts();
    }, []);

    const getHomeProducts = async () => {
        try {
            let data = await getTopProducts(5);
            if (!data) {
                console.log("Error loading top products!");
            } else {
                setInventoryData(data);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    const popularProductsIndicator = (type: any) => {
        console.log(type);
        setbackground(type);
    };

    const reviewRender = (type: any) => {
        setreview(type)
    }

    return (
        <main className="page" id="home">
            <section className="mainDisplay">
                <div className="position" >
                    <div className="bannersubheading">Face and Skin</div>
                    <h2>Moisturizer</h2>
                    <div className="bannerdescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamc
                    </div>
                    <Button disabled id="bannerbutton" type="primary">Shop Now</Button>
                </div>
                <div className="bannerproductscontainer"> 
                    <div className="bannerProducts">
                    <div className="bannertextcontainer">
                        <div className="bannerproductname">
                            Santias Cream 
                        </div>
                        <div className="bannerproductprice">
                            $8 
                        </div>
                    </div>
                    <img src={bannerproduct1} className="bannerproductimage1"/>
                    </div>
                    <div className="bannerProducts">
                    <div className="bannertextcontainer">
                        <div className="bannerproductname">
                            Santias Cream 
                        </div>
                        <div className="bannerproductprice">
                            $8 
                        </div>
                    </div>
                    <img src={bannerproduct2} className="bannerproductimage2"/>
                    </div>
                   
                </div>
            </section>
            <section className="shippingprocess"> 
                <div className="shippingprocesscontainer">
                    <div className="processbackground">
                        <div className='circleDiv'>
                        <img src={twentyfourhr} className="twentyfourhrshippinglogo"/>
                        </div>
                    </div>
                    <img src={line} className="shippingline"/>
                    <div className="processbackground">
                        <div className='circleDiv'>
                        <img src={truck} className="truckshippinglogo"/>
                        </div>
                    </div>
                    <img src={line} className="shippingline"/>
                    <div className="processbackground">
                     <div className='circleDiv'>
                        <img src={box} className="boxshippinglogo"/>
                     </div>
                    </div>
                </div>
                <div className="shippingprocesstextcontainer">
                    <div className="shippingprocesstext">
                        <div className="shippingprocessheading">
                            Dog
                        </div>
                        <div className="shippingprocessdescription"> 
                        Lorem ipsum dolor sit amet, 
                        </div>
                    </div>
                    <div className="shippingprocesstext"></div>
                    <div className="shippingprocesstext">
                        <div className="shippingprocessheading">
                            Free Shipping 
                        </div>
                        <div className="shippingprocessdescription"> 
                        Lorem ipsum dolor sit amet, 
                        </div>
                    </div>
                    <div className="shippingprocesstext"></div>
                    <div className="shippingprocesstext">
                        <div className="shippingprocessheading">
                            haris is amazing 
                        </div>
                        <div className="shippingprocessdescription"> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing 
                        elit, sed do eiusmod tempor 
                        </div>
                    </div>
                </div>
            </section>
            <section className="popularproducts">
                <div className="popularproductstextcontainer">
                    <div className="heading">Popular Products</div>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus volutpat, elit sit amet maximus molestie, arcu tortor lacinia ante, ac 
                    auctor libero ligula eu elit.
                    </div>
                </div>
                <div className="catagories">
                    {backgrounds === 'top_selling' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('top_selling')}>
                            <img  className="splashImg" src={splash} />
                            <div className="catagorytitle" >Top Selling Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('top_selling')}>
                            <div >Top Selling Products</div>
                        </div>  
                    )}
                    {backgrounds === 'top_rated' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('top_rated')}>
                            <img  className="splashImg" src={splash} />
                            <div >Top Rated Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('top_rated')}>
                            <div >Top Rated Products</div>
                        </div>  
                    )}
                    {backgrounds === 'recommendation' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('recommendation')}>
                            <img  className="splashImg" src={splash} />
                            <div >Recommended Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('recommendation')}>
                            <div >Recommended Products</div>
                        </div>  
                    )}
                </div>
                <div className="productShowcase">
                    {inventoryData && inventoryData.map(
                        (product, count) => { return <Suspense fallback={<div>Loading...</div>}> <Product key={count} product={product} handleCart={props.handleCart} handleDetailPage={props.handleDetailPage} /> </Suspense> }
                    )}
                </div>
            </section>
            <section className="popularcatagories">
                <div className="popularproductstextcontainer">
                    <div className="heading">Sub Categories</div>
                    <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus volutpat, elit sit amet maximus molestie, arcu tortor lacinia ante, ac 
                    auctor libero ligula eu elit. Ut eget velit urna.
                    </div>
                </div>
                <div className="catagories">
                </div>
                <div className="catagories">
                    {backgrounds === 'top_selling' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('top_selling')}>
                            <img  className="splashImg" src={splash} />
                            <div className="catagorytitle" >Top Selling Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('top_selling')}>
                            <div >Top Selling Products</div>
                        </div>  
                    )}
                    {backgrounds === 'top_rated' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('top_rated')}>
                            <img  className="splashImg" src={splash} />
                            <div >Top Rated Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('top_rated')}>
                            <div >Top Rated Products</div>
                        </div>  
                    )}
                    {backgrounds === 'recommendation' ? (
                        <div className="textbackground"  onClick={() => popularProductsIndicator('recommendation')}>
                            <img  className="splashImg" src={splash} />
                            <div >Recommended Products</div>
                        </div>  
                    ): (
                        <div className="textbackground" onClick={() => popularProductsIndicator('recommendation')}>
                            <div >Recommended Products</div>
                        </div>  
                    )}
                </div>
                <div className="productShowcase">
                    {inventoryData && inventoryData.map(
                        (product, count) => { return <Suspense fallback={<div>Loading...</div>}> <Product key={count} product={product} handleCart={props.handleCart} handleDetailPage={props.handleDetailPage}/> </Suspense> }
                    )}
                </div>
            </section>
            <section className="reviewsectioncontainer">
            <img  className="ecommercestatsimg" src={ecommercestats} />
            <div className="reviewsection">
                <div className="customersnames">
                    <div className="customerreviewtitle">Customer Reviews</div>
                    <Menu className="menureviewers">
                        <Menu.Item key="1" icon={<UserOutlined />} onClick={() => reviewRender('Sally Ride')}>
                            Sally Ride
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UserOutlined />} onClick={() => reviewRender('Tanya Black')}>
                            Tanya Black
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UserOutlined />} onClick={() => reviewRender('Mary Goldsmith')}>
                            Mary Goldsmith
                        </Menu.Item>
                        <Menu.Item key="4" icon={<UserOutlined />} onClick={() => reviewRender('Kim Possible')}>
                            Kim Possible
                        </Menu.Item>
                        <Menu.Item key="5" icon={<UserOutlined />} onClick={() => reviewRender('Bella Lake')}>
                            Bella Lake
                        </Menu.Item>
                        <Menu.Item key="6" icon={<UserOutlined />} onClick={() => reviewRender('Jessica Ocean')}>
                            Jessica Ocean
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="reviewblock">
                {showreview === 'Sally Ride' && (
                        <div>
                    <div className="reviewsubtitle">It was a great experience buying my shampoo online </div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus pellentesque sapien 
                            id euismod. Maecenas tempus dictum turpis, ac varius ante sollicitudin non. 
                        </div>
                    </div>
                )}
                {showreview === 'Tanya Black' && (
                        <div>
                    <div className="reviewsubtitle">This is the greatest conditioner!</div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                        In facilisis posuere ipsum. Sed sit amet aliquam felis, sit amet dignissim quam. 
                        Phasellus ullamcorper mattis consequat.
                         Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        </div>
                    </div>
                )}
                {showreview === 'Mary Goldsmith' && (
                        <div>
                    <div className="reviewsubtitle">Simply Amazing!</div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                        Curabitur posuere erat id pretium placerat. 
                        Quisque a imperdiet tortor. Etiam laoreet efficitur libero a semper. 
                        Sed at sem ac nisi feugiat molestie non bibendum lacus. 
                        </div>
                    </div>
                )}
                {showreview === 'Kim Possible' && (
                        <div>
                    <div className="reviewsubtitle"> Fastest Shipping Ever!</div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                        Nam suscipit, tortor ut ornare pellentesque, 
                        ligula leo dapibus dolor, nec fringilla libero felis convallis massa. 
                        Suspendisse vel justo eu libero porta commodo vel et odio. 
                        </div>
                    </div>
                )}
                {showreview === 'Bella Lake' && (
                        <div>
                    <div className="reviewsubtitle"> Customer Service was amazing!</div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                        Ut mollis, urna non imperdiet imperdiet, est ligula ultrices sapien, 
                        eget semper felis velit eu velit. Phasellus ac neque semper,
                         mattis turpis a, sollicitudin purus. 
                        </div>
                    </div>
                )}
                {showreview === 'Jessica Ocean' && (
                        <div>
                    <div className="reviewsubtitle"> Always great service!</div>
                        <Rate allowClear={false} defaultValue={5} className="reviewrating" />
                        <div className="reviewdescription">
                        Praesent sit amet euismod lectus, quis egestas tortor. 
                        Maecenas tincidunt, ipsum et consectetur vehicula, augue arcu consequat lorem,
                         eu venenatis mauris purus eget ipsum. 
                        </div>
                    </div>
                )}
                </div>
            </div>
            </section>
        </main>
    );
}


export default Home;