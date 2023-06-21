import { useState, useEffect } from "react";

export default function UpdatePostForm(props) {
  //EDIT A POST

  //parameters defined to only show Edit Form if edit selected

  const [showEditPost, setShowEditPost] = useState(false);

  //Define API

  const updateAPI = function () {
    if (props.idUpdate) props.setIdUpdate(props.idUpdate);
    console.log(
      "in update, id, auth, title",
      props.id,
      props.author,
      props.title
    );
    fetch(`http://localhost:5000/posts/${props.idUpdate}`, {
      method: "put",
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

  function handleEditFormSubmit(e) {
    e.preventDefault();
    setShowEditPost(false);
    //Show Other Post Buttons After the Form has been Submitted
    props.setShowDelete(true);
    props.setShowAdd(true);
    editPost();
    props.setIdUpdate("");
    props.setAuthor("");
    props.setTitle("");
    props.setContent("");
  }

  //Run API if required fields present

  function editPost() {
    if (props.author !== "" && props.content !== "") {
      updateAPI();
    }
  }

  //Ensure not more API Calls made than necessary

  useEffect(function () {
    if (props.id !== "") {
      updateAPI();
    }
  }, []);

  //Update the fields that will be used in the API based on what the user types in the input field.

  function changeUpdateId(e) {
    e.preventDefault();
    props.setIdUpdate(e.target.value);
  }

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
        //Ensure Edit Form is displayed if the user clicks on the button
        //Ensure the Delete and Add Sections are not displayed when the user is editing
        onClick={() => {
          setShowEditPost(true);
          props.setShowDelete(false);
          props.setShowAdd(false);
        }}
        //Ensure Button not displayed when the Edit Form is shown
        style={{ display: showEditPost ? "none" : "inline-block" }}
      >
        Edit a Post
      </button>
      {/* Run handleFormSubmit Function, Ensure Edit Form is displayed if the user clicks on the button */}
      <form
        onSubmit={handleEditFormSubmit}
        style={{ display: showEditPost ? "inline-block" : "none" }}
      >
        <h4>Edit a Post</h4>
        <br />
        <label for="idUpdate">ID</label>
        &nbsp; &nbsp;
        {/* Here the user can type or paste the ID in the form that will reference the post to be edited*/}
        <input
          id="idUpdate"
          value={props.updateId}
          onChange={changeUpdateId}
          required
        ></input>
        <br />
        <br />
        <label for="author">Author</label>
        &nbsp; &nbsp;
        <input
          id="author"
          value={props.author}
          onChange={changeAuthor}
          required
        ></input>
        <br />
        <br />
        <label for="updateTitle">Title</label>
        &nbsp; &nbsp;
        <input
          id="updateTitle"
          value={props.title}
          onChange={changeTitle}
        ></input>
        <br />
        <br />
        <label for="updateContent">Content</label>
        &nbsp; &nbsp;
        <input
          id="updateContent"
          value={props.content}
          onChange={changeContent}
          required
        ></input>
        <br />
        <br />
        <button type="submit" onClick={handleEditFormSubmit}>
          Cancel
        </button>
        <br />
      </form>
    </>
  );
}
