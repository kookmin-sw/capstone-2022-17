import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LOAD_USER_REQUEST } from 'reducers/user';

const Container = styled.div`
  overflow: hidden;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MiniAvatar = ({ userId }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
      id: userId,
    });
  }, []);

  return (
    <Container>
      <Img src={userData?.avatar || `${process.env.PUBLIC_URL}/images/missing.png`} />
    </Container>
  );
};

export default MiniAvatar;
