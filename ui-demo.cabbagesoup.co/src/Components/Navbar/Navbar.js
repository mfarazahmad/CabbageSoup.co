import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import SearchBar from './SearchBar';

import { ShoppingCartOutlined, UserOutlined, SettingOutlined, DashboardOutlined } from '@ant-design/icons';

import { Menu } from 'antd';
import logo from '../../images/logo.webp';

const Navbar = (props) => {

	const [isAdmin, setAdmin] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		setLoggedIn(props.loggedIn);
	}, [props.loggedIn]);


	useEffect(() => {
		try {
			let data = getUserName();
			console.log(data);
	
			if (data) {
				setLoggedIn(true);
				if (data.user_type === 'admin') {
					setAdmin(true);
				} else {
					setAdmin(false);
				}
			}
		} catch(err) {
			console.log(err);
		}
	}, [loggedIn]);

	const handleHome = e => {
		console.log(e);
		props.history.push({
			pathname: '/',
		})
	};

	return (
		<header className='header'>
			<Menu id="desktopMenu" mode="horizontal">
				<Menu.Item id="logo" key="logo" onClick={handleHome}>
					<img src={logo}></img>
				</Menu.Item>
				<Menu.Item id="links">
					<Link to={{ pathname: "/results", state: { searchInput: "shampoo" } }}>Shampoos</Link>
				</Menu.Item>
				<Menu.Item id="links">
					<Link to={{ pathname: "/results", state: { searchInput: "conditioner" } }}>Conditioners</Link>
				</Menu.Item>
				<Menu.Item id="links">
					<Link to={{ pathname: "/results", state: { searchInput: "cream" } }}>Face Care</Link>
				</Menu.Item>
				<Menu.Item id="searchBar" key="searchbar">
					<SearchBar />
				</Menu.Item>
				<Menu.Item id="account">
					{loggedIn && !isAdmin && (
						<Link to={{ pathname: "/settings" }}>
							<SettingOutlined style={{ 'fontSize': '17px', 'color': 'green' }} />
						</Link>
					)
					}
					{loggedIn && isAdmin && (
						<Link to={{ pathname: "/dashboard" }}>
							<DashboardOutlined style={{ 'fontSize': '17px', 'color': 'green' }} />
						</Link>
					)
					}
					{!loggedIn && (
						<Link to={{ pathname: "/settings/create-account" }}>
							<UserOutlined />
						</Link>
					)
					}
				</Menu.Item>
				<Menu.Item id="cart">
					<Link to={{ pathname: "/cart" }}>
						<div className="cartBox" >
							<ShoppingCartOutlined id="cartIcon" />
							<div className="itemsInCart">{props.totalQty}</div>
						</div>
					</Link>
				</Menu.Item>
			</Menu>

			<div id="mobileMenu">
				<Menu id="topMobileNav" mode="horizontal">
					<Menu.Item id="logo" key="logo" onClick={handleHome}>
						<img src={logo}></img>
					</Menu.Item>
					<Menu.Item id="searchBar">
						<SearchBar />
					</Menu.Item>
					<Menu.Item id="mobileIcons">
						<div id="account">
							{loggedIn && !isAdmin && (
								<Link to={{ pathname: "/settings" }}>
									<SettingOutlined style={{ 'fontSize': '17px', 'color': 'green' }} />
								</Link>
							)
							}
							{loggedIn && isAdmin && (
								<Link to={{ pathname: "/dashboard" }}>
									<DashboardOutlined style={{ 'fontSize': '17px', 'color': 'green' }} />
								</Link>
							)
							}
							{!loggedIn && (
								<Link to={{ pathname: "/settings/create-account" }}>
									<UserOutlined />
								</Link>
							)
							}
						</div>
						<div id="cart">
							<Link id="cartLink" to={{ pathname: "/cart" }}>
								<div className="cartBox" >
									<ShoppingCartOutlined id="cartIcon" />
									<div className="itemsInCart">{props.totalQty}</div>
								</div>
							</Link>
						</div>
					</Menu.Item>
				</Menu>
			</div>
		</header>
	);
}


export default withRouter(Navbar);