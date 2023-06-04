import { API_URL } from "./api"

export async function createActivity(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/activity",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )
    const createActivityResult = await response.json()
    return createActivityResult
}

export async function getAllActivities() {
    const authenticationKey = localStorage.getItem("authenticationKey")

    const response = await fetch(
        API_URL + "/activity",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.activities
}

export async function getActivityByID(activityID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(activityID);
    const response = await fetch(
        API_URL + "/activity/" + activityID,
     
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()
    // console.log(APIResponseObject);
    
    return APIResponseObject.activity
}


export async function update(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/activity",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )

    const patchActivityResult = await response.json()

    return patchActivityResult
}

export async function deleteActivityById(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(API_URL + "/activity", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
      },
      body: JSON.stringify(data),
    });
    const deleteActivityResponse = await response.json();
  
    return deleteActivityResponse;
  }
  