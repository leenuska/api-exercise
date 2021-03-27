import { combineReducers } from 'redux';

const bestStories = (state = [], action) => {
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

const searchSettings = (state = { sortBy: 'score', filterBy: '', filterValue: '' }, action) => {
    switch (action.type) {
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.value };
        case 'SET_FILTER_BY':
            return { ...state, filterBy: action.value };
        case 'SET_FILTER_VALUE':
            return { ...state, filterValue: action.value };
        default:
            return state;
    }
}

export default combineReducers({
    stories: bestStories,
    creators: getCreator,
    search: searchSettings
});
