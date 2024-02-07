"use client";

import { useEffect, useState } from "react";
import { TMethod } from "../../interfaces/fetch/methods";
import { myFetch } from "../../tools/myFetch";

interface IFetcherProps {
  nbFetchs: number;
  route: string;
  method: TMethod;
  body?: string | FormData;
  formData?: boolean;
  handleOk: () => void;
  successStr: string;
}

export default function Fetcher(props: IFetcherProps): JSX.Element {
  const [notification, setNotification] = useState<string>("");

  useEffect(() => {
    console.log("Fetching");
    const fetchData = async () => {
      const response = await myFetch({
        route: props.route,
        method: props.method,
        body: props.body,
        successStr: props.successStr,
      });

      if (response.ok) {
        props.handleOk();
      }
      setNotification(response.message);
    };
    fetchData();
  }, [props.nbFetchs, props]);

  return <div>Fetcher</div>;
}
