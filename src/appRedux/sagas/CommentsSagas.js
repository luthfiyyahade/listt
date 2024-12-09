/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put } from 'redux-saga/effects'
import CommentsActions from '../reducers/CommentsRedux'
// import { TemplateSelectors } from '../Redux/TemplateRedux'

export function * getRequest (api, action) {
    const { data } = action  
    // get current data from Store
    // const currentData = yield select(GetAlatPengamanSelectors.getData)
    // make the call to the api
    const response = yield call(api.getComment, data) //sync
    // success?
    if (response.ok) { //status = 200 , selain 200 bukan ok (nilai ok = false)
        console.log('comment response.data', response.data)
        yield put(CommentsActions.getSuccess(response.data)) //put untuk manggil action pada file Redux
    } else {
        yield put(CommentsActions.getFailure())
    }
}
