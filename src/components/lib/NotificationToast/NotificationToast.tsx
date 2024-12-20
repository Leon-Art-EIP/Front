import { useEffect, useState } from "react";
import CheckCircle from "../../animated/check-circle";
import CrossCircle from "../../animated/cross-circle";
import Button from "../Button/Button";

export interface NotificationToastProps {
  message: string;
  type: "success" | "error";
  closeNotification?: () => void;
}

export default function NotificationToast(props: NotificationToastProps): JSX.Element | null {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const closeToast = () => {
    setVisible(false);
    setTimeout(() => {
      setDisplay(false);
    }, 500);
  };

  const handleOnClick = () => {
    closeToast();
    if (props.closeNotification) {
      props.closeNotification();
    }
  };

  return display ? (
    <div
      className={`fixed top-0 left-0 flex justify-center w-screen h-screen items-center transition-opacity duration-500 z-50 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`m-6 p-4 w-1/3 rounded-md text-white flex flex-col gap-4 bg-secondary border border-secondary shadow-lg`}
      >
        {props.type === "success" ? <CheckCircle /> : <CrossCircle />}
        <p className="text-xl text-center text-black font-bold">{props.message}</p>
        <Button id="close-toast" color="primary" type="button" className="self-end" onClick={handleOnClick}>
          Ok
        </Button>
      </div>
    </div>
  ) : null;
}
