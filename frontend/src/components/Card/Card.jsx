import Likes from 'components/common/Likes';
import Views from 'components/Projects/Project/Views';
import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
import CardName from './CardName';
import Thumbnail from './Thumbnail';

const Container = styled.div`
  font-family: 'Pr-Regular';
  color: #888888;

  background-color: #f8f9fa;

  width: 14rem;
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

const Card = ({ project, onClick }) => {
  return (
    <Container onClick={onClick}>
      <Thumbnail img={project?.thumbnail} />
      <Content>
        {project?.techStack &&
          project?.techStack.map((tech) => {
            return <Tag techName={tech.stack} />;
          })}
        <CardName cardName={project?.title} />
        <LikesViews>
          <Likes project={project} />
          <Views viewsNum={project?.views} />
        </LikesViews>
      </Content>
    </Container>
  );
};
export default Card;
