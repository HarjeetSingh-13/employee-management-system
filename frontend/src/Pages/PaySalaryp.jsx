import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";

import { useState } from "react";
import PaySalary from "../components/WorkersDetails/PaySalary";

function PaySalaryp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"workers"}/>
      <PaySalary />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default PaySalaryp;