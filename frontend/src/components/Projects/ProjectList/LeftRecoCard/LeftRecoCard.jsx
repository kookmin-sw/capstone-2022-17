import React from 'react';
import { useNavigate } from 'react-router-dom';
import Likes from 'components/common/Likes';
import Tag from 'components/Tag/Tag';
import styled from 'styled-components';
import RecoCardName from './LeftRecoCardName';
import RecoContent from './LeftRecoContent';
import LeftRecoThumbnail from './LeftRecoThumbnail';

const Container = styled.div`
  font-family: 'Pr-Regular';

  background-color: #f8f9fa;

  width: 40rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0px 3px 7px 1px #aeadad;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 1rem;
`;

const TagDiv = styled.div`
  display: flex;
  padding: 0 1rem 0.5rem 1rem;
`;

const LeftRecoCard = ({ project, loading }) => {
  const navigate = useNavigate();
  return (
    <Container className={loading && 'loading'} onClick={() => navigate(`/project/${project?.id}`)}>
      <LeftRecoThumbnail img={project?.thumbnail} />
      <Title>
        <RecoCardName cardName={project?.title} />
        <Likes project={project} />
      </Title>
      <RecoContent content={project?.description} />
      <TagDiv>
        {project?.techStack &&
          project?.techStack.map((tech) => {
            return <Tag techName={tech?.stack} />;
          })}
      </TagDiv>
    </Container>
  );
};
export default LeftRecoCard;
