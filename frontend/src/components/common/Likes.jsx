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
  const { likeProjectDone, destroyLikeProjectDone } = useSelector((state) => state.project);
  const [likes, setLikes] = useState(project?.likes);
  const [likeStatus, setLikeStatus] = useState(project?.like);

  const handleLike = () => {
    dispatch({
      type: likeStatus ? DESTROY_LIKE_PROJECT_REQUEST : LIKE_PROJECT_REQUEST,
      data: {
        projectId: project.id,
      },
    });
  };

  useEffect(() => {
    if (likeProjectDone) {
      setLikes(likes + 1);
      setLikeStatus(true);
    }
  }, [likeProjectDone]);

  useEffect(() => {
    if (destroyLikeProjectDone) {
      setLikes(likes - 1);
      setLikeStatus(false);
    }
  }, [destroyLikeProjectDone]);

  return (
    <LikesNum onClick={handleLike}>
      <Icon name={likeStatus ? 'heart' : 'heart outline'} />
      {likes}
    </LikesNum>
  );
};
export default Likes;
