import * as types from '../actionTypes';

const componentReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_COMPONENT:
      console.log(action.payload);
      return {
        state,
      };
    default:
      return state;
  }
};

export default componentReducer;
