import componentReducer, { initialApplicationState } from '../componentReducer';
import * as cr from '../../utils/componentReducer.util';
import * as actions from '../../actionTypes/index.js';

describe('Component Tests', () => {
  const ias = initialApplicationState;
  const ics = cr.initialComponentState;
  delete ics.color;
  let state;

  beforeEach(() => {
    state = cr.addComponent(ias, 'comp');
    state = cr.addComponent(state, 'otherComp');
    delete state.components[0].color;
    delete state.components[1].color;
    return state;
  });

  it('should return a default state when given an undefined input', () => {
    expect(componentReducer(undefined, { type: undefined })).toEqual(ias);
  });

  it('should be able to initialize components in components array with id and initial state', () => {
    expect(state.totalComponents).toEqual(2);
    expect(state.nextId).toEqual(2);
    expect(state.components[1]).toEqual({
      ...ics,
      title: 'OtherComp',
      id: '1',
    });
  });

  it('should be able to delete components', () => {
    const action = {
      type: actions.DELETE_COMPONENT,
      payload: { index: 0, id: 0 },
    };
    const { components } = componentReducer(state, action);
    expect(components.length).toEqual(1);
    expect(components[0].id).toEqual('1');
  });

  it('should be able to add components with the first letter capitalized and numer removed', () => {
    const action = {
      type: actions.ADD_COMPONENT,
      payload: 'compthree3',
    };
    const { components } = componentReducer(state, action);
    expect(components.length).toEqual(3);
    expect(components[2].title).toEqual('Compthree');
  });

  it('should update the component\'s parent', () => {
    const action = {
      type: actions.UPDATE_COMPONENT,
      payload: { id: '0', newParentId: '1' },
    };
    const { components } = componentReducer(state, action);
    expect(components[0].parentId).toBe('1');
  });

  it('should toggle state and router on and off', () => {
    const statefulTrueAction = {
      type: actions.UPDATE_COMPONENT,
      payload: { id: '0', stateful: true },
    };

    state = cr.updateComponent(state, { id: '0', stateful: true });
    expect(state.components[0].stateful).toBe(true);
    state = cr.updateComponent(state, { id: '0', stateful: false });
    expect(state.components[0].stateful).toBe(false);

    state = cr.updateComponent(state, { id: '0', router: false });
    expect(state.components[0].router).toBe(false);
    state = cr.updateComponent(state, { id: '0', router: true });
    expect(state.components[0].router).toBe(true);
  });

  it('should toggle state and router on and off', () => {
    state = cr.updateComponent(state, { id: '0', stateful: true });
    expect(state.components[0].stateful).toBe(true);
    state = cr.updateComponent(state, { id: '0', stateful: false });
    expect(state.components[0].stateful).toBe(false);

    state = cr.updateComponent(state, { id: '0', router: false });
    expect(state.components[0].router).toBe(false);
    state = cr.updateComponent(state, { id: '0', router: true });
    expect(state.components[0].router).toBe(true);
  });
});
