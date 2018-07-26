import { ADD_COMPONENT } from '../actionTypes/index.js';

export function addComponent(name) {
  console.log('input value', name);

  return {
    type: ADD_COMPONENT,
    payload: name,
  };
}
