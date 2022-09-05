import { my_fetch, fetch_update_state, basic_fetch } from "./my_fetch";

// this document likely to be little messy, since i didnt understand the documentation quite well

export const favouriteArticle = (slug, token, method = "POST") => {
  console.log(slug);
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    method,
    token,
    "you favorited the article",
    "error occured while favoriting article"
  );
};

export const likeArticle = (slug, token) => {
  console.log(slug);
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    "POST",
    token
  );
};
export const unlikeArticle = (slug, token) => {
  console.log(slug);
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    "DELETE",
    token
  );
};
export const createArticle = (
  title,
  description,
  body,
  tags,
  token,
  afterFunction
) => {
  const post_body = `{
      "article": {
        "title": "${title}",
        "description": "${description}",
        "body": "${body}",
        "tagList": ${JSON.stringify(tags)}
      }
    }`;
  my_fetch(
    "https://api.realworld.io/api/articles",
    "POST",
    token,
    post_body
  ).then((res) => {
    afterFunction(res.article.slug, "created");
  });
};

export const updateArticle = (
  title,
  description,
  body,
  slug,
  token,
  afterFunction
) => {
  const request_body = `{
      "article": {
        "title": "${title}",
        "description": "${description}",
        "body": "${body}"
      }
    }`;
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}`,
    "PUT",
    token,
    request_body
  ).then((res) => {
    console.log(res);
    afterFunction(res.article.slug, "updated");
  });
};
export const deleteArticle = (slug, token, alert) => {
  my_fetch(`https://api.realworld.io/api/articles/${slug}`, "DELETE", token)
    .then((res) => {
      console.log(res);
      alert("article succsefully deleted");
      return res;
    })
    .catch((err) => {
      alert(err);
    });
};
export const createComment = (slug, comment_body, token, state, setState) => {
  const body = `{
          "comment": {
            "body": "${comment_body}"
          }
        }`;
  basic_fetch(
    `https://api.realworld.io/api/articles/${slug}/comments`,
    "POST",
    token,
    body
  )
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      setState([...state, Object.values(res)[0]]);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteComment = (slug, id, token) => {
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
    "DELETE",
    token
  ).then((res) => {
    //console.log(res)
  });
};
export const changeFollow = (
  username,
  token,
  userStatus,
  setUserStatus,
  method = "POST"
) => {
  fetch_update_state(
    `https://api.realworld.io/api/profiles/${username}/follow`,
    method,
    token,
    null,
    userStatus,
    setUserStatus
  );
};

export const getArticle = (slug, article, setArticle, token) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles/${slug}`,
    "GET",
    token,
    null,
    article,
    setArticle
  );
};

export const getComments = (slug, comments, setComments, token) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles/${slug}/comments`,
    "GET",
    token,
    null,
    comments,
    setComments
  );
};

export const getFilteredArticles = (
  token,
  option_value,
  article_list,
  setArticles,
  option
) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles?${option}=${option_value}&limit=100&offset=0`,
    "GET",
    token,
    null,
    article_list,
    setArticles
  );
};
export const getGlobalArticles = async (article_list, setArticles, token) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles?limit=100&offset=0`,
    "GET",
    token || null,
    null,
    article_list,
    setArticles
  );
};

export const getUserArticles = async (token, article_list, setArticles) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles/feed?limit=100&offset=0`,
    "GET",
    token || null,
    null,
    article_list,
    setArticles
  );
  //console.log("fetch operation of user articles is completed");
};
export const GetUserInfo = (userName, token, userStatus, setUserStatus) => {
  fetch_update_state(
    `https://api.realworld.io/api/profiles/${userName}`,
    "GET",
    token,
    null,
    userStatus,
    setUserStatus
  );
};

export const getUserProfile = (username, token = null) => {
  fetch_update_state(
    `https://api.realworld.io/api/profiles/${username}`,
    "GET",
    token
  );
};

export const getTags = (tagList, setTagList, token) => {
  fetch_update_state(
    "https://api.realworld.io/api/tags",
    "GET",
    token,
    null,
    tagList,
    setTagList
  );
};

