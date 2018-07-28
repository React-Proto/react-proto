import {
  ADD_COMPONENT,
  DELETE_COMPONENT,
} from '../actionTypes/index';

export const addComponent = title => ({
  type: ADD_COMPONENT,
  payload: { title },
});

export const deleteComponent = index => ({
  type: DELETE_COMPONENT,
  payload: { index },
});
