const it = "hello"

const initialState = {
    user: null,
    error: null,
    adminLevel: 1,
    id: "122",
    dogList: [
        {
            position: 1,
            UserID: '',
            DogName: "Goofy",
            Status: "Awaiting Arrival",
            DogImg: 'gs://general-auth-4ef43.appspot.com/pup1.jpg',
            Adopters: {
                name: "Ken and Sam",
                id: "123"
            },
            Handler: {
                name:"Jenny",
                id: "122"
            },
            InboundDate: "2020-04-12",
            FlightDetails: "1425 Air Canada",
            DateUnkown: false
        }
    ]
}

const types = {
    SET_USER: "SET_USER",
    SET_ERROR: "SET_ERROR",
    UPDATE_DOGLIST: "UPDATE_DOGLIST"
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_USER:
            return {
                ...state,
                user: action.payload
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