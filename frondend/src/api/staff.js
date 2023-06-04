import { API_URL } from "./api"

// const authenticationKey = localStorage.getItem("authenticationKey")

export async function login(email, password) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/staff/login",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify({
                email,
                password,
            })
        },
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

export async function logout(authenticationKey) {
    // const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/staff/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify({
                authenticationKey
            })
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject
}

export async function getAllStaff() {
    const authenticationKey = localStorage.getItem("authenticationKey")

    // GET from the API /staff
    const response = await fetch(
        API_URL + "/staff",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.staff
}

export async function getStaffByID(staffID) {
    const authenticationKey = localStorage.getItem("authenticationKey")

    const response = await fetch(
        API_URL + "/staff/" + staffID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()
    return APIResponseObject.staff
}

export async function getByAuthenticationKey(authenticationKey) {
    // const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/staff/by-key/" + authenticationKey,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()
    return APIResponseObject.staff

}

export async function update(staff) {
    const authenticationKey = localStorage.getItem("authenticationKey")

    const response = await fetch(
        API_URL + "/staff",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(staff)
        }
    )

    const patchStaffResult = await response.json()

    return patchStaffResult
}

export async function registerStaff(staff) {
    const authenticationKey = localStorage.getItem("authenticationKey")

    const response = await fetch(
        API_URL + "/staff",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                // 'Authorization': authenticationKey
            },
            body: JSON.stringify(staff)
        }
    )
    const patchStaffResult = await response.json()
    // console.log(patchStaffResult)
    return patchStaffResult
}

export async function deleteStaffById(staff) {
    const authenticationKey = localStorage.getItem("authenticationKey")

    const response = await fetch(API_URL + "/staff", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
      },
      body: JSON.stringify(staff),
    });
    const deleteStaffResponse = await response.json();
  
    return deleteStaffResponse;
  }
  