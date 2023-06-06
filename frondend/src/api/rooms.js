import { API_URL } from "./api"



export async function createRoom(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/room",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )
    const createRoomResult = await response.json()
    return createRoomResult
}

export async function getAllRooms() {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/room",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.rooms
}

export async function getRoomByID(roomID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(roomID);
    const response = await fetch(
        API_URL + "/room/" + roomID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.room
}


export async function update(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/room",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )

    const patchRoomsResult = await response.json()

    return patchRoomsResult
}

export async function deleteRoomById(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(API_URL + "/room", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
      },
      body: JSON.stringify(data),
    });
    const deleteRoomResponse = await response.json();
  
    return deleteRoomResponse;
  }
  