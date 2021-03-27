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

export default combineReducers({
    stories: bestStories,
    creators: getCreator
});
