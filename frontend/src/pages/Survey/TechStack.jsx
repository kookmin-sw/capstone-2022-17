import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FadeIn from 'react-fade-in';
import SurveyLayout from 'components/Survey/SurveyLayout';

import NextBtn from 'components/Survey/NextBtn';

const TechStack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { positionRate } = location.state;
  console.log(positionRate);

  return (
    <FadeIn delay={800} transitionDuration={600} wrapperTag={SurveyLayout}>
      <NextBtn onClick={() => navigate('/')} />
    </FadeIn>
  );
};

export default TechStack;
