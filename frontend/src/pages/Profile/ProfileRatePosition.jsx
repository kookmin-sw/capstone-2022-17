import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FadeIn from 'react-fade-in';
import styled from 'styled-components';
import SurveyLayout from 'components/Survey/SurveyLayout';
import SubTitle from 'components/Survey/SubTitle';
import NextBtn from 'components/Survey/NextBtn';
import RatingCard from 'components/Survey/RatePosition/RatingCard';
import * as Container from 'components/common/Containers';
import positions from 'constant/positions';
import { UPDATE_USERPOSITION_REQUEST } from 'reducers/user';

const RateContainer = styled(Container.ColumnMiddleContainer)`
  background-color: #fff;
  border-radius: 2rem;
  padding: 0rem 3rem 2rem 3rem;
  margin-bottom: 4rem;
  box-shadow: 1px 1px 10px -5px black;
`;

const ProfileRatePosition = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { selected } = location.state;
  const [positionScore, setPositionScore] = useState(location.state.positionScore);
  const { updateUserPositionDone } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.authentication);

  const handleSubmit = () => {
    dispatch({
      type: UPDATE_USERPOSITION_REQUEST,
      data: positionScore,
    });
  };

  useEffect(() => {
    if (updateUserPositionDone) {
      navigate(`/profile/${user.id}`);
    }
  }, [updateUserPositionDone]);

  return (
    <FadeIn delay={800} transitionDuration={600} wrapperTag={SurveyLayout}>
      <SubTitle>각 분야에 대한 자신의 실력을 점수로 매겨주세요.</SubTitle>
      <SubTitle style={{ marginBottom: '3rem' }}>
        1점은 새내기 개발자, 5점은 현업 개발자 수준입니다.
      </SubTitle>
      <RateContainer>
        {selected.map((check, index) => {
          return (
            { check } && (
              <RatingCard
                key={positions[index].id}
                position={positions[index]}
                setScore={setPositionScore}
                score={positionScore}
              />
            )
          );
        })}
      </RateContainer>
      <NextBtn onClick={handleSubmit} />
    </FadeIn>
  );
};

export default ProfileRatePosition;
