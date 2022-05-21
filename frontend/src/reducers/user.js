import produce from 'utils/produce.util';

export const initialState = {
  updateUserPositionLoading: false,
  updateUserPositionDone: false,
  updateUserPositionError: null,
  updateUserTechLoading: false,
  updateUserTechDone: false,
  updateUserTechError: false,
};

export const UPDATE_USERPOSITION_REQUEST = 'UPDATE_USERPOSITION_REQUEST';
export const UPDATE_USERPOSITION_SUCCESS = 'UPDATE_USERPOSITION_SUCCESS';
export const UPDATE_USERPOSITION_FAILURE = 'UPDATE_USERPOSITION_FAILURE';

export const UPDATE_USERTECH_REQUEST = 'UPDATE_USERTECH_REQUEST';
export const UPDATE_USERTECH_SUCCESS = 'UPDATE_USERTECH_SUCCESS';
export const UPDATE_USERTECH_FAILURE = 'UPDATE_USERTECH_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case UPDATE_USERPOSITION_REQUEST:
        draft.updateUserPositionLoading = true;
        draft.updateUserPositionDone = false;
        draft.updateUserPositionError = null;
        break;
      case UPDATE_USERPOSITION_SUCCESS:
        draft.updateUserPositionLoading = false;
        draft.updateUserPositionDone = true;
        break;
      case UPDATE_USERPOSITION_FAILURE:
        draft.updateUserPositionLoading = false;
        draft.updateUserPositionError = action.error;
        break;
      case UPDATE_USERTECH_REQUEST:
        draft.updateUserTechLoading = true;
        draft.updateUserTechDone = false;
        draft.updateUserTechError = null;
        break;
      case UPDATE_USERTECH_SUCCESS:
        draft.updateUserTechLoading = false;
        draft.updateUserTechDone = true;
        break;
      case UPDATE_USERTECH_FAILURE:
        draft.updateUserTechLoading = false;
        draft.updateUserTechError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
