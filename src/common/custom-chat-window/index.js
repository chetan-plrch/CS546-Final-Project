import React from 'react';
import './index.css'
import CustomButton from '../common-button';

export default function ChatWindow(props) {

    const {allowSearch = false, allowBlocking = false} = props;

    return (
        <div>
            <div className='button-container'>
                {
                    allowSearch ? <CustomButton title={'Search a Message'} /> : null
                }
                {
                    allowBlocking ? <CustomButton title={'Block User'} /> : null
                }
            </div>
        </div>
    )
};
