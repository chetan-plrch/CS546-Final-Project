import React from 'react';

import Button from "@mui/material/Button";

function CustomButton(props) {
    const { theme, styles, title, loading, disabled } = props;
    return (
        <div>
            <Button
             loading={loading}
             disabled={disabled}
            >
                {title}
            </Button>
        </div>
    )
}

CustomButton.defaultProps = {
    styles: {},
    title: 'Okay',
    loading: false,
    disabled: false,
    theme: 'Primary'
}

export default CustomButton;