import React from 'react';


function ContactDisplay() {
    return(
        <div className="contact">
            <div className="address"><a href="/" rel="external" target="_blank">6595 Roswell Road Suite G-5984</a></div>
            <div className="address"><a href="/" rel="external" target="_blank">Atlanta, GA 30328</a></div>
            <div ><a href="tel:864-756-1546" rel="external" className="phone">864-756-1546</a></div>
            <div ><a href="mailto:contact@brand.com" rel="external" className="mail">contact@cabbagesoup.co</a></div>
        </div>
   );
}

export default ContactDisplay;