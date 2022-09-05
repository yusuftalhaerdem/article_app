import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { addMessage } from "../features/alertSlice";

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
  body: {
    name: "body",
    type: "textarea",
    placeholder: "Write your article (in markdown)",
  },
  tags: {
    name: "tags",
    type: "text",
    placeholder: 'Enter tags, split them with whitespace(" ").',
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
    path: inputOutline.body.name,
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articlePageUrl = useSelector(selectArticlePageUrl);

  // only if user tried to continue with missing info, we will show missing error. this is state of it.
  const [submitFailed, setSubmitFailed] = useState(false);
  const { isValid, formData, setPathValue, getValue, getError } =
    useValidatableForm({
      rules,
      initialFormData,
    });

  const alertFunction = (message) => {
    dispatch(addMessage(message));
  };

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
    //console.log(article);
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

  const redirectToArticlePage = (slugName, verb) => {
    navigate(`../${articlePageUrl}/${slugName}`);
    alertFunction(`article succesfully ${verb}.`);
  };

  const submitOperation = (e) => {
    e.preventDefault();
    if (!isValid) {
      setSubmitFailed(true);
      console.log("form is not valid yet!!");
      alertFunction("form is not filled.");
      return;
    }
    // title,  description,  body,  tags,  token
    if (slug) {
      // title, description, body, token, function to run in completion
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
        token,
        redirectToArticlePage
      );
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
        <input
          type="submit"
          id="new-article-submit"
          className="submit"
          value={slug ? "Edit Article" : "Publish Article"}
        />
      </form>
    </div>
  );
};

export default NewArticle;
