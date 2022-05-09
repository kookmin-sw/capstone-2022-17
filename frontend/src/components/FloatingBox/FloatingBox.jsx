import Likes from 'components/common/Likes';
import React from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import ContentName from './ContentName';
import Contents from './Contents';

const Wrapper = styled.div`
  font-size: 0.8rem;
  color: #000000;
  line-height: 1rem;
  background-color: yellow;
  padding: 1rem 1.5rem;
  width: 15rem;
`;

const ContentBox = styled.div`
  margin: 0.3rem 0.1rem;
  padding: 0.7rem 0;
  border-bottom: 1px solid;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
`;

const LikesBtn = styled(Button)`
  margin: 0.3rem 0.1rem;
  padding: 0.7rem;
  background-color: white !important;
  width: 3.8rem;
  font-size: 0.8rem !important;
  flex-grow: 1;
`;

const SupplyBtn = styled(Button)`
  margin: 0.3rem 0.1rem;
  padding: 0.7rem;
  background-color: white !important;
  color: ${({ theme }) => theme.color.primary} !important;
  font-size: 0.8rem !important;
  flex-grow: 5;
`;

// 항목 이름
const FloatingBox = () => {
  return (
    <Wrapper>
      <ContentBox>
        <ContentName>모집인원</ContentName>
        <Contents>웹 1</Contents>
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
