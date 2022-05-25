import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';

import { LIKE_PROJECT_REQUEST, DESTROY_LIKE_PROJECT_REQUEST } from 'reducers/project';

const LikesNum = styled.div`
  font-size: 0.7rem;
  font-family: 'Pr-ExtraLight';
  color: #adadad;

  display: flex;
  margin: 0 0.3rem;
`;

// 좋아요
const Likes = ({ project }) => {
  const dispatch = useDispatch();

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch({
      type: project?.likes ? DESTROY_LIKE_PROJECT_REQUEST : LIKE_PROJECT_REQUEST,
      id: project.id,
    });
  };

  return (
    <LikesNum onClick={handleLike}>
      <Icon name={project?.likes ? 'heart' : 'heart outline'} />
      {project?.likes || '0'}
    </LikesNum>
  );
};
export default Likes;
