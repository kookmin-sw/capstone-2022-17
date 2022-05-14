import Likes from 'components/common/Likes';
import Views from 'components/Projects/ProjectDetail/Views';
import WrittenDate from 'components/Projects/ProjectDetail/WrittenDate';
import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
import CardName from './CardName';
import Thumbnail from './Thumbnail';

const Container = styled.div`
  font-size: 1rem;
  font-family: 'Pr-Regular';
  color: #888888;

  width: 200px;
  border-radius: 1rem;
  margin: 1rem 1rem;
  cursor: pointer;
`;

const LikesViews = styled.div`
  display: flex;
  padding: 0.5rem 0;
`;

const Card = () => {
  return (
    <Container>
      <Thumbnail />
      <Tag>프론트엔드</Tag>
      <Tag>프론트엔드</Tag>
      <Tag>프론트엔드</Tag>
      <CardName>프로젝트 제목</CardName>
      <hr />
      <LikesViews>
        <Likes>100</Likes>
        <Views>50</Views>
      </LikesViews>

      <WrittenDate>2022-05-13</WrittenDate>
    </Container>
  );
};
export default Card;
