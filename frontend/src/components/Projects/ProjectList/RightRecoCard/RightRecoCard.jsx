import React from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Likes from 'components/common/Likes';
import Tag from 'components/Tag/Tag';
import RightRecoContent from './RightRecoContent';
import RightRecoThumbnail from './RightRecoThumbnail';
import RightRecoCardName from './RightRecoCardName';

const Container = styled.div`
  display: flex;
  font-family: 'Pr-Regular';
  background-color: #f8f9fa;

  width: 30rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0px 3px 7px 1px #aeadad;
  }
`;

const Content = styled.div`
  width: 20rem;
  padding-right: 0.5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0 1rem 1rem;
`;

const TagDiv = styled.div`
  display: flex;
  padding: 0rem 0 0rem 1rem;
`;

const RightRecoCard = ({ project, loading }) => {
  const navigate = useNavigate();

  return (
    <Container className={loading && 'loading'} onClick={() => navigate(`/project/${project?.id}`)}>
      <RightRecoThumbnail img={project?.thumbnail} />
      <Content>
        <Title>
          <RightRecoCardName cardName={project?.title} />
          <Likes project={project} />
        </Title>
        <RightRecoContent content={project?.description} />
        <TagDiv>
          {project?.techStack &&
            project?.techStack.map((tech) => {
              return <Tag techName={tech?.stack} />;
            })}
        </TagDiv>
      </Content>
    </Container>
  );
};
export default RightRecoCard;
