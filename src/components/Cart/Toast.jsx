import { toast } from "react-toastify";
const showToast = (message, type) => {
  toast[type](message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export default showToast;
