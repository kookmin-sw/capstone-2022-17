import Likes from 'components/common/Likes';
import Tag from 'components/Tag/Tag';
import React from 'react';
import styled from 'styled-components';
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

const project = null;

const RightRecoCard = () => {
  return (
    <Container>
      <RightRecoThumbnail />
      <Content>
        <Title>
          <RightRecoCardName>프로젝트 제목</RightRecoCardName>
          <Likes project={project} />
        </Title>
        <RightRecoContent>
          {' '}
          1. 모집 - 프론트엔드 (앱개발) 개발자 모집- 전기차 충전 인프라 효율성 극대화
        </RightRecoContent>
        <TagDiv>
          <Tag>프론트엔드</Tag>
          <Tag>프론트엔드</Tag>
        </TagDiv>
      </Content>
    </Container>
  );
};
export default RightRecoCard;
