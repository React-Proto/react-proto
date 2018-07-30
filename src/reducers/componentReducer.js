import * as types from '../actionTypes';
import componentReducerUtil from '../utils/componentReducer.util';

const { addComponent, updateColor, deleteComponent } = componentReducerUtil;
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
      return addComponent(state, action.payload);
    case types.DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case types.UPDATE_COLOR:
      return updateColor(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;
