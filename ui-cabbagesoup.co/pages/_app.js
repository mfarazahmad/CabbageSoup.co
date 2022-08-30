import {useEffect } from 'react';
import AOS from 'aos';

import Container from '../core/Layout/Container';

import 'antd/dist/antd.css';
import 'aos/dist/aos.css';
import '../styles/App.css'

export default function MyApp({ Component, pageProps }) {

    useEffect(() => AOS.init({duration: 1200,}), [])

    return (
        <Container >
            <Component {...pageProps} />
        </Container >
    )
}