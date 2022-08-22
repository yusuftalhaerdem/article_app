import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getComments,
  deleteComment,
  createComment,
} from "../actions/ApiActions";
import { selectUser } from "../features/userSlice";
import { UserInfo } from "./UserInfo";

export const CommentSection = (props) => {
  const user = useSelector(selectUser);
  const token = user.token;

  const slug = props.slug;
  const [comments, setComments] = useState(false);
  useEffect(() => getComments(slug, comments, setComments, token), []);
  //getComments(slug, comments, setComments, token);
  console.log(comments);

  const handleComment = (event) => {
    event.preventDefault();
    const comment_text = document.getElementById("comment-text").value;
    console.log(comment_text);
    createComment(slug, comment_text, token, comments, setComments);
    // setComments(comments.push(createComment));
    // console.log(comment_text);
  };
  const delete_comment = (e) => {
    const comment_id = e.target.getAttribute("value");
    deleteComment(slug, comment_id, token);
    // then, we update the state, removing the deleted item.
    const filtered_comments = comments.filter((current, index) => {
      if (current.id !== parseInt(comment_id)) return current;
    });
    setComments(filtered_comments);
  };
  const cards = () => {
    //console.log(comments);
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
        <form id="comment-form" onSubmit={handleComment}>
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
