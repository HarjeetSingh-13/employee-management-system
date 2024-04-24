import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import UpdateUserProfile from "../components/UserProfile/UpdateUserProfile";

import { useState } from "react";

function UpdateUserProfilep() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} />
      <UpdateUserProfile />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default UpdateUserProfilep;