import React from 'react';
import { useRouter } from 'next/router';

function AboutPage(props) {

    const router = useRouter();

    return (
   
        <main className="page" id="about">
            <section className="intro padding">
                <div className="introTitle" data-aos="slide-down" id="trigger-left">Who we are<span className="dot">.</span></div>
                <div className="sectionSubTitle" data-aos-anchor="#trigger-left"  data-aos-anchor-placement="bottom-center" data-aos="fade-left">
                    A people's first culture.
                </div>
            </section>
            <section className="values padding">
                <div className="sectionTitle" data-aos="slide-down">Our Values</div>
                
                <div className="sectionSubTitle" data-aos="slide-down">Be bold be unique<span className="dot">.</span></div>
                <div>  Creativity blossoms when everyone chooses to be confident and be themselves. 
                    Whether you are loud, quiet, unorthodox, or crazy, there will always be a place for you at our table. 
                    All are welcome.
                </div>

                <div className="sectionSubTitle" data-aos="slide-down">Creating Lasting Value<span className="dot">.</span></div>
                <div> We commit ourselves to using our ingenuity and expertise to deliver what is expected, 
                    but strive to go beyond and deliver what is sustainable. 
                    We have the skills and the knowledge to do it and we believe that it's our duty to our clients to do it. 
                </div>

                <div className="sectionSubTitle" data-aos="slide-down">Be Direct<span className="dot">.</span></div>
                <div>  When we speak we are clear and jargon-free. 
                    When we listen, we pay attention and keep an open mind. 
                    What makes us different is we value feedback and communication. 
                    Those two ingredients help create high-performing teams and bring focus to our work. 
                </div>

                <div className="sectionSubTitle" data-aos="slide-down">Embrace Change<span className="dot">.</span></div>
                <div> Change is a consistent factor in every industry and especially in ours. 
                    We have learned to embrace it and see it as an opportunity to grow stronger.
                </div>

            </section>
            <section className=" ready padding">
                <div className="sectionTitle" data-aos="zoom-in">Ready to work together?</div>
                <div className="sectionSubTitle" data-aos="slide-right">Let’s get in touch<span className="dot">!</span></div>
                <div className="centerMe">
                    <button className="btn" onClick={() => {props.closeMenu; router.push('/contact');}}>
                        <span>Contact Us</span><div id="circle"></div>
                    </button>
                </div>
            </section>
        </main>
    );
}


export default AboutPage;