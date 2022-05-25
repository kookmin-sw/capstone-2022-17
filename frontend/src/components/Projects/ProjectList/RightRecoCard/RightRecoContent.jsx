import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 0.9rem;
  line-height: 1.3rem;
  color: #888888;
  padding: 0rem 1rem 1rem 1rem;
`;

const RecoContent = ({ content }) => {
  return <Container>{content}</Container>;
};

export default RecoContent;
