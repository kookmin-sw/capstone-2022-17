import React from 'react';
import styled from 'styled-components';

const State = styled.div`
  font-size: 0.6rem;
  color: #59cdda;
`;

// 항목 이름
const Status = ({ children }) => {
  return <State>{children}</State>;
};

export default Status;
