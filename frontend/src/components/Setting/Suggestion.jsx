import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import COLOR from 'constant/color';
import InviteBtn from './InviteBtn';

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
  cursor: pointer;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  margin-right: 1.5rem;
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
  padding: 0 0.5rem;
  color: ${COLOR.PRIMARY};
  border-right: ${(props) => !props.isLast && `2px solid ${COLOR.PRIMARY}`};
`;

const Applicant = ({ user, project }) => {
  const navigate = useNavigate();
  const { rejectMemberDone, approveMemberDone } = useSelector((state) => state.member);
  useEffect(() => {
    if (rejectMemberDone || approveMemberDone) {
      window.location.reload();
    }
  }, [rejectMemberDone, approveMemberDone]);

  return (
    <ApplicantContainer>
      <Container.AlignMiddleContainer>
        <ImgContainer onClick={() => navigate(`/profile/${user.id}`)}>
          <Img src={user.avatar || `${process.env.PUBLIC_URL}/images/missing.png`} />
        </ImgContainer>
        <Container.ColumnStartContainer style={{ marginRight: '2rem' }}>
          <Container.RowEndContainer style={{ marginBottom: '0.5rem' }}>
            <Name onClick={() => navigate(`/profile/${user.id}`)}>{user.nickname}</Name>
            {user.userPositionSet.map((pos, index) => {
              return (
                <Position isLast={index === user.userPositionSet.length - 1}>
                  {pos.positionName}
                </Position>
              );
            })}
          </Container.RowEndContainer>
          <Container.AlignMiddleContainer style={{ flexWrap: 'wrap', maxWidth: '50rem' }}>
            {/* {user.userTechList.map((stack) => {
            return <Tag key={stack}>{stack}</Tag>;
          })} */}
            {user.userTechList.map((tech) => {
              return <Tag key={tech.userTech}>{tech.userTech}</Tag>;
            })}
          </Container.AlignMiddleContainer>
        </Container.ColumnStartContainer>
      </Container.AlignMiddleContainer>
      <Container.ColumnStartContainer>
        <InviteBtn project={project} user={user}>
          초대
        </InviteBtn>
        {/* <Btn.SubBtn style={{ width: '5rem' }}>거절</Btn.SubBtn> */}
      </Container.ColumnStartContainer>
    </ApplicantContainer>
  );
};

export default Applicant;
