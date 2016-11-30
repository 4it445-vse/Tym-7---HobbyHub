import { takeEvery, delay } from 'redux-saga'
import { put } from 'redux-saga/effects'
import api from '../../api.js';
import {
  EVENT_SIGN_IN,
  eventSignInSuccess,
  eventSignInError
} from './actions';



export function* eventSignIn(action){
  const { postData } = action
  try{
    const successResponse = yield api.post('eventUsers', postData);
    console.log(successResponse);
    yield put (eventSignInSuccess())
  }catch(error){
    const errorResponse = yield put (eventSignInError(error))
    console.warn(errorResponse);
  }
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
    helloSaga()
  ]
}