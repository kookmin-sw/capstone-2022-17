import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import authentication from './authentication';
import techstack from './techstack';
import image from './image';
import project from './project';
import projectList from './projectList';

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
        projectList,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
