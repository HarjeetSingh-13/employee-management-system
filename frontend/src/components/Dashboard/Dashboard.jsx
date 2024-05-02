import { Link } from "react-router-dom";
import "./Dashboard.css";
import { getDashboardInfo, getWorkers } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

function Dashboard() {
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

  let ndata = data.slice(0, 5);
  var todayDate = new Date().toLocaleDateString();
  if (typeof dashboard === "undefined") return "loading...";
  return (
    <main>
      <h1>Dashboard</h1>

      <div className="date">{todayDate}</div>

      <div className="insights">
        <div className="attendance">
          <span className="material-symbols-outlined"> analytics </span>
          <div className="middle">
            <div className="left">
              <h3>Attendance</h3>
              <h1>{dashboard.attendance ? "Marked" : "Not Marked"}</h1>
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
              <h3>Total Remaining Salary</h3>
              <h1>{dashboard.totalRemainingPayment}</h1>
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
              <h1>{dashboard.totalLoan}</h1>
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
              <th>Pay Rate</th>
              <th></th>
            </tr>
          </thead>
          {ndata.map((data) => (
            <tbody>
              <tr>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td className="warning">{data.payRate}</td>
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
