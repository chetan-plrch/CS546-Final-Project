import React from 'react';

import Button from "@mui/material/Button";

function CustomButton(props) {
    // TODO - Add themes and pass style prop
    const { theme, styles, title, disabled, onClick } = props;
    return (
        <div>
            <Button
             disabled={disabled}
             onClick={onClick}
            >
                {title}
            </Button>
        </div>
    )
}

CustomButton.defaultProps = {
    styles: {},
    title: 'Okay',
    disabled: false,
    theme: 'Primary'
}

export default CustomButton;