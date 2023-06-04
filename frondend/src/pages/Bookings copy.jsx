import React, { useEffect, useState } from "react";
import {
  createBooking,
  getAllBookings,
  getBookingByID,
  update,
  deleteBookingById
} from "../api/bookings";
import { getAllClasses } from "../api/classes";
import { getAllStaff } from "../api/staff";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DeleteHandler from "../components/DeleteHandler"

export default function bookingCRUD() {

  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const [booking, setBooking] = useState([]);
  const [classData, setClassData] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedBookingID, setSelectedBookingID] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState({
    booking_id: "",
    booking_user_id: "",
    booking_class_id: "",
    booking_created_date: "",
    booking_created_time: "",
  });

  useEffect(() => {
    getAllClasses().then((data) =>
      setClassData(data)
    );
  }, []);

  useEffect(() => {
    getAllStaff().then((data) => {
      const filteredData = data.filter((staff) => staff.staff_access_role === 'member');
      setStaff(filteredData);
    })
  }, []);

  useEffect(() => {
    getAllBookings().then((data) =>
      setBooking(data)
      // setBooking(prevBookings => [...prevBookings, ...data.map(booking => ({
      //   ...booking,
      //   booking_created_date: new Date(booking.booking_created_date).toLocaleDateString()
      // }))]
      // )

    );
  }, [selectedBookingID]);

  useEffect(() => {

    if (selectedBookingID) {
      getBookingByID(selectedBookingID).then((data) => {
        setSelectedBooking(data);
      });
    } else {
      setSelectedBooking({
        booking_id: "",
        booking_user_id: "",
        booking_class_id: "",
        booking_created_date: "",
        booking_created_time: "",
      });
    }
  }, [selectedBookingID]);

  function createOrUpdateSelectedBooking() {
    if (selectedBookingID) {
      update({
        ...selectedBooking, booking_user_id: selectedBooking.booking_user_id.toString(), booking_class_id: selectedBooking.booking_class_id.toString(),
      })
        .then((updateBooking) => {
          setSelectedBookingID(null);
          setSelectedBooking({
            booking_id: "",
            booking_user_id: "",
            booking_class_id: "",
            booking_created_date: "",
            booking_created_time: "",
          });
        });
    } else {
      // console.log(selectedBooking)
      //    console.log({
      //   ...selectedBooking,booking_user_id:Number(selectedBooking.booking_user_id),booking_class_id:Number(selectedBooking.booking_class_id)
      // })

      createBooking(
        selectedBooking
        // {
        //   ...selectedBooking,booking_user_id:Number(selectedBooking.booking_user_id),booking_class_id:Number(selectedBooking.booking_class_id)
        // }
      ).then((createdBooking) => {
        // setSelectedBookingID(createdBooking.booking_id);
        setSelectedBooking({
          booking_id: "",
          booking_user_id: "",
          booking_class_id: "",
          booking_created_date: "",
          booking_created_time: "",
        });
        getAllBookings().then((data) =>
          setBooking(data)
        );
      });
    }
  }
  const deleteSelectedBooking = () => {
    if (selectedBooking) {
      // console.log(selectedBooking)

      deleteBookingById(selectedBooking).then((result) => {
        setSelectedBookingID(null);
        setSelectedBooking({
          booking_id: "",
          booking_user_id: "",
          booking_class_id: "",
          booking_created_date: "",
          booking_created_time: "",
        });
      });
      cancelConfirmHandler()
    } else {
      cancelConfirmHandler()
    }
  }

  return (

    <div className="flex flex-col min-h-screen bg-emerald-100 ">
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedBooking}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center">Booking CRUD</h1>
      <div className="grow grid grid-cols-1 xl:grid-cols-2 justify-items-center w-8/12 mx-auto gap-4 pb-4">
        <div className="w-full overflow-auto rounded border-2 border-primary p-2 " >
          <table className="w-full table table-compact text-center " >
            <thead >
              <tr >
                <th className="bg-emerald-100">ID</th>
                <th className="bg-emerald-100">User Id</th>
                <th className="bg-emerald-100">Class Id</th>
                <th className="bg-emerald-100">Date</th>
                <th className="bg-emerald-100">Time</th>
                <th className="bg-emerald-100">Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((data) => (
                <tr key={data.booking_id} >
                  <td style={{ backgroundColor: 'var(--tw-bg-emerald-100)' }}>{data.booking_id}</td>
                  <td className="bg-emerald-100">{data.booking_user_id}</td>
                  <td className="bg-emerald-100">{data.booking_class_id}</td>
                  <td style={{ backgroundColor: 'var(--tw-bg-emerald-100)' }}>{data.booking_created_date}</td>
                  <td className="bg-emerald-100">{data.booking_created_time}</td>
                  <td className="bg-emerald-100">
                    <button
                      className="btn btn-xs"
                      onClick={() => setSelectedBookingID(data.booking_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full rounded border-2 border-primary p-2 ">
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID:</span>
            </label>
            <input
              type="text"
              readonly
              className="input input-bordered bg-emerald-100"
              value={selectedBooking.booking_id}
            />
          </div>

          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">booking_user_id:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              // value={selectedBooking.booking_user_id ? Number(selectedBooking.booking_user_id) : ""}
              value={selectedBooking.booking_user_id}
              onChange={(e) => {
                setSelectedBooking({ ...selectedBooking, booking_user_id: e.target.value });
              }}
            />
          </div> */}

          <div className="form-control" >
            <label className="label">
              <span className="label-text">booking_user_id:</span>
            </label>
            <select
              className="input input-bordered bg-emerald-100"
              value={selectedBooking.booking_user_id}
              onChange={(e) => {
                setSelectedBooking({ ...selectedBooking, booking_user_id: e.target.value });
              }}
            >
              {/* <option disabled selected>Pick one</option> */}
              <option value="" >-- Select a user ID --</option>
              {staff.map(option => (
                <option key={option.staff_id} value={option.staff_id}>{option.staff_id}</option>
              ))}
            </select>
          </div>

          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">booking_class_id:</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              // value={selectedBooking.booking_class_id ? parseInt(selectedBooking.booking_class_id) : ""}
              value={selectedBooking.booking_class_id}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, booking_class_id: e.target.value })
              }
            />
          </div> */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">booking_class_id:</span>
            </label>
            <select
              className="input input-bordered bg-emerald-100"
              value={selectedBooking.booking_class_id}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, booking_class_id: e.target.value })
              }
            >
              {/* <option disabled selected>Pick one</option> */}
              <option value="" >-- Select a class ID --</option>
              {classData.map(option => (
                <option key={option.class_id} value={option.class_id}>{option.class_id}</option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">booking_created_date:</span>
            </label>
            <input
              type="text"
              // readonly
              disabled
              className="input input-bordered bg-emerald-100"

              value={selectedBooking.booking_created_date}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, booking_created_date: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">booking_created_time:</span>
            </label>
            <input
              type="text"
              readonly
              disabled
              className="input input-bordered"
              value={selectedBooking.booking_created_time}
              onChange={(e) =>
                setSelectedBooking({ ...selectedBooking, booking_created_time: e.target.value })
              }
            />
          </div>

          <div className="pt-2 flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedBookingID(null);
                setSelectedBooking({
                  booking_id: "",
                  booking_user_id: "",
                  booking_class_id: "",
                  booking_created_date: "",
                  booking_created_time: "",
                });
              }}
            >
              New
            </button>
            <button
              className="btn"
              onClick={() => createOrUpdateSelectedBooking()}
            >
              Save
            </button>{" "}
            <button
              className="btn btn-secondary"
              onClick={showConfirmHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
