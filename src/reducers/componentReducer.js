import * as types from '../actionTypes';
import componentReducerUtil from '../utils/componentReducer.util';

const { addComponent } = componentReducerUtil;
const initialApplicationState = {
  totalComponents: 0,
  components: [],
};

const componentReducer = (state = initialApplicationState, action) => {
  switch (action.type) {
    case types.ADD_COMPONENT:
      return addComponent(action.payload.title, state);
    default:
      return state;
  }
};

export default componentReducer;
