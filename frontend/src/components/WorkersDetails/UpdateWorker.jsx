import "./WorkersDetails.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getWorker, updateWorker } from "../../api/api";
import { useState } from "react";
import upload from "../../upload.js";

function WorkersDetails() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params.id;
  const [image, setImage] = useState("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["workers", id],
    queryFn: getWorker,
  });

  const [updateInfo, setUpdateInfo] = useState({
    name: "",
    phoneNumber: "",
    age: "",
    id: id,
    photo: "",
  });

  const updateMutate = useMutation({
    mutationFn: updateWorker,
    onSuccess: () => {
      queryClient.invalidateQueries(workers);
    },
  });
  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // updateMutate.mutate(updateInfo);
    if (image) {
      const photo = await upload(image);
      updateInfo.photo = photo;
    }
    console.log(updateInfo)
    updateMutate.mutate(updateInfo);
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
              <h3>Update Profile</h3>
              <form>
                <p>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" onChange={handleChange} placeholder={data.name}/>
                </p>
                <p>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" name="phoneNumber" id="phone" onChange={handleChange} placeholder={data.phoneNumber}/>
                </p>
                <p>
                  <label htmlFor="phone">Age</label>
                  <input type="text" name="age" id="age" onChange={handleChange} placeholder={data.age}/>
                </p>
                <p>
                  <label htmlFor="photo">Profile Photo</label>
                  <input type="file" name="photo" id="photo" onChange={(e) => setImage(e.target.files[0])} />
                </p>
                <p>
                  <button onClick={handleSubmit}>Update</button>
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
export default WorkersDetails;
