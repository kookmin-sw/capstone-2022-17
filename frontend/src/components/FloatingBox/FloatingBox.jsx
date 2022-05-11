import CardHeadCount from 'components/Card/CardHeadCount';
import Likes from 'components/common/Likes';
import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Position from 'components/Projects/Position';
import ContentName from './ContentName';
import Contents from './Contents';

const Wrapper = styled.div`
  font-size: 0.8rem;
  color: #000000;
  line-height: 1rem;
  background-color: yellow;
  padding: 1rem 1.5rem;
  border-top: 3px solid #4596ff !important;
  border: 1px solid #cecece;
  position: sticky;
  width: 30%;
  overflow: auto;
`;

const ContentBox = styled.div`
  padding: 0.5rem 0;
  margin: 1rem 0;
  width: auto;
  border-bottom: 1px solid;
  background-color: burlywood;
  display: flex;
  justify-content: space-between;
`;

const PositionBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonBox = styled.div`
  width: 100%;
`;

const LikesBtn = styled.div`
  font-size: 0.8rem !important;
  cursor: pointer;
`;

const SupplyBtn = styled(Button)`
  margin: 0.3rem 0.1rem;
  padding: 0.7rem;
  background-color: white !important;
  color: ${({ theme }) => theme.color.primary} !important;
  font-size: 0.8rem !important;
  width: 100%;
`;

// 항목 이름
const FloatingBox = () => {
  return (
    <Wrapper>
      <ContentBox>
        <ContentName>모집인원</ContentName>
        <Contents>모집중</Contents>
      </ContentBox>
      <ContentBox>
        <PositionBox>
          <Position>웹 프론트</Position>
          <CardHeadCount>1/2</CardHeadCount>
        </PositionBox>
      </ContentBox>
      <ContentBox>
        <ContentName>프로젝트 기간</ContentName>
        <Contents>23.5.7 ~ 23.5.9</Contents>
      </ContentBox>
      <ContentBox>
        <ContentName>분야</ContentName>
        <Contents>미디어</Contents>
      </ContentBox>
      <ContentBox>
        <ContentName>목적</ContentName>
        <Contents>공모전</Contents>
      </ContentBox>
      <ContentBox>
        <ContentName>지역</ContentName>
        <Contents>서울</Contents>
      </ContentBox>
      <ButtonBox>
        <LikesBtn>
          <Likes>114</Likes>
        </LikesBtn>
        <SupplyBtn>지원하기</SupplyBtn>
      </ButtonBox>
    </Wrapper>
  );
};

export default FloatingBox;
