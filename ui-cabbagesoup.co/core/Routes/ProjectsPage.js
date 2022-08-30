import React from "react";
import { useRouter } from 'next/router';

function ProjectsPage(props) {

  const router = useRouter();
  
  return (

    <main className="page" id="projects">

      <section className="projectIntro padding">
        <div data-aos="slide-down" className="projectTitle" >OUR</div>
        <div data-aos="slide-left" className="projectSubtitle" >
          Projects<span className="dot">.</span>
        </div>

        <div className="projectDescription">
          Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.It has survived not only five centuries, but also the
           remaining essentially unchanged.
        </div>

        <div>
          <button className="demoBtn"  onClick={() => document.location.href ='http://demo.cabbagesoup.co/'}>
            <span >See our Demo</span><div id="circle"></div>
          </button>
        </div>

      </section>

      <section className="topicBoard" >
        <div className="topicTitle ecommerce" onClick={() => {props.closeMenu; router.push('/eccomerce'); }} >
          <div className="linksToProjects" >E-commerce</div>
        </div>
        <div className="topicTitle manufacturing" onClick={() =>{props.closeMenu; router.push('/manufacturing');}}>
          <div className="linksToProjects" >Manufacturing</div>
        </div>
        <div className="topicTitle finance" onClick={() => {props.closeMenu; router.push('/finance');}}>
          <div className="linksToProjects">Finance</div>
        </div>
      </section>

      <section className="moreProjects">
        <div data-aos="slide-down" className="projectPageArrow">
          <big><big><big>&#x2193; </big></big></big>
        </div>
      </section>

      <section className="projectContact padding">
        <div className="contactMsg">Let's Build Together</div>
        <div>
          <button className="contactBtn" onClick={() => {props.closeMenu; router.push('/contact');}} >
            <span >Contact Us</span><div id="circle"></div>
          </button>
        </div>
      </section>
    </main >
  );
}

export default ProjectsPage;