import React from 'react';

import './ErrorBox.css';

export const ErrorBox = (props) => {
    return (
        <div className="errorBox">
            {props.children}
        </div>
    )
}

export default ErrorBox;
