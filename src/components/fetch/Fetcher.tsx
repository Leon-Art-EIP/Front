"use client";

import { useEffect, useState } from "react";
import { IMyFetchResponse, myFetch } from "../../tools/myFetch";
import { NotificationToast } from "../lib";
import { IFetcherDivProps } from "./FetcherDiv";

export default function Fetcher(props: Omit<IFetcherDivProps, "children">): JSX.Element | null {
  const [response, setResponse] = useState<IMyFetchResponse>();

  useEffect(() => {
    setResponse(undefined);
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
    };
    fetchData();
  }, [props.nbFetchs, props]);

  return response?.message ? (
    <NotificationToast message={response.message} type={response.ok ? "success" : "error"} />
  ) : null;
}
