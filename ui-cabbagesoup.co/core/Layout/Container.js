import React, { useState } from 'react';

import Header from './Header';
import Borders from './Borders';
import Menu from './Menu';
import Loader from './Loader';
import Footer from './Footer';

/*
state:  Auth        
        Context: ColorMode

state:  Context: Loading        
        Menu:  menuOpen -> transform: translateX(0%);

        Menu: style-> values menuOpen | ''
        Loading: style -> values loading | ''
*/

 const Container = (props) => {

    const [activeMenu, setActiveMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleMenu = () => setActiveMenu(activeMenu => !activeMenu);
    const closeMenu = () => setActiveMenu(activeMenu => false);
    
    return (
        <div className={`outer`}>
            <Header toggleMenu={toggleMenu} closeMenu={closeMenu} />
            
            {activeMenu && <Menu closeMenu={closeMenu} /> }
            {isLoading && <Loader /> }

            <div className='app' onClick={closeMenu}>
                <div className="pageContainer">
                    {React.cloneElement(props.children, {...props, closeMenu: closeMenu, setLoading: setIsLoading  })}
                </div>
            </div>

            <Borders />
            <Footer />
        </div>
    );
}

export default Container;