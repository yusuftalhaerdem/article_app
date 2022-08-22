import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTags } from "../actions";
import { selectUser } from "../features/userSlice";

export const Tags = (props) => {
  const user = useSelector(selectUser);
  const token = user.token;

  const setActiveTag = props.setActiveTag;
  const activeTag = props.activeTag;

  const updateTag = (event) => {
    const tagList = document.getElementsByClassName("active-tag");
    Array.from(tagList).forEach((element) => {
      element.classList.remove("active-tag");
    });

    event.target.classList.add("active-tag");
    if (event.target.innerHTML !== activeTag) {
      setActiveTag(event.target.innerHTML);
    }
  };

  const [tagList, setTagList] = useState(false);
  getTags(tagList, setTagList, token);
  //console.log(tagList);
  //const tags = readTags();
  const tag_list = (tagList) => {
    if (tagList === false) {
      return <h4 id="tags-loading">Tags are loading</h4>;
    } else {
      return tagList.map((current, index, arr) => {
        return (
          <span key={index}>
            <button className="tag" onClick={updateTag}>
              {current}
            </button>
          </span>
        );
      });
      /**/
    }
  };

  return (
    <>
      <>{tag_list(tagList)}</>
    </>
  );
};

/*
    const non_unique_tag_list = [];
    articles.forEach((current) => {
      current.tagList.forEach((tag) => {
        non_unique_tag_list.push(tag);
      });
    });
    const tag_list = [...new Set(non_unique_tag_list)];
  
    const tags = tag_list.map((current, index, arr) => {
      return (
        <span key={index}>
          <button className="tag">{current}</button>
        </span>
      );
    });*/
