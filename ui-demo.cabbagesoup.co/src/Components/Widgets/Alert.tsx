
import React from 'react';
import { Alert } from 'antd';
import { PopupAlertHandler } from '../../models/alert';

function CustomAlert(props: PopupAlertHandler) {

    return (
        <>
        { props.show &&
            <Alert
                message={props.message}
                description={props.description}
                type={props.type}
                closable
                showIcon
                afterClose={props.closeAlert}
            />
        }
        </>
    );
}

export default CustomAlert;