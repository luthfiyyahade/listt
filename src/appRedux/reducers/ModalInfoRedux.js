import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    showModalInfo: ['showed', 'title', 'content', 'handleOk', 'handleCancel'],
    setTitleContent: ['title', 'content']
})

export const ModalInfoTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    showed: false,
    title: '',
    content: '',
    handleOk: null,
    handleCancel: null
})

/* ------------- Selectors ------------- */

export const ModalInfoSelectors = {
    getShowed: state => state.modalinfo.showed
}

/* ------------- Reducers ------------- */

// request the data from an api
export const showmodalinfo = (state, { showed, title, content }) => {
    let tempContent = content
    let tempTitle = title
    if (!showed) {
        tempContent = ''
        tempTitle = ''
    }
    return state.merge({ showed, content: tempContent, title: tempTitle })
}

export const settitlecontent = (state, { title, content }) => { 
    return state.merge({ title, content })
}
 

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SHOW_MODAL_INFO]: showmodalinfo, 
    [Types.SET_TITLE_CONTENT]: settitlecontent, 
})
