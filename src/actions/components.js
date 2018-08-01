import {
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  ADD_NEW_CHILD,
  DELETE_CHILD,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
} from '../actionTypes/index';

export const addNewChild = (({
  id, childIndex, childId,
}) => ({
  type: ADD_NEW_CHILD,
  payload: {
    id, childIndex, childId,
  },
}));

export const deleteChild = (({
  parent, childIndex, childId,
}) => ({
  type: DELETE_CHILD,
  payload: {
    parent, childIndex, childId,
  },
}));

export const parentReassignment = (({ index, id, parent }) => ({
  type: REASSIGN_PARENT,
  payload: {
    index,
    id,
    parent,
  },
}));

export const addComponent = ({ title }) => (dispatch) => {
  dispatch({ type: ADD_COMPONENT, payload: { title } });
  dispatch({ type: SET_SELECTABLE_PARENTS });
};

export const deleteComponent = ({ index, id, parent }) => (dispatch) => {
  // Delete Component  from its parent.
  if (parent && parent.id) {
    dispatch(deleteChild({ parent, childId: id, childIndex: index }));
  }
  // Reassign Component's children to its parent if it has one or make them orphans
  dispatch(parentReassignment({ index, id, parent }));
  dispatch({ type: DELETE_COMPONENT, payload: { index, id } });
  dispatch({ type: SET_SELECTABLE_PARENTS });
};

export const updateComponent = ({
  id, index, parent = null, newParentId = null, color = null, stateful = null,
}) => (dispatch) => {
  dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id, index, newParentId, color, stateful,
    },
  });

  if (newParentId) {
    dispatch(addNewChild({ id: newParentId, childId: id, childIndex: index }));
  }

  if (parent && parent.id) {
    dispatch(deleteChild({ parent, childId: id, childIndex: index }));
  }

  dispatch({ type: SET_SELECTABLE_PARENTS });
};
