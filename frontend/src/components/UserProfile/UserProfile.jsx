import "../WorkersDetails/WorkersDetails.css";
import abc from "../../assets/abc.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/api";

function UserProfile() {
  const {isLoading, isError, data, error} = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })
  if(isLoading) return 'loading...';
  if(isError) return `error: ${error.message}`
  if(data) console.log(data);
  return (
    <>
      <div className="insights">
        <div className="middle">
          <>
            <div className="winfo">
              <div className="profile-container">
                <img src={abc} alt="Profile" className="profile-image" />
              </div>
              <div className="info-container">
                <h3>Employer's Information</h3>
                <p>{data.name}</p>
                <p>{data.email}</p>
                <p>{data.phone}</p>
                <Link to={"/updateuser"}>
                  <button>Update</button>
                </Link>
              </div>
              <div className="details-close-btn">
                <p className="closebtn">
                  <Link to={"/home"}>
                    <button>
                      <span class="material-symbols-outlined">close</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
export default UserProfile;
