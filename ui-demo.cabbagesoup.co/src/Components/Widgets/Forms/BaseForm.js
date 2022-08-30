import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Status from '../Status';

function BaseForm(props) {

    const [isSuccess, setIsSuccess] = useState(false);
    const [submissionStatus, setStatus] = useState('');
    const [formData, setFormData] = useState({});

    const handleSubmit = e => {
        const endpoint = process.env.REACT_APP_DB_SERVICE + props.start.db_route;
        axios.post(endpoint, formData)
            .then(data => {
                setIsSuccess(true);
                setStatus('success');
                console.log(data);
            })
            .catch(err => {
                setStatus('error');
                console.log(err);
            });
    }

    return (
        <div>
            {isSuccess ? <Status submissionStatus={submissionStatus} /> : 
            
                <div className="formContainer">
                    {React.cloneElement(props.children, {saveForm: setFormData})}                
                    <div className="centerMe">
                        <button className="btn" onClick={() => handleSubmit()}>
                            <span>Submit</span>
                            <div id="circle"></div>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default withRouter(BaseForm);