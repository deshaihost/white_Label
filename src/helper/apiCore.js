// import jwtDecode from "jwt-decode";
import axios from "axios";

// content type
const API_KEY = process.env.REACT_APP_API_KEY;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.defaults.headers.common["X-API-Key"] = API_KEY;

// Add a variable to track the current active token
let currentActiveToken = null;
const AUTH_SESSION_KEY = "hostBuddy_auth";
const ACTIVE_TOKEN = "hostBuddy_active_token";

// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message = {
      message: "Invalid credentials",
      status: 401,
    };

    if (error && error.response && error.response.status === 404) {
      return Promise.reject(error.response);
      // window.location.href = '/not-found';
    } 
    else if (error && error.response && error.response.status === 403) {
      // window.location.href = '/access-denied';
    } else {
      switch (error.response.status) {
        case 401:
          message = message;
          break;
        case 403:
          message = "Access Forbidden";
          break;
        case 404:
          message = "Sorry! the data you are looking for could not be found";
          break;
        default: {
          // message =
          //     error.response && error.response.data ? error.response.data['message'] : error.message || error;
          message =
            error.response && error.response.data
              ? error.response
              : error.message || error;
        }
      }
      return Promise.reject(message);
    }
  }
);

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    currentActiveToken = token; // Store the current active token
    sessionStorage.setItem(ACTIVE_TOKEN, token); // Store token in session storage
  }
  else {
    delete axios.defaults.headers.common["Authorization"];
    currentActiveToken = null;
    sessionStorage.removeItem(ACTIVE_TOKEN); // Remove token from session storage
  }
};

/**
 * Gets the current active authorization token
 * @returns {string|null} The current active token
 */
const getActiveToken = () => {
  if (currentActiveToken) return currentActiveToken;
  
  // If not in memory, check session storage
  const storedToken = sessionStorage.getItem(ACTIVE_TOKEN);
  if (storedToken) {
    currentActiveToken = storedToken;
    return storedToken;
  }
  
  return null;
};

const getUserFromSession = () => {
  let user = sessionStorage.getItem(AUTH_SESSION_KEY);
  if (!user) { user = localStorage.getItem(AUTH_SESSION_KEY); } // Check local storage if not in session - may be here if the user chooses "remember me"
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};

class APICore {
  // Fetches data from given url
  get = (url, params) => {
    let response;
    if (params) {
      var queryString = params ? Object.keys(params).map((key) => key + "=" + params[key]).join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    console.log(response.data)
    return response;
  };

  getFile = (url, params) => {
    let response;
    if (params) {
      var queryString = params ? Object.keys(params).map((key) => key + "=" + params[key]).join("&") : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls, params) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params ? Object.keys(params).map((key) => key + "=" + params[key]).join("&") : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  // post given data to url
  create = (url, data) => {
    return axios.post(url, data);
  };

  // Updates patch data
  updatePatch = (url, data) => {
    return axios.patch(url, data);
  };

  // Updates data
  update = (url, data) => {
    return axios.put(url, data);
  };

  // Deletes data
  delete = (url) => {
    return axios.delete(url);
  };

  // post given data to url with file
  createWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {...axios.defaults.headers, "content-type": "multipart/form-data"}
    };
    return axios.post(url, formData, config);
  };

  // post given data to url with file
  updateWithFile = (url, data) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {...axios.defaults.headers, "content-type": "multipart/form-data"}
    };
    return axios.patch(url, formData, config);
  };

  setLoggedInUser = (session, rememberMe=false) => {
    if (session) {
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      if (rememberMe) {
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
      }
    } else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  // Returns the logged in user
  getLoggedInUser = () => {
    return getUserFromSession();
  };
}

//Check if token available in session
console.log("Checking for token in session");
const storedToken = sessionStorage.getItem(ACTIVE_TOKEN);
if (storedToken) {
  // Prioritize the stored active token if available
  setAuthorization(storedToken);
} else {
  let user = getUserFromSession();
  if (user) {
    const { token } = user;
    if (token) {
      setAuthorization(token);
    }
  }
}

export { APICore, setAuthorization, getActiveToken };
