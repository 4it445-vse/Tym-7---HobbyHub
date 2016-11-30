import { takeEvery, delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import api from '../../api.js';
import {
  EVENT_SIGN_IN,
  EVENT_SIGN_OUT,
  eventUserChangedSuccess,
  eventUserChangedError
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
    console.log(successResponse);
    yield put (eventUserChangedSuccess(successResponse.data))
  }catch(error){
    const errorResponse = yield put (eventUserChangedError(error))
    console.warn(errorResponse);
  }
}

export function* watchEventSignOut() {
  yield takeEvery(EVENT_SIGN_OUT,eventSignOut)
}
export function* watchEventSignIn() {
  yield takeEvery(EVENT_SIGN_IN,eventSignIn)
}
export function* helloSaga() {
  console.log('sagaInitiated')
}

export default function* eventRootSaga() {
  yield [
    watchEventSignIn(),
    watchEventSignOut(),
    helloSaga()
  ]
}