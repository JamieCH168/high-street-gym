import { useEffect, useState } from "react";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DeleteHandler from "../components/DeleteHandler"
import {
  getAllStaff,
  getStaffByID,
  update,
  registerStaff,
  deleteStaffById
} from "../api/staff.js";

export default function StaffCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");


  const handleSelectClick = (data) => {
    setSelectedStaffID(data)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    createOrUpdateSelectedStaff()
    setIsModalOpen(false);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {

    setShowConfirm(false);
  };
  const [staff, setStaff] = useState([]);
  const [selectedStaffID, setSelectedStaffID] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState({
    staff_id: "",
    staff_email: "",
    staff_password: "",
    staff_access_role: "",
    staff_phone: "",
    staff_first_name: "",
    staff_last_name: "",
    staff_address: "",
    staff_authentication_key: ""
  });

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    getAllStaff().then((staff) => {
      let sortedStaff = [...staff];

      if (sortColumn === "id") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.staff_id) - parseInt(b.staff_id);
          } else {
            return parseInt(b.staff_id) - parseInt(a.staff_id);
          }
        });
      } else if (sortColumn === "email") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.staff_email.localeCompare(b.staff_email);
          } else {
            return b.staff_email.localeCompare(a.staff_email);
          }
        });
      } else if (sortColumn === "role") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.staff_access_role.localeCompare(b.staff_access_role);
          } else {
            return b.staff_access_role.localeCompare(a.staff_access_role);
          }
        });
      }
      else if (sortColumn === "phone") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.staff_phone.localeCompare(b.staff_phone);
          } else {
            return b.staff_phone.localeCompare(a.staff_phone);
          }
        });
      }
      else if (sortColumn === "firstName") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.staff_first_name.localeCompare(b.staff_first_name);
          } else {
            return b.staff_first_name.localeCompare(a.staff_first_name);
          }
        });
      }
      else if (sortColumn === "lastName") {
        sortedStaff.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.staff_last_name.localeCompare(b.staff_last_name);
          } else {
            return b.staff_last_name.localeCompare(a.staff_last_name);
          }
        });
      }


      setStaff(sortedStaff);
    });
  }, [sortColumn, sortOrder, selectedStaffID]);


  useEffect(() => {

    if (selectedStaffID) {
      getStaffByID(selectedStaffID).then((user) => {
        setSelectedStaff(user);
      });
    } else {
      setSelectedStaff({
        staff_id: "",
        staff_email: "",
        staff_password: "",
        staff_access_role: "",
        staff_phone: "",
        staff_first_name: "",
        staff_last_name: "",
        staff_address: "",
        staff_authentication_key: ""
      });
    }
  }, [selectedStaffID]);

  function createOrUpdateSelectedStaff() {
    if (selectedStaffID) {
      update(selectedStaff).then((updateStaff) => {
        // console.log(selectedStaff)
        setSelectedStaffID(null);
        setSelectedStaff({
          staff_id: "",
          staff_email: "",
          staff_password: "",
          staff_access_role: "",
          staff_phone: "",
          staff_first_name: "",
          staff_last_name: "",
          staff_address: "",
          staff_authentication_key: ""
        });
      });
    } else {
      registerStaff(selectedStaff).then((createdStaff) => {
        setSelectedStaff({
          staff_id: "",
          staff_email: "",
          staff_password: "",
          staff_access_role: "",
          staff_phone: "",
          staff_first_name: "",
          staff_last_name: "",
          staff_address: "",
          staff_authentication_key: ""
        });

        getAllStaff().then((staff) =>
          setStaff(staff));
      }, []);
    }
  }
  const deleteSelectedStaff = () => {
    deleteStaffById(selectedStaff).then((result) => {
      setSelectedStaffID(null);
      setSelectedStaff({
        staff_id: "",
        staff_email: "",
        staff_password: "",
        staff_access_role: "",
        staff_phone: "",
        staff_first_name: "",
        staff_last_name: "",
        staff_address: "",
        staff_authentication_key: ""
      });
    });
    cancelConfirmHandler()
    handleCloseModal()
  }


  return (
    <div className="flex flex-col min-h-screen bg-emerald-100 ">
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedStaff}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav />

      <h1 className="text-5xl font-bold my-6 text-center">User List</h1>
      <h2 className="text-3xl font-bold my-6 text-center">Our success is a reflection of our team's hard work and dedication.</h2>

      <div className=" grow grid grid-cols-1 xl:grid-cols-1 my-10 mx-auto justify-items-center gap-10 w-8/12 ">
        <div className="overflow-auto w-full rounded p-2 my-4 " style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
          <table className="table table-compact w-full">
            <thead>
              {!isModalOpen && (
                <tr>
                  <th
                    className="w-[7%] bg-emerald-100 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("id")} >
                    <span>ID</span>
                    {sortColumn === 'id' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[25%] bg-emerald-100 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("email")} >
                    <span> Email </span>
                    {sortColumn === 'email' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[15%] bg-emerald-100 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("role")} >
                    <span> Role</span>
                    {sortColumn === 'role' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("phone")} >
                    <span> Phone </span>
                    {sortColumn === 'phone' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("firstName")} >
                    <span> First Name </span>
                    {sortColumn === 'firstName' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("lastName")} >
                    <span> Last Name </span>
                    {sortColumn === 'lastName' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="bg-emerald-100 " >Status</th>
                </tr>)}
            </thead>
            <tbody>
              {staff.map((staff) => (
                <tr key={staff.staff_id}>
                  <td className="bg-emerald-100">{staff.staff_id}</td>
                  <td className="bg-emerald-100">{staff.staff_email}</td>
                  <td className="bg-emerald-100">{staff.staff_access_role}</td>
                  <td className="bg-emerald-100">{staff.staff_phone}</td>
                  <td className="bg-emerald-100">{staff.staff_first_name}</td>
                  <td className="bg-emerald-100">{staff.staff_last_name}</td>
                  <td className="bg-emerald-100">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedStaffID(staff.staff_id)}
                      onClick={() => handleSelectClick(staff.staff_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {isModalOpen && (

          <div className="w-full rounded p-2 my-4
          fixed inset-0 bg-[#000] 
        text-3xl m-auto flex justify-evenly items-center z-10"
            style={{ position: "fixed" }}
            onClick={() => handleCloseModal()}>

            <div className="w-8/12" onClick={(e) => e.stopPropagation()}>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_id}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Email:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_email}
                  onChange={(e) => {
                    setSelectedStaff({ ...selectedStaff, staff_email: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Password:</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_password}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_password: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Role:</span>
                </label>
                <select
                  className="select select-bordered"
                  value={selectedStaff.staff_access_role}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_access_role: e.target.value })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select an role --</option>
                  <option value="admin">admin</option>
                  <option value="trainer">trainer</option>
                  <option value="member">member</option>
                </select>
              </div>


              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Phone:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_phone}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_phone: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">First Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_first_name}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_first_name: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Last Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_last_name}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_last_name: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Address:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedStaff.staff_address}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, staff_address: e.target.value })
                  }
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedStaffID(null);
                    setSelectedStaff({
                      staff_id: "",
                      staff_email: "",
                      staff_password: "",
                      staff_access_role: "",
                      staff_phone: "",
                      staff_first_name: "",
                      staff_last_name: "",
                      staff_address: "",
                      staff_authentication_key: ""
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn"
                  // onClick={() => createOrUpdateSelectedStaff()}
                  onClick={handleSaveClick}
                >
                  Save
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  // onClick={() => deleteSelectedStaff()}
                  onClick={showConfirmHandler}
                >
                  Delete
                </button>
              </div>

            </div>




          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
