import List from "../List/List";
import "./Dashboard.css";

function Dashboard() {
  return (
    <main>
      <h1>Dashboard</h1>

      <div className="date">
        <input type="date" name="" id="" />
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
        <h2>workers</h2>
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
          <List />
          <List />
          <List />
          <List />
          <List />
        </table>

        <a href="#">Show All</a>
      </div>
    </main>
  );
}

export default Dashboard;
