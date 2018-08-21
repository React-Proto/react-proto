import { combineReducers } from 'redux';

import componentReducer from './componentReducer';

const reducers = combineReducers({
  workspace: componentReducer,
});

export default reducers;
