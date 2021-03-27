import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';

export function *fetchStories() {
    try {
        const url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
        const responseAll = yield call(axios.get, url);
        // console.log('all', responseAll.data);

        let only20 = [];
        const all = responseAll.data;
        for (let i = 0, n = 20; n > i; i++) {
            if(all.length > i){
                const currentId = all[i];
                const url = 'https://hacker-news.firebaseio.com/v0/item/' + currentId + '.json';
                const res = yield call(axios.get, url);
                //console.log('currentId data', res.data);
                only20.push(res.data);
            }
        }
        // console.log('only20 fetched in detail', only20);

        yield put(actions.fetchStoriesSucceeded(only20));
    } catch (e) {
        // error: dispatch failure action
        //yield put(actions.fetchStoriesFailed(e.message));
    }
}

export function *fetchCreatorById(action) {
    try {
        const url = 'https://hacker-news.firebaseio.com/v0/user/' + action.id + '.json';
        const res = yield call(axios.get, url);
        //console.log('res.data', res.data);
        yield put(actions.fetchCreatorByIdSucceeded(res.data));
    } catch (e) {
        // error: dispatch failure action
        //yield put(actions.fetchCreatorByIdFailed(e.message));
    }
}
