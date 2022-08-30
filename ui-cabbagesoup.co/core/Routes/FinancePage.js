import React from "react";
import { useRouter } from 'next/router';

function FinancePage(props) {

    const router = useRouter();

    return (
        <main className="page" id="projectPages">
            <section className="projectIntroFinance padding">
                <div className="FinanceTitle">Finance</div>
                <div className="financeSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </section>
            <section className="financeDetail"></section>
            <section className="howItsBuiltFinance">
                <div className="SkillsProvidedFinance leftSkillProvidedManufacturing">
                    <div className="SkillsProvidedTitleFinance ">Service provided</div>
                    <li>UI/UX</li>
                    <li>Web Design</li>
                    <li>Web Development</li>
                    <li>Quality Assurance</li>
                </div>
                <div className="vertical-lineFinance"></div>
                <div className="SkillsProvidedFinance">
                    <div className="SkillsProvidedTitleFinance">Technologies</div>
                    <li>React</li>
                    <li>Python</li>
                    <li>HTML5 &amp; CSS</li>
                    <li>Sketch, Figma, Illustrator, Photoshop</li>
                </div>
            </section>
            <div>,</div>
            <section className="financeHomepage">
                <div className="financeHomepageTitle">Finance.</div>
                <div className="financeWhoWeHomepageSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam</div>
                <section className="financeHomePageScreenshot">
                    <>
                        <a ><img src='./img/projects/finance/Header.png' className="financeHomePagePhoto"></img></a>
                    </>
                </section>
            </section>
            <section className="financeWhoWeAre">
                <div className="financeWhoWeAredetailPageTitle">Finance.</div>
                <div className="financeWhoWeArepageSubTitle">Who We Are</div>
                <div className="financeWhoWeHomepageSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam</div>

                <section className="financeBlueBorder">
                    <div>.</div>
                    <>
                        <a ><img src='./img/projects/finance/we_are.png' className="financeWhoWeArePicture"></img></a>
                    </>

                </section>


            </section>
            <section className="FinanceGoals">
                <div className="FinanceGoalsSection putInRow">
                    <div className="FinanceGoalsTitle">Finance.
                    <div id="FinanceGoalsTitle">Our Goals</div>
                    </div>
                    <div className="financeGoalsDescription  putInRow">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    </div>
                </div>
                <section className="financeGoalsBlue">
                    <>
                        <a ><img src='./img/projects/finance/goals.png' className="financeGoalsImage"></img></a>
                    </>
                </section>
            </section>
            <section className="Finance">
                <div className="FinanceTitle">Finance.</div>
                <div className="FinanceTitleSubTitle">Latest Work</div>
                <div>.</div>
                <div className="allPhotos">
                    <a ><img src='./img/projects/finance/1.png' className="photo"></img></a>
                    <a ><img src='./img/projects/finance/2.png' className="photo"></img></a>
                    <a ><img src='./img/projects/finance/3.png' className="photo"></img></a>
                </div>
                <div className="financeLatesteWorkDetail">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </div>


            </section>
            <section className="Finance ">
                <div className=" putInRow">
                    <div className="financeMobileTitle ">Finance.</div>
                    <div className="blackpenis">
                    </div>
                    <>
                        <a ><img src='./img/projects/finance/1.png' className="1Ecommerce putInRow"></img></a>
                    </>
                </div>
                <div className="financeMobileSubtitle">Mobile View</div>
                <div className="financeMobileDetail">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </div>
                <div className="finances">
                    <a ><img src='./img/projects/finance/1.png' className="ecommercesDisplay firstDisplay"></img></a>
                    <a ><img src='./img/projects/finance/2.png' className="ecommercesDisplay"></img></a>
                    <a ><img src='./img/projects/finance/3.png' className="ecommercesDisplay"></img></a>
                    <a ><img src='./img/projects/finance/4.png' className="ecommercesDisplay"></img></a>
                    <a ><img src='./img/projects/finance/5.png' className="ecommercesDisplay"></img></a>
                    <a ><img src='./img/projects/finance/6.png' className="ecommercesDisplay"></img></a>
                    <big className="financePageArrow">
                        <big><big><big><big></big><big><big><big><big>&#x2192;</big></big></big></big></big></big></big>
                    </big>
                </div>
            </section>
            <section className="contactEccomercePage">
                <div className="contactProjectPagesTitle">Have an idea?</div>
                <div className="contactProjectPagesSubTitle">Let's Build Together</div>
                <div class="contactProjectPagesButton">
                    <button className="ProjectPagesContactButton" onClick={() => {props.closeMenu; router.push('/contact');}} >
                        <span >Contact Us</span><div id="circle"></div>
                    </button>
                </div>
            </section>



        </main >
    );
}

export default FinancePage;