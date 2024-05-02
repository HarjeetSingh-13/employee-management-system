import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addloan, getWorker } from "../../api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function Workers() {
    const navigate = useNavigate()
  const params = useParams();
  const id = params.id;
  var todayDate = new Date().toLocaleDateString();
  const [loan, setLoan] = useState({
    date: todayDate,
    reason: "",
    amount: 0,
    id: id,
  });
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers", id],
    queryFn: getWorker,
  });
  const loanMutate = useMutation({
    mutationFn: addloan,
    onSuccess: ()=>{
      alert("Loan added successfully!");
      navigate(`/workerdetails/${id}`);
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loanMutate.mutate(loan);
  };
  const handleChange = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value,
    });
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
              <h3>Add Loan</h3>
              <form>
                <p>
                  <label htmlFor="reason">Reason</label>
                  <input
                    type="text"
                    name="reason"
                    id="reason"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <button onClick={handleSubmit}>Add</button>
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
        </div>
      </div>
    </>
  );
}

export default Workers;
