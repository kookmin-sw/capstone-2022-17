import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

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
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const { likeResult } = useSelector((state) => state.project);

  useEffect(() => {
    setLike(project?.like);
    setLikes(project?.likes);
  }, [project]);

  useEffect(() => {
    if (likeResult) {
      setLike(likeResult.like);
      setLikes(likeResult.likes);
    }
  }, [likeResult]);

  const handleLike = (e) => {
    e.stopPropagation();
    dispatch({
      type: like ? DESTROY_LIKE_PROJECT_REQUEST : LIKE_PROJECT_REQUEST,
      id: project.id,
      data: {
        projectId: project.id,
      },
    });
  };

  return (
    <LikesNum onClick={handleLike}>
      <Icon name={like ? 'heart' : 'heart outline'} style={{ cursor: 'pointer' }} />
      {likes || '0'}
    </LikesNum>
  );
};
export default Likes;
