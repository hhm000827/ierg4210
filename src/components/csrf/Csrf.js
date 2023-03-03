import axios from "axios";

const getCSRFToken = async () => {
  const response = await axios.get(`${process.env.React_App_API}/api/getCSRFToken`, { withCredentials: true });
  axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
};

export { getCSRFToken };
