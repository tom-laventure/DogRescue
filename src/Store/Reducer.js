const initialState = {
    user: {adminLevel: 0, loaded: false, thisIs: 'initial'},
    error: null,
    authPopUp: false,
    currentRegion:'South Korea',
    dogList: [],
    loading: false
}

const types = {
    SET_USER: "SET_USER",
    SET_ERROR: "SET_ERROR",
    UPDATE_DOGLIST: "UPDATE_DOGLIST",
    SET_AUTH_POPUP: "SET_AUTH_POPUP",
    SET_LOADING: "SET_LOADING"
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.payload,
                authPopUp: false,
                loading: false
            }
        case types.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case types.UPDATE_DOGLIST:
            let tempDogList = [...state.dogList]
            return{

            }
        case types.SET_AUTH_POPUP:
            return{
                ...state,
                authPopUp: action.payload
            }
        case types.SET_LOADING:
            return{
                ...state,
                laoding: action.payload
            }
    }
    return state;
}

export { Reducer, initialState, types }

// setting up db
// ,
//         {
//             position: 2,
//             DogName: "Adam",
//             Status: "Awaiting Arrival",
//             Adopters: {
//                 name: "Ken and Sam",
//                 id: "123"
//             },
//             Handler: {
//                 name:"Sam",
//                 id: "312"
//             },
//             InboundDate: "2020-04-12",
//             FlightDetails: "1425 Air Canada",
//             DateUnkown: false
//         },
//         {
//             position: 3,
//             DogName: "Goofy",
//             Status: "Awaiting Arrival",
//             Adopters: {
//                 name: "Ken and Sam",
//                 id: "123"
//             },
//             Handler: {
//                 name:"Jenny",
//                 id: "122"
//             },
//             InboundDate: "2020-04-12",
//             FlightDetails: "1425 Air Canada",
//             DateUnkown: false
//         },
//         {
//             position: 1,
//             DogName: "Goofy",
//             Status: "Awaiting Arrival",
//             Adopters: {
//                 name: "Ken and Sam",
//                 id: "123"
//             },
//             Handler: {
//                 name:"Jenny",
//                 id: "122"
//             },
//             InboundDate: "2020-04-12",
//             FlightDetails: "1425 Air Canada",
//             DateUnkown: false
//         }