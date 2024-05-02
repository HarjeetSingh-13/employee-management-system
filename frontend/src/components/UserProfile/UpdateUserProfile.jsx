import "../WorkersDetails/WorkersDetails.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changePassword, getUser, updateUser } from "../../api/api";
import upload from "../../upload.js";

function UserProfile() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const [updateInfo, setUpdateInfo] = useState({
    name: "",
    phone: "",
    photo: "",
  });

  const [changepass, setPassword] = useState({
    oldPassword: "",
    password: "",
  });

  const updateMutate = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(getUser);
    },
  });
  const changePassMutate = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      navigate("/userprofile")
    },
  });
  const handleChange = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
    setPassword({
      ...changepass,
      [e.target.name]: e.target.value,
    })
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
  const handlePasswordChange = (e) => {
    // e.preventDefault();
    changePassMutate.mutate(changepass);
    setPassword({
      oldPassword:"",
      password:"",
    })
  }

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
                  <input
                    type="text"
                    onChange={handleChange}
                    name="name"
                    id="name"
                    placeholder={data.name}
                  />
                </p>
                <p>
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="text"
                    onChange={handleChange}
                    name="phone"
                    id="phone"
                    placeholder={data.phone}
                  />
                </p>
                <p>
                  <label htmlFor="photo">Profile Photo</label>
                  <input type="file" name="photo" id="photo"  onChange={(e) => setImage(e.target.files[0])} />
                </p>
                <p>
                  <button onClick={handleSubmit}>Update</button>
                </p>
              </form>
              <div className="passwordchange">
                <h3>Change Password</h3>
                <div className="changepass">
                  <input
                    type="password"
                    name="oldPassword"
                    id="prevpass"
                    onChange={handleChange}
                    placeholder="Previous Password"
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    id="newpass"
                    placeholder="New Password"
                  />
                </div>
                <p>
                  <button onClick={handlePasswordChange}>Change</button>
                </p>
              </div>
            </div>
            <p className="closebtn">
              <Link to={"/userprofile"}>
                <button>
                  <span class="material-symbols-outlined">close</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
