import { combineReducers } from 'redux'
import substrateReducer from './substrate'

export const rootReducer = combineReducers({
  substrate: substrateReducer,
})
