import { ADD_COMPONENT } from '../actionTypes/index';

export function addComponent(name) {
  return {
    type: ADD_COMPONENT,
    payload: name,
  };
}
