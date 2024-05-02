import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link } from "react-router-dom";
import { getDashboardInfo, getWorkers, markAttendance } from "../../api/api";
import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function Attendance() {
  const queryClient = useQueryClient();
  const [attendance, setAttendance] = useState([]);
  const attendanceMutate = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      alert("attendance marked successfully");
      queryClient.invalidateQueries(getDashboardInfo);
    },
  });

  const {
    isLoading: workersLoading,
    isError: workersError,
    data: data,
    error: workersErrorObj,
  } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });

  const {
    isLoading: dashboardLoading,
    isError: dashboardError,
    data: dashboard,
    error: dashboardErrorObj,
  } = useQuery({
    queryKey: ["dashboardinfo"],
    queryFn: getDashboardInfo,
  });

  if (workersLoading || dashboardLoading) return "loading...";
  if (workersError || dashboardError)
    return `error: ${
      workersError ? workersErrorObj.message : dashboardErrorObj.message
    }`;

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
                </tr>
              </thead>
              {dashboard.attendance ? (
                <>
                  {data.map((worker) => (
                    <tbody>
                      <tr>
                        <td>{worker.name}</td>
                        <td className={worker.attendance[worker.attendance.length - 1]
                              .status === "present"?"success":"danger"}>
                          {
                            worker.attendance[worker.attendance.length - 1]
                              .status
                          }
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </>
              ) : (
                <>
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
                            <option
                              value="notmarked"
                              selected
                              className="primary"
                            >
                              Not Marked
                            </option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </>
              )}
            </table>
          </div>
        </div>
        {dashboard.attendance ? (
          <></>
        ) : (
          <div className="attendancesub">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Attendance;
