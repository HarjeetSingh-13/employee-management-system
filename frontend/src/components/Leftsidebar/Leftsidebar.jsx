import { useState } from "react";
import "./Leftsidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/api";
import { useMutation } from "@tanstack/react-query";

function Leftsidebar({ isClassToggled }) {
  const navigate = useNavigate();
  const logoutMutate = useMutation({
    mutationFn: logout,
  });
  const logoutHandle = () => {
    logoutMutate.mutate();
    navigate("/");
  };

  const [isactive, setActive] = useState();
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
            <img src="" alt="logo" />
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
            onClick={() => setActive("1")}
            className={isactive === "1" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> grid_view </span>
            <h3>Dashboard</h3>
          </Link>
          <Link
            to={"/attendance"}
            onClick={() => setActive("2")}
            className={isactive === "2" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> person_apron </span>
            <h3>Attendance</h3>
          </Link>
          <Link
            to={"/workers"}
            onClick={() => setActive("3")}
            className={isactive === "3" ? "active" : ""}
          >
            <span className="material-symbols-outlined"> grid_view </span>
            <h3>Workers</h3>
          </Link>
          {/* <Link href="#">
            <span className="material-symbols-outlined"> grid_view </span>
            <h3>Tasks</h3>
          </Link> */}
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
