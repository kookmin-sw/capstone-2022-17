import produce from 'utils/produce.util';

export const initialState = {
  image: null,
  addImageLoading: false,
  addImageDone: false,
  addImageError: false,
};

export const ADD_IMAGE_REQUEST = 'ADD_IMAGE_REQUEST';
export const ADD_IMAGE_SUCCESS = 'ADD_IMAGE_SUCCESS';
export const ADD_IMAGE_FAILURE = 'ADD_IMAGE_FAILURE';

export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_IMAGE_REQUEST:
        draft.addImageLoading = true;
        draft.addImageDone = false;
        draft.addImageError = null;
        break;
      case ADD_IMAGE_SUCCESS:
        draft.addImageLoading = false;
        draft.addImageDone = true;
        draft.image = action.data;
        break;
      case ADD_IMAGE_FAILURE:
        draft.addImageLoading = false;
        draft.addImageError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;
