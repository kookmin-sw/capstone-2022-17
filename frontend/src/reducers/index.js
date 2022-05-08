import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import authentication from './authentication';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        authentication,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;