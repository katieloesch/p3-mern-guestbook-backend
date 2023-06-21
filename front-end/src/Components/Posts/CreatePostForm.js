import { useState, useEffect } from "react";
export default function CreatePostForm(props) {
  //CREATE A POST

  //Set up use state to display the form as needed

  const [showCreatePost, setShowCreatePost] = useState(false);

  //Define API

  const postAPI = function () {
    fetch("http://localhost:5000/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        author: props.author,
        title: props.title,
        content: props.content,
      }),
    })
      .then((data) => data.json())
      .then((posts) => console.log(posts));
  };

  //Ensure form not displayed after submit.

  function handleCreateFormSubmit(e) {
    e.preventDefault();
    setShowCreatePost(false);
    props.setShowDelete(true);
    props.setShowEdit(true);
    createPost();
    props.setTitle("");
    props.setAuthor("");
    props.setContent("");
  }

  //Run API if required fields present

  function createPost(e) {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }

  //Ensure not more API Calls made than necessary

  useEffect(function () {
    if (props.author !== "" && props.content !== "") {
      postAPI();
    }
  }, []);

  //Update the fields that will be used in the API based on what the user types in the input field.

  function changeAuthor(e) {
    e.preventDefault();
    props.setAuthor(e.target.value);
  }

  function changeTitle(e) {
    e.preventDefault();
    props.setTitle(e.target.value);
  }
  function changeContent(e) {
    e.preventDefault();
    props.setContent(e.target.value);
  }

  return (
    <>
      <button 
        className="font-bold bg-lightpurple px-1 text-xl border-2 border-lightpurple rounded-md"
        onClick={() => {
          setShowCreatePost(true);
          //Ensures Other Buttons / Sections Not displayed when the Create Form is Open
          props.setShowDelete(false);
          props.setShowEdit(false);
        }}
        style={{ display: showCreatePost ? "none" : "inline-block" }}
      >
        Add a Post
      </button>

      <form
        style={{ display: showCreatePost ? "inline-block" : "none" }}
        onSubmit={handleCreateFormSubmit}
      >
        <h2 className="font-bold text-xl pb-4">Add a Post</h2>
        <br />
        <label className="font-bold" for="author">
          Author
        </label>
        &nbsp; &nbsp;{" "}
        <input
          id="author"
          value={props.author}
          onChange={changeAuthor}
          required
        ></input>
        <br />
        <br />
        <label className="font-bold" for="title">
          Title
        </label>
        &nbsp; &nbsp;
        <input id="title" value={props.title} onChange={changeTitle}></input>
        <br />
        <br />
        <label className="font-bold" for="content">
          Content
        </label>
        &nbsp; &nbsp;
        <input
          id="content"
          value={props.content}
          onChange={changeContent}
          required
        ></input>
        <br />
        <br />
        <button  type="submit" onClick={handleCreateFormSubmit}>
          Cancel
        </button>
      </form>
    </>
  );
}
