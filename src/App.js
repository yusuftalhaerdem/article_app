import { NavBar } from "./components/NavBar";
import "./App.css";
import { Homepage } from "./pages/Homepage";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import NewArticle from "./pages/NewArticle";
import UserSetting from "./pages/UserSetting";
import UserPage from "./pages/UserPage";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
//import SimpleSnackbar from "./components/SimpleSnackbar";
import { ArticlePage } from "./pages/ArticlePage";
import { logIn, selectUser } from "./features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { updateNavigationList } from "./features/navigationSlice";
import { NotFound } from "./pages/NotFound";

function App() {
  const cookie = localStorage.getItem("user");
  const startingState = cookie ? JSON.parse(cookie) : false;

  // so we wont have to change it all occurences between files each time.
  const user = useSelector(selectUser);
  console.log("app is rendered. user:", Boolean(user));

  const dispatch = useDispatch();
  //const temp_func = () => user || dispatch(logIn(startingState));
  useEffect(() => {
    user || dispatch(logIn(startingState));
    dispatch(updateNavigationList(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //const [toastMessage, setToastMessage] = useState("Temp"); // setToastMessage={setToastMessage}

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/*" element={<NotFound />} />
        {user ? (
          <>
            <Route path="/newArticle" element={<NewArticle />} />
            <Route path="/userSettings" element={<UserSetting />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
          </>
        )}
      </Routes>
    </>
  );
  // <SimpleSnackbar toastMessage={toastMessage} />
}

export default App;
