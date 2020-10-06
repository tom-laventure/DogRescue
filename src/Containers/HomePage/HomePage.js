import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import classes from './HomePage.module.css'
import MainContainer from '../../hoc/MainContainer/MainContainer'
import DogCard from '../../Components/DogCard/DogCard'
import {setFormTemplateUser, setFormTemplateHandler} from '../../Resources/Functions/SetFormTemplate'

const Homepage = () => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const [dogCardList, setDogCardList] = useState()
    const [dogCardFormTemplate, setDogCardFormTemplate] = useState([
        {
            type: "Text",
            label: "Status",
            placeholder: "",
            readOnly: true
        },
        {
            type: "Text",
            label: "Adopters",
            placeholder: "",
            readOnly: true
        },
        {
            type: "Text",
            label: "Handler",
            placeholder: "",
            readOnly: true
        },
        {
            type: "Date",
            label: "Inbound Date",
            placeholder: "",
            readOnly: true
        },
        {
            type: "Text",
            label: "Flight Details",
            placeholder: "",
            readOnly: true
        }
    ])

    useEffect(() => {
        setDogList()
    }, [state])

    let ro;
    let tempState;
    let tempDogList;
    let newDogList;

    const CreateDogCard = (info) => {
        switch (state.adminLevel) {
            case (0):
                ro = true;
                tempState = [
                    {
                        type: "Text",
                        label: "Status",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "Text",
                        label: "Adopters",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "Text",
                        label: "Handler",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "Date",
                        label: "Inbound Date",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "Text",
                        label: "Flight Details",
                        placeholder: "",
                        readOnly: ro
                    }
                ]
                break
            case (1):
                if (state.id === info.Handler.id) {
                    ro = false;
                    tempState = [
                        {
                            type: "DropDown",
                            options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
                            label: "Status",
                            select: (item) => {
                                // let tempform = [...formInfo]
                                // tempform[1].placeholder = item;
                                // setFormInfo(tempform)
                            },
                            placeholder: "Select Status",
                            readOnly: false
                        },
                        {
                            type: "Text",
                            label: "Adopters",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "DropDown",
                            options: ["Jenny", "Tim", "Sam"],
                            label: "Handler",
                            select: (item) => {
                                // let tempform = [...formInfo]
                                // tempform[3].placeholder = item;
                                // setFormInfo(tempform)
                            },
                            placeholder: "Select Handler",
                            readOnly: false
                        },
                        {
                            type: "Date",
                            label: "Inbound Date",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Flight Details",
                            placeholder: "",
                            readOnly: ro
                        }
                    ]
                }
                else {
                    ro = true;
                    tempState = [
                        {
                            type: "Text",
                            label: "Status",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Adopters",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Handler",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "Date",
                            label: "Inbound Date",
                            placeholder: "",
                            readOnly: ro
                        },
                        {
                            type: "Text",
                            label: "Flight Details",
                            placeholder: "",
                            readOnly: ro
                        }
                    ]
                }
                break;
            case (2):
                ro = false;
                tempState = [
                    {
                        type: "DropDown",
                        options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
                        label: "Status",
                        select: (item) => {
                            // let tempform = [...formInfo]
                            // tempform[1].placeholder = item;
                            // setFormInfo(tempform)
                        },
                        placeholder: "Select Status",
                        readOnly: false
                    },
                    {
                        type: "Text",
                        label: "Adopters",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "DropDown",
                        options: ["Jenny", "Tim", "Sam"],
                        label: "Handler",
                        select: (item) => {
                            // let tempform = [...formInfo]
                            // tempform[3].placeholder = item;
                            // setFormInfo(tempform)
                        },
                        placeholder: "Select Handler",
                        readOnly: false
                    },
                    {
                        type: "Date",
                        label: "Inbound Date",
                        placeholder: "",
                        readOnly: ro
                    },
                    {
                        type: "Text",
                        label: "Flight Details",
                        placeholder: "",
                        readOnly: ro
                    }
                ]
                break
        }
        return tempState
    }
    const setDogList = () => {
        tempDogList = [...state.dogList]
        newDogList = tempDogList.map((dogInfo, k) => {
            let tempState;
            switch (state.adminLevel) {
                case 0:
                    tempState = setFormTemplateUser()
                    break;
                case 1:
                    if (state.id === dogInfo.Handler.id) {
                        tempState = setFormTemplateHandler()
                    }
                    else{
                        tempState = setFormTemplateUser()
                    }
                    break;
                case 2:
                    tempState = setFormTemplateHandler()
                    break;
            }
            console.log(dogInfo)
            tempState[0].placeholder = dogInfo.Status;
            tempState[1].placeholder = dogInfo.Adopters.name;
            tempState[2].placeholder = dogInfo.Handler.name;
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