export const tagsReport = (token, setState, state) => {
  //const state = {};
  return basic_fetch("https://api.realworld.io/api/tags", "GET", token, null)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      Promise.all(
        res["tags"].map((current) => {
          //console.log(current, res);
          return basic_fetch(
            `https://api.realworld.io/api/articles?tag=${current}&limit=100&offset=0`,
            "GET",
            token,
            null
          )
            .then((res) => res.json())
            .then((res) => {
              // console.log(res);
              return {
                tag: current,
                length: res.articlesCount,
              };
            });
        })
      ).then((values) => {
        //console.log(values);
        if (JSON.stringify(values) !== JSON.stringify(state)) setState(values);
        return values;
      });
    });
};

const errorcheck = (res, alert = null, successMessage = null) => {
  if (res.status === "error") {
    if (alert) alert(res.message);
    else console.log(res.message);
    return false;
  } else if (res.errors) {
    console.log(res);
    let messages = [];
    for (const key in res.errors) {
      messages.push(`${key} ${res.errors[key]}`);
    }
    alert(messages.join(", ") + ".");
    return false;
  } else {
    alert && successMessage && alert(successMessage);
    return true;
  }
};

export const sendRegisterRequest = async (
  username,
  email,
  password,
  alert,
  afterFunction
) => {
  const errorMessage = "Error occured during account creation";
  const successMessage = "Account is succesfully created";
  const body = `{\n  "user": {\n    "username": "${username}",\n    "email": "${email}",\n    "password": "${password}"\n  }\n}`;
  basic_fetch("https://api.realworld.io/api/users", "POST", null, body, alert)
    .then((res) => res.json())
    .then((res) => {
      // if there is no error, we show
      errorcheck(res, alert, successMessage) && afterFunction();
      return res;
    })
    .catch((err) => {
      alert && errorMessage && alert(errorMessage);
      console.log(err);
    });
  console.log("fetch operation of register request is completed");
};

/////////////////////////////////////////////////////////////////////////////////////

export const sendLoginRequest = (email, password, setUser, alert) => {
  const body = `{\n  "user": {\n    "email": "${email}",\n    "password": "${password}"\n  }\n}`;
  const response = basic_fetch(
    "https://api.realworld.io/api/users/login",
    "POST",
    null,
    body
  )
    .then((res) => res.json())
    .then((response) => {
      if (JSON.stringify(response.user) !== undefined) {
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        console.log(response.user);
        alert("You have succesfully logged in");
      } else {
        alert("Login request is failed. Please make sure you filled correctly");
      }
      return response;
    })
    .catch((error) => alert(error));

  console.log("fetch operation of login request is on progress.");

  return response;
};

export const updateUser = (
  state,
  user,
  setUserState,
  password,
  alert = () => {},
  afterFunction = () => {}
) => {
  console.log(state);
  console.log(user);

  // bunu çok daha kolay halledebilirsin muhtemelen
  const body = {
    user: {},
  };
  body.user.token = user.token;
  if (state.email !== user.email && state.email !== "") {
    body.user.email = state.email;
  }
  if (state.username !== user.username && state.username !== "") {
    body.user.username = state.username;
  }
  if (state.bio !== user.bio && state.bio !== "") {
    body.user.bio = state.bio;
  }
  if (state.image !== user.image && state.image !== "") {
    body.user.image = state.image;
  }
  if (password !== user.password && password !== "") {
    body.user.password = password;
  }

  /*
  console.log(body);
  console.log(user.token);
  console.log(JSON.stringify(body));*/
  const successMessage = "user informations are updated sucessfully.";
  my_fetch(
    "https://api.realworld.io/api/user",
    "PUT",
    user.token,
    JSON.stringify(body)
  )
    .catch((error) => {
      console.log(error);
      return error;
    })
    .then((response) => {
      console.log(response);
      //if there is no error.
      if (response.user) {
        if (errorcheck(response, alert, successMessage)) {
          afterFunction();
          // we put it into state and local history.
          localStorage.setItem("user", JSON.stringify(response.user));
          setUserState(response.user);
        }
      } else {
        alert(response);
      }
      return response;
    })
    //.then((res) => console.log(res))
    .catch((err) => console.log(err));
};
