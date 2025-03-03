import UserNavBar from "./UserNavBar"
import { jwtDecode } from 'jwt-decode';

// If the user is logged in as a GCS user, return the GCS token. Otherwise, return null
const getGcsToken = () => {
  const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
  const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
  const getAuthToken = localAuth || sessionAuth;
  
  // If token exists in local but not session storage, copy it to session storage
  if (localAuth && !sessionAuth) {
    sessionStorage.setItem("hostBuddy_auth", JSON.stringify(localAuth));
  }
  
  if (!getAuthToken) return null;
  
  try {
    const { gcs_access_token } = getAuthToken;
    if (!gcs_access_token) return null;

    const decoded = jwtDecode(gcs_access_token);
    if (decoded.exp * 1000 <= Date.now()) {return null;}

    return gcs_access_token;

  } catch (error) {
    return null;
  }
};

const NavBar = () => {
  const gcsToken = getGcsToken();
  return (
    <UserNavBar gcsToken={gcsToken} />
  );
}

export default NavBar;