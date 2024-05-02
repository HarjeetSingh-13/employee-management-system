import Attendance from "../components/Workers/Attendance";
import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";

import { useState } from "react";

function Attendancep() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"attendance"}/>
      <div className="attendance">
        <Attendance />
      </div>
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}

export default Attendancep;
