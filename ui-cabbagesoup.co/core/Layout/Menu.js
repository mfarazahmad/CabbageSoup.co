import React from 'react';
import Link from 'next/link';

import ContactDisplay from '../Widgets/ContactDisplay';

function Menu(props) {
    return (
        <div id='menu'>
            <ul data-aos="slide-left" onClick={props.closeMenu}>
                <li><Link href="/process">Our Process.</Link></li>
                <li><Link href="/about">Values.</Link></li>
                <li><Link href="/contact">Talk To Us.</Link></li>
            </ul>
            <ContactDisplay />
        </div>
    );
}


export default Menu;