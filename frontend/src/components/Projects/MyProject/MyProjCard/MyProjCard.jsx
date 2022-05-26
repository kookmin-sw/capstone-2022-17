import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import CardName from 'components/Card/CardName';
import Thumbnail from 'components/Card/Thumbnail';
import * as Btn from 'components/common/Btn';
import { DESTROY_MEMBER_REQUEST } from 'reducers/member';
import CardPeriod from './CardPeriod';
import MyPosition from './MyPosition';

const OutBtn = styled(Btn.PrimaryBtn)`
  font-size: 0.9rem !important;
  border-radius: 2rem !important;
  height: '2.2rem' !important;
  margin-top: 1.5rem !important;
  width: 100%;
  cursor: pointer;

  background: #ff0707 !important;

  &:hover {
    background: #fe3f3f !important;
  }
`;

const ManageBtn = styled(Btn.PrimaryBtn)`
  font-size: 0.9rem !important;
  border-radius: 2rem !important;
  height: 2.2rem !important;
  margin-top: 1.5rem !important;
  width: 100%;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-family: 'Pr-Regular';
  color: #888888;
  background-color: #f8f9fa;

  width: 14rem;
  min-height: ${(props) => (props.isProgress ? '18rem' : '14rem')};
  border-radius: 1rem;
  margin: 1.4rem 0.6rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0px 3px 7px 1px #aeadad;
  }
`;

const Text = styled.div`
  padding: 0.5rem;
`;

const MyProjCard = ({ project }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destroyMemberDone } = useSelector((state) => state.member);
  const { user } = useSelector((state) => state.authentication);

  const handleOut = (e) => {
    e.stopPropagation();
    if (window.confirm('정말 나가시겠습니까?')) {
      dispatch({
        type: DESTROY_MEMBER_REQUEST,
        id: project.id,
      });
    }
  };

  useEffect(() => {
    if (destroyMemberDone) {
      window.location.reload();
    }
  }, [destroyMemberDone]);

  return (
    <Container
      isProgress={project.myPosition && project.status === 'IN_PROGRESS'}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <Thumbnail img={project.thumbnail} />
      <Text>
        <CardName cardName={project.title} />
        <CardPeriod startDate={project.startDate} endDate={project.endDate} />
        {project.myPosition && <MyPosition myPosition={project.myPosition} />}
        {!project.myPosition &&
          project.techStack.slice(0, 3).map((tech) => {
            return <MyPosition myPosition={tech.stack} />;
          })}
        {project.status === 'IN_PROGRESS' && project.userId === user.user.id ? (
          <ManageBtn
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/project/setting/${project.id}`);
            }}
          >
            관리하기
          </ManageBtn>
        ) : null}
        {project.status === 'IN_PROGRESS' && project.userId !== user.user.id
          ? project.myPosition && <OutBtn onClick={handleOut}>프로젝트 나가기</OutBtn>
          : null}
      </Text>
    </Container>
  );
};
export default MyProjCard;
