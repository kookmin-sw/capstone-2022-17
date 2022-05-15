import { useState, useCallback } from 'react';

const useCheckbox = (initialValue = []) => {
  const [value, setValue] = useState(initialValue);
  const handler = (idx) =>
    useCallback(() => {
      value[idx] = !value[idx];
      setValue(value);
    }, []);
  return [value, handler, setValue];
};

export default useCheckbox;
