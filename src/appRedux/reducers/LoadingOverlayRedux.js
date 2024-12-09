import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    showLoadingOverlay: [ 'show', 'message'], 
})

export const LoadingOverlayTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    show: false,
    message: '', 
})

/* ------------- Selectors ------------- */

export const LoadingOverlaySelectors = {
    isShow: state => state.loadingoverlay.show
}

/* ------------- Reducers ------------- */

// request the data from an api
export const show = (state, { show, message }) => {
    let tempMessage = message 
    if (!show) {
        tempMessage = '' 
    }
    return state.merge({ message: tempMessage, show })
} 
 

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_LOADING_OVERLAY]: show,  
})
