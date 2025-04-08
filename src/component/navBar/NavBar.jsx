import UserNavBar from "./UserNavBar"
import { getGcsToken } from "../../pages/gcs/gcs_functionality";

const NavBar = () => {
  const gcsToken = getGcsToken();
  const subAccountName = sessionStorage.getItem("hostBuddy_subaccount_name") || null;
  
  return (
    <UserNavBar gcsToken={gcsToken} subAccountName={subAccountName} />
  );
}

export default NavBar;