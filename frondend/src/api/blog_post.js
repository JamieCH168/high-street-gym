import { API_URL } from "./api"

export async function createBlog_post(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(data);
    const response = await fetch(
        API_URL + "/blog_post",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            
            },
            body: JSON.stringify(data)
        }
    )
    const createBlog_postResult = await response.json()
    return createBlog_postResult
}

export async function getAllBlog_posts() {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/blog_post",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blog_posts
}

export async function getBlog_postByID(blog_postID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/blog_post/" + blog_postID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.blog_post
}


export async function update(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(data);
    const response = await fetch(
        API_URL + "/blog_post",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            
            },
            body: JSON.stringify(data)
        }
    )

    const patchBlog_postsResult = await response.json()

    return patchBlog_postsResult
}

export async function deleteBlog_postById(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(data);
    const response = await fetch(API_URL + "/blog_post", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
    
      },
      body: JSON.stringify(data),
    });
    const deleteBlog_postResponse = await response.json();
  
    return deleteBlog_postResponse;
  }
  