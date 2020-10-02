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

    switch (state.adminLevel) {
        case (0):
            ro = true;
            break
        case (1):
            break;
        case (2):
            break
    }


    const CreateDogCard = (info) => {
        switch (state.adminLevel) {
            case (0):
                ro = true;
                tempState = {
                    dogName: "Goofy",
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
                break
        }
    }

    let tempDogList = [...state.dogList]
    tempDogList.map((info, k) => {
        return CreateDogCard(info)
    })



    return (
        <MainContainer>
            <div className={classes.dogList}>
                <div className={classes.dogCard}>
                    <div className={classes.position}>
                        <p>1.</p>
                    </div>
                    <DogCard info={tempState} />
                </div>
                <div className={classes.dogCard}>
                    <div className={classes.position}>
                        <p>2.</p>
                    </div>
                    <DogCard info={tempState} />
                </div>
            </div>
        </MainContainer>
    )
}

export default Homepage