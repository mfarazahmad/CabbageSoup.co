import React from 'react';
import { useRouter } from 'next/router';

import Offerings from '../Widgets/Offerings';

function HomePage(props) {

    const router = useRouter();

    return (
   
        <main className="page" id="home">
            <section className="intro padding">
                <div className="introTitle" id="trigger-left">                
                    <div data-aos="fade-right" data-aos-duration="1000">W</div>
                    <div data-aos="fade-right" data-aos-duration="1250">E</div>
                    <div data-aos="fade-right" data-aos-duration="1750">L</div>
                    <div data-aos="fade-right" data-aos-duration="2250">C</div>
                    <div data-aos="fade-right" data-aos-duration="2500">O</div>
                    <div data-aos="fade-right" data-aos-duration="2750">M</div>
                    <div data-aos="fade-right" data-aos-duration="3000">E</div>
                    <div data-aos="fade-right" data-aos-duration="3000">!</div>
                </div>
                <div className="content" data-aos-anchor="#trigger-left"  data-aos-anchor-placement="bottom-center" data-aos="fade-left">
                    We’re <span style={{'color':'#ffc168'}}>Cabbage Soup</span> a global software agency that builds world class product solutions designed for the digital age. 
                </div>
            </section>
            <section className="digital padding">
                <div className="sectionTitle" data-aos="slide-down">Digital<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos="slide-down">A preview of your digital road map.</div>
                <div className="content" data-aos="slide-up"> 
                                We partner with our clients to create cutting-edge digital solutions to help solve their business challenges. 
                                Throughout the journey you will find us consistently challenging ourselves to always deliver memorable customer experiences through strategy, product design, and engineering. 
                </div>
                <Offerings />
            </section>
            <section className="original padding">
                <div className="sectionTitle" data-aos="slide-down">Original<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos="slide-down">User-centered design.</div>
                <div className="content">   We design and develop engaging websites and mobile apps that offer users an immersive experience. 
                    From the start we collaborate with professional graphic designers and illustrators to develop a web design that is truly special and one of a kind. 
                    We believe that a compelling web design and strong persuasive copy can turn a prospect into a customer.  
                </div>
                <div className="centerMe">
                    <button className="btn" onClick={() =>{props.closeMenu; router.push('/contact');}}>
                        <span>Let's Talk</span><div id="circle"></div>
                    </button>
                </div>
            </section>
            <section className="dedication padding">
                <div className="sectionTitle" data-aos="slide-down">Dedication<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos="slide-down">We're dedicated to taking your businesses to the next level.</div>
                <div className="infoContainer">
                    <div className="left" data-aos="fade-left">   
                                We’re here to not only deliver what’s expected, but to produce work that is genuine and has lasting value, guided by proven strategies that promote growth. 
                    </div>
                    <br />
                    <div className="right" data-aos="fade-right">  
                                We have proven history of helping our clients tackle their everyday business challenges, by giving them the tools 
                                they need to connect with their customer(s) in meaningful ways.
                    </div>
                </div>
                <div className="centerMe">
                    <button className="btn" onClick={() => {props.closeMenu; router.push('/process');}}>
                        <span>See How</span><div id="circle"></div>
                    </button>
                </div>
            </section>
        </main>
    );
}


export default HomePage;