import React from 'react';
import { PropTypes } from 'prop-types';
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
    theme: 'Primary',
    onClick: () => {}
};

CustomButton.propTypes = {
    styles: PropTypes.object,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    theme: PropTypes.string,
    onClick: PropTypes.func.isRequired
};

export default CustomButton;