import "./WorkersDetails.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {  useQuery } from "@tanstack/react-query";
import { financialDetails} from "../../api/api";

function FinancialDetails() {
  const params = useParams();
  const id = params.id;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers", id],
    queryFn: financialDetails,
  });

  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;
  if (typeof data.loanRecord === "undefined") return "loading...";
  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src={data.photo} alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Financial Details</h3>
              <form>
                <p>
                  <label htmlFor="name">Working Days</label>
                  <div className="warning">{data.workingdays}</div>
                </p>
                <p>
                  <label htmlFor="phone">Salary</label>
                  <div className="success">₹{data.salary}</div>
                </p>
                <p>
                  <label htmlFor="phone">Loan</label>
                  <div className="danger">₹{data.loan}</div>
                </p>
                <p>
                  <label htmlFor="phone">Previous Remaining Salary</label>
                  <div className="primary">₹{data.prevRemainingSalary}</div>
                </p>
                <p>
                  <label htmlFor="phone">Net Salary</label>
                  <div className="primary">₹{data.netSalary}</div>
                </p>
              </form>
            </div>
            <p className="closebtn">
              <Link to={`/workerdetails/${id}`}>
                <button>
                  <span className="material-symbols-outlined">close</span>
                </button>
              </Link>
            </p>
          </div>
          <h2>Loan Record</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Reason</th>
                <th>Amount</th>
              </tr>
            </thead>
            {data.loanRecord.map((data) => (
              <tbody>
                <td>{data.date}</td>
                <td>{data.reason}</td>
                <td>₹{data.amount}</td>
              </tbody>
            ))}
          </table>
          <div className="paybtn">
            <Link to={`/paysalary/${id}`}>
              <button>Pay Salary</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default FinancialDetails;
