import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import wrapper from 'store/configureStore';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';

import { Home, SignIn, SignUp } from 'pages';
import ResponsiveLayout from 'layouts/responsive.layout';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ResponsiveLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ResponsiveLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
