import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header =  (props) => {

	const router = useRouter();

    return (
        <header className='header'>
            <div className="navbar-brand" onClick={props.closeMenu}>
				<div className="textLogo">
					<div className="iconLogo" onClick={() => router.push('/')}>
						<svg width="25" height="25" style={{verticleAlign: 'center', marginTop: '10px'}} viewBox="0 0 200 202" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 75.75C0 110.469 2.5 154.025 25 176.75C47.5 199.475 90.6249 202 125 202C125 132.562 68.7499 75.75 0 75.75Z" fill="#2AA262"/>
							<path d="M108.125 116.15C125.625 138.244 136.25 166.65 137.5 195.688C152.5 191.9 165.625 186.219 175 176.119C197.5 153.394 200 109.838 200 75.1188C163.75 75.75 130 92.1625 108.125 116.15Z" fill="#66DA00"/>
							<path d="M99.9999 106.681C106.25 99.7375 113.125 94.0562 120.625 88.375C99.3749 51.1312 58.75 25.25 12.5 25.25C12.5 37.2437 12.5 50.5 14.375 63.7562C48.125 67.5437 77.4999 83.325 99.9999 106.681Z" fill="#62BA0F"/>
							<path d="M131.25 82.0624C148.125 71.9624 166.875 66.2812 185.625 64.3874C186.875 51.1312 187.5 37.8749 187.5 25.8812C159.375 25.2499 131.875 34.7187 109.375 53.0249C118.125 61.8624 125.625 71.3312 131.25 82.0624Z" fill="#89C91E"/>
							<path d="M146.875 18.9375C134.375 7.575 118.125 0 100 0C81.875 0 65 6.94375 53.125 18.9375C70.625 24.6188 86.25 33.4563 100 44.8188C113.75 32.825 130 23.9875 146.875 18.9375Z" fill="#23AD18"/>
						</svg>
					</div>
					<div onClick={() => router.push('/')}><Link href="/">CABBAGE SOUP</Link></div>
				</div>
			</div>
			<div id="toggleNav" onClick={props.toggleMenu}>
				<i className="icon">
					<span className="line"></span>
					<span className="line"></span>
					<span className="line"></span>
				</i>
				<span className="txt"><span>M</span><span>e</span><span>n</span><span>u</span></span>
			</div>
			<div className="liveDemo">
				<button className="liveDemoBtn"  onClick={() => document.location.href ='http://demo.cabbagesoup.co/'}>
					<span >VIEW DEMO</span><div id="circle"></div>
				</button>
			</div>
			<ul className="switch-color-mode">
                <li className="active"><a>Light.</a></li>
				<li><a>Dark.</a></li>
			</ul>
			<span className="scrolldown" >
		  		<i className="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 17 10"><path className="cls-1" d="M6.22,8.75,3.37,5.89H17V4.12H3.37L6.22,1.25,5,0,0,5l5,5Z"></path></svg></i>
		   		<span className="txt"><span>S</span><span>c</span><span>r</span><span>o</span><span>l</span><span>l</span></span>
		   	</span>
        </header>

    );
}


export default Header;