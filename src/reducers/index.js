import { combineReducers } from 'redux';

import componentReducer from './componentReducer';

const reducers = combineReducers({
  components: componentReducer,
});

export default reducers;
