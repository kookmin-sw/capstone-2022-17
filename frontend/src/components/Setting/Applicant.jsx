import React from 'react';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';
import COLOR from 'constant/color';

const ApplicantContainer = styled(Container.AlignMiddleContainer)`
  margin: 1rem 0;
`;

const ImgContainer = styled.div`
  overflow: hidden;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 1rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.2rem;
  margin-left: 0.3rem;
`;

const Tag = styled(Label)`
  border-radius: 2rem !important;
  margin: 0.5rem 0.5rem 0 0 !important;
  font-size: 0.8rem !important;
`;

const Position = styled.div`
  font-family: 'Pr-Medium';
  font-size: 1rem;
  margin-left: 0.5rem;
  color: ${COLOR.PRIMARY};
`;

const tempuser = {
  id: 2,
  nickname: '호랑이',
  avatar: null,
  instaId: null,
  blog: null,
  github: null,
  userTechList: ['Data Analysys', 'ArcGIS', 'VR', 'CircleCI'],
  position: '서버/백엔드',
};

const Applicant = () => {
  return (
    <ApplicantContainer>
      <ImgContainer>
        <Img src={tempuser.avatar || `${process.env.PUBLIC_URL}/images/missing.png`} />
      </ImgContainer>
      <Container.ColumnStartContainer style={{ marginRight: '2rem' }}>
        <Container.RowEndContainer>
          <Name>{tempuser.nickname}</Name>
          <Position>{tempuser.position}</Position>
        </Container.RowEndContainer>
        <Container.AlignMiddleContainer>
          {tempuser.userTechList.map((stack) => {
            return <Tag key={stack}>{stack}</Tag>;
          })}
        </Container.AlignMiddleContainer>
      </Container.ColumnStartContainer>
      <Container.ColumnStartContainer>
        <Btn.PrimaryBtn style={{ marginBottom: '0.2rem' }}>승인</Btn.PrimaryBtn>
        <Btn.SubBtn>거절</Btn.SubBtn>
      </Container.ColumnStartContainer>
    </ApplicantContainer>
  );
};

export default Applicant;
