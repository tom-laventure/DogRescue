import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import classes from './HomePage.module.css'
import MainContainer from '../../hoc/MainContainer/MainContainer'
import DogCard from '../../Components/DogCard/DogCard'
import { setFormTemplateUser, setFormTemplateHandler } from '../../Resources/Functions/SetFormTemplate'

const Homepage = () => {
    const { state, firebase, fire } = useContext(StoreContext)
    const [dogCardList, setDogCardList] = useState()
    const [dogWaitList, setDogWaitList] = useState([])

    // useEffect(() => {
    //     sortDogList()
    // }, [state])



    const setArray = (data) => {
        setDogWaitList(data)
    }

    useEffect(() => {
        fire.getDogWaitList(state.currentRegion, setArray, 0, 2)
    }, [state.currentRegion])

    // useEffect(() => {
    //     console.log("here", dogWaitList)
    //     if(dogWaitList){
    //         // setDogList(dogWaitList)
    //     }
    // }, [dogWaitList])

    // const sortDogList = () => {
    //     let tempDogList;
    //     tempDogList = [...state.dogList]
    //     tempDogList.sort((a, b) => {
    //         return a.position - b.position
    //     })
    //     setDogList(tempDogList)
    // }

    const setDogList = (tempDogList) => {
        let newDogList = tempDogList.map((dogInfo, k) => {
            let tempState;
            switch (state.user.adminLevel ) {
                case 0:
                    tempState = setFormTemplateUser()
                    break;
                case 1:
                    if (state.id === dogInfo.handlerId) {
                        tempState = setFormTemplateHandler()
                    }
                    else {
                        tempState = setFormTemplateUser()
                    }
                    break;
                case 2:
                    tempState = setFormTemplateHandler()
                    break;
            }

            tempState[0].placeholder = dogInfo.Status;
            tempState[1].placeholder = dogInfo.adoptersName;
            tempState[2].placeholder = dogInfo.handler;
            tempState[3].placeholder = dogInfo.InboundDate;
            tempState[4].placeholder = dogInfo.FlightDetails;

            return (
                <div key={k} className={classes.dogCard}>
                    <div className={classes.position}>
                        <p>{dogInfo.position}</p>
                    </div>
                    <DogCard info={tempState} dogName={dogInfo.DogName} position={dogInfo.position} />
                </div>)
        })
        setDogCardList(newDogList)
    }
    

    return (
        <MainContainer>
            <div className={classes.dogList}>
                {dogCardList}
            </div>
        </MainContainer>
    )
}

export default Homepage