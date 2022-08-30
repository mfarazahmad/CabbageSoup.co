import React from 'react';
import { useRouter } from 'next/router';
import {Timeline} from 'antd';

function ProcessPage(props) {

    const router = useRouter();

    return (
   
        <main className="page" id="process">
            <section className="intro padding">
                <div className="introTitle" data-aos="slide-left" id="trigger-left">Our Process<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos-anchor="#trigger-left"  data-aos-anchor-placement="bottom-center" data-aos="zoom-in">
                    Our tested methodology to get your business to the next level. 
                </div>
            </section>
            <section className="glue padding">
                <div className="sectionTitle" data-aos="zoom-out">The glue that holds us together.<span className="dot">.</span></div>
                
                <div className="content">
                    <div data-aos="fade-left">   We are a tribe of knowledgeable individuals who believe that through insightful strategies and purposeful design, 
                            we can make impactful digital experiences. 
                    </div>
                    <div data-aos="fade-right">
                        Our no nonsense and jargon-free approach allows us to create meaningful partnerships that are more effective and long-lasting. 
                    </div>
                    <div data-aos="fade-left">
                        Our success has been based on listening, supporting, innovation and quality. 
                    </div>
                    <div data-aos="fade-right">
                        From the moment we take on a project our number one focus is to solve your business problems, 
                        overcome barriers and win big. 
                    </div>
                </div>
                <div className="ourProcess">
                    <div className="sectionSubTitle" data-aos="slide-down">What to expect.</div>
                    <Timeline mode="alternate">
                        <Timeline.Item color="yellow"><h3>Discovery.</h3><div>Tell Us The Current Situation.</div></Timeline.Item>
                        <Timeline.Item color="blue"><h3>Onboarding.</h3><div>Meet The Team.</div></Timeline.Item>
                        <Timeline.Item color="green"><h3>Creating.</h3><div>Breathing Life Into The Project.</div></Timeline.Item>
                        <Timeline.Item color="red"><h3>Going Live.</h3><div>Deploying Your New Web App.</div></Timeline.Item>
                        <Timeline.Item color="red"><h3>Support.</h3><div>Maintenance And Updates.</div></Timeline.Item>
                    </Timeline>
                </div>
            </section>
            <section className="offer padding">
                <div className="sectionTitle" data-aos="slide-down">Our Offer<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos="slide-down">
                    Your business is unique and so is our offer. <br />
                </div>
                <div className="content">  
                            Together we will combine strategic planning, customer insight and technology to create a superior digital experience that resonates with your brand and your customers. 
                            Our service is unique and dependent on what our client needs. Your business needs, problems and vision will drive us to create a unique product.   
                </div>
                <div className="centerMe">
                    <button className="btn" onClick={() => {props.closeMenu; router.push('/contact');}}>
                        <span>Contact Us</span><div id="circle"></div>
                    </button>
                </div>
            </section>
        </main>
    );
}


export default ProcessPage;