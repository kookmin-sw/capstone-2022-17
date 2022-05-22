import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TermsModal from 'components/Terms/TermsModal';
import ServiceModal from 'components/Terms/ServiceModal';
import * as Container from 'components/common/Containers';
import { DESTROY_USER_REQUEST } from 'reducers/authentication';
import * as Styled from './AccountStyeld';

const Account = () => {
  const dispatch = useDispatch();
  const { destroyUserDone } = useSelector((state) => state.authentication);

  const handleWithdraw = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 😥')) {
      dispatch({
        type: DESTROY_USER_REQUEST,
      });
      alert('탈퇴되었습니다.');
    } else {
      alert('취소되었습니다 😊');
    }
  };

  useEffect(() => {
    if (destroyUserDone) {
      window.location.replace('/');
    }
  });

  return (
    <Container.AlignCenterContainer>
      <Styled.SettingContainer>
        <Styled.Line />

        <Styled.Container>
          <Styled.LightText>
            탈퇴 시 작성한 글 및 댓글이 삭제되며 복구되지 않습니다.
          </Styled.LightText>
          <Styled.Btn style={{ minWidth: '4.8rem', marginLeft: '1rem' }} onClick={handleWithdraw}>
            회원 탈퇴
          </Styled.Btn>
        </Styled.Container>
        <Styled.Title style={{ width: '100%' }}>
          <ServiceModal />
          <div style={{ width: '1rem' }} />
          <TermsModal />
          <div style={{ width: '1rem' }} />
          <a href="https://github.com/kookmin-sw/capstone-2022-17" target="_blank" rel="noreferrer">
            <Styled.Github>Teaming Github</Styled.Github>
          </a>
        </Styled.Title>
        <Styled.Line />
      </Styled.SettingContainer>
    </Container.AlignCenterContainer>
  );
};

export default Account;
