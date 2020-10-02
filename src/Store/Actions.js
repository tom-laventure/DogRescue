import {types} from './Reducer'

export const useActions = (dispatch) => {
    const setCurrentUser = (item) => {
        dispatch({type: types.SET_USER, payload: item})
    }

    const setErrorState = (item) => {
        dispatch({type: types.SET_ERROR, payload: item})
    }

    const updateDogList = (item) => {
        dispatch({type: types.UPDATE_DOGLIST, payload: item})
    }

    return{
        setCurrentUser,
        setErrorState
    }
}