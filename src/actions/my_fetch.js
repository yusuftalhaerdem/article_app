export const my_fetch = (url, method = "GET", token = null, body = null) => {
  return basic_fetch(url, method, token, body)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};

export const fetch_update_state = (
  url,
  method = "GET",
  token = null,
  body = null,
  state = null,
  setState = null
) => {
  return basic_fetch(url, method, token, body)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      if (state === null) {
        //console.log(res);
      } else {
        // do state thing
        const responseObject = Object.values(res)[0];
        //console.log(responseObject);
        if (JSON.stringify(responseObject) !== JSON.stringify(state)) {
          setState(responseObject);
        }
      }
      return res;
    })
    .catch((err) => console.log(err));

  /**/
};

export const basic_fetch = (url, method = "GET", token = null, body = null) => {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    method: method,
    ...(body ? { body: body } : {}),
  });
};
