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
  const workerMutate = useMutation({
    mutationFn: createWorker,
    onSuccess: () => {
      navigate("/workers");
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const photo = await upload(image);
      worker.photo = photo;
    }
    console.log(worker)
    workerMutate.mutate(worker);
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
                  <label htmlFor="phone">Salary</label>
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
