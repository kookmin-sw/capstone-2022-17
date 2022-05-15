import CardHeadCount from 'components/Card/CardHeadCount';
import Likes from 'components/common/Likes';
import React from 'react';
import styled from 'styled-components';
import Position from 'components/Projects/ProjectDetail/Position';
import ApplyBtn from 'components/Projects/ApplyModal/ApplyBtn';
import ContentName from './ContentName';
import Contents from './Contents';
import Status from './Status';

const Wrapper = styled.div`
  font-size: 0.8rem;
  font-family: 'Pr-Regular';
  color: #000000;
  line-height: 1rem;

  padding: 1rem 1.5rem;
  border-top: 3px solid #4596ff !important;
  border: 1px solid #cecece;
  width: 30%;
  height: 100%;
  position: sticky;
`;

const ContentBox = styled.div`
  padding: 0.5rem 0;
  width: auto;
  border-bottom: 1px solid #cecece;
  display: flex;
  justify-content: space-between;
`;

const StatusBox = styled.div`
  justify-content: space-between;
  border-bottom: 1px solid #cecece;
  padding: 0.5rem 0;
`;

const PositionBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.4rem;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const LikesBtn = styled.div`
  font-size: 0.8rem !important;
  cursor: pointer;
`;

const FloatingBox = () => {
  return (
    <Wrapper>
      <StatusBox>
        <PositionBox>
          <ContentName>모집인원</ContentName>
          <Status>모집중</Status>
        </PositionBox>
        <PositionBox>
          <Position>웹프론트</Position>
          <CardHeadCount>1/2</CardHeadCount>
        </PositionBox>
        <PositionBox>
          <Position>디자인</Position>
          <CardHeadCount>1/2</CardHeadCount>
        </PositionBox>
        <PositionBox>
          <Position>기획</Position>
          <CardHeadCount>1/2</CardHeadCount>
        </PositionBox>
      </StatusBox>
      <ContentBox>
        <ContentName>프로젝트 기간</ContentName>
        <Contents>23.12.7 ~ 23.12.9</Contents>
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
        <ApplyBtn />
      </ButtonBox>
    </Wrapper>
  );
};

export default FloatingBox;
