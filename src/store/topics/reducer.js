// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import _ from "lodash"
import Immutable from "seamless-immutable"
import * as types from "./actionTypes"

const initialState = Immutable({
  topicsByUrl: undefined,
  selectedTopicUrls: []
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.TOPICS_FETCHED:
      return state.merge({
        topicsByUrl: action.topicsByUrl
      })
    case types.TOPICS_SELECTED:
      return state.merge({
        selectedTopicUrls: action.selectedTopicUrls
      })
    default:
      return state
  }
}

// selectors

export function getTopicsByUrl(state) {
  return state.topics.topicsByUrl
}

export function getTopicsUrlArray(state) {
  return _.keys(state.topics.topicsByUrl)
}

export function getSelectedTopicUrls(state) {
  return state.topics.selectedTopicUrls
}

export function getSelectedTopicUrlsMap(state) {
  return _.keyBy(state.topics.selectedTopicUrls)
}
