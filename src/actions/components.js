import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  ADD_NEW_CHILD,
  DELETE_CHILD,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
  SET_SELECTABLE_ROUTES,
  EXPORT_FILES,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  TOGGLE_DRAGGING,
  MOVE_TO_BOTTOM,
  MOVE_TO_TOP,
  OPEN_EXPANSION_PANEL,
  DELETE_PROP,
  ADD_PROP,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  ADD_ROUTE,
  DELETE_ROUTE,
  SET_VISIBLE,
} from '../actionTypes/index';

import { loadState } from '../localStorage';

import createFiles from '../utils/createFiles.util';
import createApplicationUtil from '../utils/createApplication.util';

export const loadInitData = () => (dispatch) => {
  loadState()
    .then(data => dispatch({
      type: LOAD_INIT_DATA,
      payload: {
        data: data ? data.workspace : {},
      },
    }));
};

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

export const deleteComponent = ({ index, id, parent, routes }) => (dispatch) => {
  console.log('routes: ', routes);
  // Delete Component  from its parent if it has a parent.
  if (parent && parent.id) {
    dispatch(deleteChild({ parent, childId: id, childIndex: index }));
  }
  // Reassign Component's children to its parent if it has one or make them orphans
  dispatch(parentReassignment({ index, id, parent }));
  dispatch({ type: DELETE_COMPONENT, payload: { index, id } });
  dispatch({ type: SET_SELECTABLE_PARENTS });
  // Delete the Component from its parent's routelist
  if (parent) dispatch(deleteRoute({ routerCompId: parent.id, routeCompId: id }));
  // Set it's Route Children to non routes, ieroute stats to false and visibility to true
  routes.forEach(({ routeCompId }) => {
    dispatch(deleteRoute({ routerCompId: id, routeCompId }));
  });
};

export const updateComponent = ({
  id, index, parent = null, newParentId = null, color = null, stateful = null, router = null,
}) => (dispatch) => {
  dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id, index, newParentId, color, stateful, router,
    },
  });

  if (newParentId && newParentId !== 'null') {
    dispatch(addNewChild({ id: newParentId, childId: id, childIndex: index }));
    dispatch({
      type: SET_SELECTABLE_ROUTES,
      payload: newParentId,
    });
  }

  if (parent && parent.id) {
    dispatch(deleteChild({ parent, index, childId: id }));
  }

  dispatch({ type: SET_SELECTABLE_PARENTS });
};

export const exportFiles = ({ components, path }) => (dispatch) => {
  dispatch({
    type: EXPORT_FILES,
  });

  createFiles(components, path)
    .then(dir => dispatch({
      type: EXPORT_FILES_SUCCESS,
      payload: { status: true, dir: dir[0] },
    }))
    .catch(err => dispatch({
      type: EXPORT_FILES_ERROR,
      payload: { status: true, err },
    }));
};

export const handleClose = () => ({
  type: HANDLE_CLOSE,
  payload: false,
});

export const handleTransform = (id, {
  x, y, width, height,
}) => ({
  type: HANDLE_TRANSFORM,
  payload: {
    id, x, y, width, height,
  },
});

// Application generation options
// cosnt genOptions = [
//   'Export into existing project.', 'Export with starter repo.', 'Export with create-react-app.'
// ];

export const createApplication = ({
  path, components = [], genOption, appName = 'proto_app', repoUrl,
}) => (dispatch) => {
  if (genOption === 0) {
    dispatch(exportFiles({ path, components }));
  } else if (genOption) {
    dispatch({
      type: CREATE_APPLICATION,
    });
    createApplicationUtil({
      path, appName, genOption, repoUrl,
    })
      .then(() => {
        dispatch({
          type: CREATE_APPLICATION_SUCCESS,
        });
        dispatch(exportFiles({ path: `${path}/${appName}`, components }));
      })
      .catch(err => dispatch({
        type: CREATE_APPLICATION_ERROR,
        payload: { status: true, err },
      }));
  }
};

export const toggleDragging = status => ({
  type: TOGGLE_DRAGGING,
  payload: status,
});

export const moveToBottom = componentId => ({
  type: MOVE_TO_BOTTOM,
  payload: componentId,
});

export const moveToTop = componentId => ({
  type: MOVE_TO_TOP,
  payload: componentId,
});

export const openExpansionPanel = component => ({
  type: OPEN_EXPANSION_PANEL,
  payload: { component },
});

export const deleteAllData = () => ({
  type: DELETE_ALL_DATA,
});

export const changeImagePath = path => ({
  type: CHANGE_IMAGE_PATH,
  payload: path,
});

export const deleteCompProp = ({ id, index }) => ({
  type: DELETE_PROP,
  payload: { id, index },
});

export const addCompProp = prop => ({
  type: ADD_PROP,
  payload: { ...prop },
});

export const addRoute = compToAdd => (dispatch) => {
  dispatch({
    type: ADD_ROUTE,
    payload: compToAdd,
  });
  dispatch({
    type: SET_SELECTABLE_ROUTES,
    payload: compToAdd.routerCompId,
  });
};

export const deleteRoute = compToDelete => (dispatch) => {
  dispatch({
    type: DELETE_ROUTE,
    payload: compToDelete,
  });
  dispatch({
    type: SET_SELECTABLE_ROUTES,
    payload: compToDelete.routerCompId,
  });
};

export const setVisible = compId => ({
  type: SET_VISIBLE,
  payload: compId,
});

export const setSelectableParents = () => ({ type: SET_SELECTABLE_PARENTS });
