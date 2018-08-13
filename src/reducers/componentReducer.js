import {
  ADD_COMPONENT,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  ADD_NEW_CHILD,
  DELETE_CHILD,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  TOGGLE_DRAGGING,
  MOVE_TO_BOTTOM,
  MOVE_TO_TOP,
  OPEN_EXPANSION_PANEL,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
} from '../actionTypes';
import componentReducerUtil from '../utils/componentReducer.util';

const {
  addComponent,
  updateComponent,
  deleteComponent,
  addChild,
  deleteChild,
  reassignParent,
  setSelectableParents,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  toggleDragging,
  moveToBottom,
  moveToTop,
  openExpansionPanel,
  changeImagePath,
} = componentReducerUtil;

const initialApplicationState = {
  totalComponents: 0,
  nextId: 1,
  imagePath: '',
  successOpen: false,
  errorOpen: false,
  focusComponent: {},
  components: [],
  appDir: '',
};

const componentReducer = (state = initialApplicationState, action) => {
  switch (action.type) {
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
      return setSelectableParents(state);
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
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
    default:
      return state;
  }
};

export default componentReducer;
