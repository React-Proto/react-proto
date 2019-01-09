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
  ADD_PROP_TO_DISPLAYED,
  REMOVE_PROP_FROM_DISPLAYED,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  EXPORT_WORKSPACE,
  EXPORT_WORKSPACE_ERROR,
  EXPORT_WORKSPACE_SUCCESS,
  IMPORT_WORKSPACE,
  IMPORT_WORKSPACE_ERROR,
  IMPORT_WORKSPACE_SUCCESS,
  ADD_ROUTE,
  DELETE_ROUTE,
  SET_VISIBLE,
} from '../actionTypes/index';

import { loadState } from '../localStorage';

import createFiles from '../utils/createFiles.util';
import createApplicationUtil from '../utils/createApplication.util';
import createWorkspaceFile from '../utils/createWorkspaceFile.util';
import readWorkspaceFile from '../utils/readWorkspaceFile.util';

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

export const deleteRoute = compToDelete => ({
  type: DELETE_ROUTE,
  payload: compToDelete,
});

export const deleteComponent = ({
  index, id, parent, routes,
}) => (dispatch) => {
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

export const exportFiles = data => (dispatch) => {
  dispatch({
    type: EXPORT_FILES,
  });

  createFiles(data)
    .then(dir => dispatch({
      type: EXPORT_FILES_SUCCESS,
      payload: { status: true, dir: dir[0] },
    }))
    .catch(err => dispatch({
      type: EXPORT_FILES_ERROR,
      payload: { status: true, err },
    }));
};

/*
 *  exportWorkspace: Dispatch action EXPORT_WORKSPACE then dispatch
 *                   EXPORT_WORKSPACE_SUCCESS or EXPORT_WORKSPACE_ERROR
 *                   based on outcome of exporting the current state into
 *                   a zip file.
 */
export const exportWorkspace = workspaceData => (dispatch) => {
  dispatch({
    type: EXPORT_WORKSPACE,
  });

  createWorkspaceFile(workspaceData)
    .then((workspaceFilePath) => {
      dispatch({
        type: EXPORT_WORKSPACE_SUCCESS,
        payload: { status: true, workspaceFilePath },
      });
    })
    .catch((err) => {
      dispatch({
        type: EXPORT_WORKSPACE_ERROR,
        payload: { status: true, err },
      });
    });
};

/*
 *  importWorkspace: Dispatch action IMPORT_WORKSPACE. This action should
 *                   be synchronous since we are affecting the application
 *                   store(s)/state(s).
 */

// Need to Initialize the state/store with retrievedWorkspaceData
// Need to CHANGE_IMAGE_PATH
export const importWorkspace = ({ workspaceFilePath }) => (dispatch) => {
  dispatch({
    type: IMPORT_WORKSPACE,
  });

  readWorkspaceFile(workspaceFilePath)
    .then((retrievedWorkspaceData) => {
      dispatch({
        type: IMPORT_WORKSPACE_SUCCESS,
        payload: { status: true, retrievedWorkspaceData },
      });
    })
    .catch((err) => {
      dispatch({
        type: IMPORT_WORKSPACE_ERROR,
        payload: { status: true, err },
      });
    });
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
  path, components = [], genOption, appName = 'proto_app', repoUrl, compProps,
}) => (dispatch) => {
  if (genOption === 0) {
    dispatch(exportFiles({ path, components, compProps }));
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

export const deleteProp = propId => ({
  type: DELETE_PROP,
  payload: { propId },
});

export const addProp = prop => ({
  type: ADD_PROP,
  payload: { ...prop },
});

export const addPropToDisplayed = (propId, compId) => ({
  type: ADD_PROP_TO_DISPLAYED,
  payload: { propId, compId },
});

export const removePropFromDisplayed = (propId, compId) => ({
  type: REMOVE_PROP_FROM_DISPLAYED,
  payload: { propId, compId },
});

export const addRoute = compToAdd => ({
  type: ADD_ROUTE,
  payload: compToAdd,
});

export const setVisible = compId => ({
  type: SET_VISIBLE,
  payload: compId,
});

export const setSelectableParents = () => ({ type: SET_SELECTABLE_PARENTS });

export const setSelectableRoutes = routerCompId => ({
  type: SET_SELECTABLE_ROUTES,
  payload: routerCompId,
});
