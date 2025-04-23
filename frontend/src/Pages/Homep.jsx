import Leftsidebar from "../components/Leftsidebar/Leftsidebar"
import Rightsidebar from "../components/Rightsidebar/Rightsidebar"
import Dashboard from "../components/Dashboard/Dashboard"
import { useState } from "react";

function Homep() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"dashboard"}/>
      Testing 2...
      <Dashboard />
      <Rightsidebar toggleClass={toggleClass}/>
    </>
  );
}
export default Homep
