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
  ProjectList,
  SelectPosition,
  RatePosition,
  TechStack,
  Write,
  Profile,
  ProfileSelectPosition,
  ProfileRatePosition,
  Setting,
  Modify,
  Account,
  Error,
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
            <Route path="/account" element={<Account />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/select-position" element={<ProfileSelectPosition />} />
            <Route path="/profile/rate-position" element={<ProfileRatePosition />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/setting/:id" element={<Setting />} />
            <Route path="/modify" element={<Modify />} />
            <Route path="/myproject" element={<MyProject />} />
            <Route path="/project-list" element={<ProjectList />} />
            <Route path="/survey/select-position" element={<SelectPosition />} />
            <Route path="/survey/rate-position" element={<RatePosition />} />
            <Route path="/survey/techstack" element={<TechStack />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </ResponsiveLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
