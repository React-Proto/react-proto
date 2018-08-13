import setSelectableParents from './setSelectableParents.util';
import getColor from './colors.util';

const initialComponentState = {
  id: null,
  stateful: false,
  title: '',
  parentId: '',
  color: getColor(),
  draggable: true,
  childrenIds: [],
  selectableParents: [],
  expanded: true,
  position: {
    x: 110,
    y: 120,
    width: 50,
    height: 50,
  },
};

const componentReducerUtil = {
  addComponent: (state, { title }) => {
    const strippedTitle = title.replace(/[^\w]/g, '');
    const capitalizedTitle = strippedTitle[0].toUpperCase() + strippedTitle.slice(1);
    const newComponent = {
      ...initialComponentState,
      title: capitalizedTitle,
      id: state.nextId.toString(),
      color: getColor(),
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
      components,
    };
  },
  updateComponent: ((state, {
    id, newParentId = null, color = null, stateful = null,
  }) => {
    const components = [...state.components];
    const component = components.find(comp => comp.id === id);

    if (newParentId === 'null') {
      component.parentId = '';
    } else if (newParentId) {
      component.parentId = newParentId;
    }
    component.color = color || component.color;
    component.stateful = stateful === null ? component.stateful : stateful;

    return {
      ...state,
      components,
    };
  }),
  // Delete component with the index for now, but will be adjusted to use id
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
  addChild: ((state, { id, childId }) => {
    const components = state.components.map((component) => {
      if (component.id === id) {
        const { childrenIds } = component;
        return { ...component, childrenIds: [...childrenIds, childId] };
      }
      return component;
    });

    return {
      ...state,
      components,
    };
  }),
  deleteChild: ((state, { parent, childId }) => {
    const components = state.components.map((component) => {
      if (component.id === parent.id) {
        // Find child with matching id and remove from children
        const childrenIds = component.childrenIds.filter(id => id !== childId);
        return { ...component, childrenIds };
      }
      return component;
    });

    return {
      ...state,
      components,
    };
  }),
  reassignParent: ((state, { index, parent = {} }) => {
    // Get all childrenIds of the component to be deleted
    const { childrenIds } = state.components[index];
    const components = state.components.map((comp) => {
      // Give each child their previous parent's parent
      if (childrenIds.includes(comp.id)) {
        return { ...comp, parentId: parent.id || '' };
      }
      // Give the parent all children of it's to be deleted child
      if (parent.id === comp.id) {
        const prevChildrenIds = comp.childrenIds;
        return { ...comp, childrenIds: [...new Set(prevChildrenIds.concat(childrenIds))] };
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
  exportFilesSuccess: ((state, { status, dir }) => ({
    ...state,
    successOpen: status,
    appDir: dir,
  })),
  exportFilesError: ((state, { status, err }) => ({
    ...state,
    errorOpen: status,
    appDir: err,
  })),
  handleClose: ((state, status) => ({
    ...state,
    errorOpen: status,
    successOpen: status,
  })),
  updatePosition: (state, { id, x, y }) => {
    const components = state.components.map((component) => {
      if (component.id === id) {
        return {
          ...component,
          position: {
            x,
            y,
            width: component.position.width,
            height: component.position.height,
          },
        };
      }
      return component;
    });
    return {
      ...state,
      components,
    };
  },
  handleTransform: (state, {
    id, x, y, width, height,
  }) => {
    const components = state.components.map((component) => {
      if (component.id === id) {
        return {
          ...component,
          position: {
            x,
            y,
            width,
            height,
          },
        };
      }
      return component;
    });
    return {
      ...state,
      components,
    };
  },
  toggleDragging: (state, status) => {
    const components = state.components.map(component => ({
      ...component,
      draggable: status,
    }));
    return {
      ...state,
      components,
    };
  },
  moveToBottom: (state, componentId) => {
    const components = state.components.concat();
    const index = components.findIndex(component => component.id === componentId);
    const removedComponent = components.splice(index, 1);
    components.unshift(removedComponent[0]);

    return {
      ...state,
      components,
    };
  },
  openExpansionPanel: (state, componentId) => ({
    ...state,
    expandedPanelId: componentId,
  }),
  changeImagePath: (state, imagePath) => ({
    ...state,
    imagePath,
  }),
};

export default componentReducerUtil;
