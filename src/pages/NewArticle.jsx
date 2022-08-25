import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  createArticle,
  getArticle,
  updateArticle,
} from "../actions/ApiActions";
import { selectUser } from "../features/userSlice";
import { useValidatableForm } from "react-validatable-form";
import { selectArticle } from "../features/articleSlice";
import {
  selectArticlePageUrl,
  selectCurrentNavigationUrl,
} from "../features/navigationSlice";
import { Inputs } from "../components/Inputs";

const pageName = "new-article";
const inputOutline = {
  title: {
    name: "title",
    type: "text",
    placeholder: "Article Title",
  },
  description: {
    name: "description",
    type: "text",
    placeholder: "What is this article about?",
  },
};
const initialFormData = {
  title: "",
  description: "",
  body: "",
  tags: "",
};
const rules = [
  {
    path: inputOutline.title.name,
    ruleSet: [
      {
        rule: "required",
      },
      {
        rule: "length",
        greaterThan: 8,
      },
      {
        rule: "regex",
        regex: "^[a-zA-Z]",
        customMessage: "Title should start with a alphabetic character",
      },
    ],
  },
  {
    path: inputOutline.description.name,
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        greaterThan: 16,
      },
    ],
  },
  {
    path: "body",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        greaterThan: 50,
      },
    ],
  },
  { path: "tags", ruleSet: [{ rule: "required" }] },
];

const NewArticle = () => {
  const { slug } = useParams();
  const article = useSelector(selectArticle);
  const currentNavigationUrl = useSelector(selectCurrentNavigationUrl);

  const user = useSelector(selectUser);
  const token = user.token;

  const navigate = useNavigate();
  const articlePageUrl = useSelector(selectArticlePageUrl);

  // only if user tried to continue with missing info, we will show missing error. this is state of it.
  const [submitFailed, setSubmitFailed] = useState(false);
  const { isValid, formData, setPathValue, getValue, getError } =
    useValidatableForm({
      rules,
      initialFormData,
    });

  // maybe another slicer for this part?
  const setArticle = (article) => {
    setPathValue("title", article.title);
    setPathValue("description", article.description);
    setPathValue("body", article.body);
    setPathValue("tags", article.tagList.toString().replace(",", " "));
  };
  const resetInputs = () => {
    setPathValue("title", "");
    setPathValue("description", "");
    setPathValue("body", "");
    setPathValue("tags", "");
  };

  useEffect(() => {
    console.log(article);
    // if slug is not true, it is new article editor.
    if (slug) {
      // if user have reached this place from article page, we just retrieve state of last article, this is the case most of time
      if (article && article.slug === slug) {
        // then we change the
        setArticle(article);
      } else {
        getArticle(slug, article, setArticle, user.token);
      }
    } else {
      resetInputs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNavigationUrl]);

  /**/

  const redirectToArticlePage = () => {
    navigate(`${articlePageUrl}/${slug}`);
  };

  const submitOperation = (e) => {
    e.preventDefault();
    if (!isValid) {
      setSubmitFailed(true);
      console.log("form is not valid yet!!");
      alert("form is not filled.");
      return;
    }
    // title,  description,  body,  tags,  token
    if (slug) {
      // title, description, body, token
      updateArticle(
        getValue("title"),
        getValue("description"),
        getValue("body"),
        slug,
        token,
        redirectToArticlePage
      );
    } else
      createArticle(
        getValue("title"),
        getValue("description"),
        getValue("body"),
        getValue("tags").split(" "),
        token
      );
  };
  //bunu ayrı bir fonksiyon yapalım
  const textAreaOnChange = (event) => {
    event.target.style.minHeight = `${event.target.scrollHeight}px`;
    setPathValue("body", event.target.value);
  };

  const prop = {
    setPathValue: setPathValue,
    getValue: getValue,
    getError: getError,
    pageName: pageName,
    inputOutline: Object.values(inputOutline),
    submitFailed: submitFailed,
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={submitOperation}>
        <Inputs object={prop} />
        <textarea
          id="new-article-text"
          className="input"
          placeholder="Write your article (in markdown)"
          value={getValue("body")}
          onChange={(event) => textAreaOnChange(event)}
        />
        {getError("body") && submitFailed && (
          <div className="validataion-error">{getError("body")}</div>
        )}
        <input
          type="text"
          id="new-article-tags"
          className="input"
          placeholder="Enter tags"
          value={getValue("tags")}
          onChange={(event) => slug || setPathValue("tags", event.target.value)}
        />
        {getError("tags") && submitFailed && (
          <div className="validataion-error">{getError("tags")}</div>
        )}
        <input
          type="submit"
          id="new-article-submit"
          className="submit"
          value={slug ? "Edit Article" : "Publish Article"}
          //onClick={createNewArticle}
        />
      </form>
    </div>
  );
};

export default NewArticle;

/**
 *         <input
          type="text"
          id="new-article-title"
          className="input"
          placeholder="Article Title"
          value={getValue("title")}
          onChange={(event) => setPathValue("title", event.target.value)}
        />
        {getError("title") && submitFailed && (
          <div className="validataion-error">{getError("title")}</div>
        )}
        <input
          type="text"
          id="new-article-description"
          className="input"
          placeholder="What is this article about?"
          value={getValue("description")}
          onChange={(event) => setPathValue("description", event.target.value)}
        />
        {getError("description") && submitFailed && (
          <div className="validataion-error">{getError("description")}</div>
        )}
 */
