import React, {useState } from 'react';
import {withRouter } from 'react-router-dom';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState("");
    const [count, setCount] = useState(0);

    const [recording, setRecording] = useState('')
    const { transcript, resetTranscript } = useSpeechRecognition()

    const updateSearch = e => {
        if (e.target) {
            console.log(e.target.value);
            setSearchInput(e.target.value);
        } else {
            setSearchInput(e);
        }
    }

    const handleSearch = e => {
            props.history.push({
                pathname: '/results',
                state: { searchInput: searchInput }
        });
    }

    const handleVoiceSearch = transcript => {
        console.log(`${transcript} is searched result`);
        props.history.push({
            pathname: '/results',
            state: { searchInput: transcript }
        });
    }

    const recordAudio = () => {
        if (count % 2 && count === 0) {
            setCount(count + 1);
            setRecording(SpeechRecognition.stopListening);
        }
        else if (count % 2) {
            setCount(count + 1)
            setRecording(SpeechRecognition.stopListening);
            updateSearch(transcript);
            handleVoiceSearch(transcript);
        }
        else {
            setCount(count + 1);
            resetTranscript();
            setRecording(SpeechRecognition.startListening);
        }
        console.log(transcript);

    }

    const suffix = (
        < AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
            onClick={recordAudio}

        />
    );

    return (
        <div>
            <Search
                className="productSearch"
                placeholder="What are you looking for..."
                suffix={suffix}
                onChange={updateSearch}
                onSearch={handleSearch}
                size="medium"
                value={searchInput}
            />
        </div>

    );
}


export default withRouter(SearchBar);