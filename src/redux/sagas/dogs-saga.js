import { put, takeLatest, call } from 'redux-saga/effects';
import * as types from '../actions/action-types';
import axios from 'axios';

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherDogSaga() {
  yield takeLatest("API_CALL_REQUEST", workerDogSaga);
}

// function that makes the api request and returns a Promise for response
function fetchDog() {
  return axios({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerDogSaga(){
	try {
		const response = yield call(fetchDog);
		const dog = response.data.message;
		// dispatch a success action to the store with the new dog
		yield put({ type: "API_CALL_SUCCESS", dog });
	}
	catch(error){
		// dispatch a failure action to the store with the error
		yield put({ type: "API_CALL_FAILURE", error });
	}	
}

