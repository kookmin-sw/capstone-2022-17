import produce from 'utils/produce.util';

export const initialState = {
  memberList: [],
  loadCandidateLoading: false,
  loadCandidateDone: false,
  loadCandidateError: null,
  addMemberLoading: false,
  addMemberDone: false,
  addMemberError: null,
  destroyMemberLoading: false,
  destroyMemberDone: false,
  destroyMemberError: false,
  approveMemberLoading: false,
  approveMemberDone: false,
  approveMemberError: false,
  rejectMemberLoading: false,
  rejectMemberDone: false,
  rejectMemberError: false,
  notify: [],
  notifyMemberLoading: false,
  notifyMemberDone: false,
  notifyMemberError: null,
  checkotifyMemberLoading: false,
  checkNotifyMemberDone: false,
  checkNotifyMemberError: null,
};

export const LOAD_CANDIDATE_REQUEST = 'LOAD_CANDIDATE_REQUEST';
export const LOAD_CANDIDATE_SUCCESS = 'LOAD_CANDIDATE_SUCCESS';
export const LOAD_CANDIDATE_FAILURE = 'LOAD_CANDIDATE_FAILURE';

export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE';

export const DESTROY_MEMBER_REQUEST = 'DESTROY_MEMBER_REQUEST';
export const DESTROY_MEMBER_SUCCESS = 'DESTROY_MEMBER_SUCCESS';
export const DESTROY_MEMBER_FAILURE = 'DESTROY_MEMBER_FAILURE';

export const APPROVE_MEMBER_REQUEST = 'APPROVE_MEMBER_REQUEST';
export const APPROVE_MEMBER_SUCCESS = 'APPROVE_MEMBER_SUCCESS';
export const APPROVE_MEMBER_FAILURE = 'APPROVE_MEMBER_FAILURE';

export const REJECT_MEMBER_REQUEST = 'REJECT_MEMBER_REQUEST';
export const REJECT_MEMBER_SUCCESS = 'REJECT_MEMBER_SUCCESS';
export const REJECT_MEMBER_FAILURE = 'REJECT_MEMBER_FAILURE';

export const NOTIFY_MEMBER_REQUEST = 'NOTIFY_MEMBER_REQUEST';
export const NOTIFY_MEMBER_SUCCESS = 'NOTIFY_MEMBER_SUCCESS';
export const NOTIFY_MEMBER_FAILURE = 'NOTIFY_MEMBER_FAILURE';

export const CHECK_NOTIFY_MEMBER_REQUEST = 'CHECK_NOTIFY_MEMBER_REQUEST';
export const CHECK_NOTIFY_MEMBER_SUCCESS = 'CHECK_NOTIFY_MEMBER_SUCCESS';
export const CHECK_NOTIFY_MEMBER_FAILURE = 'CHECK_NOTIFY_MEMBER_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_CANDIDATE_REQUEST:
        draft.loadCandidateLoading = true;
        draft.loadCandidateDone = false;
        draft.loadCandidateError = null;
        break;
      case LOAD_CANDIDATE_SUCCESS:
        draft.memberList = action.data;
        draft.loadCandidateLoading = false;
        draft.loadCandidateDone = true;
        break;
      case LOAD_CANDIDATE_FAILURE:
        draft.loadCandidateLoading = false;
        draft.loadCandidateError = action.error;
        break;
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
      case APPROVE_MEMBER_REQUEST:
        draft.approveMemberLoading = true;
        draft.approveMemberDone = false;
        draft.approveMemberError = null;
        break;
      case APPROVE_MEMBER_SUCCESS:
        draft.approveMemberLoading = false;
        draft.approveMemberDone = true;
        break;
      case APPROVE_MEMBER_FAILURE:
        draft.approveMemberLoading = false;
        draft.approveMemberError = action.error;
        break;
      case REJECT_MEMBER_REQUEST:
        draft.rejectMemberLoading = true;
        draft.rejectMemberDone = false;
        draft.rejectMemberError = null;
        break;
      case REJECT_MEMBER_SUCCESS:
        draft.rejectMemberLoading = false;
        draft.rejectMemberDone = true;
        break;
      case REJECT_MEMBER_FAILURE:
        draft.rejectMemberLoading = false;
        draft.rejectMemberError = action.error;
        break;
      case NOTIFY_MEMBER_REQUEST:
        draft.notifyMemberLoading = true;
        draft.notifyMemberDone = false;
        draft.notifyMemberError = null;
        break;
      case NOTIFY_MEMBER_SUCCESS:
        draft.notify = action.data;
        draft.notifyMemberLoading = false;
        draft.notifyMemberDone = true;
        break;
      case NOTIFY_MEMBER_FAILURE:
        draft.notifyMemberLoading = false;
        draft.notifyMemberError = action.error;
        break;
      case CHECK_NOTIFY_MEMBER_REQUEST:
        draft.checkNotifyMemberLoading = true;
        draft.checkNotifyMemberDone = false;
        draft.checkNotifyMemberError = null;
        break;
      case CHECK_NOTIFY_MEMBER_SUCCESS:
        draft.checkNotify = action.data;
        draft.checkNotifyMemberLoading = false;
        draft.checkNotifyMemberDone = true;
        break;
      case CHECK_NOTIFY_MEMBER_FAILURE:
        draft.checkNotifyMemberLoading = false;
        draft.checkNotifyMemberError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
