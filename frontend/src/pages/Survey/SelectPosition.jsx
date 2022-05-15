import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Grid } from 'semantic-ui-react';
import useCheckbox from 'hooks/useCheckbox';
import FadeIn from 'react-fade-in';

import SurveyLayout from 'components/Survey/SurveyLayout';
import SubTitle from 'components/Survey/SubTitle';
import NextBtn from 'components/Survey/NextBtn';
import positions from 'constant/positions';

const SelectPosition = () => {
  const navigate = useNavigate();
  const [selected, onChangeSelected] = useCheckbox();

  const handleSubmit = () => {
    const positionRate = [];
    selected.forEach((check, index) => {
      if (check) {
        positionRate.push({
          id: positions[index].id,
          name: positions[index].name,
          rate: 3,
        });
      }
    });
    navigate('/survey/rate-position', { state: { selected, positionRate } });
  };

  return (
    <FadeIn delay={800} transitionDuration={600} wrapperTag={SurveyLayout}>
      <SubTitle>개발 가능한 분야를 알려주세요.</SubTitle>
      <SubTitle>티밍이 당신에게 어울리는 프로젝트를 추천해드릴게요!</SubTitle>

      <Grid
        stackable
        columns={3}
        style={{
          maxWidth: '40rem',
          margin: '5rem 0',
          background: '#fff',
          borderRadius: '2rem',
          padding: '1rem 2rem',
          boxShadow: '1px 1px 10px -5px black',
        }}
      >
        <Grid.Row>
          {positions.map((position) => {
            return (
              <Grid.Column key={position.id} style={{ margin: '0.25rem 0' }}>
                <Checkbox
                  key={position.id}
                  label={position.name}
                  checked={selected[position.id]}
                  onChange={onChangeSelected(position.id)}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
      <NextBtn onClick={handleSubmit} />
    </FadeIn>
  );
};

export default SelectPosition;
