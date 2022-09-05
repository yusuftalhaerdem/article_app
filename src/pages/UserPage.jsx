/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ArticlePreviews } from "../components/ArticlePreviews";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUserInfo,
  getFilteredArticles,
  changeFollow,
} from "../actions/ApiActions";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import {
  changeArticleTab,
  selectCurrentArticleTab,
  loadMyFeed,
  loadFavedFeed,
  selectMyArticles,
  selectFavedArticles,
  selectMyArticleName,
  selectFavedArticleName,
  cachedArticles,
} from "../features/articleListSlice";
import {
  selectIsFollowed,
  updateProfileFollowStatus,
} from "../features/profileSlice";
import { selectLoginUrl } from "../features/navigationSlice";
// import { changeNavigationTab } from "../features/navigationSlice";

const UserPage = () => {
  const { username } = useParams();

  const loginUrl = useSelector(selectLoginUrl);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userStatus = useSelector(selectIsFollowed);

  const favedArticles = useSelector(selectFavedArticles);
  const myArticles = useSelector(selectMyArticles);

  const myArticlesName = useSelector(selectMyArticleName);
  const favedArticlesName = useSelector(selectFavedArticleName);

  const setMyFeed = (e) => dispatch(loadMyFeed(e));
  const setFavFeed = (e) => dispatch(loadFavedFeed(e));

  const setUserStatus = (e) => {
    dispatch(updateProfileFollowStatus(e));
  };
  /*
  const article_list = useSelector(selectArticles);
  const setArticles = (articles) => {
    dispatch(updateArticles(articles));
  };*/
  // gets profile info and followed status.
  useEffect(() => {
    GetUserInfo(username, user.token, userStatus, setUserStatus);
  }, [user]);
  //GetUserInfo(username, user.token, userStatus, setUserStatus);

  const currentArticleTab = useSelector(selectCurrentArticleTab);
  const setCurrentTab = (e) => {
    dispatch(changeArticleTab(e));
  };

  //const [currentTab, setCurrentTab] = React.useState(myArticlesName); // favedArticlesName
  useEffect(() => {
    console.log("article tag is changing");
    setCurrentTab(myArticlesName);
  }, [username]);

  const updateTheFeed = () => {
    let state = null;
    let setState = null;
    console.log(currentArticleTab);
    if (currentArticleTab === myArticlesName) {
      state = myArticles;
      setState = setMyFeed;
    } else if (currentArticleTab === favedArticlesName) {
      state = favedArticles;
      setState = setFavFeed;
    }
    getFilteredArticles(user.token, username, state, setState, current_option);
  };
  useEffect(() => {
    console.log("articles are getting fetched");
    updateTheFeed();
  }, [currentArticleTab, username]);

  useEffect(() => {
    console.log("updated");
    dispatch(cachedArticles());
  }, [favedArticles, myArticles, currentArticleTab]);

  const changeFeed = (nextArticleTab) => (event) => {
    event.preventDefault();
    setCurrentTab(nextArticleTab);
  };
  // creating feed nav list
  const feed_nav_list = [
    {
      title: "My Articles",
      name: myArticlesName,
    },
    {
      title: "Favorited Articles",
      name: favedArticlesName,
    },
  ];

  //  we point out which feed nav tag is selected. also we choose our filter option here.
  let current_option = "";
  if (currentArticleTab === myArticlesName) {
    current_option = "author";
  } else if (currentArticleTab === favedArticlesName) {
    current_option = "favorited";
  }

  // we create the article nav items here. Also, we give one them "active feed nav" classname, that will highlight the it
  const feedNavItems = feed_nav_list.map((current, index, arr) => {
    const isCurrentSelected = currentArticleTab === current.name;

    return (
      <Link
        to={(e) => e.preventDefault()}
        key={index}
        className={`feed-nav-item ${
          isCurrentSelected ? "active-feed-nav" : ""
        }`}
        onClick={changeFeed(current.name)}
      >
        {current.title}
      </Link>
    );
  });
  const navigate = useNavigate();

  // follow
  const changeFollowStatus = (e) => {
    e.preventDefault();
    if (user !== false) {
      changeFollow(
        username,
        user.token,
        userStatus,
        setUserStatus,
        userStatus.following ? "DELETE" : "POST"
      );
    } else {
      // giriş yap sayfasına yönlendir.
      navigate(loginUrl);
    }
  };

  // returns follow button according to user's follow status
  const isFollowed = () => {
    return (
      <div className="link-to-follow" href="#" onClick={changeFollowStatus}>
        {userStatus.following ? "Unfollow" : "Follow"} {`${username}`}
      </div>
    );
  };

  return (
    <>
      <div className="banner gray">
        <img className="user-pic" src={userStatus.image} alt="pp" />
        <p className="banner-text">{username}</p>
        <p className="banner-bio">{userStatus.bio}</p>
        {user.username !== username ? (
          isFollowed()
        ) : (
          <Link id="link-to-settings" to="../userSettings">
            Edit profile settings.
          </Link>
        )}
      </div>
      <div className="user_page">
        <div className="feed">
          <div className="feed-nav">{feedNavItems}</div>
          <ArticlePreviews />
        </div>
      </div>
    </>
  );
};

export default UserPage;
