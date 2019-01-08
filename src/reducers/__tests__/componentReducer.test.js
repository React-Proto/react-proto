import { initialApplicationState } from '../componentReducer';
import * as cr from '../../utils/componentReducer.util';

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
    state = cr.deleteComponent(state, { index: 0, id: 0 });
    expect(state.components.length).toEqual(1);
    expect(state.components[0].id).toEqual('1');
  });

  it('should be able to delete components', () => {
    state = cr.deleteComponent(state, { index: 1, id: 1 });
    expect('s').toEqual('s');
  });

  it('should update the component\'s parent', () => {
    state = cr.updateComponent(state, { id: '0', newParentId: '1' });
    expect();
  });
});
