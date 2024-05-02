import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import Loan from "../components/Workers/Loan";

import { useState } from "react";

function Loanp() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} activePage={"workers"}/>
      <Loan />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default Loanp;