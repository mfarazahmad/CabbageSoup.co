import React from "react";
import { useRouter } from 'next/router';

function EccomercePage(props) {

    const router = useRouter();
    
    return (

        <main className="page" id="projectPages">
            
            <section className="projectIntro padding">
                <div className="projectTitle">E-COMMERCE</div>
                <div className="projectSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </section>

            <section className="ePic coverPic"></section>

            <section id="howItsBuilt">
                <div className="SkillsProvided leftSkillProvided">
                    <div className="SkillsProvidedTitle ">Service provided</div>
                    <li>UI/UX</li>
                    <li>Web Design</li>
                    <li>Web Development</li>
                    <li>Quality Assurance</li>
                </div>
                <div className="vertical-line"></div>
                <div className="SkillsProvided">
                    <div className="SkillsProvidedTitle">Technologies</div>
                    <li>React</li>
                    <li>Python</li>
                    <li>HTML5 &amp; CSS</li>
                    <li>Photoshop</li>
                </div>
            </section>

            <section className="eHome padding">
                <div className="eHomeTitle">Eccomerce.</div>
                <div className="eHomeSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                <div className="eHomeScreenshot">
                    <img src='./img/projects/eccomerce/eccomerceHomepage.png' className="eHomePhoto" />
                </div>
            </section>
            
            <section className="eccomerceCategory padding">
                <div className="eCategoryTitle">Eccomerce.</div>
                <div className="eCatSub">Category</div>
                <div className="eHomeSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</div>
                <div className="eccomercePinkBorder">
                    <div className="eHomeCategoryShot">
                        <img src='./img/projects/eccomerce/eccomerceCategories.png' className="eccomerceCategories" />
                    </div>
                </div>
            </section>

            <section className="eDailyOffers padding">
                <div className="eCategoryTitle">Eccomerce.</div>
                <div className="eCatSub">Daily Offers</div>
                <div className="dailyAlign">
                    <div className="eDailyDesc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    </div>
                    <div className="eccomercePinkBorder">
                        <div className="eHomeCategoryShot">
                            <img src='./img/projects/eccomerce/DailyOffers.png' className="DailyOffersPhoto" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="eMobile padding">
                <div className="dailyAlign">
                <img src='./img/projects/eccomerce/mobileview1.png' className="mvE1" />
                    <div>
                        <div className="eCategoryTitle">Eccomerce.</div>
                        <div className="eCatSub">Mobile</div>
                        <div className="eDailyDesc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        </div>
                    </div>
                </div>
                <div className="eccomerceMobileViews">
                    <a ><img src='./img/projects/eccomerce/mobileview1.png' className="ecommerceMobileViewsDisplay firstDisplay"></img></a>
                    <a ><img src='./img/projects/eccomerce/mobileview2.png' className="ecommerceMobileViewsDisplay"></img></a>
                    <a ><img src='./img/projects/eccomerce/mobileview3.png' className="ecommerceMobileViewsDisplay"></img></a>
                    <a ><img src='./img/projects/eccomerce/mobileview4.png' className="ecommerceMobileViewsDisplay"></img></a>
                    <a ><img src='./img/projects/eccomerce/mobileview5.png' className="ecommerceMobileViewsDisplay"></img></a>
                    <a ><img src='./img/projects/eccomerce/mobileview6.png' className="ecommerceMobileViewsDisplay"></img></a>
                    <big className="eccomercePageArrow">
                        <big><big><big><big></big><big><big><big><big>&#x2192;</big></big></big></big></big></big></big>
                    </big>
                </div>
            </section>

            <section className="projectContact padding">
                <div className="eCategoryTitle">Have an idea?</div>
                <div className="eCatSub">Let's Build Together</div>
                <div className="contactContainer">
                    <button className="contactBtn" onClick={() => {props.closeMenu; router.push('/contact');}} >
                        <span >Contact Us</span><div id="circle"></div>
                    </button>
                </div>
            </section>

        </main >
    );
}

export default EccomercePage;