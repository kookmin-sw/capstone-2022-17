import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';

const Input = styled(Form.Input)`
  .input > input {
    font-family: 'Pr-Regular' !important;
    font-size: 0.9rem !important;
  }
  margin-bottom: 0 !important;
`;

const NumIn = styled(Input)`
  width: 2.5rem;
  margin-right: 0.5rem !important;
`;

const NumInput = ({ value }) => {
  const [data, setData] = useState(value);
  const handler = useCallback((e) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value.substr(0, 1);
    }
    setData(e.target.value);
  }, []);

  return <NumIn placeholder="0" value={data} onChange={handler} type="number" />;
};

export default NumInput;
