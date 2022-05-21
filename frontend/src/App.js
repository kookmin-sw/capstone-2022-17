import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import wrapper from 'store/configureStore';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';
import 'styles/fonts.css';
import ResponsiveLayout from 'layouts/responsive.layout';
import {
  Home,
  SignIn,
  SignUp,
  Project,
  MyProject,
  SelectPosition,
  RatePosition,
  TechStack,
  Write,
  Profile,
} from 'pages';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ResponsiveLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/project" element={<Project />} />
            <Route path="/myproject" element={<MyProject />} />
            <Route path="/survey/select-position" element={<SelectPosition />} />
            <Route path="/survey/rate-position" element={<RatePosition />} />
            <Route path="/survey/techstack" element={<TechStack />} />
            {/* <Route exact path="/project/:id" id="number" element={<Project />} /> */}
          </Routes>
        </ResponsiveLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
