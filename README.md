# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm i`

### `npm start`

commands. This will make the app run on your local machine(by default, at port 3000).

This app clone of `https://demo.realworld.io/`. You can visit their website and may try your clone as well.
You may visit their github page `https://github.com/gothinkster/realworld` for better understanding.
I used `https://api.realworld.io/api-docs/` api for backend requests, which uses swagger.

Note: I am currently working this project so there may be some uncompleted updates in the project.

I want to explain my goals in this project.

I want to create seamless experience for user. so in most of the requests, client changes state as that
action actually happened. then api request will follow the state change. in the case fail of request,
we will update the state to previous state, giving an error to user.

I wanted to keep articles in the states, so user can return to previous page quickly. To achieve this,
I kept the articles in the state, whenever user switch page or article tab, previous article content
will be kept. when user return the prev page, it will be restored from cache. then api request will
follow this as well. if content has been changed, state will updated accordingly. this may result
with some unpossible requests to be sent to api but since it is couple seconds, yet this can be ignored.
