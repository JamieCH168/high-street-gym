import { API_URL } from "./api"



export async function createBooking(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(data);
    const response = await fetch(
        API_URL + "/booking",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )
    const createBookingResult = await response.json()
    return createBookingResult
}

export async function getAllBookings() {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/booking",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.bookings
}

export async function getBookingByID(bookingID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/booking/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.booking
}


export async function getBookingByClassID(bookingID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/booking/class/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
        }
    )

    const APIResponseObject = await response.json()

    return APIResponseObject.booking
}

export async function getAllBookingByUserID(bookingID) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(bookingID)
    const response = await fetch(
        API_URL + "/booking/staff/" + bookingID,
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
    return APIResponseObject.bookings
}


export async function update(data) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    const response = await fetch(
        API_URL + "/booking",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': authenticationKey
            },
            body: JSON.stringify(data)
        }
    )

    const patchBookingsResult = await response.json()

    return patchBookingsResult
}

export async function deleteBookingById(bookingId) {
    const authenticationKey = localStorage.getItem("authenticationKey")
    // console.log(bookingId.booking_id);
    const response = await fetch(API_URL + "/booking", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        'Authorization': authenticationKey
      },
      body: JSON.stringify({ booking_id: bookingId.booking_id}),
    });
    const deleteBookingResponse = await response.json();
  
    return deleteBookingResponse;
  }
  