// import List from "../List/List";
import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link } from "react-router-dom";
import { getWorkers, markAttendance } from "../../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const attendanceMutate = useMutation({
    mutationFn: markAttendance,
    // onSuccess: () => {
    //   navigate("/home");
    // },
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });
  
  var todayDate = new Date().toLocaleDateString();
  
  const handleInput = (e, w) => {
    setAttendance([
      ...attendance,
      {
        status: e.target.value,
        id: w,
        date: todayDate,
      },
    ]);
  };

  function getUnique(array, key) {
    if (typeof key !== "function") {
      const property = key;
      key = function (item) {
        return item[property];
      };
    }
    return Array.from(
      array
      .toReversed()
      .reduce(function (map, item) {
        const k = key(item);
        if (!map.has(k)) map.set(k, item);
        return map;
      }, new Map())
      .values()
    );
  }
  
  const handleSubmit = () => {
    const res = getUnique(attendance, "id");
    res.map((e) => {
      attendanceMutate.mutate(e);
    });
  };
  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;
  return (
    <>
      <div className="middle">
        <div className="workers">
          <div className="wheader">
            <h1>Attendance</h1>
            <p>{todayDate}</p>
          </div>
          <div className="insights">
            <table>
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Attendance</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              {data.map((worker) => (
                <tbody>
                  <tr>
                    <td>{worker.name}</td>
                    <td className="warning">
                      <select
                        name="status"
                        className="warning"
                        onChange={(event) => handleInput(event, worker._id)}
                        
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
                    </td>
                    {/* <td className="primary">
                      <Link to={`/workerdetails/${worker._id}`}>Update</Link>
                    </td> */}
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
        <div className="attendancesub">
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default Attendance;
