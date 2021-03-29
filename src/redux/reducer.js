import { combineReducers } from 'redux';

const bestStories = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_STORIES_SUCCEEDED':
            return action.response;
        default:
            return state;
    }
};

const getCreator = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CREATOR_BY_ID_SUCCEEDED':
                const list = [...state];
                const index = list.findIndex(item => item.id === action.response.id);
                if (index >= 0 ) { // remove old
                    list.splice(index, 1);
                }
                list.push(action.response); // add freshly fetched
                return list;
        default:
            return state;
    }
}

const searchInitState = {
    sortBy: 'score',
    minDate: 0, // milliseconds
    maxDate: 0, // milliseconds
    minScore: 0,
    maxScore: 0,
    title: '',
    creator: ''
}

const searchSettings = (state = searchInitState, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.value };
        case 'SET_MIN_DATE':
            return { ...state, minDate: action.value };
        case 'SET_MAX_DATE':
            return { ...state, maxDate: action.value };
        case 'SET_MIN_SCORE':
            return { ...state, minScore: action.value };
        case 'SET_MAX_SCORE':
            return { ...state, maxScore: action.value };
        case 'SET_TITLE':
            return { ...state, title: action.value };
        case 'SET_CREATOR':
            return { ...state, creator: action.value };
        default:
            return state;
    }
}

export default combineReducers({
    stories: bestStories,
    creators: getCreator,
    search: searchSettings
});
