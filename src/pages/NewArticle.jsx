import React from "react";
import { useSelector } from "react-redux";
import { createArticle } from "../actions/ApiActions";
import { selectUser } from "../features/userSlice";

const NewArticle = () => {
  const user = useSelector(selectUser);
  const token = user.token;

  const createNewArticle = (e) => {
    e.preventDefault();
    // title,  description,  body,  tags,  token
    createArticle(
      document.getElementById("new-article-title").value,
      document.getElementById("new-article-description").value,
      document.getElementById("new-article-text").value,
      document.getElementById("new-article-tags").value.split(" "),
      token
    );
  };

  return (
    <div className="form-container">
      <form className="form">
        <input
          type="text"
          id="new-article-title"
          className="input"
          placeholder="Article Title"
        />
        <input
          type="text"
          id="new-article-description"
          className="input"
          placeholder="What is this article about?"
        />
        <textarea
          id="new-article-text"
          className="input"
          placeholder="Write your article (in markdown)"
        />
        <input
          type="text"
          id="new-article-tags"
          className="input"
          placeholder="Enter tags"
        />
        <input
          type="submit"
          id="new-article-submit"
          className="submit"
          value="Publish Article"
          onClick={createNewArticle}
        />
      </form>
    </div>
  );
};

export default NewArticle;
