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
  const subAccountName = sessionStorage.getItem("hostBuddy_subaccount_name") || null;
  
  return (
    <UserNavBar gcsToken={gcsToken} subAccountName={subAccountName} />
  );
}

export default NavBar;