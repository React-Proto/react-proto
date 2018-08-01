import setSelectableParents from './setSelectableParents.util';

const initialComponentState = {
  id: null,
  stateful: false,
  title: '',
  parent: {},
  color: '#0000ff',
  children: [],
  selectableParents: [],
  position: [],
};

const componentReducerUtil = {
  addComponent: (state, { ...props }) => {
    const newComponent = {
      ...initialComponentState,
      ...props,
      id: state.nextId.toString(),
    };

    const components = [
      ...state.components,
      newComponent,
    ];

    const totalComponents = state.totalComponents + 1;
    const nextId = state.nextId + 1;

    return {
      ...state,
      totalComponents,
      nextId,
      components: setSelectableParents(components),
    };
  },
  updateComponent: ((state, {
    index, newParentId = null, color = null, stateful = null,
  }) => {
    const components = [...state.components];
    const parent = components.find(({ id }) => id === newParentId);
    const component = components[index];

    component.parent = parent || component.parent;
    component.color = color || component.color;
    component.stateful = stateful === null ? component.stateful : stateful;

    return {
      ...state,
      components,
    };
  }),
  deleteComponent: (state, { index }) => {
    const components = [
      ...state.components.slice(0, index),
      ...state.components.slice(index + 1),
    ];

    const totalComponents = state.totalComponents - 1;

    return {
      ...state,
      totalComponents,
      components,
    };
  },
  addChild: ((state, { id, childIndex }) => {
    const components = state.components.map((component) => {
      if (component.id === id) {
        const { children } = component;
        return { ...component, children: [...children, childIndex] };
      }
      return component;
    });

    return {
      ...state,
      components,
    };
  }),
  deleteChild: ((state, { parent, childIndex }) => {
    const components = state.components.map((component) => {
      if (component.id === parent.id) {
        const children = component.children.filter(childInd => childInd !== childIndex);
        return { ...component, children };
      }
      return component;
    });

    return {
      ...state,
      components,
    };
  }),
  reassignParent: ((state, { index, parent }) => {
    // Get all children of the Component whose parents you want to reassign.
    const { children } = state.components[index];
    const components = state.components.map((comp, i) => {
      // Find the children within the components and reassign parents
      if (children.includes(i)) {
        const child = comp;
        child.parent = parent;
        return child;
      }
      return comp;
    });

    return {
      ...state,
      components,
    };
  }),
  setSelectableParents: (state => ({
    ...state,
    components: setSelectableParents(state.components),
  })),
};

export default componentReducerUtil;
