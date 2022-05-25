import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';
import COLOR from 'constant/color';

import { REJECT_MEMBER_REQUEST, APPROVE_MEMBER_REQUEST } from 'reducers/member';

const ApplicantContainer = styled(Container.RowBetweenContainer)`
  padding: 1rem;
  width: 100%;
  max-width: 1000px;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  align-items: center;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  margin-right: 1.5rem;
  cursor: pointer;
  background: white;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.3rem;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
  padding: 0.4rem 0.6rem !important;
  margin: 0.5rem 0.5rem 0 0 !important;
  font-size: 0.8rem !important;
`;

const Position = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1rem;
  margin-left: 0.5rem;
  color: ${COLOR.PRIMARY};
`;

const Applicant = ({ project, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rejectMemberDone, approveMemberDone } = useSelector((state) => state.member);

  const handleReject = () => {
    if (window.confirm('정말 거절하시겠습니까?'))
      dispatch({
        type: REJECT_MEMBER_REQUEST,
        data: {
          projectId: project.id,
          userId: user.userId,
        },
      });
  };

  const handleApprove = () => {
    dispatch({
      type: APPROVE_MEMBER_REQUEST,
      data: {
        projectId: project.id,
        userId: user.userId,
      },
    });
  };

  useEffect(() => {
    if (rejectMemberDone || approveMemberDone) {
      window.location.reload();
    }
  }, [rejectMemberDone, approveMemberDone]);

  return (
    <ApplicantContainer>
      <Container.AlignMiddleContainer>
        <ImgContainer onClick={() => navigate(`/profile/${user.userId}`)}>
          <Img src={user.avatar || `${process.env.PUBLIC_URL}/images/missing.png`} />
        </ImgContainer>
        <Container.ColumnStartContainer style={{ marginRight: '2rem' }}>
          <Container.RowEndContainer style={{ marginBottom: '0.5rem' }}>
            <Name onClick={() => navigate(`/profile/${user.userId}`)}>{user.nickname}</Name>
            <Position>{user.position}</Position>
          </Container.RowEndContainer>
          <Container.AlignMiddleContainer style={{ flexWrap: 'wrap', maxWidth: '50rem' }}>
            {user?.userTechStack?.map((stack) => {
              return <Tag key={stack}>{stack}</Tag>;
            })}
          </Container.AlignMiddleContainer>
        </Container.ColumnStartContainer>
      </Container.AlignMiddleContainer>
      <Container.ColumnStartContainer>
        <Btn.PrimaryBtn onClick={handleApprove} style={{ marginBottom: '0.2rem', width: '5rem' }}>
          승인
        </Btn.PrimaryBtn>
        <Btn.SubBtn onClick={handleReject} style={{ width: '5rem' }}>
          거절
        </Btn.SubBtn>
      </Container.ColumnStartContainer>
    </ApplicantContainer>
  );
};

export default Applicant;
