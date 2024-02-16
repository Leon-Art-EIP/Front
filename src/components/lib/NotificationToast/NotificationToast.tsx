import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import CheckCircle from "../../animated/check-circle";
import CrossCircle from "../../animated/cross-circle";

export interface NotificationToastProps {
  message: string;
  type: "success" | "error";
  closeNotification?: () => void;
}

/* c8 ignore start */

export default function NotificationToast(props: NotificationToastProps): JSX.Element | null {
  const [visible, setVisible] = useState(true);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, 5000);

    return () => {
      /* c8 ignore next 3 */
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

  let backgroundColor = "bg-white";
  switch (props.type) {
    case "success":
      backgroundColor = "bg-green-500";
      break;
    case "error":
      backgroundColor = "bg-red-500";
      break;
  }

  return display ? (
    <div
      className={`fixed top-0 left-0 flex justify-center w-screen h-screen items-center transition-opacity duration-500 z-50 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`m-6 p-4 w-1/3 rounded-md text-white flex flex-col gap-4 bg-white border border-gray-300 shadow-lg`}
      >
        {props.type === "success" ? <CheckCircle /> : <CrossCircle />}
        <p className="text-xl text-center text-gray-500 font-bold">{props.message}</p>
        <Button color="primary" type="button" className="self-end" onClick={handleOnClick}>
          Ok
        </Button>
      </div>
    </div>
  ) : null;
}

/* c8 ignore stop */
