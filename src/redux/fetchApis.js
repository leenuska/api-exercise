import { put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from './actions';

export function *fetchStories() {
    try {
        const url = 'https://hacker-news.firebaseio.com/v0/beststories.json';
        const responseAll = yield call(axios.get, url);

        const allData = responseAll.data;

        // gather all api calls first together
        const calls = allData.slice(0,20).map((currentId) => {
            const url = 'https://hacker-news.firebaseio.com/v0/item/' + currentId + '.json';
            return call(axios.get, url);
        })

        let only20 = []; // the final list of story data that will end up to redux store
        const only20Responses = yield all(calls); // make all calls asynchronously. Read more: https://redux-saga.js.org/docs/advanced/RunningTasksInParallel/
        for (const item of only20Responses) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
            only20.push(item.data);
        }

        // console.log('only20 fetched in detail', only20);
        yield put(actions.fetchStoriesSucceeded(only20));
    } catch (e) {
        // console.log('error when fetching stories!')
        // TODO dispatch failure action to inform the user, it would be something like this
        // yield put(actions.fetchStoriesFailed(e.message));
    }
}

export function *fetchCreatorById(action) {
    try {
        const url = 'https://hacker-news.firebaseio.com/v0/user/' + action.id + '.json';
        const res = yield call(axios.get, url);
        //console.log('res.data', res.data);
        yield put(actions.fetchCreatorByIdSucceeded(res.data));
    } catch (e) {
        // console.log('error when fetching user information!')
        // TODO dispatch failure action to inform the user, it would be something like this
        //yield put(actions.fetchCreatorByIdFailed(e.message));
    }
}
