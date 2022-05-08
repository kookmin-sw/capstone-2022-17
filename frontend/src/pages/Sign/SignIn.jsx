import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import { Form, Grid, Divider } from 'semantic-ui-react';
import * as Container from 'components/common/Containers';
import * as Btn from 'components/common/Button';
import SignTitle from 'components/Sign/SignTitle';

const SignContainer = styled(Container.AlignCenterContainer)`
  margin-top: 6rem;
`;

const Field = styled(Form.Field)`
  input {
    height: 3rem;
    font-size: 16px !important;
  }
  input[type='email'] {
    font-family: 'NS-R' !important;
  }
  input[type='password'] {
    ::placeholder {
      font-family: 'NS-R' !important;
    }
  }
`;

const Strong = styled.strong`
  text-align: center;
  font-family: 'NS-EB';
  font-size: 15px;
  color: ${({ theme }) => theme.color.primary};
`;

const P = styled.p`
  text-align: center;
  font-family: 'NS-R';
  font-size: 15px;
`;

const SignIn = () => {
  const [nonFieldError] = useState('');
  const [emailError] = useState('');
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  // const [isRemember, setIsRemember] = useState(false);

  return (
    <SignContainer>
      <Grid.Column centered>
        <SignTitle />
        <Form style={{ width: '23rem' }}>
          <Field
            fluid
            placeholder="이메일"
            type="email"
            required
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
            placeholder="비밀번호"
            type="password"
            required
            control={Form.Input}
            value={password}
            onChange={onChangePassword}
          />
          <P style={{ color: 'red', fontSize: '15px' }}>{nonFieldError}</P>
          <Field>
            <Btn.PrimaryBtn fluid type="submit">
              로그인
            </Btn.PrimaryBtn>
          </Field>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0 3rem 0' }}>
          {/* <Container.AlignMiddleContainer>
            이메일 저장용 체크박스
            <Checkbox
              checked={isRemember}
              onChange={() => {
                setIsRemember(!isRemember);
              }}
            />
            <P style={{ marginLeft: '0.3rem', marginTop: '0.05rem' }}>이메일 저장</P>
          </Container.AlignMiddleContainer> */}

          {/* 비밀번호 재설정 기능 (비활성화) */}
          {/* <Link to="/">
            <p style={{ marginTop: '0.05rem' }}>비밀번호 찾기</p>
          </Link> */}
        </div>
        <Divider />
        <Container.AlignCenterContainer>
          <div style={{ marginRight: '1.5rem' }}>아직 회원이 아니세요?</div>
          <Link to="/signup">
            <Strong>회원가입</Strong>
          </Link>
        </Container.AlignCenterContainer>
      </Grid.Column>
    </SignContainer>
  );
};

export default SignIn;