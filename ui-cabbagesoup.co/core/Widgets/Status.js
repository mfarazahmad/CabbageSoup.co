
import React from 'react';
import { useRouter } from 'next/router';
import { Alert } from 'antd';

function Status(props) {

    const router = useRouter();

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
                <button className="btn" onClick={() => {props.closeMenu; router.push('/');}}>
                    <span>Back to Home</span>
                    <div id="circle"></div>
                </button>
            </div>
        </div>
    );
}

export default Status;