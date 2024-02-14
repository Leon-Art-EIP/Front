"use client";

import { useEffect, useState } from "react";
import { IMyFetchResponse, myFetch } from "../../tools/myFetch";
import { NotificationToast } from "../lib";
import { IFetcherDivProps } from "./FetcherDiv";

export default function Fetcher(props: Omit<IFetcherDivProps, "children">): JSX.Element | null {
  const [response, setResponse] = useState<IMyFetchResponse>();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (props.setIsLoading) {
        props.setIsLoading(true);
      }

      const response = await myFetch({
        route: props.route,
        method: props.method,
        body: props.body,
        successStr: props.successStr,
      });

      if (props.setIsLoading) {
        props.setIsLoading(false);
      }

      if (response.ok && props.handleOk) {
        props.handleOk(response.json);
      }
      setResponse(response);
      setShowNotification(true);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nbFetchs]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        if (showNotification) {
          setShowNotification(false);
        }
      }, 5500);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return showNotification && response?.message ? (
    <NotificationToast
      message={response.message}
      type={response.ok ? "success" : "error"}
      closeNotification={handleCloseNotification}
    />
  ) : null;
}
