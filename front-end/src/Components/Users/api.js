//retrieve all user documents from collection
export const getAllUsers = async () => {
    return fetch('http://localhost:5000/users')
}

//select one user document (by user id)
export const getOneUser = async (id) => {
    return fetch(`http://localhost:5000/users/${id}`)
}

//create a new user document
export const createNewUser = async (newUser) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newUser)
    };

    const url = 'http://localhost:5000/users'
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

//delete a user document (by user id)
export const deleteOneUser = async (id) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }};

    const url = `http://localhost:5000/users/${id}`
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

//Update one user document (by user id)
export const updateOneUser = async (update, id) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(update)
    };
    const url = `http://localhost:5000/users/${id}`
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response.json();
}

//get all post documents linked to a user (by user id)
export const getUserPosts = (id) => {
    return fetch(`http://localhost:5000/users/${id}/posts`)
}

//get a post document (by post id) linked to a user (by user id)
export const getOneUserPost = (id, postId) => {
    return fetch(`http://localhost:5000/users/${id}/posts/${postId}`)
}

//create a new post document linked to a user (by user id)
export const createNewUserPost = async (userId, newPost) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newPost)
    };

    const url = `http://localhost:5000/users/${userId}/posts`
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

//delete a post document (by post id) linked to a user (by user id)
export const deleteOneUserPost = async (userId, postId) => {
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }};

    const url = `http://localhost:5000/users/${userId}/posts/${postId}`
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

//update a post document (by post id) linked to a user (by user id)
export const updateOneUserPost = async (userId, postId, update) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(update)
    }
    const url = `http://localhost:5000/users/${userId}/posts/${postId}`
    
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}


//access a protected route when selecting a user document of by username + password
export const findOnLogIn = async (loginData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(loginData)
    };

    const url = 'http://localhost:5000/users/login'
    const response = await fetch(url, fetchOptions);
    return response.json();
}

//access a protected route when accessing user document
export const getToAccountPage = async (id, token) => {
    const url = `http://localhost:5000/users/${id}/account`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

//access a protected route when deleting a user document
export const getToDeleteAccountPage = async (id, token) => {
    const url = `http://localhost:5000/users/${id}/account/delete`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    } 
}

//access a protected route when updating a user document
export const getToUpdateAccountPage = async (id, token) => {
    const url = `http://localhost:5000/users/${id}/account/update`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    }
}

//access a protected route when updating password in a user document
export const getToUpdatePasswordPage = async (id, token) => {
    const url = `http://localhost:5000/users/${id}/account/update/password`
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token.token 
    }}

    try {
        const response = await fetch(url, fetchOptions);
        const data = await response.json()
        return data
    } catch(error) {
        console.log(error)
    } 
}