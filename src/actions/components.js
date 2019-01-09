import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  UPDATE_CHILDREN,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
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

export const updateChildren = (({
  parentIds, childIndex, childId,
}) => ({
  type: UPDATE_CHILDREN,
  payload: {
    parentIds, childIndex, childId,
  },
}));

export const parentReassignment = (({ index, id, parentIds }) => ({
  type: REASSIGN_PARENT,
  payload: {
    index,
    id,
    parentIds,
  },
}));

export const addComponent = ({ title }) => (dispatch) => {
  dispatch({ type: ADD_COMPONENT, payload: { title } });
  dispatch({ type: SET_SELECTABLE_PARENTS });
};

export const deleteComponent = ({ index, id, parentIds = [] }) => (dispatch) => {
  if (parentIds.length) {
    // Delete Component  from its parent if it has a parent.
    dispatch(updateChildren({ parentIds, childId: id, childIndex: index }));
  }
  // Reassign Component's children to its parent if it has one or make them orphans
  dispatch(parentReassignment({ index, id, parentIds }));

  dispatch({ type: DELETE_COMPONENT, payload: { index, id } });
  dispatch({ type: SET_SELECTABLE_PARENTS });
};

export const updateComponent = ({
  id, index, newParentId = null, color = null, stateful = null,
}) => (dispatch) => {
  dispatch({
    type: UPDATE_COMPONENT,
    payload: {
      id, index, newParentId, color, stateful,
    },
  });

  if (newParentId) {
    dispatch(updateChildren({ parentIds: [newParentId], childId: id, childIndex: index }));
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
