import * as types from '../actionTypes';

const componentReducer = (state = [{ name: 'Erik' }], action) => {
  switch (action.type) {
    case types.ADD_COMPONENT:
      console.log(action.payload);
      return {

      };
    default:
      return state;
  }
};

export default componentReducer;
