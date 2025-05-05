import UserNavBar from "./UserNavBar"
import { getGcsToken } from "../../pages/gcs/gcs_functionality";
import Authorized from "../../helper/Authorized";

const NavBar = () => {
  const authData = Authorized();
  
  // Don't render NavBar for authenticated users (they'll use NavBarContainer instead)
  if (authData) {
    return null;
  }
  
  const gcsToken = getGcsToken();
  return (
    <UserNavBar gcsToken={gcsToken} />
  );
}

export default NavBar;