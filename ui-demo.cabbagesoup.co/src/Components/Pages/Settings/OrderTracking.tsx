
import React from 'react';
import { withRouter } from 'react-router-dom';

import Map  from 'pigeon-maps'
  
function OrderTracking() {

    return (
        <main className="page" id="ordertracking">
            <section className="mainDisplay">
                <h2>Order Tracking</h2>
                <br />
                
                <h3>Order <strong>CS5280157ZZ021</strong></h3>
                <div className="trackingBox">

                <Map 
                    defaultCenter={[50.879, 4.6997]} 
                    defaultZoom={12} 
                    width={600} 
                    height={400}>
                </Map>

                </div>
            </section>
        </main>
    );
}


export default withRouter(OrderTracking);