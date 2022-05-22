import React from 'react';
import styled from 'styled-components';
import * as Btn from 'components/common/Btn';

const Next = styled(Btn.PrimaryBtn)`
  font-size: 1.1rem !important;
  height: 2.2rem;
`;

const NextBtn = ({ onClick }) => {
  return <Next onClick={onClick}>다음으로</Next>;
};

export default NextBtn;
