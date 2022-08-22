import React from "react";
import { UserInfo } from "./UserInfo";
import { favouriteArticle } from "../actions/ApiActions";
import { useSelector, useDispatch } from "react-redux";
//import { Alert } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { articleLikeAction, selectArticles } from "../features/articleSlice";
import { selectLoginUrl } from "../features/navigationSlice";

export const ArticlePreviews = (props) => {
  //console.log("articl prev reloaded");

  const user = useSelector(selectUser);
  const article_list = useSelector(selectArticles);
  const dispatch = useDispatch();
  const loginUrl = useSelector(selectLoginUrl);

  const navigate = useNavigate();

  // we group the tags of article
  const tags = (article) => {
    const tags = article.tagList;
    return tags.map((current, index, arr) => {
      return (
        <Link key={index} to={`../article/${article.slug}`}>
          <button className="article-tag">{current}</button>
        </Link>
      );
    });
  };

  // like/unlike article function. it also redirects to login page if user is not logged in.
  const likeArticleFunction = (slug, favorited) => (e) => {
    if (!user) navigate(loginUrl);
    else {
      favouriteArticle(slug, user.token, favorited ? "DELETE" : "POST");
      dispatch(articleLikeAction(slug));
    }
  };

  // we gather the articles here
  console.log("article list:", article_list);
  const articles = (article_list || []).map((current) => {
    // check my key :D. IT IS NOT INDEX
    return (
      <span key={current.slug}>
        <div className="article-cell">
          <div className="article-top">
            <UserInfo
              author={current.author}
              createdAt={current.createdAt}
            ></UserInfo>
            <button
              className={
                current.favorited
                  ? "clicked-article-like-button"
                  : "article-like-button"
              }
              onClick={
                // note: this is high level function. i used it in order to bind this function to some parameters
                likeArticleFunction(current.slug, current.favorited)
              }
            >
              <div
                className={current.favorited ? "clicked-heart" : "heart"}
              ></div>
              <div
                className={current.favorited ? "clicked-like-no" : "like-no"}
              >
                {current.favoritesCount}
              </div>
            </button>
          </div>
          <Link to={`../article/${current.slug}`}>
            <h2 className="article-title">{current.title}</h2>
            <div className="article-content">{current.description}</div>
          </Link>
          <div className="article-bottom">
            <Link className="read-more" to={`../article/${current.slug}`}>
              Read more...
            </Link>
            <div className="article-tags">{tags(current)}</div>
          </div>
        </div>
      </span>
    );
  });
  const articles_page =
    articles.length === 0 ? (
      <div className="no-article-error">There is no article found</div>
    ) : (
      articles
    );

  return (
    <>
      {article_list ? (
        articles_page
      ) : (
        <h4 id="article-loading">Articles are loading</h4>
      )}
    </>
  );

  /*
        <Alert variant="filled" severity="error" className="sticky-alert">
        </Alert>
  const showStickAlert = () => {
    React.createElement();
    const alert = React.createElement(Alert, [
      { variant: "filled" },
      { severity: "error" },
    ]);
    document.getElementById("sticky-alert-bar").appendChild(alert);
  };
  showStickAlert();
  */
};
