import Likes from 'components/common/Likes';
import Views from 'components/Projects/ProjectDetail/Views';
import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
import CardName from './CardName';
import Thumbnail from './Thumbnail';

const Container = styled.div`
  font-family: 'Pr-Regular';
  color: #888888;

  background-color: white;

  width: 14rem;
  /* height: 1rem; */
  border-radius: 1rem;
  margin: 1.4rem 0.6rem;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0px 3px 7px 1px #aeadad;
  }
`;

const Content = styled.div`
  padding: 0.8rem 0.5rem;
`;

const LikesViews = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const Card = () => {
  return (
    <Container>
      <Thumbnail />
      <Content>
        <Tag>프론트엔드</Tag>
        <Tag>프론트엔드</Tag>
        <CardName>프로젝트 제목</CardName>
        <LikesViews>
          <Likes>100</Likes>
          <Views>50</Views>
        </LikesViews>
      </Content>
    </Container>
  );
};
export default Card;
