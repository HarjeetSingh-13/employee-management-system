import "./WorkersDetails.css";
import abc from "../../assets/abc.png";
import { Link } from "react-router-dom";

function WorkersDetails() {
  return (
    <>
      <div className="insights">
        <div className="middle">
          <div className="winfo">
            <div className="profile-container">
              <img src={abc} alt="Profile" className="profile-image" />
            </div>
            <div className="info-container">
              <h3>Update Profile</h3>
              <form>
                <p>
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </p>
                <p>
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" name="phone" id="phone" />
                </p>
                <p>
                  <label htmlFor="photo">Profile Photo</label>
                  <input type="file" name="photo" id="photo" />
                </p>
                <p>
                  <button>Update</button>
                </p>
              </form>
            </div>
            <p className="closebtn">
              <Link to={"/workerdetails"}>
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
