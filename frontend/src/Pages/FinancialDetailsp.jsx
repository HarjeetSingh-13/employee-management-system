import Leftsidebar from "../components/Leftsidebar/Leftsidebar"
import Rightsidebar from "../components/Rightsidebar/Rightsidebar"
import FinancialDetails from "../components/WorkersDetails/FinancialDetails";

import { useState } from "react";

function FinancialDetailsp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"workers"}/>
      <FinancialDetails />
      <Rightsidebar toggleClass={toggleClass}/>
    </>
  );
}
export default FinancialDetailsp;