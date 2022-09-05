import React from "react";
import { Link } from "react-router-dom";

export const UserInfo = (props) => {
  //
  const author = props.author;
  const creation_date = props.createdAt.substring(0, 10);

  const link_addr = `../user/${author.username}`;

  return (
    <div className="article-preview-info">
      <Link to={link_addr}>
        <img
          className="user-image-small"
          src={author.image}
          alt="profile img"
        ></img>
      </Link>
      <div className="article-user">
        <Link to={link_addr} className="article-user-name">
          {author.username}
        </Link>
        <div className="article-date">{creation_date}</div>
      </div>
    </div>
  );
};
