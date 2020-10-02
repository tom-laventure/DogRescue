const it = "hello"

const initialState = {
    user: null,
    error: null,
    adminLevel: 1,
    id: "122",
    dogList: [
        {
            DogName: "Goofy",
            Status: "Awaiting Arrival",
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
}

const Reducer = (state = initialState, action) => {
    let currentPoll;
    let polls;
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
    }
    return state;
}

export { Reducer, initialState, types }