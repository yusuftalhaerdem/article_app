import React, { useEffect, useState } from "react";
import { UserInfo } from "./UserInfo";
import { favouriteArticle } from "../actions/ApiActions";
import { useSelector, useDispatch } from "react-redux";
//import { Alert } from "@mui/material";
import { selectUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  articleLikeAction,
  selectArticles,
} from "../features/articleListSlice";
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
  //console.log("article list:", article_list);
  const [pageNo, setPageNo] = useState(0);
  useEffect(() => setPageNo(0), [article_list]);
  //const page_no = 1;
  const max_article_per_page = 10;
  const page_count = article_list
    ? Math.ceil(article_list.length / max_article_per_page)
    : 0;

  const page_articles = (page_no) => {
    if (!article_list) return [];
    //console.log(page_no, page_count);
    const startingPageNo = page_no * max_article_per_page;
    if (page_no < page_count) {
      return article_list.slice(
        startingPageNo,
        startingPageNo + max_article_per_page
      );
    } else if (page_no === page_count) {
      return article_list.slice(startingPageNo, article_list.length);
    } else {
      console.log("something may be wrong!!!!!!!!!!!!!!!!!!!!!!!!!!");
      return [];
    }
  };
  const changePageNo = (page_no) => (e) => {
    setPageNo(page_no);
  };

  const article_page_links = () => {
    // page_count
    // if it is only page, we dont add any paging button
    if (page_count <= 1) {
      return <></>;
    }
    const no_list = [...Array(page_count).keys()];
    const page_numbers = no_list.map((current) => {
      return (
        <div key={current} className="page-no" onClick={changePageNo(current)}>
          {current + 1}
        </div>
      );
    });
    return <div className="page-numbers">{page_numbers}</div>;
  };

  const paged_articles = page_articles(pageNo);

  const articles = (paged_articles || []).map((current) => {
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
      {article_page_links()}
    </>
  );
};
