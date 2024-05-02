import "./Workers.css";
import "../WorkersDetails/WorkersDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { createWorker } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import upload from "../../upload.js";

function Workers() {
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [worker, setWorker] = useState({
    name: "",
    phoneNumber: 0,
    age: 0,
    salary: 0,
    photo: "",
  });

  const check = () => {
    var a = worker.name;
    if (a == "") {
      alert("name should not be empty");
      return false;
    } else if (a.length < 5) {
      alert("Length of name should not be less than 5");
      return false;
    } else if (!isNaN(a)) {
      alert("name should not be a number");
      return false;
    }

    var b = worker.phoneNumber;
    if (b == "") {
      alert("Phone number should not be empty");
      return false;
    } else if (isNaN(b)) {
      alert("Phone number must be a number");
      return false;
    } else if (b.length < 10) {
      alert("Length of Phone number should not be less than 10");
      return false;
    }

    var c = worker.age;
    if (c == "") {
      alert("Age should not be empty");
      return false;
    } else if (isNaN(c)) {
      alert("Age must be a number");
      return false;
    }

    var d = worker.salary;
    if (d == "") {
      alert("Pay Rate should not be empty");
      return false;
    } else if (isNaN(d)) {
      alert("Pay Rate must be a number");
      return false;
    }
    return true;
  };

  const workerMutate = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      alert("worker added successfully!");
      navigate("/workers");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const photo = await upload(image);
      worker.photo = photo;
    }
    let f = check();
    if (f) {
      workerMutate.mutate(worker);
    }
  };
  const handleChange = (e) => {
    setWorker({
      ...worker,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src="" alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Add Worker</h3>
              <form>
                <p>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phone"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="phone">Age</label>
                  <input
                    type="text"
                    name="age"
                    id="phone"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="phone">Pay Rate</label>
                  <input
                    type="text"
                    name="salary"
                    id="phone"
                    onChange={handleChange}
                  />
                </p>
                <p>
                  <label htmlFor="photo">Profile Photo</label>
                  <input
                    type="file"
                    name="photo"
                    id="photo"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {/* <button onClick={handleImage}>Upload Image</button> */}
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
