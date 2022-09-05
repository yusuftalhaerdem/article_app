import { NavBar } from "./components/NavBar";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import NewArticle from "./pages/NewArticle";
import UserSetting from "./pages/UserSetting";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ArticlePage } from "./pages/ArticlePage";
import { logIn, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  updateNavigationList,
  selectLoginUrl,
  selectHomepageUrl,
  selectArticleEditorUrl,
  selectRegisterUrl,
  selectSettingsUrl,
  selectUserPageUrl,
  selectArticlePageUrl,
} from "./features/navigationSlice";
import { NotFound } from "./pages/NotFound";
import { ContextButton } from "./components/ContextButton";
import AlertBar from "./components/AlertBar";
import { Reports } from "./pages/Reports";

function App() {
  const dispatch = useDispatch();

  // we get previous user login info from local storage.
  const cookie = localStorage.getItem("user");
  const startingState = cookie ? JSON.parse(cookie) : false;

  const user = useSelector(selectUser);
  console.log("app is rendered. user:", Boolean(user));

  if (JSON.stringify(user) !== startingState)
    user || dispatch(logIn(startingState));

  useEffect(() => {
    dispatch(updateNavigationList(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // for dark mode button
  const [isDarkMode, setDarkMode] = useState(false);

  // adress selectors.
  const loginUrl = useSelector(selectLoginUrl); //,selectHomepageUrl,selectArticleEditorUrl,selectRegisterUrl,selectRegisterUrl,,selectSettingsUrl,selectUserPageUrl
  const homepageUrl = useSelector(selectHomepageUrl);
  const articleEditorUrl = useSelector(selectArticleEditorUrl);
  const registerUrl = useSelector(selectRegisterUrl);
  const userSettingsUrl = useSelector(selectSettingsUrl);
  const userPageUrl = useSelector(selectUserPageUrl);
  const articlePageUrl = useSelector(selectArticlePageUrl);

  return (
    <div className={isDarkMode ? "dark second-root" : "second-root"}>
      <NavBar />
      <Routes>
        <Route path={"/reports"} element={<Reports />} />
        <Route path={homepageUrl} element={<Homepage />} />
        <Route path={`${userPageUrl}/:username`} element={<UserPage />} />
        <Route path={`${articlePageUrl}/:slug`} element={<ArticlePage />} />
        <Route path="/*" element={<NotFound />} />
        {user ? (
          <>
            <Route path={articleEditorUrl} element={<NewArticle />} />
            <Route
              path={`${articleEditorUrl}/:slug`}
              element={<NewArticle />}
            />
            <Route path={userSettingsUrl} element={<UserSetting />} />
          </>
        ) : (
          <>
            <Route path={loginUrl} element={<SignIn />} />
            <Route path={registerUrl} element={<SignUp />} />
          </>
        )}
      </Routes>
      <ContextButton isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      <AlertBar />
    </div>
  );
}

export default App;
