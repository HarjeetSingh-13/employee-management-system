import Leftsidebar from "../components/Leftsidebar/Leftsidebar";
import Rightsidebar from "../components/Rightsidebar/Rightsidebar";
import UserProfile from "../components/UserProfile/UserProfile";

import { useState } from "react";

function UserProfilep() {
  const [isClassToggled, setIsClassToggled] = useState(false);
  const toggleClass = () => {
    setIsClassToggled(!isClassToggled);
  };
  return (
    <>
      <Leftsidebar isClassToggled={isClassToggled} />
      <UserProfile />
      <Rightsidebar toggleClass={toggleClass} />
    </>
  );
}
export default UserProfilep;
