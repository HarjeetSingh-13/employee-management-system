import Workers from "../components/Workers/Workers";
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
      <Leftsidebar isClassToggled={isClassToggled} />
      <div className="attendance">
        <Workers />
      </div>
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}

export default Attendancep;
