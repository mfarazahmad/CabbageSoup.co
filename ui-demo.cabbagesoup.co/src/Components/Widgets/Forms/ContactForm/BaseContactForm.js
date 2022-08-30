import React, {useState, useEffect} from 'react';

import { Input, Select , Checkbox, TimePicker  } from 'antd';
import { UserOutlined, PhoneTwoTone,  MailTwoTone} from '@ant-design/icons';

import AdvancedContactForm from './AdvancedContactForm';

const CheckboxGroup = Checkbox.Group;
const { Option } = Select;

function BaseContactForm(props) {


    const [isAdvanced, setIsAdvanced] = useState(false);
    const [userRequest, setUserRequest] = useState({name: '', requestType: 'question', contactType: 'phone', contact:'', discovery: '', bestTimeToReach: '', message: ''});
    
    const discoveryOptions = ['Referral', 'Google', 'Reddit', 'Yelp', 'Bing', 'Our Blog Posts'];


    useEffect(() => { 
        console.log('Updating Parent Form!')
        console.log(userRequest);
        props.saveForm(userRequest);
    });
    
    const handleInput = (e, field) => {
        console.log(e.target.value); 
        setUserRequest({...userRequest, [field]: e.target.value});     
    }

    const handleDropDown = (value, field) => {
        console.log(value); 
        setUserRequest({...userRequest, [field]: value});     
    }

    const handleTime = (time, field) => {
        console.log(time);  
        setUserRequest({...userRequest, [field]: time });     
    }

    const handleCheckBox = (checkedValues, field) => {
        console.log('checked = ', checkedValues); 
        setUserRequest({...userRequest, [field]: checkedValues.join() });     
    }

    const showAdvanced = () => {console.log('hey'); setIsAdvanced(true)};

    const { name, requestType, contactType, contact, discovery, bestTimeToReach, message} = userRequest;

    return (
        <div className="contactForm" >

            <p className="formLabel">Name: </p>
            <Input 
                prefix={<UserOutlined />}
                value={name}
                onChange={(e) => handleInput(e, 'name')}
            />

            <p className="formLabel">Contact: </p>
            <Input.Group compact>
                <Select  
                    style={{ width: '30%', height: '100%' }}        
                    value={contactType} 
                    onChange={(e) => handleDropDown(e, 'contactType')}
                >
                    <Option value="email">Email</Option>
                    <Option value="phone">Phone</Option>
                </Select>
                <Input 
                    prefix={contactType === 'phone' ? <PhoneTwoTone /> : <MailTwoTone /> }    
                    style={{ width: '70%' }} 
                    value={contact}
                    onChange={(e) => handleInput(e, 'contact')}
                />
            </Input.Group>

            <p className="formLabel">Ideal time for a chat (EST): </p>
            <TimePicker 
                use12Hours
                style={{width: '50%', display: 'block'}} 
                value={bestTimeToReach} 
                onChange={(time) => handleTime(time, 'bestTimeToReach')}
            />
            
            {/*
                <button onClick={showAdvanced}>Advanced</button>
                {isAdvanced && <AdvancedContactForm meetingTime={meetingTime} handleTime={handleTime} />}
            */}

            <p className="formLabel">Request Type: </p>
            <Select         
                style={{ width: '50%', display: 'block' }}      
                value={requestType} 
                onChange={(e) => handleDropDown(e, 'requestType')}
            >
                <Option value="question">Question</Option>
                <Option value="schedule">Schedule a meeting</Option>
                <Option value="feedback">Feedback</Option>
                <Option value="quote">Quote</Option>
            </Select>

            <p className="formLabel">How can we help you: </p>
            <Input.TextArea 
                rows={4} 
                value={message} 
                onChange={(e) => handleInput(e, 'message')} 
            />

            <p   style={{ textAlign: 'center', marginTop: '20px' }} className="formLabel">How did you find out about us: </p>
            <CheckboxGroup
                style={{ width: '90%', marginTop: '10px' }}      
                options={discoveryOptions}
                onChange={(e) => handleCheckBox(e, 'discovery')}
            />
        </div>
    );
}

export default BaseContactForm;