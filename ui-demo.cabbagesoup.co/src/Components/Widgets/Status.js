
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Alert } from 'antd';

function Status(props) {

    return (
        <div>
            <div className="centerMe" id="statusDisplay">
                {props.submissionStatus === 'success' ? (
                    <Alert
                        message="Success"
                        description="Your message was successfully delivered!"
                        type="success"
                        showIcon
                    /> ) : (
                    <Alert
                        message="Error"
                        description="Your message was not delivered. Please try again later."
                        type="error"
                        showIcon
                    />
                )}
                <button className="btn" onClick={() => props.history.push('/')}>
                    <span>Back to Home</span>
                    <div id="circle"></div>
                </button>
            </div>
        </div>
    );
}

export default withRouter(Status);