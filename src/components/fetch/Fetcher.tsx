"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TMethod } from "../../interfaces/fetch/methods";
import { IMyFetchResponse, myFetch } from "../../tools/myFetch";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

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
  const [animate, setAnimate] = useState(false);
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

      setTimeout(() => setAnimate(true), 10);
    };
    if (props.nbFetchs > 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.nbFetchs]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => setShowNotification(false), 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const getSnackbarStyles = () => {
    if (!response) return "";
    return response.ok ? "bg-green-500 border-green-600" : "bg-red-500 border-red-600";
  };

  const getSnackbarIcon = () => {
    if (!response) return null;
    return response.ok ? <CheckCircleIcon className="h-6 w-6" /> : <ErrorIcon className="h-6 w-6" />;
  };

  return showNotification && response?.message ? (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-96 max-w-full px-4 py-3 rounded-md shadow-lg text-white flex items-center gap-3 transition-all duration-500 ${
        animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${getSnackbarStyles()}`}
    >
      {getSnackbarIcon()}
      <p className="flex-1 text-sm">{response.message}</p>
    </div>
  ) : null;
}
