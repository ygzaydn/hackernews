import {
    STORIES_ADD,
    STORIES_FETCH
} from '../constants/actionTypes'

export const doAddStories = stories => ({
    type: STORIES_ADD,
    stories,
})

export const doFetchStories = query => ({
    type: STORIES_FETCH,
    query,
})