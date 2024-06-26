import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link } from "react-router-dom";
import { getWorkers } from "../../api/api";
import { useQuery } from "@tanstack/react-query";

function Workers() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers"],
    queryFn: getWorkers,
  });
  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;

  return (
    <>
      <div className="middle">
        <div className="workers">
          <div className="wheader">
            <h1>Workers</h1>
            <Link to={"/addworker"}>
              <p>Add New Workers</p>
            </Link>
          </div>
          <div className="insights">
            <table>
              <thead>
                <tr>
                  <th>Worker ID</th>
                  <th>Worker Name</th>
                  <th>Pay Rate</th>
                  <th></th>
                </tr>
              </thead>
              {data.map((data) => (
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Workers;
