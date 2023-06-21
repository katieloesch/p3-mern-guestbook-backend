import { useState, useEffect } from "react";

export default function DeletePostForm(props) {
  //DELETE POST

  //Set up use state to display the form as needed

  const [showDeletePost, setShowDeletePost] = useState(false);

  //Define API

  const deleteAPI = function () {
    fetch(`http://localhost:5000/posts/${props.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((posts) => console.log(posts));
  };

  //Ensure form not displayed after submit.

  function handleDeleteFormSubmit(e) {
    e.preventDefault();
    setShowDeletePost(false);
    props.setShowAdd(true);
    props.setShowEdit(true);
    props.setId("");
  }

  //Run API if required fields present

  function deletePost() {
    if (props.id !== "") {
      deleteAPI();
    }
  }

  //Ensure not more API Calls made than necessary

  useEffect(function () {
    if (props.id !== "") {
      deleteAPI();
    }
  }, []);

  //Update the fields that will be used in the API based on what the user types in the input field.

  function changeId(e) {
    e.preventDefault();
    props.setId(e.target.value);
  }

  return (
    <>
      <button
        className="font-bold bg-lightpurple px-1 text-xl border-2 border-lightpurple rounded-md"
        //Ensure Delete Form is displayed if the user clicks on the button
        //Ensure the Add Post and Edit Post Sections are not displayed when the user is editing
        onClick={() => {
          setShowDeletePost(true);
          props.setShowAdd(false);
          props.setShowEdit(false);
        }}
        //Ensure Button not displayed when the Delete Form is shown
        style={{ display: showDeletePost ? "none" : "inline-block" }}
      >
        Delete a Post
      </button>
      {/* Run handleFormSubmit Function, Ensure Delete Form is displayed if the user clicks on the button */}
      <form
        onKeyDown={deletePost}
        onSubmit={handleDeleteFormSubmit}
        style={{ display: showDeletePost ? "inline-block" : "none" }}
      >
        <h4>Delete Post</h4>
        <br />
        <label for="id">ID</label>
        &nbsp;&nbsp;
        {/* Here the user can type or paste the ID in the form that will reference the post to be deleted */}
        <input id="id" value={props.id} onChange={changeId} required></input>
        <br />
        <br />
        <button type="submit" onClick={handleDeleteFormSubmit}>
          Cancel
        </button>
      </form>
      <br />
      <br />
    </>
  );
}
