import produce from 'utils/produce.util';

export const initialState = {
  addMemberLoading: false,
  addMemberDone: false,
  addMemberError: null,
};

export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';

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
      default:
        break;
    }
  });

export default reducer;
