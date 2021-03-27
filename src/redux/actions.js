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
