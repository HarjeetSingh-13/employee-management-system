import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import Workers from "../components/Workers/Workers";

import { useState } from "react";

function WorkerListp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} />
      <Workers />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default WorkerListp;
