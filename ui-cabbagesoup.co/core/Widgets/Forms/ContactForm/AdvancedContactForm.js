
import React from 'react';
import moment from 'moment';

import { TimePicker  } from 'antd';

function AdvancedContactForm(props) {

    return (
        <div>
            
            <p className="formLabel">Schedule a meeting: </p>
            <TimePicker.RangePicker 
                  ranges={{
                    Today: [moment(), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                  }}
                  showTime
                  value={props.meetingTime}
                  format="YYYY/MM/DD HH:mm:ss"
                onChange={() => props.handleTime('meetingTime')}
            />
        </div>
    );
}

export default AdvancedContactForm;