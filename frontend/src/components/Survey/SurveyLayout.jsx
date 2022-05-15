import React from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import * as Container from 'components/common/Containers';

const SurveyBackground = styled(Container.ColumnMiddleContainer)`
  position: relative;
  padding-top: 6rem;
  min-width: 100vw;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('/images/survey/background.png');
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.2;
    z-index: -1;
  }
`;

const Title = styled.div`
  font-family: 'Pr-Bold';
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const SurveyLayout = ({ children }) => {
  return (
    <SurveyBackground>
      <FadeIn delay={100} transitionDuration={800}>
        <Title>당신을 알려주세요</Title>
      </FadeIn>
      {children}
    </SurveyBackground>
  );
};

export default SurveyLayout;
