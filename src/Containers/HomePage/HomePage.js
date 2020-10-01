import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import classes from './HomePage.module.css'
import MainContainer from '../../hoc/MainContainer/MainContainer'
import DogCard from '../../Components/DogCard/DogCard'

const Homepage = () => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)

    return (
        <MainContainer>
            <DogCard/>
        </MainContainer>
    )
}

export default Homepage