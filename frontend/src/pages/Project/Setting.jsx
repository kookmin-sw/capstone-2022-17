import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Divider } from 'semantic-ui-react';
import { DESTROY_PROJECT_REQUEST, LOAD_PROJECT_REQUEST } from 'reducers/project';
import * as Container from 'components/common/Containers';
import COLOR from 'constant/color';
import Applicant from 'components/Setting/Applicant';
import Suggestion from 'components/Setting/Suggestion';

import { LOAD_CANDIDATE_REQUEST } from 'reducers/member';
import { RECOMMEND_USER_REQUEST } from 'reducers/user';

const SettingContainer = styled(Container.ColumnStartContainer)`
  max-width: 1200px;
  width: 100vw;
  padding: 3rem 2rem;
  margin-bottom: 10rem;
`;

const Title = styled.div`
  font-family: 'Pr-Bold';
  font-size: 1.7rem;
`;

const Menu = styled.div`
  font-family: 'Pr-SemiBold';
  font-size: 1.3rem;
  padding: 0 0.1rem 0.3rem 0.1rem;
  margin-right: 2rem;
  cursor: pointer;

  border-bottom: ${(props) => (props.isClicked ? `1px solid ${COLOR.PRIMARY}` : null)};
`;

const MemberContainer = styled(Container.ColumnMiddleContainer)`
  margin-top: 3rem;
  width: 100%;
`;

const TitleIcon = styled.img`
  width: 2.5rem;
  height: auto;
  margin-right: 1rem;
`;

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { project, loadProjectDone, destroyProjectDone } = useSelector((state) => state.project);
  const { memberList, loadCandidateDone } = useSelector((state) => state.member);
  const { recommend } = useSelector((state) => state.user);

  const [state, setState] = useState('추천멤버 조회');

  useEffect(() => {
    dispatch({
      type: LOAD_PROJECT_REQUEST,
      id,
    });
    dispatch({
      type: LOAD_CANDIDATE_REQUEST,
      id,
    });
    dispatch({
      type: RECOMMEND_USER_REQUEST,
      id,
    });
  }, []);

  const handleState = (e) => {
    setState(e.target.innerText);
  };

  const handleDelete = () => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (result)
      dispatch({
        type: DESTROY_PROJECT_REQUEST,
        id,
      });
  };

  useEffect(() => {
    if (destroyProjectDone) {
      window.location.replace('/');
    }
  }, [destroyProjectDone]);

  return (
    <SettingContainer>
      {loadProjectDone && (
        <>
          <Container.AlignMiddleContainer style={{ marginBottom: '1rem' }}>
            <TitleIcon
              src={`${process.env.PUBLIC_URL}/images/write/titleIcon.png`}
              alt="titleIcon"
            />
            <Title>{project.title}</Title>
          </Container.AlignMiddleContainer>
          <div>프로젝트 관리페이지 입니다.</div>
          <Divider style={{ width: '100%' }} />

          <Container.AlignCenterContainer>
            <Menu isClicked={state === '추천멤버 조회'} onClick={handleState}>
              추천멤버 조회
            </Menu>
            <Menu isClicked={state === '멤버 지원승인'} onClick={handleState}>
              멤버 지원승인
            </Menu>
            <Menu onClick={() => navigate(`/modify`, { state: { project } })}>글 수정</Menu>
            <Menu onClick={handleDelete}>글 삭제</Menu>
          </Container.AlignCenterContainer>
          <MemberContainer style={state !== '멤버 지원승인' ? { display: 'none' } : null}>
            {loadCandidateDone && memberList?.length === 0 ? (
              <Title style={{ marginTop: '7rem' }}>지원자가 없습니다</Title>
            ) : (
              memberList?.map((member, index) => {
                return (
                  <>
                    <Applicant key={member.userId} project={project} user={member} />
                    {index !== memberList.length - 1 && <Divider style={{ width: '90%' }} />}
                  </>
                );
              })
            )}
          </MemberContainer>
          <MemberContainer style={state !== '추천멤버 조회' ? { display: 'none' } : null}>
            {recommend?.map((user, index) => {
              return (
                <>
                  <Suggestion project={project} user={user} />
                  {index !== recommend.length - 1 && <Divider style={{ width: '90%' }} />}
                </>
              );
            })}
          </MemberContainer>
        </>
      )}
    </SettingContainer>
  );
};

export default Setting;
