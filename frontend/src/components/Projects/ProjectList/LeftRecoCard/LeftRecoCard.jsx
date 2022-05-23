import Likes from 'components/common/Likes';
import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
import RecoCardName from './LeftRecoCardName';
import RecoContent from './LeftRecoContent';
import LeftRecoThumbnail from './LeftRecoThumbnail';

const Container = styled.div`
  font-family: 'Pr-Regular';

  background-color: white;

  width: 40rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: translateY(-0.5rem);
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

const tempProject = {
  thumbnail: 'https://minjj0905.github.io/img.jpg',
  title: '테스트 프로젝트',
  likes: '3',
  description: 'kdkdkdk',
  techStack: [{ stack: '11111' }, { stack: '22222222' }],
};

const LeftRecoCard = () => {
  return (
    <Container>
      <LeftRecoThumbnail img={tempProject.thumbnail} />
      <Title>
        <RecoCardName cardName={tempProject.title} />
        <Likes project={tempProject} />
      </Title>
      <RecoContent content={tempProject.description} />
      <TagDiv>
        {tempProject.techStack &&
          tempProject.techStack.map((tech) => {
            return <Tag techName={tech.stack} />;
          })}
      </TagDiv>
    </Container>
  );
};
export default LeftRecoCard;
