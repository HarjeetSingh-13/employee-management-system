import "./WorkersDetails.css";
import abc from "../../assets/abc.png";
import Task from "../Task/Task";
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
              <h3>Workers Information</h3>
              <p>John Doe</p>
              <p>john.doe@example.com</p>
              <p>Phone: 123-456-7890</p>
              <Link to={"/updateworker"}>
                <button>Update</button>
              </Link>
            </div>
            <div className="details-close-btn">
              <p className="closebtn">
                <Link to={"/workers"}>
                  <button>
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
          <Task />
        </div>
      </div>
    </>
  );
}
export default WorkersDetails;
