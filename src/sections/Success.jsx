import { useEffect } from "react";
import ScreenLoader from "./ScreenLoader";

function Success() {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = '/';
    }
  }, []);

  return (<ScreenLoader />)
}

export default Success;