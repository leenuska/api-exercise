import {
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';

import { fetchStories, fetchCreatorById } from './fetchApis';

function *rootSaga() {
    yield takeLatest('FETCH_STORIES', fetchStories);
    yield takeEvery('FETCH_CREATOR_BY_ID', fetchCreatorById);
}

export default rootSaga;
