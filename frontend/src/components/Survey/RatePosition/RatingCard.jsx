import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from 'styled-components';
import * as Container from 'components/common/Containers';
import COLOR from 'constant/color';

const markstyle = {
  fontSize: '1.4rem',
};

const marks = {
  1: {
    style: markstyle,
    label: '🥚',
  },
  2: {
    style: markstyle,
    label: '🐣',
  },
  3: {
    style: markstyle,
    label: '🐥',
  },
  4: {
    style: markstyle,
    label: '🐔',
  },
  5: {
    style: markstyle,
    label: '🦢',
  },
};

const RatingCardContainer = styled(Container.ColumnMiddleContainer)`
  width: 23rem;
  margin: 3rem 2rem 4rem 2rem;
`;

const Position = styled.div`
  font-family: 'Pr-Bold';
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

const RatingCard = ({ position, setRate, rate }) => {
  const [value, setValue] = useState(3);

  useEffect(() => {
    const temp = rate;
    rate.forEach((element, index) => {
      if (element.id === position.id) {
        temp[index].rate = value;
      }
    });
    setRate(temp);
  }, [value]);

  return (
    <RatingCardContainer>
      <Position>{position.name}</Position>
      <Slider
        value={value}
        onChange={(nextValues) => setValue(nextValues)}
        min={1}
        max={5}
        marks={marks}
        defaultValue={3}
        trackStyle={{ backgroundColor: COLOR.PRIMARY }}
        handleStyle={{ borderColor: COLOR.PRIMARY }}
        railStyle={{ backgroundColor: COLOR.LIGHTGRAY }}
        dotStyle={{ backgroundColor: COLOR.WHITE }}
        activeDotStyle={{ borderColor: COLOR.PRIMARY }}
      />
    </RatingCardContainer>
  );
};

export default RatingCard;
