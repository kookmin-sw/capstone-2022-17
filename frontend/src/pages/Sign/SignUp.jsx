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
import TermsModal from 'components/Terms/TermsModal';
import ServiceModal from 'components/Terms/ServiceModal';
import COLOR from 'constant/color';

const SignContainer = styled(Container.AlignCenterContainer)`
  margin-top: 2rem;
`;

const Field = styled(Form.Field)`
  margin-bottom: 0.6rem !important;
  input {
    height: 2.3rem;
    font-size: 0.85rem !important;
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
  font-size: 0.85rem;
  color: ${COLOR.GRAY};
`;

const Strong = styled.strong`
  text-align: center;
  font-family: 'Pr-SemiBold';
  font-size: 0.85rem;
  color: ${({ theme }) => theme.color.primary};
`;
const P = styled.p`
  text-align: center;
  font-family: 'Pr-Regular';
  font-size: 0.85rem;
`;

const SignUp = () => {
  const dispatch = useDispatch();
  const { signupLoading, signupError, signupDone } = useSelector((state) => state.authentication);
  const [errorMsg, setErrorMsg] = useState('');
  const [nickname, onChangeNickname] = useInput('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, onChangePasswordCheck] = useInput('');
  const [, , removeCookie] = useCookies(['rememberEmail']);

  const handleSubmit = useCallback(() => {
    setErrorMsg('');
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
      setErrorMsg(signupError.messages);
    }
    if (signupDone) {
      removeCookie('rememberEmail');
      window.location.replace('/survey/select-position');
    }
    return () => {
      setErrorMsg('');
    };
  }, [signupError, signupDone]);

  return (
    <SignContainer>
      <Grid.Column centered>
        <SignTitle />
        <Form onSubmit={handleSubmit} style={{ width: '19rem', marginBottom: '1.5rem' }}>
          <Field
            fluid
            required
            placeholder="?????????"
            type="text"
            control={Form.Input}
            value={nickname}
            onChange={onChangeNickname}
          />
          <Field
            fluid
            required
            placeholder="?????????"
            type="email"
            control={Form.Input}
            value={email}
            onChange={onChangeEmail}
          />
          <Field
            fluid
            required
            placeholder="????????????"
            type="password"
            control={Form.Input}
            value={password}
            onChange={onChangePassword}
          />
          <Field
            fluid
            required
            placeholder="???????????? ??????"
            type="password"
            control={Form.Input}
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          <P style={{ color: 'red', fontSize: '0.8rem' }}>{errorMsg}</P>
          <Field>
            <Btn.PrimaryBtn
              fluid
              type="submit"
              disable={signupLoading}
              style={{ height: '2.5rem ' }}
            >
              ????????????
            </Btn.PrimaryBtn>
          </Field>
        </Form>
        <Container.AlignCenterContainer style={{ marginBottom: '1.5rem', alignItems: 'baseline' }}>
          <div style={{ marginRight: '1rem', fontSize: '0.85rem' }}>?????? ????????? ?????????????</div>
          <Link to="/signin">
            <Strong>?????????</Strong>
          </Link>
        </Container.AlignCenterContainer>
        <Divider />
        {/* ???????????? */}
        <P>
          <Span>
            ???????????? ??? TEAMING??? <ServiceModal /> ??? <br />
            <TermsModal /> ??? ??????????????????, ???????????????.
          </Span>
        </P>
      </Grid.Column>
    </SignContainer>
  );
};

export default SignUp;
