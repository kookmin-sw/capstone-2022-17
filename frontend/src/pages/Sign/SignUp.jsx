/* eslint-disable no-unused-expressions */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { SIGN_UP_REQUEST } from 'reducers/authentication';
import { Link } from 'react-router-dom';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { Form, Grid, Divider } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Btn';
import SignTitle from 'components/Sign/SignTitle';
import PrivacyModal from 'components/Terms/PrivacyModal';
import TermModal from 'components/Terms/TermModal';
import COLOR from 'constant/color';

const SignContainer = styled(Container.AlignCenterContainer)`
  margin-top: 6rem;
`;

const Field = styled(Form.Field)`
  input {
    height: 3rem;
    font-size: 16px !important;
    font-family: 'Pr-Regular' !important;
  }
  input[type='email'] {
    font-family: 'Pr-Regular' !important;
  }
  input[type='password'] {
    ::placeholder {
      font-family: 'Pr-Regular' !important;
    }
  }
`;

const Span = styled.span`
  text-align: center;
  font-family: 'Pr-Light';
  font-size: 0.9rem;
  color: ${COLOR.GRAY};
`;

const Strong = styled.strong`
  text-align: center;
  font-family: 'Pr-SemiBold';
  font-size: 15px;
  color: ${({ theme }) => theme.color.primary};
`;
const P = styled.p`
  text-align: center;
  font-family: 'Pr-Regular';
  font-size: 15px;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupError, signupDone } = useSelector((state) => state.authentication);
  const [nonFieldError, setNonFieldError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [, , removeCookie] = useCookies(['rememberEmail']);

  const handleSubmit = useCallback(() => {
    setEmailError('');
    setPasswordError('');
    setNonFieldError('');
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        nickname,
        password,
        repassword: passwordCheck,
      },
    });
  });

  useEffect(() => {
    if (signupError) {
      const { nonFieldErrors, password1 } = signupError;
      signupError.email && setEmailError(signupError.email);
      signupError.password1 && setPasswordError(password1);
      signupError.nonFieldErrors && setNonFieldError(nonFieldErrors[0]);
    }
    if (signupDone) {
      removeCookie('rememberEmail');
      window.location.replace('/');
    }
    return () => {
      setEmailError('');
      setPasswordError('');
      setNonFieldError('');
    };
  }, [signupError, signupDone]);

  return (
    <SignContainer>
      <Grid.Column centered>
        <SignTitle />
        <Form onSubmit={handleSubmit} style={{ width: '23rem', marginBottom: '1.5rem' }}>
          <Field
            fluid
            required
            placeholder="닉네임"
            type="text"
            control={Form.Input}
            value={nickname}
            onChange={onChangeNickname}
          />
          <Field
            fluid
            required
            placeholder="이메일"
            type="email"
            control={Form.Input}
            value={email}
            onChange={onChangeEmail}
            error={
              emailError.length > 0 && {
                content: emailError,
              }
            }
          />
          <Field
            fluid
            required
            placeholder="비밀번호"
            type="password"
            control={Form.Input}
            value={password}
            onChange={onChangePassword}
            error={
              passwordError.length > 0 && {
                content: passwordError,
              }
            }
          />
          <Field
            fluid
            required
            placeholder="비밀번호 확인"
            type="password"
            control={Form.Input}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          <P style={{ color: 'red', fontSize: '15px' }}>{nonFieldError}</P>
          <Field>
            <Btn.PrimaryBtn
              fluid
              type="submit"
              disabled={signupLoading}
              style={{ height: '3rem ' }}
            >
              회원가입
            </Btn.PrimaryBtn>
          </Field>
        </Form>
        <Container.AlignCenterContainer style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginRight: '1rem' }}>이미 계정이 있으세요?</div>
          <Link to="/signin">
            <Strong>로그인</Strong>
          </Link>
        </Container.AlignCenterContainer>
        <Divider />
        {/* 약관확인 */}
        <P>
          <Span>
            회원가입 시 TEAMING의 <TermModal /> 및 <br />
            <PrivacyModal /> 을 확인하였으며, 동의합니다.
          </Span>
        </P>
      </Grid.Column>
    </SignContainer>
  );
};

export default SignUp;
