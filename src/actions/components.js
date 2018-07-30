import {
  ADD_COMPONENT,
  DELETE_COMPONENT,
  UPDATE_COLOR,
} from '../actionTypes/index';

export const addComponent = title => ({
  type: ADD_COMPONENT,
  payload: { title },
});

export const deleteComponent = ({ index, id }) => ({
  type: DELETE_COMPONENT,
  payload: { index, id },
});

export const updateColor = ({ color, index, id }) => ({
  type: UPDATE_COLOR,
  payload: { color, index, id },
});
