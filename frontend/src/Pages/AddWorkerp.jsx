import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import AddWorker from "../components/Workers/AddWorker";

import { useState } from "react";

function AddWorkerp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"workers"}/>
      <AddWorker />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default AddWorkerp;