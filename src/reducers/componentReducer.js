import * as types from '../actionTypes';
import componentReducerUtil from '../utils/componentReducer.util';

const { addComponent } = componentReducerUtil;
const initialApplicationState = {
  totalComponents: 0,
  components: [
    {
      title: 'Card',
      state: true,
      children: [
        1, 2,
      ],
    },
    {
      title: 'Button',
      state: false,
      children: [
      ],
    },
    {
      title: 'Game',
      state: true,
      children: [],
    },
  ],
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
