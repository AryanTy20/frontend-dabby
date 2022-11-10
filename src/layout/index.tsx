import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
const Layout = () => {
  const [online, setOnline] = useState(true);
  const closeRef = useRef<ReturnType<typeof toast>>(0);
  useEffect(() => {
    const Online = () => {
      setOnline(true);
      toast.success(" Internet Connected ", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };
    const Offline = () => {
      setOnline(false);
      closeRef.current = toast.error(" No Internet Connection ! ", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    window.addEventListener("online", Online);
    window.addEventListener("offline", Offline);

    return () => {
      removeEventListener("online", Online);
      removeEventListener("offline", Offline);
    };
  }, []);

  useEffect(() => {
    let id: number;
    if (online) {
      toast.dismiss(closeRef.current);
      id = setTimeout(() => toast.clearWaitingQueue(), 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [online]);

  return <Outlet />;
};

export default Layout;
