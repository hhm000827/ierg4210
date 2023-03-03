import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.React_App_API,
  withCredentials: true,
});

const getCSRFToken = async () => {
  const response = await Axios.get(`/api/getCSRFToken`);
  Axios.defaults.headers.post["X-CSRF-Token"] = response.data.csrfToken;
  Axios.defaults.headers.delete["X-CSRF-Token"] = response.data.csrfToken;
  Axios.defaults.headers.put["X-CSRF-Token"] = response.data.csrfToken;
};

export { getCSRFToken, Axios };
