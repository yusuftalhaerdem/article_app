import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  changeFollow,
  deleteArticle,
  favouriteArticle,
  getArticle,
} from "../actions/ApiActions";
import { CommentSection } from "../components/CommentSection";
import { UserInfo } from "../components/UserInfo";
import { loadArticle, selectArticle } from "../features/articleSlice";
import {
  selectArticleEditorUrl,
  selectLoginUrl,
} from "../features/navigationSlice";
import { selectUser } from "../features/userSlice";

export const ArticlePage = () => {
  const user = useSelector(selectUser);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const article = useSelector(selectArticle);
  const setArticle = (article) => {
    dispatch(loadArticle(article));
  };
  const navigate = useNavigate();
  const loginUrl = useSelector(selectLoginUrl);
  const articleEditorUrl = useSelector(selectArticleEditorUrl);

  // loads the article from api
  useEffect(() => {
    getArticle(slug, article, setArticle, user.token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // if i do it like this, website response will be faster.
      setArticle({
        ...article,
        author: { ...article.author, following: !article.author.following },
      });
    }
  };

  //console.log(article);
  const favouriteTheArticle = () => {
    if (!user) navigate(loginUrl);
    else {
      // i may setArticle here. since it returns article.
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
  const deleteTheArticle = (e) => {
    e.preventDefault();
    deleteArticle(article.slug, user.token);
    navigate(-1);
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

          {article && article.author.username !== user.username ? (
            <div
              id="article-page-unfollow"
              className="unfollow"
              style={{ margin: "0 1em" }}
              onClick={followUser}
            >
              {article && article.author.following ? "Unfollow" : "Follow"}{" "}
              {article && article.author.username}
            </div>
          ) : (
            <>
              <Link
                to={`${articleEditorUrl}/${article.slug}`}
                className="article-edit"
              >
                Edit Article
              </Link>
              <Link
                to={"../"}
                className="article-delete"
                onClick={deleteTheArticle}
              >
                Delete Article
              </Link>
            </>
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
