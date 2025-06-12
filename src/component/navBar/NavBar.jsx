import UserNavBar from "./UserNavBar"
import { getGcsToken } from "../../pages/gcs/gcs_functionality";
import Authorized from "../../helper/Authorized";

const NavBar = () => {
  const authData = Authorized();
  const gcsToken = getGcsToken();
  const subAccountName = sessionStorage.getItem("hostBuddy_subaccount_name") || null;
  
  // Always render UserNavBar when this component is called
  // The logic for when to show NavBar vs NavBarContainer is handled in Routes.jsx
  return (
    <UserNavBar gcsToken={gcsToken} subAccountName={subAccountName} />
  );
}

export default NavBar;