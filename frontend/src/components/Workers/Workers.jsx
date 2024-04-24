import List from "../List/List";
import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link } from "react-router-dom";

function Workers() {

  return (
    <>
      <div className="insights">
        <div className="middle">
            <div className="workers">
              <div className="wheader">
                <h2>Workers</h2>
                <Link to={"/addworker"}>
                <p>Add New Workers</p>
                </Link>
              </div>
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
                <List />
                <List />
                <List />
                <List />
                <List />
                <List />
                <List />
              </table>
            </div>
        </div>
      </div>
    </>
  );
}

export default Workers;
