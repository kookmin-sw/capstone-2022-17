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

const DataIn = styled(Input)`
  width: 10rem;
  margin-right: 1.5rem !important;
`;

const DataInput = ({ placeholder, value }) => {
  const [data, setData] = useState(value);
  const handler = useCallback((e) => {
    setData(e.target.value);
  }, []);

  return <DataIn placeholder={placeholder} value={data} onChange={handler} />;
};

export default DataInput;
