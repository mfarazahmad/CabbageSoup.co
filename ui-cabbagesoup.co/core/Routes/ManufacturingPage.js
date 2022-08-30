import React from "react";
import { useRouter } from 'next/router';

function ManufacturingPage(props) {

    const router = useRouter();

    return (
        <main className="page" id="projectPages">
            <section className="projectIntroManufacturing padding">
                <div className="manufacturingTitle">Manufacturing</div>
                <div className="manufacturingSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </section>
            <section className="manufacturingDetail">
            </section>
            <section className="howItsBuiltManufacturing">
                <div className="SkillsProvidedManufacturing leftSkillProvided">
                    <div className="SkillsProvidedTitleManfacturing ">Service provided</div>
                    <li>UI/UX</li>
                    <li>Web Design</li>
                    <li>Web Development</li>
                    <li>Quality Assurance</li>
                </div>
                <div className="vertical-lineManufacturing"></div>
                <div className="SkillsProvided">
                    <div className="SkillsProvidedTitle">Technologies</div>
                    <li>React</li>
                    <li>Python</li>
                    <li>HTML5 &amp; CSS</li>
                    <li>Sketch, Figma, Illustrator, Photoshop</li>
                </div>
            </section>
            <div>,</div>
            <section className="manufacturingHomepage">
                <div className="manufacturingHomepageTitle">Manufacturing.</div>
                <div className="manfacturingHomepageSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam</div>
                <section className="manufacturingHomePageScreenshot">
                    <div>
                        <a ><img src='./img/projects/manufacturing/Header.png' className="manufacturingHomePagePhoto"></img></a>
                    </div>
                </section>
            </section>
            <section className="manufacturingServices">
                <div className="manufacturingdetailPageTitle">Manufacturing.</div>
                <div className="manufacturingpageSubTitle">Our Services</div>
                <div className="manfacturingHomepageSubtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                     Ut enim ad minim veniam</div>
                <section className="manufacturingYellowBorder">
                    <div>.</div>
                    <div>
                        <a ><img src='./img/projects/manufacturing/service.png' className="manufacturingServicesPicture"></img></a>
                    </div>
                </section>
            </section>
            <section className="manufacturingWorkProcess">
                <div className="manufacturingWorkProcessSection putInRow">
                    <div className="manufacturingWorkProcessTitles">Manufacturing.
                    <div id="manufacturingWorkProcessTitle">Work Process</div>
                    </div>
                    <div className="manufacturingWorkProcessDescription putInRow">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    </div>
                </div>
                <section className="manufacturingWorkProcessYellowBorder">
                    <div>.</div>
                    <section className="eccomerceDailyOffersPageScreenshot">
                        <div>
                            <a ><img src='./img/projects/manufacturing/work_process.png' className="workProcessPhoto"></img></a>
                        </div>

                    </section>
                </section>
            </section>
            <section className="manufacturingOurTeam">
                <div className="manufacturingOurTeamTitle">Manufacturing.</div>
                <div className="manufacturingOurTeamSubTitle">Our Team</div>
                <section className="TeamBoxYellow">
                    <div>.</div>
                    <div className="TeamBoxWhite">
                        <a ><img src='./img/projects/manufacturing/1.png' className="teamPhotos"></img></a>
                        <a ><img src='./img/projects/manufacturing/2.png' className="teamPhotos"></img></a>
                        <a ><img src='./img/projects/manufacturing/3.png' className="teamPhotos"></img></a>
                        <a ><img src='./img/projects/manufacturing/4.png' className="teamPhotos"></img></a>

                    </div>
                    <div className="manufacturingTeamDetail">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </div>


                </section>


            </section>
            <section className="ManufacturingMobileView ">
                <div className=" putInRow">
                    <div className="manufacturingeMobileTitle ">Manufacturing.</div>
                    <div className="blackpenis">
                    </div>
                    <div>
                        <a ><img src='./img/projects/manufacturing/mobileview1ecommerce.png' className="mobileView1Manufacturing  putInRow"></img></a>
                    </div>
                </div>
                <div className="manufacturingMobileSubtitle">Mobile View</div>
                <div className="manufacturingMobileDetail">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                </div>
                <div className="manufacturingMobileViews">
                    <a ><img src='./img/projects/manufacturing/mobiles.png' className="manufacturingMobileViewsDisplay"></img></a>
                </div>
            </section>
            <section className="contactEccomercePage">
                <div className="contactProjectPagesTitle">Have an idea?</div>
                <div className="contactProjectPagesSubTitle">Let's Build Together</div>
                <div class="contactProjectPagesButton">
                    <button className="ProjectPagesContactButton" onClick={() => {router.push('/contact');}} >
                        <span >Contact Us</span><div id="circle"></div>
                    </button>
                </div>
            </section>

        </main >
    );
}

export default ManufacturingPage;