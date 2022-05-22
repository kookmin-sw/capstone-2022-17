import produce from 'utils/produce.util';

export const initialState = {
  addMemberLoading: false,
  addMemberDone: false,
  addMemberError: null,
  destroyMemberLoading: false,
  destroyMemberDone: false,
  destroyMemberError: false,
};

export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';

export const DESTROY_MEMBER_REQUEST = 'DESTROY_MEMBER_REQUEST';
export const DESTROY_MEMBER_SUCCESS = 'DESTROY_MEMBER_SUCCESS';
export const DESTROY_MEMBER_FAILURE = 'DESTROY_MEMBER_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_MEMBER_REQUEST:
        draft.addMemberLoading = true;
        draft.addMemberDone = false;
        draft.addMemberError = null;
        break;
      case ADD_MEMBER_SUCCESS:
        draft.addMemberLoading = false;
        draft.addMemberDone = true;
        break;
      case ADD_MEMBER_FAILURE:
        draft.addMemberLoading = false;
        draft.addMemberError = action.error;
        break;
      case DESTROY_MEMBER_REQUEST:
        draft.destroyMemberLoading = true;
        draft.destroyMemberDone = false;
        draft.destroyMemberError = null;
        break;
      case DESTROY_MEMBER_SUCCESS:
        draft.destroyMemberLoading = false;
        draft.destroyMemberDone = true;
        break;
      case DESTROY_MEMBER_FAILURE:
        draft.destroyMemberLoading = false;
        draft.destroyMemberError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
