import {types} from './Reducer'

export const useActions = (dispatch) => {
    const setCurrentUser = (item) => {
        dispatch({type: types.SET_USER, payload: item})
    }

    const setErrorState = (item) => {
        dispatch({type: types.SET_ERROR, payload: item})
    }


    return{
        setCurrentUser,
        setErrorState
    }
}