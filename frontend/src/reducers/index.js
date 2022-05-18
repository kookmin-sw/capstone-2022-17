import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import authentication from './authentication';
import techstack from './techstack';
import image from './image';
import project from './project';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        authentication,
        techstack,
        image,
        project,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
