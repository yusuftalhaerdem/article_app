import { my_fetch, fetch_update_state, basic_fetch } from "./my_fetch";

export const favouriteArticle = (slug, token, method = "POST") => {
  console.log(slug);
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/favorite`,
    method,
    token
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
export const createArticle = (title, description, body, tags, token) => {
  const post_body = `{
      "article": {
        "title": "${title}",
        "description": "${description}",
        "body": "${body}",
        "tagList": ${JSON.stringify(tags)}
      }
    }`;
  my_fetch("https://api.realworld.io/api/articles", "POST", token, post_body);
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
      setState([...state, Object.values(res)[0]]);
    });
};

export const deleteComment = (slug, id, token) => {
  my_fetch(
    `https://api.realworld.io/api/articles/${slug}/comments/${id}`,
    "DELETE",
    token
  ).then((res) => console.log(res));
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
    `https://api.realworld.io/api/articles?${option}=${option_value}&limit=20&offset=0`,
    "GET",
    token,
    null,
    article_list,
    setArticles
  );
};
export const getGlobalArticles = async (article_list, setArticles, token) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles?limit=20&offset=0`,
    "GET",
    token || null,
    null,
    article_list,
    setArticles
  );
};

export const getUserArticles = async (token, article_list, setArticles) => {
  fetch_update_state(
    `https://api.realworld.io/api/articles/feed?limit=20&offset=0`,
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

export const sendRegisterRequest = async (username, email, password) => {
  const body = `{\n  "user": {\n    "username": "${username}",\n    "email": "${email}",\n    "password": "${password}"\n  }\n}`;
  my_fetch("https://api.realworld.io/api/users", "POST", null, body);
  /*
  await fetch("https://api.realworld.io/api/users", {
    body: `{\n  "user": {\n    "username": "${username}",\n    "email": "${email}",\n    "password": "${password}"\n  }\n}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .catch((error) => console.log(error));
*/
  console.log("fetch operation of register request is completed");
};

///////////////////////////////// dude??????????????????

export const sendLoginRequest = async (email, password, setUser) => {
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
      } else {
        alert("Login request is failed. Please make sure you filled correctly");
      }
      return response;
    })
    .catch((error) => alert(error));

  console.log("fetch operation of login request is completed");

  // DONE --------------------------------------------------------------
  return response;
};

export const updateUser = (state, user, setUserState, password) => {
  console.log(state);
  console.log(user);
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

  console.log(body);
  console.log(user.token);
  console.log(JSON.stringify(body));
  const response = my_fetch(
    "https://api.realworld.io/api/user",
    "PUT",
    user.token,
    JSON.stringify(body)
  )
    .then((res) => res.json())
    //.then((res) => console.log(res))
    .catch((err) => console.log(err));

  // console.log(response);
  response.then((response) => {
    console.log(response);
    console.log(response.user);
    console.log(user);

    localStorage.setItem("user", JSON.stringify(response.user));
    setUserState(response.user);
  });
};
/*
export const GetCurrentUser = () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1c3VmZXJkZW1AZ21haWwuY29tIiwidXNlcm5hbWUiOiJzemVseSIsImlhdCI6MTY1OTk1NDE4MywiZXhwIjoxNjY1MTM4MTgzfQ.vgesFMfmZ_kP-BTAqbO25APyGoZLF6ssPEC208VqBuw"
  );
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inl1c3VmZXJkZW1AZ21haWwuY29tIiwidXNlcm5hbWUiOiJzemVseSIsImlhdCI6MTY1OTk1NDE4MywiZXhwIjoxNjY1MTM4MTgzfQ.vgesFMfmZ_kP-BTAqbO25APyGoZLF6ssPEC208VqBuw";
  my_fetch("https://api.realworld.io/api/user","GET", token)

  const response = fetch("https://api.realworld.io/api/user", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  return response;
};
*/

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
/*
let data = false;
export const getTags = (tagList, setTagList) => {
  
  return (
    my_fetch("https://api.realworld.io/api/tags", "GET")
      .then((response) => response.json())
      //.then((response) => console.log(response))
      .then((response) => {
        if (JSON.stringify(data) !== JSON.stringify(response)) {
          data = response;
          setTagList(response);
        }
        return response;
      })
      .catch((error) => console.log(error))
  );
};
export const readTags = () => {
  return data;
};
*/
