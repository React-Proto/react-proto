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
  CREATE_APPLICATION,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  CREATE_APPLICATION_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  TOGGLE_DRAGGING,
  MOVE_TO_BOTTOM,
  MOVE_TO_TOP,
  OPEN_EXPANSION_PANEL,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  ADD_PROP,
  ADD_PROP_TO_DISPLAYED,
  REMOVE_PROP_FROM_DISPLAYED,
  DELETE_PROP,
  EXPORT_WORKSPACE,
  EXPORT_WORKSPACE_ERROR,
  EXPORT_WORKSPACE_SUCCESS,
  IMPORT_WORKSPACE,
  IMPORT_WORKSPACE_ERROR,
  IMPORT_WORKSPACE_SUCCESS,
  ADD_ROUTE,
  DELETE_ROUTE,
  SET_VISIBLE,
} from '../actionTypes';

import {
  addComponent,
  updateComponent,
  deleteComponent,
  addChild,
  deleteChild,
  reassignParent,
  setSelectableP,
  setSelectableR,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  toggleDragging,
  moveToBottom,
  moveToTop,
  openExpansionPanel,
  changeImagePath,
  addProp,
  addPropToDisplayed,
  removePropFromDisplayed,
  deleteProp,
  exportWorkspaceError,
  exportWorkspaceSuccess,
  importWorkspaceError,
  importWorkspaceSuccess,
  addRoute,
  deleteRoute,
  setVisible,
} from '../utils/componentReducer.util';

const initialApplicationState = {
  totalComponents: 0,
  nextId: 1,
  nextPropId: 0,
  imagePath: '',
  successOpen: false,
  errorOpen: false,
  focusComponent: {},
  components: [],
  compProps: [],
  // compProps - {id , key, value, required, type, displayedAt, origin, availableAt}
  appDir: '',
  loading: false,
};

const componentReducer = (state = initialApplicationState, action) => {
  switch (action.type) {
    case LOAD_INIT_DATA:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case UPDATE_COMPONENT:
      return updateComponent(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case ADD_NEW_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case REASSIGN_PARENT:
      return reassignParent(state, action.payload);
    case SET_SELECTABLE_PARENTS:
      return setSelectableP(state);
    case SET_SELECTABLE_ROUTES:
      return setSelectableR(state, action.payload);
    case CREATE_APPLICATION:
    case EXPORT_FILES:
      return { ...state, loading: true };
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    case CREATE_APPLICATION_ERROR:
    case EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);
    case TOGGLE_DRAGGING:
      return toggleDragging(state, action.payload);
    case MOVE_TO_BOTTOM:
      return moveToBottom(state, action.payload);
    case MOVE_TO_TOP:
      return moveToTop(state, action.payload);
    case OPEN_EXPANSION_PANEL:
      return openExpansionPanel(state, action.payload);
    case DELETE_ALL_DATA:
      return initialApplicationState;
    case CHANGE_IMAGE_PATH:
      return changeImagePath(state, action.payload);
    case ADD_PROP:
      return addProp(state, action.payload);
    case DELETE_PROP:
      return deleteProp(state, action.payload);
    case EXPORT_WORKSPACE:
      return { ...state, loading: true };
    case EXPORT_WORKSPACE_SUCCESS:
      return exportWorkspaceSuccess(state, action.payload);
    case EXPORT_WORKSPACE_ERROR:
      return exportWorkspaceError(state, action.payload);
    case IMPORT_WORKSPACE:
      return { ...state, loading: true };
    case IMPORT_WORKSPACE_SUCCESS:
      return importWorkspaceSuccess(state, action.payload);
    case IMPORT_WORKSPACE_ERROR:
      return importWorkspaceError(state, action.payload);
    case ADD_PROP_TO_DISPLAYED:
      return addPropToDisplayed(state, action.payload);
    case REMOVE_PROP_FROM_DISPLAYED:
      return removePropFromDisplayed(state, action.payload);
    case ADD_ROUTE:
      return addRoute(state, action.payload);
    case DELETE_ROUTE:
      return deleteRoute(state, action.payload);
    case SET_VISIBLE:
      return setVisible(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;
