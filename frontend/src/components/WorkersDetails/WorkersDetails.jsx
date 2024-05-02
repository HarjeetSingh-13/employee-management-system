import "./WorkersDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { deleteWorker, getWorker, updateAttendance } from "../../api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";

function WorkersDetails() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [updatePanel, setUpdatePanel] = useState(false);
  const [attendance, setAttendance] = useState();
  const params = useParams();
  const id = params.id;
  const updateAttendanceMutate = useMutation({
    mutationFn: updateAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries(workers);
    },
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers", id],
    queryFn: getWorker,
  });

  const deleteMutate = useMutation({
    mutationFn: deleteWorker,
    onSuccess: () => {
      navigate("/workers");
    },
  });
  const handleDelete = () => {
    // e.preventDefault();
    deleteMutate.mutate(id);
  };
  const handleChange = (e) => {
    setAttendance(e.target.value);
  };
  const handlePanel = (e, udate) => {
    if (updatePanel === true) {
      const worker = {
        id: id,
        date: udate,
        status: attendance,
      };
      updateAttendanceMutate.mutate(worker);
    }
    setUpdatePanel(true);
  };
  const closePanel = () => {
    setUpdatePanel(false);
  };
  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;
  if (typeof data.attendance === "undefined") return "loading...";
  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src={data.photo} alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Workers Information</h3>
              <p>{data.name}</p>
              <p>Phone Number: {data.phoneNumber}</p>
              <p>Age: {data.age}</p>
              <p>Pay Rate: {data.payRate}</p>
              <p className="btns">
                <Link to={`/updateworker/${id}`}>
                  <button>Update</button>
                </Link>
                <Link to={`/financialdetails/${id}`}>
                  <button>Financial Details</button>
                </Link>
                <Link to={`/addloan/${id}`}>
                  <button>Add Loan</button>
                </Link>
                <p className="deletebtn" onClick={handleDelete}>
                  Remove Worker
                </p>
              </p>
            </div>
            <div className="details-close-btn">
              <p className="closebtn">
                <Link to={"/workers"}>
                  <button>
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
          <h2>Attendance</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>
                  {updatePanel === false ? "Attendance" : "Set Attendance"}
                </th>
                  <th
                    className="primary updateAttendancebtn"
                    onClick={(event) => handlePanel(event, data.date)}
                  >
                    Update
                  </th>
                  {updatePanel === false ? (
                    <></>
                  ) : (
                    <th
                      className="danger cancelUpdateAttendancebtn"
                      onClick={closePanel}
                    >
                      Cancel
                    </th>
                  )}
              </tr>
            </thead>
            {data.attendance.map((data) => (
              <tbody>
                <tr>
                  <td>{data.date}</td>
                  <td className="warning">
                    {updatePanel === false ? (
                      data.status
                    ) : (
                      <select
                        name="status"
                        onChange={handleChange}
                        className="warning"
                      >
                        <option value="present" className="success">
                          Present
                        </option>
                        <option value="absent" className="danger">
                          Absent
                        </option>
                        <option value="notmarked" selected className="primary">
                          Not Marked
                        </option>
                      </select>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
export default WorkersDetails;
