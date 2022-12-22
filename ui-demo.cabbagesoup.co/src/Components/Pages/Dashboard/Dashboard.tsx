import React from 'react';

import { Map } from 'pigeon-maps';

import {Col, Row}  from 'antd';

import AnalyticsCharts from './Analytics/AnalyticsCharts';

const Dashboard = () => {

    return (

        <div className="dashboardView">
            <Row gutter={26}>
                <Col span={14}>
                    <div className='leftAnalytics'>
                        <div className='topBoxes'>
                            <div className='mlBox1 mlbox'>
                                <div className='first'>Total Order</div>
                                <div className='second'>62,521</div>
                            </div>
                            <div className='mlBox2 mlbox'>
                                <div className='first'>Total Products</div>
                                <div className='second'>1,221</div>
                            </div>
                            <div className='mlBox3 mlbox'>
                                <div className='first'>Sales Today</div>
                                <div className='second'>$5421.29</div>
                            </div>
                        </div>
                        <AnalyticsCharts /> 
                    </div>
                </Col>
                <Col span={10}>
                    <div className="trackingBox">
                        <h5>Order <strong>CS5280157ZZ021</strong></h5>

                        <Map 
                            defaultCenter={[50.879, 4.6997]} 
                            defaultZoom={12} 
                            width={600} 
                            height={400}>
                        </Map>
                    </div>
                </Col>
            </Row>
        </div>
    );
}


export default Dashboard;