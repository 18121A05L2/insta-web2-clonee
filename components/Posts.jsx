import React from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post.js"

export default function Posts({ USERS }) {
  return (
    <div className=" ">
      {USERS.map((user) => (
        <Post key={uuidv4()} user={ user} />
      ))}
    </div>
  );
}
