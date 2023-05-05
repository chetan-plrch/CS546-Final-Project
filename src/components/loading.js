import React from 'react'
import {CircularProgress} from '@mui/material';

const PageLoader = (props) => {
    return <div className="app-loader">
      <span className="loader-text">Loading...</span>
      <CircularProgress disableShrink color="success" />
    </div>
}

export default PageLoader