import "./Leftsidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/api";
import { useMutation } from "@tanstack/react-query";
import logo from "../../assets/logo.png";
function Leftsidebar({ isClassToggled, activePage }) {
  const navigate = useNavigate();
  const logoutMutate = useMutation({
    mutationFn: logout,
  });
  const logoutHandle = () => {
    logoutMutate.mutate();
    navigate("/");
  };

  const sidemenu = document.querySelector("aside");
  const hideLeftPanel = () => {
    sidemenu.style.display = "none";
  };
  if (isClassToggled) {
    sidemenu.style.display = "block";
  }
  return (
    <>
      <aside>
        <div className="top">
          <div className="logo">
            <img src={logo} alt="logo"/>
            <h2>
              Worker<span className="danger">Connect</span>
            </h2>
          </div>
          <div className="close" id="close-btn">
            <span className="material-symbols-outlined" onClick={hideLeftPanel}>
              {" "}
              close{" "}
            </span>
          </div>
        </div>
        <div className="sidebar">
          <Link
            to={"/home"}
            className={activePage === "dashboard" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> grid_view </span>
            <h3>Dashboard</h3>
          </Link>
          <Link
            to={"/attendance"}
            className={activePage === "attendance" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> person_apron </span>
            <h3>Attendance</h3>
          </Link>
          <Link
            to={"/workers"}
            className={activePage === "workers" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> grid_view </span>
            <h3>Workers</h3>
          </Link>
          <a onClick={logoutHandle}>
            <span className="material-symbols-outlined"> logout </span>
            <h3>Logout</h3>
          </a>
        </div>
      </aside>
    </>
  );
}

export default Leftsidebar;
