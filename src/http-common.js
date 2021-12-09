import axios from "axios";


export default axios.create({
  baseURL: process.env.REACT_APP_DCAPPROXY + "/api/documentunderstanding/",
  headers: {
    "Content-type": "application/json"
  }
});
