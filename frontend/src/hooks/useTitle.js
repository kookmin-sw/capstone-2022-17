import { useState, useEffect } from 'react';

const useTitle = (input) => {
  const [title, setTitle] = useState(input);

  const updateTitle = () => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = title;
  };
  useEffect(updateTitle, [title]);

  return setTitle;
};

export default useTitle;
