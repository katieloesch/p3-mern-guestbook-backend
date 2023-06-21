import React from "react";

//Defines the Layout of the Post

export default function Post(props) {
  return (
    <div>
      <br />
      <div className="post border-4 border-lightpurple rounded-lg">
        <h3 className="font-bold mb-2 underline">{props.title}</h3>

        <p className="mb-3">{props.content}</p>
        <p className="mb-3">Author: {props.author}</p>
        <p>Entry ID: {props.id}</p>
        <br />
      </div>
    </div>
  );
}
