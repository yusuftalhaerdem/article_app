import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getComments,
  deleteComment,
  createComment,
} from "../actions/ApiActions";
import { selectLoginUrl } from "../features/navigationSlice";
import { selectUser } from "../features/userSlice";
import { UserInfo } from "./UserInfo";

export const CommentSection = (props) => {
  const navigate = useNavigate();
  const loginUrl = useSelector(selectLoginUrl);
  const user = useSelector(selectUser);
  const token = user.token;

  const slug = props.slug;
  const [comments, setComments] = useState(false);
  useEffect(() => getComments(slug, comments, setComments, token), [user]);
  //console.log(comments);

  // also, i may add info message to here. but im happy with it.
  const create_comment = (event) => {
    event.preventDefault();
    if (!user) navigate(loginUrl);
    const comment_text = document.getElementById("comment-text").value;
    createComment(slug, comment_text, token, comments, setComments);
  };
  const delete_comment = (e) => {
    const comment_id = e.target.getAttribute("value");
    deleteComment(slug, comment_id, token);
    // then, we update the state, removing the deleted item.
    const filtered_comments = comments.filter((current) => {
      if (current.id !== parseInt(comment_id)) return current;
    });
    setComments(filtered_comments);
  };

  // comments are kept inside the cards, this function returns them
  const cards = () => {
    return (comments || []).map((current, index, arr) => {
      return (
        <div className="comment-card" key={index}>
          <div className="comment">{current.body}</div>
          <div className="comment-user">
            <UserInfo
              author={current.author || "user"}
              createdAt={current.createdAt || "unknown date"}
            />

            {JSON.stringify(user.username) ===
            JSON.stringify(current.author.username) ? (
              <div
                className="delete-comment"
                onClick={delete_comment}
                value={current.id}
              >
                X
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="article-page-comments">
        <form id="comment-form" onSubmit={create_comment}>
          <textarea
            id="comment-text"
            className="input comment-box"
            placeholder="Write a comment"
          />
          <input
            type="submit"
            className="comment-submit"
            value="Post Comment"
          />
        </form>
        <div className="comments">{cards()}</div>
      </div>
    </>
  );
};
