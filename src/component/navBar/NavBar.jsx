import UserNavBar from "./UserNavBar"
import { getGcsToken } from "../../pages/gcs/gcs_functionality";

const NavBar = () => {
  const gcsToken = getGcsToken();
  return (
    <UserNavBar gcsToken={gcsToken} />
  );
}

export default NavBar;