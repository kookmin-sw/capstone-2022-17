const fontSize = {
  title: '3rem',
  paragraph: '1rem',
  text: '0.6rem',
};

const color = {
  black: '#000000',
  primary: '#797FD4',
  gray: '#404040',
  lightgray: '#9d9d9d',
};

const common = {
  flexCenter: `
    display: flex;
    justify-contents: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-contents: center;
    align-items: center;
  `,
};

const theme = {
  fontSize,
  color,
  common,
};

export default theme;
