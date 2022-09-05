/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getFilteredArticles,
  getGlobalArticles,
  getUserArticles,
} from "../actions";
import {
  changeArticleTab,
  selectUserFeedArticles,
  selectGlobalArticles,
  selectCurrentArticleTab,
  loadUserFeed,
  loadGlobalFeed,
  cachedArticles,
  loadTagFeed,
  selectTagFilteredArticles,
  selectUserFeedName,
  selectGlobalFeedName,
} from "../features/articleListSlice";
import { selectUser } from "../features/userSlice";
import { ArticlePreviews } from "./ArticlePreviews";
import { Tags } from "./Tags";

export const Feed = () => {
  console.log("feed is reloaded");
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const currentArticleTab = useSelector(selectCurrentArticleTab);

  const userFeedArticles = useSelector(selectUserFeedArticles);
  const globalFeedArticles = useSelector(selectGlobalArticles);
  const tagFilteredArticles = useSelector(selectTagFilteredArticles);

  const userFeedName = useSelector(selectUserFeedName);
  const globalFeedName = useSelector(selectGlobalFeedName);

  useEffect(() => {
    // when we are here user can be false!
    const articleTab = user ? userFeedName : globalFeedName;
    articleTab === currentArticleTab || dispatch(changeArticleTab(articleTab));
  }, [user]);

  const setUserFeedArticles = (articles) => {
    dispatch(loadUserFeed(articles));
  };
  const setGlobalFeedArticles = (articles) => {
    dispatch(loadGlobalFeed(articles));
  };
  const setTagFilteredArticles = (articles) => {
    dispatch(loadTagFeed(articles));
  };

  // this codes rerenders the page each time some async operation is finished. Also shows us cached articles before fetch operation finishes.
  useEffect(() => {
    dispatch(cachedArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userFeedArticles,
    globalFeedArticles,
    currentArticleTab,
    tagFilteredArticles,
  ]);

  // we fetch the articles here. it is
  useEffect(() => {
    const fetchArticles = () => {
      if (currentArticleTab === globalFeedName) {
        getGlobalArticles(
          globalFeedArticles,
          setGlobalFeedArticles,
          user.token
        );
      } else if (currentArticleTab === userFeedName) {
        user &&
          getUserArticles(user.token, userFeedArticles, setUserFeedArticles);
      } else {
        // if filter is tag.
        // adding another state for tag may be better
        getFilteredArticles(
          user.token,
          currentArticleTab,
          tagFilteredArticles,
          setTagFilteredArticles,
          "tag"
        );
      }
    };
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, currentArticleTab]);

  // unhighlightes the highligted tag
  const removeActiveTag = () => {
    // removes the active tag classname.
    const tagList = document.getElementsByClassName("active-tag");
    Array.from(tagList).forEach((tag) => tag.classList.remove("active-tag"));
  };

  // on click function, that will lead to article tab change
  const changeFeed = (changeTo) => (event) => {
    const otherFeed = changeTo === userFeedName ? globalFeedName : userFeedName;
    event.preventDefault();
    removeActiveTag();

    if (currentArticleTab === otherFeed) {
      dispatch(changeArticleTab(changeTo));
    } else if (currentArticleTab !== changeTo) {
      // if it was a tag nav, removes it from feed navigation bar
      feed_nav_list.pop();
      dispatch(changeArticleTab(changeTo));
    }
  };

  // creating feed nav list. it is little ugly with unshift and push function ahead but
  const feed_nav_list = [
    {
      title: "Global Feed",
      name: globalFeedName,
      onclickfunction: changeFeed(globalFeedName),
    },
  ];
  user &&
    feed_nav_list.unshift({
      title: "Your feed",
      name: userFeedName,
      onclickfunction: changeFeed(userFeedName),
    });

  //  we point out which feed nav tag is selected.
  if (
    currentArticleTab !== globalFeedName &&
    currentArticleTab !== userFeedName
  ) {
    // also we add the tag nav into feed nav bar here
    feed_nav_list.push({
      title: `#${currentArticleTab}`,
      name: "tag",
      onclickfunction: "./",
    });
  }

  // returns the feed navigation items
  const feedNavItems = feed_nav_list.map((current, index, arr) => {
    // finds the one to be highligted
    const isCurrentSelected =
      current.name === currentArticleTab || current.name === "tag";

    return (
      <Link
        to={current.onclickfunction}
        key={index}
        className={`feed-nav-item ${
          isCurrentSelected ? "active-feed-nav" : ""
        }`}
        onClick={current.onclickfunction}
      >
        {current.title}
      </Link>
    );
  });

  return (
    <>
      <div className="page-left">
        <div className="feed-nav">{feedNavItems}</div>
        <div className="feed">
          <ArticlePreviews />
        </div>
      </div>
      <div className="page-right">
        <div className="tags-pane">
          <div className="tags-head">Popular Tags</div>
          <div className="tags">
            <Tags
              activeTag={currentArticleTab}
              setActiveTag={(e) => {
                dispatch(changeArticleTab(e));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
