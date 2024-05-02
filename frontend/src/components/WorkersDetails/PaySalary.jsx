import "./WorkersDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { financialDetails, paySalary } from "../../api/api";
import { useState } from "react";

function PaySalary() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers", id],
    queryFn: financialDetails,
  });

  const [paymentInfo, setPaymentInfo] = useState({
    netSalary: 0,
    amount: 0,
    id: id,
  });

  const payMutate = useMutation({
    mutationFn: paySalary,
    onSuccess: () => {
      alert("Payment done successfully!");
      navigate(`/financialdetails/${id}`);
    },
  });
  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    payMutate.mutate(paymentInfo);
  };

  if (isLoading) return "loading...";
  if (isError) return `error: ${error.message}`;
  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src={data.photo} alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Pay Salary</h3>
              <form>
                <p>
                  <label htmlFor="name">Net Salary</label>
                  <input
                    type="text"
                    name="netSalary"
                    id="netSalary"
                    value={data.netSalary}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="phone">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <button onClick={handleSubmit}>Pay</button>
                </p>
              </form>
              {/* </p> */}
            </div>
            <p className="closebtn">
              <Link to={`/financialdetails/${id}`}>
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
export default PaySalary;
