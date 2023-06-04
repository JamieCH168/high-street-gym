import { API_URL } from "./api"



export async function createClass(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    //console.log(data);
    const response = await fetch(
        API_URL + "/class",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )
    const createClassResult = await response.json()
    return createClassResult
}

export async function getAllClasses() {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // GET from the API /classes
    const response = await fetch(
        API_URL + "/class",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.classes
}

export async function getClassByID(classID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(classID);
    const response = await fetch(
        API_URL + "/class/" + classID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.class
}

export async function getClassByActivityID(ActivityID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/class/activity/" + ActivityID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()
    //   console.log(APIResponseObject)
    return APIResponseObject.class
}


export async function update(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/class",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )

    const patchClassesResult = await response.json()

    return patchClassesResult
}

export async function deleteClassById(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(API_URL + "/class", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
      },
      body: JSON.stringify(data),
    });
    const deleteClassResponse = await response.json();
  
    return deleteClassResponse;
  }
  