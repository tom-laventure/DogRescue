import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import classes from './HomePage.module.css'
import MainContainer from '../../hoc/MainContainer/MainContainer'

const Homepage = () => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)

    return (
        <MainContainer>

        </MainContainer>
    )
}

export default Homepage