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

const LeftRecoCard = () => {
  return (
    <Container>
      <LeftRecoThumbnail />
      <Title>
        <RecoCardName>프로젝트 제목</RecoCardName>
        <Likes>100</Likes>
      </Title>
      <RecoContent>
        1. 모집 - 프론트엔드 (앱개발) 개발자 모집- 전기차 충전 인프라 효율성 극대화, 전기차 유저들이
        충전 스트레스로부터 해방에 관심 있으신분 - 전기차 충전소 위치 및 정
      </RecoContent>
      <TagDiv>
        <Tag>프론트엔드</Tag>
        <Tag>프론트엔드</Tag>
      </TagDiv>
    </Container>
  );
};
export default LeftRecoCard;
