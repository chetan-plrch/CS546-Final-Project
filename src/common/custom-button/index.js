import React from 'react';
import { PropTypes } from 'prop-types';
import Button from '@mui/material/Button';

function CustomButton(props) {
    const { isPrimary, styles, title, disabled, onClick } = props;
    return (
    <Button
        disabled={disabled}
        onClick={onClick}
        classes={styles}
        color={isPrimary ? 'primary' : 'secondary'}
    >
        {title}
    </Button>
    )
}

CustomButton.defaultProps = {
    styles: {},
    title: 'Okay',
    disabled: false,
    isPrimary: true,
    onClick: () => {}
};

CustomButton.propTypes = {
    title: PropTypes.string,
    disabled: PropTypes.bool,
    styles: PropTypes.object,
    isPrimary: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};

export default CustomButton;
