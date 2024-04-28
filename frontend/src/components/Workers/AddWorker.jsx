import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import abc from "../../assets/abc.png";
import { Link, useNavigate } from "react-router-dom";
import { createWorker } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function Workers() {
  const navigate = useNavigate()
  const [worker, setWorker] = useState({
    name: "",
    phoneNumber: 0,
    age: 0,
    salary: 0,
  })
  const workerMutate = useMutation({
    mutationFn: createWorker,
    onSuccess: ()=>{
      navigate('/workers');
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    workerMutate.mutate(worker);
  };
  const handleChange = (e) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src={abc} alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Add Worker</h3>
              <form>
                <p>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" onChange={handleChange} />
                </p>
                <p>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" name="phoneNumber" id="phone" onChange={handleChange}/>
                </p>
                <p>
                  <label htmlFor="phone">Age</label>
                  <input type="text" name="age" id="phone"onChange={handleChange}/>
                </p>
                <p>
                  <label htmlFor="phone">Salary</label>
                  <input type="text" name="salary" id="phone"onChange={handleChange} />
                </p>
                <p>
                  <label htmlFor="photo">Profile Photo</label>
                  <input type="file" name="photo" id="photo" />
                </p>
                <p>
                  <button onClick={handleSubmit}>Add</button>
                </p>
              </form>
            </div>
            <p className="closebtn">
              <Link to={"/workers"}>
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
