import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  changeFollow,
  favouriteArticle,
  getArticle,
} from "../actions/ApiActions";
import { CommentSection } from "../components/CommentSection";
import { UserInfo } from "../components/UserInfo";
import { articleLikeAction } from "../features/articleSlice";
import { selectLoginUrl } from "../features/navigationSlice";
import { selectUser } from "../features/userSlice";

export const ArticlePage = () => {
  const user = useSelector(selectUser);
  const { slug } = useParams();
  const [article, setArticle] = useState(false);
  const navigate = useNavigate();
  const loginUrl = useSelector(selectLoginUrl);

  useEffect(() => {
    getArticle(slug, article, setArticle, user.token);
  }, []);

  console.log(article);
  const followUser = () => {
    if (!user) navigate(loginUrl);
    else {
      console.log(article);
      changeFollow(
        article.author.username,
        user.token,
        article.author.following,
        (author) => {
          setArticle({ ...article, author: author });
        },
        article.author.following ? "DELETE" : "POST"
      );
    }
  };

  console.log(article);
  const favouriteTheArticle = () => {
    if (!user) navigate(loginUrl);
    else {
      favouriteArticle(slug, user.token, article.favorited ? "DELETE" : "POST");
      // This page need a little bit reorganizing
      const favCountChange = article.favorited ? -1 : +1;
      setArticle({
        ...article,
        favorited: !article.favorited,
        favoritesCount: article.favoritesCount + favCountChange,
      });
    }
  };

  const article_tags = () => {
    return (article.tagList || []).map((tag, index) => {
      return (
        <div className="tag" key={index}>
          {tag}
        </div>
      );
    });
  };

  return (
    <>
      <div className="article-banner">
        <h1 className="article-page-title">{article.title}</h1>
        <div className="article-page-user">
          <UserInfo
            author={article.author || user}
            createdAt={article.createdAt || "unknown date"}
          />
          {article && article.author.following ? (
            <div
              id="article-page-unfollow"
              className="unfollow"
              style={{ margin: "0 1em" }}
              onClick={followUser}
            >
              Unfollow {article && article.author.username}
            </div>
          ) : (
            <div
              id="article-page-follow"
              className="follow"
              style={{ margin: "0 1em" }}
              onClick={followUser}
            >
              Follow {article && article.author.username}
            </div>
          )}

          <div className="favorite" onClick={favouriteTheArticle}>
            <span className="heart"></span>
            {article && (article.favorited ? "Unfavorite" : "Favorite")} article
            (<span className="fav-count">{article.favoritesCount}</span>)
          </div>
        </div>
      </div>
      <div className="article-page-body">
        <div className="article-page-body-text">{article.body}</div>
        <div className="article-page-tags">{article_tags()}</div>
      </div>
      <CommentSection slug={slug} />
    </>
  );
};
/*----------------------------------------------------------------

          {article && article.favorited ? (
            <div className="favorite">
              Favorite article(
              <div classname="fav-count">{article.favoritesCount}</div>)
            </div>
          ) : (
            <div className="favorite" onClick={favouriteArticle}>
              Unfavorite article(
              <div classname="fav-count">{article.favoritesCount}</div>)
            </div>
          )}
          */
