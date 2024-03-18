"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TMethod } from "../../interfaces/fetch/methods";
import { IMyFetchResponse, myFetch } from "../../tools/myFetch";
import { NotificationToast } from "../lib";

export interface IFetcherProps {
  nbFetchs: number;
  handleOk?: (json?: any) => void;
  method: TMethod;
  route: string;
  successStr?: string;
  body?: string | FormData;
  setIsLoading?: (isLoading: boolean) => void;
}

export default function Fetcher(props: IFetcherProps): JSX.Element | null {
  const [response, setResponse] = useState<IMyFetchResponse>();
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  const handleUnauthorized = () => {
    router.push("/login");
  };

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
        handleUnauthorized,
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
    if (props.nbFetchs > 0) {
      fetchData();
    }
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
