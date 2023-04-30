import React, { useEffect, useState } from 'react'
import PageLoader from './loading'
import AppBar from '../common/custom-navbar/index.js'
import AppFooter from '../common/custom-footer/index.js'
import { useNavigate } from 'react-router-dom'
import { initialPage, delay } from '../helper'

const Protected = (props) => {
    const [unprotect, setUnprotect] = useState(props.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        async function navigateToRoute() {
            // if (props.isLoggedIn && initialPage()) {
            //     // Login and signup page flow
            //     navigate("/")
            //     await delay(1000)
            //     setUnprotect(true)
            // } else if (!props.isLoggedIn && !initialPage()){
            //     // When not loggedin
            //     navigate("/login")
            //     await delay(1000)
            //     setUnprotect(true)
            // } else {
            //     // For all the other scenarios
            //     await delay(1000)
                 setUnprotect(true)
            // }
        }

        navigateToRoute()
    }, [props.isLoggedIn])

    if (unprotect) {
        return <>
            <AppBar />
            {props.children}
            <AppFooter />
        </>
    }
    return <>
        <AppBar />
        <PageLoader />
        <AppFooter />
    </>
}

export default Protected