import React from 'react';
import { useSelector } from 'react-redux';
import HeadCount from 'components/FloatingBox/HeadCount';
import Likes from 'components/common/Likes';
import styled from 'styled-components';
import ApplyBtn from 'components/Projects/ApplyModal/ApplyBtn';
import Position from 'components/Projects/Project/Position';
import ContentName from './ContentName';
import Period from './Period';
import Purpose from './Purpose';
import Field from './Field';
import Status from './Status';
import Region from './Region';

const Wrapper = styled.div`
  font-family: 'Pr-Regular';
  color: #000000;
  line-height: 1.5rem;

  padding: 1.5rem 1.5rem;
  border-top: 3px solid #4596ff !important;
  border: 1px solid #cecece;
  width: 370px;
  height: 100%;
  margin-left: 1.5rem;

  /* PC (해상도 1024px)*/
  @media all and (min-width: 1024px) and (max-width: 1350px) {
    width: 330px;
  }

  /* 테블릿 가로, 테블릿 세로 (해상도 768px ~ 1023px)*/
  @media all and (min-width: 768px) and (max-width: 1023px) {
    width: 280px;
  }

  /* 모바일 가로, 모바일 세로 (해상도 480px ~ 767px)*/
  @media all and (max-width: 767px) {
    width: 210px;
  }
`;

const ContentBox = styled.div`
  padding: 1.2rem 0;
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
  width: 100%;
`;

const ButtonBox = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const LikesBtn = styled.div`
  font-size: 1rem !important;
  cursor: pointer;
`;

const FloatingBox = ({ project }) => {
  const { user } = useSelector((state) => state.authentication);
  return (
    <Wrapper>
      <StatusBox>
        <PositionBox>
          <ContentName>모집인원</ContentName>
          {project.status === 'IN_PROGRESS' ? <Status>모집중</Status> : <Status>모집완료</Status>}
        </PositionBox>

        {project.projectPositions.map((position) => {
          return (
            <PositionBox>
              <Position position={position.positionName} />
              <HeadCount currentCnt={position.currentCnt} total={position.total} />
            </PositionBox>
          );
        })}
      </StatusBox>
      <ContentBox>
        <ContentName>프로젝트 기간</ContentName>
        <Period startDate={project.startDate} endDate={project.endDate} />
      </ContentBox>
      <ContentBox>
        <ContentName>분야</ContentName>
        <Field field={project.field} />
      </ContentBox>
      <ContentBox>
        <ContentName>목적</ContentName>
        <Purpose purpose={project.purpose} />
      </ContentBox>
      <ContentBox>
        <ContentName>지역</ContentName>
        <Region region={project.region} />
      </ContentBox>
      <ButtonBox>
        <LikesBtn>
          <Likes likesNum={project.likes} />
        </LikesBtn>
        {user && <ApplyBtn project={project} />}
      </ButtonBox>
    </Wrapper>
  );
};

export default FloatingBox;
