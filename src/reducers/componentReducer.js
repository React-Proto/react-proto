import {
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  ADD_NEW_CHILD,
  DELETE_CHILD,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
} from '../actionTypes';
import componentReducerUtil from '../utils/componentReducer.util';

const {
  addComponent,
  updateComponent,
  deleteComponent,
  addChild,
  deleteChild,
  reassignParent,
  setSelectableParents,
} = componentReducerUtil;

const initialApplicationState = {
  totalComponents: 0,
  nextId: 1,
  components: [],
};

const componentReducer = (state = initialApplicationState, action) => {
  switch (action.type) {
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case UPDATE_COMPONENT:
      return updateComponent(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case ADD_NEW_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case REASSIGN_PARENT:
      return reassignParent(state, action.payload);
    case SET_SELECTABLE_PARENTS:
      return setSelectableParents(state);
    default:
      return state;
  }
};

export default componentReducer;
