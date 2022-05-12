import React from 'react';
import { Link } from 'react-router-dom';
import * as Btn from 'components/common/Btn';

const SignBtn = () => {
  return (
    <Link to="/signin">
      <Btn.PrimaryBtn>로그인</Btn.PrimaryBtn>
    </Link>
  );
};

export default SignBtn;
