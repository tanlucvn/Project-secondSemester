import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  WarningAmberOutlined,
  ErrorOutline,
  CheckCircleOutline,
  InfoOutlined,
  CloseOutlined,
  SentimentDissatisfiedOutlined,
} from "@mui/icons-material";

function Toast({ message, type }) {
  // eslint-disable-next-line default-case
  switch (type) {
    case "info":
      toast.info(`${message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <InfoOutlined color="white" />,
      });
      break;
    case "warning":
      toast.warning(`${message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <WarningAmberOutlined color="white" />,
      });
      break;
    case "success":
      toast.success(`${message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <CheckCircleOutline color="white" />,
      });
      break;
    case "error":
      toast.error(`${message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <ErrorOutline color="white" />,
      });
      break;
    case "default":
      toast(`${message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
        icon: <SentimentDissatisfiedOutlined color="white" />,
      });
      break;
  }

  return <ToastContainer limit={1} />;
}

export default Toast;
