import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import logo from '../../images/logo.webp';
import twitter from '../../images/twitter.webp'
import facebook from '../../images/facebook.webp'
import instagram from '../../images/instagram.webp'
import paypal from '../../images/paypal.webp'
import mastercard from '../../images/mastercard.webp'
import visa from '../../images/visa.webp'

function Footer(props) {

    return (
   
        <div className='footer'>

            <div className="footerContainer">
            <div className="searchcontainer">
                <div className="footersubheading">Search</div>

                <Link className="footerlinks" to={{pathname: "/results", state: {searchInput: "shampoo"}}}>Shampoos</Link>
                <Link className="footerlinks" to={{pathname: "/results", state: {searchInput: "conditioner"}}}>Conditioner</Link>
                <Link className="footerlinks" to={{pathname: "/results", state: {searchInput: "cream"}}}>Face Care</Link>
            </div>
            <div className="searchcontainer">
                <div className="footersubheading">Account</div>
                <Link className="footerlinks" to={{pathname: "/settings/create-account"}}>Log In</Link>
                <Link className="footerlinks" to={{pathname: "/settings/create-account"}}>Sign Up</Link>
            </div>
            <div className="searchcontainer">
                <div className="footersubheading">Social Media</div>                    
                    <div className="icons">
                        <img src={twitter} className="iconimages"/>
                        <img src={facebook} className="iconimages"/>
                        <img src={instagram} className="iconimages"/>
                    </div>
            </div>
            <div className="searchcontainer">
                <div className="footersubheading">Payment Methods</div>                    
                    <div className="icons">
                        <img src={visa} className="iconimages"/>
                        <img src={mastercard} className="iconimages"/>
                        <img src={paypal} className="iconimages"/>
                    </div>
            </div>
            </div>
            <div className="copyright">@Copyright 2020 Cabbage Soup Solutions LLC.</div>
        </div>

    );
}
export default withRouter(Footer);