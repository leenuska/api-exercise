export const fetchStories = () => ({
    type: 'FETCH_STORIES'
});

export const fetchCreatorById = (id) => ({
    type: 'FETCH_CREATOR_BY_ID',
    id
});

export const fetchStoriesSucceeded = (response) => ({
    type: 'FETCH_STORIES_SUCCEEDED',
    response: response
});

export const fetchCreatorByIdSucceeded = (response) => ({
    type: 'FETCH_CREATOR_BY_ID_SUCCEEDED',
    response: response
});

// ------ filter / search

export const setSortBy = (value) => ({
    type: 'SET_SORT_BY',
    value
});

export const setMinDate = (value) => ({
    type: 'SET_MIN_DATE',
    value
});

export const setMaxDate = (value) => ({
    type: 'SET_MAX_DATE',
    value
});

export const setMinScore = (value) => ({
    type: 'SET_MIN_SCORE',
    value
});

export const setMaxScore = (value) => ({
    type: 'SET_MAX_SCORE',
    value
});

export const setTitle = (value) => ({
    type: 'SET_TITLE',
    value
});

export const setCreator = (value) => ({
    type: 'SET_CREATOR',
    value
});
