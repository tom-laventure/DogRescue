import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import classes from './HomePage.module.css'
import MainContainer from '../../hoc/MainContainer/MainContainer'
import DogCard from '../../Components/DogCard/DogCard'

const Homepage = () => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    let ro;
    let type;
    let tempState;


    const CreateDogCard = (info) => {
        switch (state.adminLevel) {
            case (0):
                ro = true;
                tempState = {
                    dogName: "Goofy",
                    position: info.DogID,
                    theForm: [
                        {
                            type: "Text",
                            label: "Status",
                            placeholder: info.Status,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Adopters",
                            placeholder: info.Adopters,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Handler",
                            placeholder: info.Handler,
                            readOnly: ro
                        },
                        {
                            type: "Date",
                            label: "Inbound Date",
                            placeholder: info.InboundDate,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Flight Details",
                            placeholder: info.FlightDetails,
                            readOnly: ro
                        }
                    ]
                }
                break
            case (1):
                if (state.id === info.Handler.id) {
                    ro = false;
                    tempState = {
                        dogName: info.DogName,
                        position: info.DogID,
                        theForm: [
                            {
                                type: "Text",
                                label: "Status",
                                placeholder: info.Status,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Adopters",
                                placeholder: info.Adopters.name,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Handler",
                                placeholder: info.Handler.name,
                                readOnly: ro
                            },
                            {
                                type: "Date",
                                label: "Inbound Date",
                                placeholder: info.InboundDate,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Flight Details",
                                placeholder: info.FlightDetails,
                                readOnly: ro
                            }
                        ]
                    }
                }
                else {
                    ro = true;
                    tempState = {
                        dogName: info.DogName,
                        position: info.position,
                        theForm: [
                            {
                                type: "Text",
                                label: "Status",
                                placeholder: info.Status,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Adopters",
                                placeholder: info.Adopters.name,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Handler",
                                placeholder: info.Handler.name,
                                readOnly: ro
                            },
                            {
                                type: "Date",
                                label: "Inbound Date",
                                placeholder: info.InboundDate,
                                readOnly: ro
                            },
                            {
                                type: "Text",
                                label: "Flight Details",
                                placeholder: info.FlightDetails,
                                readOnly: ro
                            }
                        ]
                    }
                }
                break;
            case (2):
                ro = false;
                tempState = {
                    dogName: info.DogName,
                    position: info.position,
                    theForm: [
                        {
                            type: "Text",
                            label: "Status",
                            placeholder: info.Status,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Adopters",
                            placeholder: info.Adopters.name,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Handler",
                            placeholder: info.Handler.name,
                            readOnly: ro
                        },
                        {
                            type: "Date",
                            label: "Inbound Date",
                            placeholder: info.InboundDate,
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Flight Details",
                            placeholder: info.FlightDetails,
                            readOnly: ro
                        }
                    ]
                }
                break
        }
        return tempState
    }

    let tempDogList = [...state.dogList]
    let newDogList = tempDogList.map((dogInfo, k) => {
        let dogForm = CreateDogCard(dogInfo)
        return (
            <div key={k} className={classes.dogCard}>
                <div className={classes.position}>
                    <p>{dogInfo.position}</p>
                </div>
                <DogCard info={dogForm} />
            </div>)
    })



    return (
        <MainContainer>
            <div className={classes.dogList}>
                {newDogList}
            </div>
        </MainContainer>
    )
}

export default Homepage