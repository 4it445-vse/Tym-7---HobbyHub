import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'
import api from '../../api.js';
import {
  EVENT_SIGN_IN,
  EVENT_SIGN_OUT,
  EVENT_FETCH,
  eventUserChangedSuccess,
  eventUserChangedError,
  fetchEventSuccess,
  fetchEventError
} from './actions';



export function* eventSignIn(action){
  const { postData } = action
  try{
    const successResponse = yield api.post('eventUsers', postData);
    console.log(successResponse);
    yield put (eventUserChangedSuccess(successResponse.data))
  }catch(error){
    const errorResponse = yield put (eventUserChangedError(error))
    console.warn(errorResponse);
  }
}

export function* eventSignOut(action){
  const { postData } = action
  try{
    const successResponse = yield api.post('eventusers/signOut', postData);
    console.log("successResponse",successResponse);
    yield put (eventUserChangedSuccess(successResponse.data))
  }catch(error){
    const errorResponse = yield put (eventUserChangedError(error))
    console.error(errorResponse);
  }
}

export function* eventFetch(action){
  const { user_id, event_id } = action.postData
  console.log(user_id,event_id)
  try{
    const successResponse = yield api('eventusers', {"params": {"filter": {"where": {"and": [{user_id}, {event_id} ]}}}});
    console.log("successResponse",successResponse.data[0]);
    yield put(fetchEventSuccess(successResponse.data[0]))
  }catch(error){
    const errorResponse = yield put (fetchEventError(error))
    console.error(errorResponse);
  }
}

export function* watchEventSignOut() {
  yield takeEvery(EVENT_SIGN_OUT,eventSignOut)
}
export function* watchEventSignIn() {
  yield takeEvery(EVENT_SIGN_IN,eventSignIn)
}
export function* watchFetchEvent() {
  yield takeEvery(EVENT_FETCH,eventFetch)
}
export function* helloSaga() {
  yield console.log('sagaInitiated')
}

export default function* eventRootSaga() {
  yield [
    watchEventSignIn(),
    watchEventSignOut(),
    watchFetchEvent(),
    helloSaga()
  ]
}