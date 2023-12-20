import React, { useState } from 'react';

const Alert = ({ title, describe, className }) => {
    const [isClose, setIsClose] = useState(true);
    const handleClose = () => {
        isClose ? setIsClose(false) : setIsClose(true);
    }
    return (
        <div>
            {
                isClose ?
                    <div className={`alert ${className}`}>
                        <span className="closebtn" onClick={handleClose}>&times;</span>
                        <strong>{title}</strong> {describe}
                    </div>
                    :
                    <div></div>
            }
        </div>

    );
};

export default Alert;