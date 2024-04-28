import { Link } from "react-router-dom";
import List from "../List/List";
import "./Dashboard.css";
import { getWorkers } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });
  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;
  let ndata = data.slice(0, 5);
  var todayDate = new Date().toLocaleDateString();
  return (
    <main>
      <h1>Dashboard</h1>

      <div className="date">
        {todayDate}
      </div>

      <div className="insights">
        <div className="attendance">
          <span className="material-symbols-outlined"> analytics </span>
          <div className="middle">
            <div className="left">
              <h3>Attendance</h3>
              <h1>Marked</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 hours</small>
        </div>
        <div className="loan">
          <span className="material-symbols-outlined"> analytics </span>
          <div className="middle">
            <div className="left">
              <h3>Total Salary</h3>
              <h1>132476</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 hours</small>
        </div>
        <div className="salary">
          <span className="material-symbols-outlined"> analytics </span>
          <div className="middle">
            <div className="left">
              <h3>Total Loan</h3>
              <h1>132476</h1>
            </div>
            <div className="progress">
              <svg>
                <circle cx="38" cy="38" r="36"></circle>
              </svg>
              <div className="number">
                <p>81%</p>
              </div>
            </div>
          </div>
          <small className="text-muted">Last 24 hours</small>
        </div>
      </div>
      <div className="workers">
        <h2>Workers</h2>
        <table>
          <thead>
            <tr>
              <th>Worker ID</th>
              <th>Worker Name</th>
              <th>Salary</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          {ndata.map((data) => (
            <tbody>
              <tr>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.salary}</td>
                <td className="warning">Active</td>
                <td className="primary">
                  <Link to={`/workerdetails/${data._id}`}>Details</Link>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <a href="#">
          <Link to={"/workers"}>Show All</Link>
        </a>
      </div>
    </main>
  );
}

export default Dashboard;
