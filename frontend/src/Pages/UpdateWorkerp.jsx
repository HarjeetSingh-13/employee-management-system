import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import UpdateWorker from "../components/WorkersDetails/UpdateWorker";

import { useState } from "react";

function UpdateWorkerp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} />
      <UpdateWorker />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default UpdateWorkerp;
