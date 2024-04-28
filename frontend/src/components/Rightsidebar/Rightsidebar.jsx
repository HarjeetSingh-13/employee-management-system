import "./Rightsidebar.css";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/api";

function Rightsidebar({ toggleClass }) {

  const {isLoading, isError, data, error} = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })
  if(isLoading) return 'loading...';
  if(isError) return `error: ${error.message}`

  const handleClick = () => {
    toggleClass();
  };
  const themeTogglerfunc = () => {
    document.body.classList.toggle("dark-theme-variables");
    document.querySelector(".light").classList.toggle("active");
    document.querySelector(".dark").classList.toggle("active");
  };
  return (
    <div className="right">
      <div className="top">
        <button id="menu-btn" onClick={handleClick}>
          <span className="material-symbols-outlined"> menu </span>
        </button>
        <div className="theme-toggler">
          <span
            className="material-symbols-outlined active light"
            onClick={themeTogglerfunc}
          >
            {" "}
            light_mode{" "}
          </span>
          <span
            className="material-symbols-outlined dark"
            onClick={themeTogglerfunc}
          >
            {" "}
            dark_mode{" "}
          </span>
        </div>
        <div className="profile">
          <div className="info">
            <p>Hey,</p>
            <b>{data.name}</b>
          </div>
          <Link to={"/userprofile"}>
          <div className="profile-photo">
            <img src="" alt="profilepic" />
          </div>
          </Link>
        </div>
      </div>

      <div className="announcements">
        <h2>Announcements</h2>
        <div className="updates">
          <div className="update">
            <div className="profile-photo">
              <img src="" alt="pp" />
            </div>
            <div className="message">
              <p>
                <b>Mike Tyson</b> received his order of Night lion techj Gps
                done
              </p>
              <small className="text-muted">2 minutes Ago</small>
            </div>
          </div>
          <div className="update">
            <div className="profile-photo">
              <img src="" alt="pp" />
            </div>
            <div className="message">
              <p>
                <b>Mike Tyson</b> received his order of Night lion techj Gps
                done
              </p>
              <small className="text-muted">2 minutes Ago</small>
            </div>
          </div>
          <div className="update">
            <div className="profile-photo">
              <img src="" alt="pp" />
            </div>
            <div className="message">
              <p>
                <b>Mike Tyson</b> received his order of Night lion techj Gps
                done
              </p>
              <small className="text-muted">2 minutes Ago</small>
            </div>
          </div>
        </div>
      </div>

      <div className="worker-analytics">
        <h2>Workers Analytics</h2>
        <div className="item online">
          <span className="material-symbols-outlined"> shopping_cart </span>
          <div className="right">
            <div className="info">
              <h3>Attendance</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            <h5 className="success">+39%</h5>
            <h3>3849</h3>
          </div>
        </div>
        <div className="item offline">
          <span className="material-symbols-outlined"> shopping_cart </span>
          <div className="right">
            <div className="info">
              <h3>Task Completed</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            <h5 className="success">+39%</h5>
            <h3>3849</h3>
          </div>
        </div>
        <div className="item online">
          <span className="material-symbols-outlined"> shopping_cart </span>
          <div className="right">
            <div className="info">
              <h3>Leave Requests</h3>
              <small className="text-muted">Last 24 Hours</small>
            </div>
            <h5 className="success">+39%</h5>
            <h3>3849</h3>
          </div>
        </div>
        <div className="item add-Workers">
          <div>
            <span className="material-symbols-outlined"> add </span>
            <h3>App Workers</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rightsidebar;
