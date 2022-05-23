import produce from 'utils/produce.util';

export const initialState = {
  // 메인 페이지 - 프로젝트 불러오기
  mainProjectList: null,
  loadMainProjectListLoading: false,
  loadMainProjectListDone: false,
  loadMainProjectListError: false,

  // 프로젝트 둘러보기 페이지 - 프로젝트 불러오기
  projectList: null,
  loadProjectListLoading: false,
  loadProjectListDone: false,
  loadProjectListError: false,
  currentPage: 1,
  totalPage: null,
  totalElements: null,

  // 내 프로젝트 페이지 - 프로젝트 불러오기
  myProjectList: [],
  loadMyProjectListLoading: false,
  loadMyProjectListDone: false,
  loadMyProjectListError: false,
  myCurrentPage: 1,
  myTotalPage: null,
  myTotalElements: null,
};

// 메인 페이지 - 프로젝트 불러오기
export const LOAD_MAINPROJECTLIST_REQUEST = 'LOAD_MAINPROJECTLIST_REQUEST';
export const LOAD_MAINPROJECTLIST_SUCCESS = 'LOAD_MAINPROJECTLIST_SUCCESS';
export const LOAD_MAINPROJECTLIST_FAILURE = 'LOAD_MAINPROJECTLIST_FAILURE';

// 프로젝트 둘러보기 페이지 - 프로젝트 불러오기
export const LOAD_PROJECTLIST_REQUEST = 'LOAD_PROJECTLIST_REQUEST';
export const LOAD_PROJECTLIST_SUCCESS = 'LOAD_PROJECTLIST_SUCCESS';
export const LOAD_PROJECTLIST_FAILURE = 'LOAD_PROJECTLIST_FAILURE';

// 내 프로젝트 페이지 - 프로젝트 불러오기
export const LOAD_MYPROJECTLIST_REQUEST = 'LOAD_MYPROJECTLIST_REQUEST';
export const LOAD_MYPROJECTLIST_SUCCESS = 'LOAD_MYPROJECTLIST_SUCCESS';
export const LOAD_MYPROJECTLIST_FAILURE = 'LOAD_MYPROJECTLIST_FAILURE';
export const SIZE = '16';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // 메인 페이지 - 프로젝트 불러오기
      case LOAD_MAINPROJECTLIST_REQUEST:
        draft.loadMainProjectListLoading = true;
        draft.loadMainProjectListDone = false;
        draft.loadMainProjectListError = null;
        break;
      case LOAD_MAINPROJECTLIST_SUCCESS:
        draft.loadMainProjectListLoading = false;
        draft.loadMainProjectListDone = true;
        draft.mainProjectList = action.data;
        break;
      case LOAD_MAINPROJECTLIST_FAILURE:
        draft.loadMainProjectListLoading = false;
        draft.loadMainProjectListError = action.error;
        break;
      // 프로젝트 둘러보기 페이지 - 프로젝트 불러오기
      case LOAD_PROJECTLIST_REQUEST:
        draft.loadProjectListLoading = true;
        draft.loadProjectListDone = false;
        draft.loadProjectListError = null;
        break;
      case LOAD_PROJECTLIST_SUCCESS:
        draft.loadProjectListLoading = false;
        draft.loadProjectListDone = true;
        draft.projectList = action.data.content;
        draft.totalPage = action.data.totalPages;
        draft.currentPage = action.data.pageable.pageNumber + 1;
        draft.totalElements = action.data.totalElements;
        break;
      case LOAD_PROJECTLIST_FAILURE:
        draft.loadProjectListLoading = false;
        draft.loadProjectListError = action.error;
        break;
      // 내 프로젝트 페이지 - 프로젝트 불러오기
      case LOAD_MYPROJECTLIST_REQUEST:
        draft.loadMyProjectListLoading = true;
        draft.loadMyProjectListDone = false;
        draft.loadMyProjectListError = null;
        break;
      case LOAD_MYPROJECTLIST_SUCCESS:
        draft.loadMyProjectListLoading = false;
        draft.loadMyProjectListDone = true;
        draft.myProjectList = action.data.content;
        draft.myTotalPage = action.data.totalPages;
        draft.myCurrentPage = action.data.pageable.pageNumber + 1;
        draft.myTotalElements = action.data.totalElements;
        break;
      case LOAD_MYPROJECTLIST_FAILURE:
        draft.loadMyProjectListLoading = false;
        draft.loadMyProjectListError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
