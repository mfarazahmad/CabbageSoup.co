import React from 'react';

function Offerings() {
    return (
        <div data-aos="slide-up" className="offerings">
			<ul>
				<li>
					<span className="dot"></span>
					<h3><strong>Design <br /> First. </strong></h3>
                    <div className='pyramid'>
                        <p data-aos="fade-right" data-aos-duration="1000">Reponsives UIs
                            <div className="imgContainer">
                                <img src='./svg/013-video conference.svg'/>
                            </div>
                        </p>
                        <p data-aos="fade-right" data-aos-duration="2000">Copywriting
                            <div className="imgContainer">
                                <img src='./svg/038-copyright.svg'/>
                            </div>
                        </p>
                    </div>
                    <p data-aos="fade-right" data-aos-duration="3000">Clean, Minimal Layout
                        <div className="imgContainer">
                            <img src='./svg/030-video player.svg'/>
                        </div>
                    </p>
				</li>
				<li>
					<span className="dot"></span>
					<h3><strong>Development  <br /> Principles.</strong></h3>
                    <div className='pyramid'>
                        <p data-aos="fade-left" data-aos-duration="1000">Robust Business Logic
                            <div className="imgContainer">
                                <img src='./svg/024-private account.svg'/>
                            </div>
                        </p>
                        <p data-aos="fade-left" data-aos-duration="2000">Dynamic Apps
                            <div className="imgContainer">
                                <img src='./svg/021-content.svg'/>
                            </div>
                        </p>
                    </div>
                    <p data-aos="fade-left" data-aos-duration="3000">Secure Data Management 
                        <div className="imgContainer">
                            <img src='./svg/020-settings.svg'/>
                        </div>
                    </p>
				</li>
			</ul>
        </div>
    );
}
    export default Offerings;