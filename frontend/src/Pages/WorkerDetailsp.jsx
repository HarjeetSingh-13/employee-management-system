import Leftsidebar from "../components/Leftsidebar/Leftsidebar"
import Rightsidebar from "../components/Rightsidebar/Rightsidebar"
import WorkersDetails from "../components/WorkersDetails/WorkersDetails";

import { useState } from "react";

function WorkerDetailsp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled}/>
      <WorkersDetails />
      <Rightsidebar toggleClass={toggleClass}/>
    </>
  );
}
export default WorkerDetailsp;